import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown, Upload, AlertCircle } from 'lucide-react';
import { MusicVisualizer } from './MusicVisualizer';

export function MusicPlayer({
  isPlaying,
  isMuted,
  currentTime,
  duration,
  progress,
  isAudioAvailable = true,
  onTogglePlay,
  onToggleMute,
  onSeek,
  onLoadAudioFile,
  songConfig
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef(null);

  const title = songConfig?.title || 'Love Is a Waste of Time';
  const movie = songConfig?.movie || 'PK';
  const artists = songConfig?.artists || 'Sonu Nigam & Shreya Ghoshal';

  const formatTime = (secs) => {
    if (!secs || isNaN(secs) || secs === Infinity) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleProgressBarClick = (e) => {
    if (!onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    onSeek(percent);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onLoadAudioFile) {
      onLoadAudioFile(file);
    }
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end select-none">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-2 w-72 sm:w-80 rounded-2xl border border-pink-500/30 bg-black/85 backdrop-blur-xl p-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_20px_rgba(244,114,182,0.2)] text-white"
          >
            {/* Header: Title, Movie & Visualizer */}
            <div className="flex items-center gap-3">
              {/* Rotating Vinyl Record Graphic */}
              <div className="relative h-12 w-12 flex-shrink-0">
                <div
                  className="h-12 w-12 rounded-full border-2 border-stone-800 bg-gradient-to-tr from-neutral-900 via-neutral-950 to-stone-900 shadow-md flex items-center justify-center animate-spin-record overflow-hidden"
                  style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                >
                  <div className="absolute inset-1 rounded-full border border-white/10" />
                  <div className="absolute inset-2.5 rounded-full border border-white/5" />
                  <div className="h-4 w-4 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-[7px] font-bold text-black">
                    PK
                  </div>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs sm:text-sm font-medium text-pink-100 font-sans-poppins">
                  {title}
                </p>
                <p className="truncate text-[11px] text-pink-300/70 font-sans-poppins">
                  {movie} • {artists}
                </p>
              </div>

              {/* Waveform Visualizer */}
              <MusicVisualizer isPlaying={isPlaying} />
            </div>

            {/* Missing Audio Warning & File Selector */}
            {!isAudioAvailable && (
              <div className="mt-2.5 rounded-lg border border-amber-500/40 bg-amber-500/10 p-2 text-left">
                <div className="flex items-start gap-1.5 text-amber-300 text-[11px]">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Audio file not found in public/music/</p>
                    <p className="text-[10px] text-amber-200/80 mt-0.5">
                      Place <span className="font-mono text-white">love-is-a-waste-of-time.mp3</span> in the folder, or select it from your device:
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 py-1 text-xs font-semibold text-amber-200 transition-colors cursor-pointer"
                >
                  <Upload className="h-3 w-3" />
                  <span>Choose MP3 File</span>
                </button>
              </div>
            )}

            {/* Progress Scrubber Bar */}
            <div className="mt-3">
              <div
                onClick={handleProgressBarClick}
                className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/15 overflow-hidden group py-1 -my-1"
                title="Seek track"
              >
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-400 transition-all duration-100 group-hover:brightness-110"
                  style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
              </div>

              {/* Time display */}
              <div className="mt-1.5 flex justify-between text-[10px] text-pink-200/60 font-sans-poppins">
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? formatTime(duration) : 'PK OST'}</span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-white/10">
              <button
                onClick={onToggleMute}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-pink-200 transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
                aria-label="Toggle Mute"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-red-400" />
                ) : (
                  <Volume2 className="h-4 w-4 text-amber-300" />
                )}
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 text-[11px] text-pink-300/80 hover:text-pink-200 cursor-pointer font-sans-poppins"
                title="Change or select another audio file"
              >
                <Upload className="h-3 w-3" />
                <span>Choose Song</span>
              </button>

              <button
                onClick={onTogglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-110 text-white shadow-md active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? 'Pause Music' : 'Play Music'}
                aria-label="Toggle Playback"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Compact Docking Pill */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 rounded-full border border-pink-500/40 bg-black/75 backdrop-blur-md px-2.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(244,114,182,0.3)] transition-all hover:border-amber-400/60 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? 'Collapse Music Player' : 'Expand Music Controls'}
      >
        <div
          className="h-7 w-7 rounded-full border border-pink-400/40 bg-gradient-to-tr from-neutral-900 to-stone-900 shadow-inner flex items-center justify-center animate-spin-record overflow-hidden"
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        >
          <div className="h-2 w-2 rounded-full bg-amber-400" />
        </div>

        <div className="flex items-center gap-2 pr-1">
          <span className="hidden sm:inline text-xs font-medium text-pink-100 max-w-[120px] truncate font-sans-poppins">
            {title}
          </span>
          <MusicVisualizer isPlaying={isPlaying} barCount={4} className="h-3" />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500/30 hover:bg-pink-500/50 text-white transition-colors cursor-pointer"
          title={isPlaying ? 'Pause' : 'Play'}
          aria-label="Play/Pause"
        >
          {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 ml-0.5" />}
        </button>

        <div className="text-pink-300/70 pl-0.5">
          {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
        </div>
      </motion.div>
    </div>
  );
}
