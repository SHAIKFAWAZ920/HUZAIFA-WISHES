import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BirthdayTree } from '../birthday-tree/BirthdayTree';
import { FloatingHearts } from '../components/FloatingHearts';

export function BirthdayTreeScene({ onNext, config }) {
  const [blossomed, setBlossomed] = useState(false);

  const handleGrowthComplete = useCallback(() => {
    setBlossomed(true);
  }, []);

  useEffect(() => {
    // Tree starts blossoming around 2.6s into the animation
    const timer = setTimeout(() => {
      setBlossomed(true);
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={onNext}
      className="relative flex h-full w-full cursor-pointer flex-col bg-[#f7f4ee] overflow-hidden select-none"
    >
      {/* Background Soft Atmospheric Glow */}
      <div className="absolute top-10 right-10 h-[280px] w-[280px] rounded-full bg-pink-200/50 blur-3xl pointer-events-none" />

      {/* Floating hearts & blossom petals when tree blooms */}
      <AnimatePresence>
        {blossomed && (
          <FloatingHearts count={7} active={true} origin="bottom" />
        )}
      </AnimatePresence>

      {/* Growing Tree Component Container */}
      <div className="absolute inset-0 z-0">
        <BirthdayTree onGrowthComplete={handleGrowthComplete} />
      </div>

      {/* Overlay Text Content - Scoped to left side (48% width) */}
      <div className="relative z-10 flex h-full w-full flex-col justify-center px-4 sm:px-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-[48%] max-w-[210px] sm:max-w-[250px] space-y-1"
        >
          <p className="font-serif-cormorant italic text-xs sm:text-base text-stone-700 leading-snug">
            {config.tree.topText}
          </p>

          <h2 className="font-script-vibes text-2xl sm:text-4xl text-rose-800 leading-tight drop-shadow-[0_1px_4px_rgba(255,255,255,0.9)]">
            Happy<br />Birthday,
          </h2>

          <h1 className="font-script-vibes text-4xl sm:text-6xl text-rose-900 font-bold leading-none pb-1 drop-shadow-[0_2px_6px_rgba(255,255,255,0.9)]">
            {config.tree.name}
          </h1>

          <p className="font-serif-cormorant italic text-xs sm:text-sm text-stone-700 pt-1 leading-snug">
            {config.tree.subtitle}
          </p>

          {/* Subtle romantic melody note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-[10px] text-pink-700/70 font-serif-cormorant italic pt-2"
          >
            ♪ Love Is a Waste of Time • PK
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Tap Instruction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-xs text-stone-500 font-sans-poppins tracking-wider"
      >
        {config.tree.tapInstruction}
      </motion.p>
    </div>
  );
}
