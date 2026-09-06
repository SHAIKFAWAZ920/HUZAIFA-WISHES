import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BalloonItem({ balloon, isPopped, onPop, index }) {
  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {!isPopped && (
          <motion.div
            initial={{ scale: 0, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: [1, 1.3, 0], opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => onPop(balloon.id)}
            className="cursor-pointer group animate-float-sway"
            style={{ animationDelay: `${index * 0.4}s` }}
          >
            {/* Balloon Body */}
            <div
              className={`h-14 w-12 sm:h-18 sm:w-15 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${balloon.color} shadow-lg transition-transform active:scale-90 flex items-start justify-end p-2`}
              style={{ boxShadow: `0 8px 20px ${balloon.shadow}` }}
            >
              {/* Specular reflection highlight */}
              <div className="h-3.5 w-1.5 rounded-full bg-white/40 rotate-[-30deg]" />
            </div>
            {/* Balloon Knot & String */}
            <div className="flex flex-col items-center">
              <div className="h-1.5 w-2 rounded-sm bg-rose-700" />
              <div className="h-8 w-0.5 bg-white/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
