import React from 'react';
import { motion } from 'framer-motion';

export function EnvelopeGraphic({ isOpen, sealInitial, letterGreeting, letterBody }) {
  return (
    <div
      style={{ width: '270px', height: '180px', maxWidth: '90vw' }}
      className="relative rounded-md bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 shadow-2xl border border-amber-300/40 overflow-hidden flex items-center justify-center"
    >
      {/* Envelope Bottom Flap triangular paths */}
      <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full">
        {/* Left triangle */}
        <polygon points="0,0 0,200 150,110" fill="rgba(245, 158, 11, 0.15)" />
        {/* Right triangle */}
        <polygon points="300,0 300,200 150,110" fill="rgba(245, 158, 11, 0.2)" />
        {/* Bottom triangle */}
        <polygon points="0,200 300,200 150,105" fill="rgba(251, 191, 36, 0.25)" />
      </svg>

      {/* Envelope Top Flap */}
      <motion.div
        animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformOrigin: 'top' }}
        className="absolute top-0 left-0 right-0 z-20 h-24 w-full bg-gradient-to-b from-amber-200 to-amber-300 origin-top shadow-md"
      >
        <svg viewBox="0 0 300 110" className="h-full w-full">
          <polygon points="0,0 300,0 150,110" fill="#fde68a" />
        </svg>
      </motion.div>

      {/* Golden Wax Seal */}
      <motion.div
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="z-30 h-12 w-12 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-lg border-2 border-amber-200"
      >
        <span className="font-serif-playfair text-xl font-bold text-amber-950">
          {sealInitial}
        </span>
      </motion.div>

      {/* Sliding Letter Preview Emerging from Envelope */}
      <motion.div
        animate={isOpen ? { y: -70, opacity: 1 } : { y: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute z-10 h-40 w-56 rounded bg-[#faf6ee] p-3.5 shadow-xl border border-stone-300"
      >
        <p className="font-script-dancing text-sm text-stone-800 font-bold">
          {letterGreeting}
        </p>
        <p className="font-script-dancing text-xs text-stone-600 mt-1 line-clamp-3">
          {letterBody}
        </p>
      </motion.div>
    </div>
  );
}
