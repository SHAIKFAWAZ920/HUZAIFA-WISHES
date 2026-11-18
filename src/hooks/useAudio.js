import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudio(bgmUrl = '/music/love-is-a-waste-of-time.mp3') {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(true);
  const [volume, setVolumeState] = useState(0.65);

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const volumeFadeRef = useRef(null);

  // Initialize and persist single Audio instance
  useEffect(() => {
    const audio = new Audio();
    audio.src = bgmUrl;
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.65;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
      if (audio.duration && !isNaN(audio.duration) && audio.duration !== Infinity) {
        setDuration(audio.duration);
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsAudioAvailable(true);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    const onError = () => {
      // Graceful fallback if MP3 is not yet added to /public/music/
      console.warn(
        `Background audio file at "${bgmUrl}" is not available or not yet copied to public/music. Please place love-is-a-waste-of-time.mp3 in public/music/.`
      );
      setIsAudioAvailable(false);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      if (volumeFadeRef.current) {
        clearInterval(volumeFadeRef.current);
      }
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.pause();
      audioRef.current = null;
    };
  }, [bgmUrl]);

  // Smooth volume transition helper
  const fadeVolume = useCallback((targetVol, durationMs = 400, onComplete) => {
    if (!audioRef.current) return;
    if (volumeFadeRef.current) clearInterval(volumeFadeRef.current);

    const startVol = audioRef.current.volume;
    const steps = 16;
    const interval = durationMs / steps;
    const delta = (targetVol - startVol) / steps;
    let stepCount = 0;

    volumeFadeRef.current = setInterval(() => {
      stepCount++;
      if (!audioRef.current) {
        clearInterval(volumeFadeRef.current);
        return;
      }
      const newVol = Math.max(0, Math.min(1, startVol + delta * stepCount));
      audioRef.current.volume = newVol;

      if (stepCount >= steps) {
        clearInterval(volumeFadeRef.current);
        audioRef.current.volume = targetVol;
        if (onComplete) onComplete();
      }
    }, interval);
  }, []);

  // Primary user-gesture trigger to start music (bypasses browser autoplay restrictions)
  const startMusic = useCallback(() => {
    setHasStarted(true);
    if (!audioRef.current) return;

    audioRef.current.volume = 0;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          fadeVolume(volume, 600);
        })
        .catch((err) => {
          console.warn('Autoplay prevented or music file missing:', err.message);
        });
    }
  }, [fadeVolume, volume]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      fadeVolume(0, 300, () => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      });
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            fadeVolume(isMuted ? 0 : volume, 300);
          })
          .catch((err) => {
            console.warn('Playback error:', err.message);
          });
      }
    }
  }, [isPlaying, isMuted, volume, fadeVolume]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    if (isMuted) {
      // Unmuting: restore volume smoothly
      audioRef.current.muted = false;
      setIsMuted(false);
      fadeVolume(volume, 300);
    } else {
      // Muting: smooth fade out then mute
      fadeVolume(0, 300, () => {
        if (audioRef.current) {
          audioRef.current.muted = true;
          setIsMuted(true);
        }
      });
    }
  }, [isMuted, volume, fadeVolume]);

  const seek = useCallback((percentage) => {
    if (!audioRef.current || !duration) return;
    const targetTime = (Math.max(0, Math.min(100, percentage)) / 100) * duration;
    audioRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  }, [duration]);

  const setVolume = useCallback((newVol) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolumeState(clamped);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = clamped;
    }
  }, [isMuted]);

  // Balloon pop sound effect via isolated Web Audio API (never interrupts background music)
  const playPopSfx = useCallback(() => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      console.warn('AudioContext pop sound error:', e);
    }
  }, [isMuted]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return {
    isPlaying,
    isMuted,
    currentTime,
    duration,
    progress,
    volume,
    hasStarted,
    isAudioAvailable,
    startMusic,
    togglePlay,
    toggleMute,
    seek,
    setVolume,
    playPopSfx
  };
}
