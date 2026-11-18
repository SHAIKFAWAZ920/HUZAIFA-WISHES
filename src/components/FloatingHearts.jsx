import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingHearts({ count = 8, active = true, origin = 'bottom' }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: ['❤️', '💖', '✨', '🌸', '💕', '🌹'][i % 6],
      left: `${15 + (i * 70) / count + (((i * 17) % 9) - 4)}%`,
      delay: (i * 0.25) % 2,
      size: 14 + (i % 3) * 6,
      duration: 3 + (i % 3) * 0.8
    }));
  }, [count]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{
              opacity: 0,
              y: origin === 'center' ? '50vh' : '100vh',
              x: 0,
              scale: 0.5
            }}
            animate={{
              opacity: [0, 0.85, 0.9, 0],
              y: '-10vh',
              x: [0, h.id % 2 === 0 ? 25 : -25, 0],
              scale: [0.5, 1.1, 0.9]
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: 'easeOut'
            }}
            style={{
              position: 'absolute',
              left: h.left,
              fontSize: `${h.size}px`,
              filter: 'drop-shadow(0 0 10px rgba(244,114,182,0.6))'
            }}
          >
            {h.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
