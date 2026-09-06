import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleSystem } from '../components/ParticleSystem';
import { CakeGraphic } from '../components/CakeGraphic';

export function CakeScene({ onNext, config }) {
  const [isBlownOut, setIsBlownOut] = useState(false);

  const handleBlowCandle = (e) => {
    e.stopPropagation();
    if (isBlownOut) return;
    setIsBlownOut(true);

    // Audio SFX: Puff + Magical Chime
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        // Puff sound
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(350, ctx.currentTime);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();

        // Chime tones
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          oscGain.gain.setValueAtTime(0.12, ctx.currentTime + 0.1 + idx * 0.07);
          oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6 + idx * 0.07);
          osc.connect(oscGain);
          oscGain.connect(ctx.destination);
          osc.start(ctx.currentTime + 0.1 + idx * 0.07);
          osc.stop(ctx.currentTime + 0.7 + idx * 0.07);
        });
      }
    } catch {
      // Audio autoplay policy fallback
    }
  };

  return (
    <div
      onClick={isBlownOut ? onNext : undefined}
      className="relative flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#2b1029] via-[#1e0a1d] to-[#120412] py-8 px-5 overflow-hidden select-none"
    >
      {/* Background Particle System: stars before blow out, fireworks after */}
      <ParticleSystem type={isBlownOut ? 'fireworks' : 'stars'} />

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="z-10 text-center mt-3"
      >
        <p className="font-serif-cormorant text-xl sm:text-2xl text-amber-100/90 font-medium">
          {isBlownOut ? '✨ Your wish has been sent to the stars! ✨' : config.cake.topText}
        </p>
      </motion.div>

      {/* Center Cake & Candle */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        className="z-10 flex flex-col items-center justify-center my-auto"
      >
        <CakeGraphic isBlownOut={isBlownOut} onBlowCandle={handleBlowCandle} />

        {/* Happy Birthday Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 font-script-vibes text-4xl sm:text-5xl text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)] text-center"
        >
          {config.cake.title}
        </motion.h2>
      </motion.div>

      {/* Bottom Action / Instruction */}
      <div className="z-10 flex flex-col items-center mb-2">
        <AnimatePresence mode="wait">
          {!isBlownOut ? (
            <motion.div
              key="instruction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBlowCandle}
              className="cursor-pointer px-4 py-2 rounded-full bg-amber-500/20 border border-amber-400/30 backdrop-blur-sm shadow-lg hover:bg-amber-500/30 transition-all"
            >
              <p className="text-sm text-amber-200 font-sans-poppins tracking-wider animate-pulse text-center">
                🕯️ Touch / Blow the candle to extinguish flame & make a wish!
              </p>
            </motion.div>
          ) : (
            <motion.button
              key="next-btn"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              onClick={onNext}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-sans-poppins text-sm font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              Next: Reason Balloons 🎈 →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

