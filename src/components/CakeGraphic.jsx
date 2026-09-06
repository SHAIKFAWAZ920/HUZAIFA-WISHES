import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CakeGraphic({ isBlownOut, onBlowCandle }) {
  // Layer spring drop animation preset
  const dropTransition = (delay) => ({
    type: 'spring',
    stiffness: 120,
    damping: 12,
    delay: delay
  });

  return (
    <div
      className="relative flex flex-col items-center select-none cursor-pointer"
      onClick={onBlowCandle}
    >
      <div
        style={{ width: '260px', height: '200px', maxWidth: '100%' }}
        className="relative flex justify-center items-end"
      >
        <svg
          viewBox="0 0 200 160"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
          className="drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
        >
          {/* Layer 0: Cake Stand / Golden Plate */}
          <motion.g
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={dropTransition(0.1)}
          >
            <ellipse cx="100" cy="142" rx="90" ry="12" fill="#fbbf24" stroke="#d97706" strokeWidth="2.5" />
            <path d="M 60,142 L 75,156 L 125,156 L 140,142 Z" fill="#d97706" />
          </motion.g>

          {/* Layer 1: Bottom Cake Tier */}
          <motion.g
            initial={{ y: -250, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={dropTransition(0.35)}
          >
            <rect x="25" y="100" width="150" height="40" rx="8" fill="#e11d48" />
            <rect x="25" y="125" width="150" height="6" fill="#be123c" />
            {/* White Cream Fill */}
            <path d="M 25,100 Q 40,112 55,100 Q 70,112 85,100 Q 100,112 115,100 Q 130,112 145,100 Q 160,112 175,100 L 175,96 L 25,96 Z" fill="#ffffff" />
          </motion.g>

          {/* Layer 2: Middle Cake Tier */}
          <motion.g
            initial={{ y: -280, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={dropTransition(0.6)}
          >
            <rect x="40" y="65" width="120" height="35" rx="7" fill="#f472b6" />
            <rect x="40" y="86" width="120" height="5" fill="#db2777" />
            {/* Cream Fill */}
            <path d="M 40,65 Q 55,75 70,65 Q 85,75 100,65 Q 115,75 130,65 Q 145,75 160,65 L 160,61 L 40,61 Z" fill="#fff1f2" />
          </motion.g>

          {/* Layer 3: Top Cake Tier */}
          <motion.g
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={dropTransition(0.85)}
          >
            <rect x="58" y="32" width="84" height="33" rx="6" fill="#fb7185" />
            {/* Dripping Icing */}
            <path d="M 58,32 Q 68,46 78,32 Q 88,48 98,32 Q 108,46 118,32 Q 128,48 142,32 L 142,28 Q 142,24 138,24 L 62,24 Q 58,24 58,28 Z" fill="#ffffff" />
            {/* Sugar Sprinkles */}
            <circle cx="70" cy="52" r="2.5" fill="#fde047" />
            <circle cx="95" cy="56" r="2.5" fill="#38bdf8" />
            <circle cx="120" cy="50" r="2.5" fill="#4ade80" />
          </motion.g>

          {/* Layer 4: Candle & Flame */}
          <motion.g
            initial={{ y: -320, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={dropTransition(1.1)}
          >
            {/* Candle Stick */}
            <rect x="96" y="8" width="8" height="18" rx="2" fill="url(#candleGradient)" stroke="#fde68a" strokeWidth="1" />
            <defs>
              <linearGradient id="candleGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Candle Wick */}
            <line x1="100" y1="8" x2="100" y2="4" stroke="#451a03" strokeWidth="1.5" />

            {/* Candle Flame (Flickering when lit, blows out when clicked) */}
            <AnimatePresence>
              {!isBlownOut ? (
                <motion.g
                  key="flame"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0.9, 1.15, 0.95, 1.05] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{
                    scale: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' },
                    exit: { duration: 0.3 }
                  }}
                  style={{ transformOrigin: '100px 2px' }}
                >
                  {/* Outer Flame Glow */}
                  <circle cx="100" cy="2" r="14" fill="rgba(251, 191, 36, 0.4)" className="animate-pulse" />
                  {/* Outer Flame */}
                  <path d="M 100,-8 Q 106,-1 100,5 Q 94,-1 100,-8 Z" fill="#f59e0b" />
                  {/* Inner Flame Core */}
                  <path d="M 100,-5 Q 103,-1 100,3 Q 97,-1 100,-5 Z" fill="#fef08a" />
                </motion.g>
              ) : null}
            </AnimatePresence>

            {/* Smoke Wisps (Appears when blown out) */}
            {isBlownOut && (
              <motion.g
                key="smoke"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 0.8, 0], y: [-5, -25, -45], x: [0, 6, -6] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <circle cx="100" cy="0" r="3" fill="rgba(209, 213, 219, 0.7)" />
                <circle cx="103" cy="-10" r="4" fill="rgba(209, 213, 219, 0.5)" />
                <circle cx="97" cy="-22" r="5" fill="rgba(209, 213, 219, 0.3)" />
              </motion.g>
            )}
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
