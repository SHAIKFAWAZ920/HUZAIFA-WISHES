import React from 'react';
import { motion } from 'framer-motion';

export function ReasonCard({ number, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="glass-card-gold rounded-xl p-3 sm:p-4 text-left border border-amber-400/30 shadow-lg"
    >
      <span className="inline-block rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-semibold text-amber-200 tracking-wider font-sans-poppins uppercase">
        {number}
      </span>
      <p className="mt-1 font-serif-cormorant text-base sm:text-lg text-amber-50 font-medium">
        {text}
      </p>
    </motion.div>
  );
}
