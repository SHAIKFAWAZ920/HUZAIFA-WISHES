import React from 'react';
import { motion } from 'framer-motion';

export function ParchmentLetter({ letterConfig }) {
  const paragraphs = letterConfig.paragraphs || [letterConfig.body];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="z-10 relative my-auto w-full max-w-sm sm:max-w-md rounded-2xl bg-[#faf6ee] p-5 sm:p-7 shadow-2xl border border-stone-300/80 text-stone-800 space-y-3 max-h-[78vh] overflow-y-auto"
    >
      {/* Letter Greeting */}
      <p className="font-script-dancing text-xl sm:text-2xl text-rose-900 font-bold">
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
  );
}
