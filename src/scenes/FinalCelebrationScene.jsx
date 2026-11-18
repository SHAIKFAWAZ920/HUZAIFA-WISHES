import React from 'react';
import { motion } from 'framer-motion';
import { ParticleSystem } from '../components/ParticleSystem';
import { FloatingHearts } from '../components/FloatingHearts';
import { Music, Sparkles } from 'lucide-react';

export function FinalCelebrationScene({ onRestart, config }) {
  const reflection =
    config.final?.romanticReflection ||
    config.music?.quotes?.scene8 ||
    "Some moments become memories. Some songs become feelings. And some people make life more beautiful just by being in it.";

  const finalGreeting = config.final?.finalGreeting || `Happy Birthday, ${config.name}! ❤️`;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#2b1029] via-[#1e0a1d] to-[#120412] py-8 px-5 overflow-hidden select-none">
      {/* Fireworks & Confetti Particle System */}
      <ParticleSystem type="fireworks" />

      {/* Floating Celebration Hearts */}
      <FloatingHearts count={8} active={true} origin="bottom" />

      {/* Main Climax Typography */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 flex flex-col items-center justify-center my-auto text-center max-w-sm sm:max-w-md px-2"
      >
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-playfair text-3xl sm:text-5xl font-bold tracking-tight text-amber-50 leading-none drop-shadow-xl"
        >
          {config.final.mainTitle}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-script-vibes text-5xl sm:text-7xl text-amber-300 drop-shadow-[0_4px_15px_rgba(245,158,11,0.6)] my-1"
        >
          {config.final.name}
        </motion.h2>

        {/* Romantic Musical Reflection Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.6 }}
          className="my-3 rounded-2xl border border-pink-400/30 bg-black/40 backdrop-blur-md px-4 py-3 shadow-[0_0_25px_rgba(244,114,182,0.25)]"
        >
          <div className="flex items-center justify-center gap-1.5 text-pink-300 text-[11px] mb-1">
            <Music className="h-3 w-3 animate-pulse" />
            <span className="font-serif-cormorant italic">PK • Love Is a Waste of Time</span>
            <Sparkles className="h-3 w-3 text-amber-300" />
          </div>
          <p className="font-serif-cormorant italic text-sm sm:text-base text-amber-100 font-medium leading-relaxed">
            &ldquo;{reflection}&rdquo;
          </p>
          <p className="mt-2 font-serif-cormorant font-bold text-base sm:text-lg text-rose-300">
            {finalGreeting}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-1 font-sans-poppins text-xs sm:text-sm text-amber-100/90 tracking-wide"
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
          className="flex items-center gap-2 rounded-full border border-amber-300/40 bg-white/10 backdrop-blur-md px-6 py-2.5 text-xs sm:text-sm font-semibold text-amber-100 shadow-2xl transition-transform active:scale-95 hover:bg-white/20 font-sans-poppins cursor-pointer"
        >
          {config.final.replayButton}
        </button>
      </motion.div>
    </div>
  );
}
