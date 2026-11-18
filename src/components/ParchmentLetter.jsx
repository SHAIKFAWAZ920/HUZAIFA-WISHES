import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music } from 'lucide-react';

export function ParchmentLetter({ letterConfig, preludeQuote }) {
  const paragraphs = letterConfig.paragraphs || [letterConfig.body];
  const quote =
    preludeQuote ||
    letterConfig.preludeQuote ||
    "Maybe love is a waste of time for some... but making someone smile is always worth it.";

  return (
    <div className="z-10 w-full max-w-sm sm:max-w-md my-auto flex flex-col items-center space-y-3">
      {/* Music-inspired Romantic Prelude Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full rounded-2xl border border-amber-300/30 bg-gradient-to-r from-stone-900/90 via-black/85 to-stone-900/90 backdrop-blur-md p-3.5 text-center shadow-[0_0_25px_rgba(245,158,11,0.2)]"
      >
        <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs mb-1">
          <Music className="h-3 w-3 text-pink-400 animate-pulse" />
          <span className="font-serif-cormorant italic uppercase tracking-wider text-[11px] text-pink-200">
            A Melody For You • PK
          </span>
          <Sparkles className="h-3 w-3 text-amber-300" />
        </div>
        <p className="font-serif-cormorant italic text-sm sm:text-base text-amber-100 font-medium leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </motion.div>

      {/* Main Parchment Letter Paper Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.2, ease: 'easeOut' }}
        className="relative w-full rounded-2xl bg-[#faf6ee] p-5 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.2)] border border-stone-300/80 text-stone-800 space-y-3 max-h-[64vh] overflow-y-auto"
      >
        {/* Soft golden parchment lighting overlay */}
        <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-amber-300/20 blur-2xl" />

        {/* Letter Greeting */}
        <p className="font-script-dancing text-2xl sm:text-3xl text-rose-900 font-bold">
          {letterConfig.greeting}
        </p>

        {/* Paragraphs */}
        <div className="space-y-2.5 font-script-dancing text-base sm:text-lg text-stone-750 leading-relaxed font-medium">
          {paragraphs.map((text, idx) => (
            <p key={idx}>{text}</p>
          ))}
        </div>

        {/* Valediction & Signature */}
        <div className="pt-3 text-right">
          <p className="font-script-dancing text-base text-stone-600">
            {letterConfig.valediction}
          </p>
          <p className="font-script-dancing text-lg sm:text-xl text-rose-900 font-bold mt-0.5">
            {letterConfig.signature}
          </p>
          {letterConfig.subSignature && (
            <p className="font-script-dancing text-xl sm:text-2xl text-rose-900 font-bold mt-0.5">
              {letterConfig.subSignature}
            </p>
          )}
        </div>

        {/* Wax Stamp Decorative Sticker */}
        <div className="absolute bottom-3 right-3 h-7 w-7 rounded-full bg-amber-400/80 flex items-center justify-center shadow pointer-events-none">
          <span className="text-xs">🎂</span>
        </div>
      </motion.div>
    </div>
  );
}
