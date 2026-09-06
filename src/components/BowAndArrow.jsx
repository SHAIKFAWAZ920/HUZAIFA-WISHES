import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function BowAndArrow({ isShot: isShotProp, onReleaseArrow }) {
  const [pullAmount, setPullAmount] = useState(0); // 0 to 60px
  const [isPulling, setIsPulling] = useState(false);
  const [internalShot, setInternalShot] = useState(false);
  const containerRef = useRef(null);

  const isShot = internalShot || isShotProp;

  const handlePointerDown = () => {
    if (isShot) return;
    setIsPulling(true);
  };

  const handlePointerMove = (e) => {
    if (!isPulling || isShot) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = rect.left + 30 - clientX;
    const dy = rect.top + 30 - clientY;
    const dist = Math.min(60, Math.max(0, Math.sqrt(dx * dx + dy * dy)));
    setPullAmount(dist);
  };

  const handlePointerUp = () => {
    if (!isPulling || isShot) return;
    setIsPulling(false);
    setInternalShot(true);
    if (onReleaseArrow) {
      onReleaseArrow();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center select-none cursor-pointer z-30"
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* Strict fixed dimensions box rotated at -62 degrees directly towards heart center */}
      <div
        style={{
          width: '112px',
          height: '112px',
          minWidth: '112px',
          minHeight: '112px',
          maxWidth: '112px',
          maxHeight: '112px',
          transform: 'rotate(-62deg)',
          transformOrigin: 'center'
        }}
        className="relative flex items-center justify-center overflow-visible z-30"
      >
        {/* Bow & Arrow SVG */}
        <svg
          viewBox="0 0 100 100"
          width="112"
          height="112"
          style={{ width: '112px', height: '112px', maxWidth: '100%', maxHeight: '100%', overflow: 'visible' }}
        >
          {/* Wooden Bow Arc */}
          <path
            d="M 25,15 Q 75,50 25,85"
            fill="none"
            stroke="#5c2d1b"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Bowstring */}
          <path
            d={`M 25,15 Q ${25 - (isShot ? 0 : pullAmount * 0.8)},${50} 25,85`}
            fill="none"
            stroke="#d1d5db"
            strokeWidth="1.5"
          />

          {/* Arrow stays 100% solid opacity during flight directly into heart center */}
          <motion.g
            animate={
              isShot
                ? { x: 340, y: 0, opacity: 1 }
                : { x: -pullAmount * 0.7, y: 0, opacity: 1 }
            }
            transition={isShot ? { duration: 0.4, ease: "easeOut" } : { duration: 0.1 }}
          >
            {/* Arrow shaft */}
            <line x1="15" y1="50" x2="65" y2="50" stroke="#f43f5e" strokeWidth="3" />
            {/* Arrow head */}
            <polygon points="65,44 77,50 65,56" fill="#ec4899" />
            {/* Arrow fletching */}
            <polygon points="12,45 18,50 12,55" fill="#e11d48" />
          </motion.g>
        </svg>
      </div>

      <p className="mt-2 text-[10px] tracking-widest text-rose-900/60 uppercase font-sans-poppins font-medium">
        PULL & RELEASE
      </p>
    </div>
  );
}
