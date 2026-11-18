import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleSystem } from '../components/ParticleSystem';
import { EnvelopeGraphic } from '../components/EnvelopeGraphic';
import { Music, Sparkles } from 'lucide-react';

export function EnvelopeScene({ onNext, config }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      onNext();
    }, 1800);
  };

  const romanticNote =
    config.envelope?.romanticNote ||
    config.music?.quotes?.scene6 ||
    "A little melody, a little magic, and a whole lot of wishes for someone special.";

  return (
    <div
      onClick={handleOpen}
      className="relative flex h-full w-full cursor-pointer flex-col items-center justify-between bg-gradient-to-b from-[#2b1029] via-[#1e0a1d] to-[#120412] py-8 px-5 overflow-hidden select-none"
    >
      <ParticleSystem type="stars" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center mt-3"
      >
        <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-amber-100">
          {config.envelope.topTitle}
        </h2>
        <p className="font-sans-poppins text-xs text-amber-100/70 mt-1">
          {config.envelope.subtitle}
        </p>
      </motion.div>

      {/* 3D Interactive Paper Envelope */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="z-10 relative flex flex-col items-center justify-center my-auto"
      >
        <EnvelopeGraphic
          isOpen={isOpen}
          sealInitial={config.envelope.sealInitial}
          letterGreeting={config.letter.greeting}
          letterBody={config.letter.body}
        />

        {/* Revealed Romantic Melody Note on Open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-xs rounded-2xl border border-pink-400/40 bg-black/60 backdrop-blur-md px-4 py-2.5 text-center shadow-[0_0_25px_rgba(244,114,182,0.3)]"
            >
              <div className="flex items-center justify-center gap-1.5 text-pink-300 text-xs mb-1">
                <Music className="h-3 w-3 animate-pulse" />
                <span className="font-serif-cormorant italic">Love Is a Waste of Time</span>
                <Sparkles className="h-3 w-3 text-amber-300" />
              </div>
              <p className="font-serif-cormorant italic text-xs sm:text-sm text-amber-100 leading-snug">
                &ldquo;{romanticNote}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="z-10 text-xs text-amber-100/70 font-sans-poppins tracking-wider mb-2"
      >
        {isOpen ? 'Opening your letter...' : config.envelope.tapInstruction}
      </motion.p>
    </div>
  );
}
