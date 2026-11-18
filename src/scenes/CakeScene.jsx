import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleSystem } from '../components/ParticleSystem';
import { CakeGraphic } from '../components/CakeGraphic';
import { FloatingHearts } from '../components/FloatingHearts';

export function CakeScene({ onNext, config }) {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const audioCtxRef = useRef(null);

  const handleBlowCandle = (e) => {
    e.stopPropagation();
    if (isBlownOut) return;
    setIsBlownOut(true);

    // Audio SFX: Puff + Magical Chime via isolated Web Audio API
    // Does NOT pause or affect background song playback
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Soft puff sound
        const bufferSize = Math.floor(ctx.sampleRate * 0.2);
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
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
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
          oscGain.gain.setValueAtTime(0.09, ctx.currentTime + 0.08 + idx * 0.06);
          oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55 + idx * 0.06);
          osc.connect(oscGain);
          oscGain.connect(ctx.destination);
          osc.start(ctx.currentTime + 0.08 + idx * 0.06);
          osc.stop(ctx.currentTime + 0.6 + idx * 0.06);
        });
      }
    } catch {
      // Audio context fallback
    }
  };

  return (
    <div
      onClick={isBlownOut ? onNext : undefined}
      className="relative flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#2b1029] via-[#1e0a1d] to-[#120412] py-8 px-5 overflow-hidden select-none"
    >
      {/* Background Particle System: stars before blow out, fireworks after */}
      <ParticleSystem type={isBlownOut ? 'fireworks' : 'stars'} />

      {/* Floating hearts celebration when wish is made */}
      <AnimatePresence>
        {isBlownOut && (
          <FloatingHearts count={8} active={true} origin="center" />
        )}
      </AnimatePresence>

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
            <motion.p
              key="tapToBlow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="text-xs text-amber-200/70 font-sans-poppins tracking-wider"
            >
              Tap the flame or candle to blow it out 🕯️
            </motion.p>
          ) : (
            <motion.div
              key="continue"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <button
                onClick={onNext}
                className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xl transition-transform active:scale-95 hover:brightness-110 font-sans-poppins cursor-pointer"
              >
                Continue to Balloons 🎈
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
