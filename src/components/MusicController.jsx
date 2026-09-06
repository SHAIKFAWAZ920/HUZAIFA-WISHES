import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export function MusicController({ isPlaying, isMuted, onTogglePlay, onToggleMute }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={onTogglePlay}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-transform active:scale-95 hover:bg-white/20"
        title={isPlaying ? "Pause Music" : "Play Music"}
        aria-label="Toggle Music Playback"
      >
        <Music className={`h-4 w-4 ${isPlaying ? 'animate-bounce text-pink-400' : 'text-white/70'}`} />
      </button>

      <button
        onClick={onToggleMute}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg transition-transform active:scale-95 hover:bg-white/20"
        title={isMuted ? "Unmute Sound" : "Mute Sound"}
        aria-label="Toggle Sound Mute"
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4 text-red-400" />
        ) : (
          <Volume2 className="h-4 w-4 text-amber-300" />
        )}
      </button>
    </div>
  );
}
