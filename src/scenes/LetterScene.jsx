import React from 'react';
import { motion } from 'framer-motion';
import { ParticleSystem } from '../components/ParticleSystem';
import { ParchmentLetter } from '../components/ParchmentLetter';
import { FloatingHearts } from '../components/FloatingHearts';

export function LetterScene({ onNext, config }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#2b1029] via-[#1e0a1d] to-[#120412] py-6 px-4 overflow-y-auto select-none">
      <ParticleSystem type="stars" />

      {/* Floating Rose Petals & Hearts for Romantic Atmosphere */}
      <FloatingHearts count={6} active={true} origin="bottom" />

      {/* Parchment Letter Paper Subcomponent with Music-Inspired Opening */}
      <ParchmentLetter
        letterConfig={config.letter}
        preludeQuote={config.letter.preludeQuote || config.music?.quotes?.scene7}
      />

      {/* Continue Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="z-10 my-3"
      >
        <button
          onClick={onNext}
          className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xl transition-transform active:scale-95 hover:brightness-110 font-sans-poppins cursor-pointer"
        >
          {config.letter.buttonText}
        </button>
      </motion.div>
    </div>
  );
}
