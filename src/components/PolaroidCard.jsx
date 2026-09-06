import React from 'react';
import { motion } from 'framer-motion';

export function PolaroidCard({ photo, onNext, onPrev }) {
  return (
    <motion.div
      key={photo.id}
      initial={{ opacity: 0, scale: 0.85, rotate: photo.rotation * 2 }}
      animate={{ opacity: 1, scale: 1, rotate: photo.rotation }}
      exit={{ opacity: 0, scale: 0.85, rotate: -photo.rotation * 2 }}
      transition={{ duration: 0.4 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x < -40) onNext();
        if (info.offset.x > 40) onPrev();
      }}
      className="relative flex flex-col items-center bg-stone-100 p-3 pb-5 rounded-sm shadow-2xl border border-stone-300 w-64 sm:w-72 cursor-grab active:cursor-grabbing max-h-full"
    >
      {/* Wooden Clothespin on top */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 h-5 w-2.5 bg-amber-400 rounded-sm shadow border border-amber-600" />

      {/* Photo Frame */}
      <div className="h-56 sm:h-64 w-full overflow-hidden bg-stone-900 rounded-sm">
        <img
          src={photo.image}
          alt={photo.caption}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Handwritten Caption at bottom */}
      <p className="mt-3 font-script-dancing text-lg sm:text-xl text-stone-800 text-center font-bold">
        {photo.caption}
      </p>
    </motion.div>
  );
}
