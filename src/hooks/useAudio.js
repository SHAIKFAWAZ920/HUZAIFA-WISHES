import { useState, useEffect, useRef, useCallback } from 'react';

// Resolves relative public URL considering Vite base path
function resolveAudioUrl(url) {
  if (!url || url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:') || url.startsWith('data:')) {
    return url;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${cleanBase}${cleanUrl}`;
}

export function useAudio(bgmUrl = '/music/love-is-a-waste-of-time.mp3') {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState(true);
  const [audioError, setAudioError] = useState(null);
  const [volume, setVolumeState] = useState(0.7);

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const volumeFadeRef = useRef(null);
  const blobUrlRef = useRef(null);

  // Initialize and persist single Audio instance
  useEffect(() => {
    const audio = new Audio();
    audio.src = resolveAudioUrl(bgmUrl);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.7;
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
      setAudioError(null);
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    const onError = () => {
      const msg = `Audio file not found at ${bgmUrl}. Please place love-is-a-waste-of-time.mp3 in public/music/`;
      console.warn(msg);
      setIsAudioAvailable(false);
      setAudioError(msg);
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
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
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

  // Primary user-gesture trigger to start music
  const startMusic = useCallback(() => {
    setHasStarted(true);
    if (!audioRef.current) return;

    audioRef.current.volume = 0;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAudioError(null);
          fadeVolume(volume, 600);
        })
        .catch((err) => {
          console.warn('Playback error or file missing:', err.message);
          setIsPlaying(false);
          setIsAudioAvailable(false);
        });
    }
  }, [fadeVolume, volume]);

  // Load custom audio file from user device (File object)
  const loadAudioFile = useCallback((file) => {
    if (!file || !audioRef.current) return;

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    const newBlobUrl = URL.createObjectURL(file);
    blobUrlRef.current = newBlobUrl;

    audioRef.current.src = newBlobUrl;
    audioRef.current.load();
    setIsAudioAvailable(true);
    setAudioError(null);
    setHasStarted(true);

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          fadeVolume(volume, 500);
        })
        .catch((err) => {
          console.warn('Error playing selected file:', err);
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
      audioRef.current.muted = false;
      setIsMuted(false);
      fadeVolume(volume, 300);
    } else {
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

  // Balloon pop sound effect via isolated Web Audio API
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
    audioError,
    startMusic,
    loadAudioFile,
    togglePlay,
    toggleMute,
    seek,
    setVolume,
    playPopSfx
  };
}
