import React from 'react';
import { motion } from 'framer-motion';
import { ParticleSystem } from '../components/ParticleSystem';

export function FinalCelebrationScene({ onRestart, config }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#2b1029] via-[#1e0a1d] to-[#120412] py-8 px-5 overflow-hidden select-none">
      {/* Fireworks & Confetti Particle System */}
      <ParticleSystem type="fireworks" />

      {/* Main Climax Typography */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center justify-center my-auto text-center max-w-sm sm:max-w-md"
      >
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-playfair text-4xl sm:text-6xl font-bold tracking-tight text-amber-50 leading-none drop-shadow-xl"
        >
          {config.final.mainTitle}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-script-vibes text-5xl sm:text-7xl text-amber-300 drop-shadow-[0_4px_15px_rgba(245,158,11,0.6)] my-2"
        >
          {config.final.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-3 font-sans-poppins text-xs sm:text-sm text-amber-100/90 tracking-wide"
        >
          {config.final.credit}
        </motion.p>
      </motion.div>

      {/* Replay Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="z-10 mb-4"
      >
        <button
          onClick={onRestart}
          className="flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/10 backdrop-blur-md px-6 py-2.5 text-xs sm:text-sm font-semibold text-amber-100 shadow-2xl transition-transform active:scale-95 hover:bg-white/20 font-sans-poppins"
        >
          {config.final.replayButton}
        </button>
      </motion.div>
    </div>
  );
}
