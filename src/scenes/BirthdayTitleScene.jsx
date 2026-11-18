import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles } from 'lucide-react';

export function BirthdayTitleScene({ onNext, config }) {
  useEffect(() => {
    // Auto transition to Tree scene after 4.5s or on tap
    const timer = setTimeout(() => {
      onNext();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onNext]);

  const romanticQuote =
    config.birthdayTitle?.romanticQuote ||
    config.music?.quotes?.scene2 ||
    "Love is a waste of time... until someone makes every moment worth remembering.";

  return (
    <div
      onClick={onNext}
      className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center bg-gradient-to-b from-[#c01c38] via-[#a3162e] to-[#7a0f20] px-6 text-center overflow-hidden select-none"
    >
      {/* Soft crimson radial highlight */}
      <div className="absolute h-[380px] w-[380px] rounded-full bg-red-400/25 blur-3xl pointer-events-none" />

      {/* Floating Music Indicator Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-5 z-20 flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-black/30 backdrop-blur-md px-3 py-1 text-[11px] text-amber-200/90 font-sans-poppins shadow-sm"
      >
        <Music className="h-3 w-3 text-pink-300 animate-pulse" />
        <span className="tracking-wide">PK • Love Is a Waste of Time</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center max-w-sm sm:max-w-md my-auto"
      >
        {/* Top Text */}
        <motion.p
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-cormorant italic text-base sm:text-lg text-amber-100/80 mb-2"
        >
          {config.birthdayTitle.topText}
        </motion.p>

        {/* Main HAPPY BIRTHDAY Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-serif-playfair text-4xl sm:text-6xl font-bold tracking-tight text-amber-50 leading-none drop-shadow-lg"
        >
          HAPPY<br />BIRTHDAY
        </motion.h1>

        {/* Golden Flourish Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="my-3.5 h-4 w-44 flex justify-center"
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
          transition={{ duration: 0.8, delay: 0.75 }}
          className="font-serif-cormorant italic text-base sm:text-lg text-amber-100/90 tracking-wide mb-3"
        >
          {config.birthdayTitle.subTitle}
        </motion.p>

        {/* Original Animated Romantic Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-2 rounded-2xl border border-amber-300/25 bg-black/25 backdrop-blur-sm px-4 py-2.5 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
        >
          <div className="flex items-center justify-center gap-1.5 text-amber-300/80 mb-1">
            <Sparkles className="h-3 w-3" />
            <span className="text-[10px] uppercase tracking-widest font-sans-poppins">A Melody For You</span>
            <Sparkles className="h-3 w-3" />
          </div>
          <p className="font-serif-cormorant italic text-sm sm:text-base text-amber-100 font-medium leading-relaxed">
            &ldquo;{romanticQuote}&rdquo;
          </p>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-5 text-xs text-amber-100/60 font-sans-poppins"
      >
        tap anywhere to continue
      </motion.p>
    </div>
  );
}
