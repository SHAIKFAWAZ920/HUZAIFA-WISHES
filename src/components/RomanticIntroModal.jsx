import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Heart, Upload, AlertCircle } from 'lucide-react';

export function RomanticIntroModal({ isOpen, onOpenSurprise, isAudioAvailable = true, onLoadAudioFile, config }) {
  const fileInputRef = useRef(null);
  if (!isOpen) return null;

  const musicConfig = config.music || {};
  const intro = musicConfig.intro || {
    quote: "Some songs are not just songs... they remind us of someone special.",
    subtext: "Tonight, this little surprise comes with a special melody. ❤️",
    buttonText: "Open Your Surprise 🎁"
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onLoadAudioFile) {
      onLoadAudioFile(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Ambient background romantic lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-rose-500/20 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-amber-500/15 blur-[100px] pointer-events-none" />

      {/* Main Glassmorphic Romantic Invitation Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        className="relative max-w-sm sm:max-w-md w-full rounded-3xl border border-pink-500/30 bg-gradient-to-b from-stone-900/90 via-neutral-950/95 to-black/95 p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(244,114,182,0.25)] overflow-hidden"
      >
        <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full border border-pink-500/10 bg-pink-500/5 blur-sm pointer-events-none" />

        {/* Music disc icon badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, delay: 0.3 }}
          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500/20 via-rose-500/30 to-amber-400/20 border border-pink-400/40 shadow-[0_0_20px_rgba(244,114,182,0.4)]"
        >
          <Music className="h-6 w-6 text-pink-300 animate-pulse" />
        </motion.div>

        {/* Personalized subtitle */}
        <p className="font-serif-cormorant italic text-xs sm:text-sm text-pink-300/80 tracking-widest uppercase mb-2">
          For {config.name} • With Love by {config.sender}
        </p>

        {/* Main Romantic Quote */}
        <h2 className="font-serif-cormorant italic text-xl sm:text-2xl text-amber-100 font-medium leading-relaxed drop-shadow-sm px-2">
          &ldquo;{intro.quote}&rdquo;
        </h2>

        {/* Divider Flourish */}
        <div className="my-4 flex items-center justify-center gap-2 text-pink-400/50">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-pink-400/40" />
          <Heart className="h-3.5 w-3.5 fill-pink-400/50 text-pink-400/50" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-pink-400/40" />
        </div>

        {/* Subtext */}
        <p className="font-serif-cormorant text-base sm:text-lg text-rose-200/90 leading-snug px-3">
          {intro.subtext}
        </p>

        {/* Song Feature Tag */}
        <div className="my-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-white/5 px-3.5 py-1 text-xs text-amber-200/80 font-sans-poppins">
          <Sparkles className="h-3 w-3 text-amber-300" />
          <span>PK • &ldquo;{musicConfig.title || 'Love Is a Waste of Time'}&rdquo;</span>
        </div>

        {/* Audio Missing Helper Box */}
        {!isAudioAvailable && (
          <div className="mb-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-2.5 text-left text-xs">
            <div className="flex items-start gap-2 text-amber-200">
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-amber-400 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-300">Audio file not found in public/music/</p>
                <p className="text-[11px] text-amber-200/80 mt-0.5">
                  You can select the MP3 from your device right now:
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-pink-500/30 hover:bg-pink-500/50 border border-pink-400/50 px-3 py-1 font-sans-poppins text-xs font-medium text-pink-100 transition-colors cursor-pointer"
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>Choose MP3 File</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Opening Surprise Button */}
        <div>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(244,114,182,0.6)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenSurprise}
            className="w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 py-3.5 px-6 font-sans-poppins text-sm sm:text-base font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{intro.buttonText}</span>
          </motion.button>
        </div>

        <p className="mt-3 text-[11px] text-white/40 font-sans-poppins">
          Headphones or sound recommended for the full experience 🎧
        </p>
      </motion.div>
    </motion.div>
  );
}
