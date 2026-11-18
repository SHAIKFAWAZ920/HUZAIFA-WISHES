import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BowAndArrow } from '../components/BowAndArrow';
import { FloatingHearts } from '../components/FloatingHearts';

export function IntroScene({ onNext, config }) {
  const [isShot, setIsShot] = useState(false);
  const [showHitHearts, setShowHitHearts] = useState(false);

  const handleTrigger = () => {
    if (isShot) return;
    setIsShot(true);
    setShowHitHearts(true);
    setTimeout(() => {
      onNext();
    }, 1100);
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between bg-[#f8f5ee] py-8 px-6 overflow-hidden select-none">
      {/* Soft atmospheric pink glow behind heart */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] rounded-full bg-pink-300/40 blur-3xl pointer-events-none" />

      {/* Floating Hearts effect upon arrow hit */}
      <AnimatePresence>
        {showHitHearts && (
          <FloatingHearts count={10} active={true} origin="center" />
        )}
      </AnimatePresence>

      {/* Top Header Copy */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 text-center mt-4"
      >
        <p className="font-serif-cormorant text-xl sm:text-2xl italic tracking-wide text-rose-950/80">
          {config.intro.topText}
        </p>
      </motion.div>

      {/* Center Pulsing Heart - Pops on arrow hit */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        onClick={handleTrigger}
        className="z-10 cursor-pointer flex flex-col items-center justify-center my-auto"
      >
        <div className="relative group">
          <motion.div
            animate={isShot ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : {}}
            transition={{ duration: 0.45, delay: 0.38 }}
            className="animate-heart-pulse text-6xl sm:text-7xl drop-shadow-[0_0_20px_rgba(244,114,182,0.8)]"
          >
            ❤️
          </motion.div>

          {/* Romantic hit glow ring */}
          {isShot && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.38 }}
              className="absolute inset-0 rounded-full border-2 border-pink-400 bg-pink-300/30 blur-sm pointer-events-none"
            />
          )}
        </div>
      </motion.div>

      {/* Bottom Interactive Bow & Arrow Control */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="z-30 self-center mb-6 flex flex-col items-center"
      >
        <BowAndArrow isShot={isShot} onReleaseArrow={handleTrigger} />
      </motion.div>

      {/* Subtle tap fallback trigger */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={handleTrigger}
        className="absolute bottom-3 right-5 text-xs text-rose-900/40 font-sans-poppins cursor-pointer z-10"
      >
        or tap anywhere
      </motion.p>
    </div>
  );
}
