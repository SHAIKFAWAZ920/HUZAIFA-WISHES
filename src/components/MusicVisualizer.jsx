import React from 'react';

export function MusicVisualizer({ isPlaying = false, barCount = 5, className = '' }) {
  const bars = Array.from({ length: barCount }, (_, i) => i + 1);

  return (
    <div className={`flex items-end gap-[2.5px] h-4 ${className}`} aria-hidden="true">
      {bars.map((bar) => {
        const animClass = isPlaying ? `animate-bar-${((bar - 1) % 5) + 1}` : '';
        return (
          <span
            key={bar}
            className={`w-[2.5px] rounded-full bg-gradient-to-t from-pink-500 to-amber-300 transition-all duration-300 ${animClass}`}
            style={{
              height: isPlaying ? undefined : '3px',
              opacity: isPlaying ? 0.95 : 0.4
            }}
          />
        );
      })}
    </div>
  );
}
