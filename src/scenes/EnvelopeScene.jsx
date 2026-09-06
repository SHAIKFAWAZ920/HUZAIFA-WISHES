import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleSystem } from '../components/ParticleSystem';
import { EnvelopeGraphic } from '../components/EnvelopeGraphic';

export function EnvelopeScene({ onNext, config }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => {
      onNext();
    }, 1200);
  };

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
      </motion.div>

      {/* Bottom Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="z-10 text-xs text-amber-100/70 font-sans-poppins tracking-wider mb-2"
      >
        {config.envelope.tapInstruction}
      </motion.p>
    </div>
  );
}
