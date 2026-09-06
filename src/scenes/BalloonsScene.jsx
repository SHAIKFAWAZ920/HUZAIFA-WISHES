import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleSystem } from '../components/ParticleSystem';
import { BalloonItem } from '../components/BalloonItem';
import { ReasonCard } from '../components/ReasonCard';

export function BalloonsScene({ onNext, config, playPopSfx }) {
  const [poppedIds, setPoppedIds] = useState([]);
  const balloons = config.balloons.items;

  const handlePop = (id) => {
    if (poppedIds.includes(id)) return;
    if (playPopSfx) playPopSfx();
    setPoppedIds((prev) => [...prev, id]);
  };

  const allPopped = poppedIds.length === balloons.length;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#2b1029] via-[#1e0a1d] to-[#120412] py-6 px-4 overflow-y-auto select-none">
      <ParticleSystem type="stars" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center mt-1"
      >
        <h2 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-amber-100">
          {config.balloons.topTitle}
        </h2>
        <p className="font-sans-poppins text-xs text-amber-100/70 max-w-xs mx-auto mt-1">
          {config.balloons.subtitle}
        </p>
      </motion.div>

      {/* Floating Balloons Grid */}
      <div className="z-10 my-3 flex w-full max-w-sm items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {balloons.map((balloon, idx) => (
          <BalloonItem
            key={balloon.id}
            balloon={balloon}
            isPopped={poppedIds.includes(balloon.id)}
            onPop={handlePop}
            index={idx}
          />
        ))}
      </div>

      {/* Revealed Reasons Cards List */}
      <div className="z-10 w-full max-w-sm space-y-2.5 px-1">
        {balloons.map((b) => {
          if (!poppedIds.includes(b.id)) return null;
          return <ReasonCard key={b.id} number={b.number} text={b.text} />;
        })}
      </div>

      {/* Footer / Next Button */}
      <div className="z-10 mt-4 mb-2 text-center">
        {allPopped ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            <p className="font-serif-cormorant italic text-xs text-amber-200/80 mb-2">
              {config.balloons.footerSubtext}
            </p>
            <button
              onClick={onNext}
              className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-lg transition-transform active:scale-95 hover:brightness-110 font-sans-poppins"
            >
              Next: Sealed Envelope ✨
            </button>
          </motion.div>
        ) : (
          <p className="text-xs text-amber-100/40 font-sans-poppins">
            Pop all balloons to reveal all reasons ({poppedIds.length}/{balloons.length})
          </p>
        )}
      </div>
    </div>
  );
}
