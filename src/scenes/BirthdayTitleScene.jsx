import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export function BirthdayTitleScene({ onNext, config }) {
  useEffect(() => {
    // Auto transition to Tree scene after 3.2s or on tap
    const timer = setTimeout(() => {
      onNext();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div
      onClick={onNext}
      className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center bg-gradient-to-b from-[#c01c38] via-[#a3162e] to-[#7a0f20] px-6 text-center overflow-hidden select-none"
    >
      {/* Soft crimson radial highlight */}
      <div className="absolute h-[350px] w-[350px] rounded-full bg-red-400/20 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center max-w-sm sm:max-w-md"
      >
        {/* Top Text */}
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-cormorant italic text-lg sm:text-xl text-amber-100/80 mb-3"
        >
          {config.birthdayTitle.topText}
        </motion.p>

        {/* Main HAPPY BIRTHDAY Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif-playfair text-4xl sm:text-6xl font-bold tracking-tight text-amber-50 leading-none drop-shadow-lg"
        >
          HAPPY<br />BIRTHDAY
        </motion.h1>

        {/* Golden Flourish Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="my-5 h-5 w-48 flex justify-center"
        >
          <svg viewBox="0 0 200 30" className="h-full w-full stroke-amber-300 fill-none">
            <path
              d="M 10,15 Q 100,28 190,15 M 40,15 Q 100,2 160,15"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-serif-cormorant italic text-base sm:text-lg text-amber-100/90 tracking-wide"
        >
          {config.birthdayTitle.subTitle}
        </motion.p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-5 text-xs text-amber-100/60 font-sans-poppins"
      >
        tap anywhere to skip
      </motion.p>
    </div>
  );
}
