import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParticleSystem } from '../components/ParticleSystem';
import { PolaroidCard } from '../components/PolaroidCard';

export function MemoryLaneScene({ onNext, config }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = config.memories.photos;

  const handleNextPhoto = () => {
    if (activeIndex < photos.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePrevPhoto = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#2b1029] via-[#1e0a1d] to-[#120412] py-6 px-4 overflow-hidden select-none">
      <ParticleSystem type="stars" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center mt-1"
      >
        <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-amber-100">
          {config.memories.topTitle}
        </h2>
        <p className="font-sans-poppins text-xs text-amber-100/70 mt-1">
          {config.memories.subtitle}
        </p>
      </motion.div>

      {/* Hanging Clothespin String Decoration */}
      <div className="absolute top-24 left-0 right-0 z-10 flex justify-center">
        <svg viewBox="0 0 400 30" className="w-full max-w-xs sm:max-w-sm h-6 stroke-amber-200/40 fill-none">
          <path d="M 0,5 Q 200,25 400,5" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Swiping Polaroid Photos Carousel */}
      <div className="z-10 relative my-auto flex h-[340px] w-full max-w-xs items-center justify-center">
        <AnimatePresence mode="wait">
          {photos.map((photo, idx) => {
            if (idx !== activeIndex) return null;
            return (
              <PolaroidCard
                key={photo.id}
                photo={photo}
                onNext={handleNextPhoto}
                onPrev={handlePrevPhoto}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination Dots & Navigation Action */}
      <div className="z-10 flex flex-col items-center space-y-3 mb-2">
        <div className="flex gap-1.5">
          {photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeIndex
                  ? 'w-5 bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                  : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNextPhoto}
          className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2 text-xs sm:text-sm font-semibold text-white shadow-xl transition-transform active:scale-95 hover:brightness-110 font-sans-poppins"
        >
          {activeIndex === photos.length - 1 ? config.memories.buttonText : "Next Photo ➔"}
        </button>
      </div>
    </div>
  );
}
