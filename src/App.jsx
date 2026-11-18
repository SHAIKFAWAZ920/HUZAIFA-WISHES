import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { birthdayConfig } from './config/birthdayConfig';
import { useSceneController } from './hooks/useSceneController';
import { useAudio } from './hooks/useAudio';

import { MusicPlayer } from './components/MusicPlayer';
import { RomanticIntroModal } from './components/RomanticIntroModal';
import { FloatingHearts } from './components/FloatingHearts';
import { SceneNavigator } from './components/SceneNavigator';

import { IntroScene } from './scenes/IntroScene';
import { BirthdayTitleScene } from './scenes/BirthdayTitleScene';
import { BirthdayTreeScene } from './scenes/BirthdayTreeScene';
import { CakeScene } from './scenes/CakeScene';
import { BalloonsScene } from './scenes/BalloonsScene';
import { EnvelopeScene } from './scenes/EnvelopeScene';
import { LetterScene } from './scenes/LetterScene';
import { FinalCelebrationScene } from './scenes/FinalCelebrationScene';

function App() {
  const { currentScene, nextScene, goToScene, resetAll, SCENES, SCENE_ORDER } = useSceneController();
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [introHearts, setIntroHearts] = useState(false);

  // Single persistent audio instance across the entire application lifecycle
  const {
    isPlaying,
    isMuted,
    currentTime,
    duration,
    progress,
    hasStarted,
    startMusic,
    togglePlay,
    toggleMute,
    seek,
    playPopSfx
  } = useAudio(birthdayConfig.audio.bgm);

  const handleOpenSurprise = () => {
    startMusic();
    setIntroHearts(true);
    setShowIntroModal(false);
    setTimeout(() => {
      setIntroHearts(false);
    }, 4000);
  };

  return (
    <div className="relative h-screen w-screen bg-gradient-to-br from-neutral-950 via-slate-900 to-neutral-950 overflow-hidden flex items-center justify-center p-0 sm:p-4">
      {/* Romantic Music Introduction Modal */}
      <AnimatePresence>
        {showIntroModal && (
          <RomanticIntroModal
            isOpen={showIntroModal}
            onOpenSurprise={handleOpenSurprise}
            config={birthdayConfig}
          />
        )}
      </AnimatePresence>

      {/* Floating Glowing Hearts upon opening surprise */}
      <AnimatePresence>
        {introHearts && <FloatingHearts count={12} active={true} origin="center" />}
      </AnimatePresence>

      {/* Scene Quick Selector Dropdown (Top-Left) */}
      <SceneNavigator
        currentScene={currentScene}
        onSelectScene={goToScene}
        scenesOrder={SCENE_ORDER}
      />

      {/* Premium Floating Music Player (Bottom-Right Corner) */}
      <AnimatePresence>
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MusicPlayer
              isPlaying={isPlaying}
              isMuted={isMuted}
              currentTime={currentTime}
              duration={duration}
              progress={progress}
              onTogglePlay={togglePlay}
              onToggleMute={toggleMute}
              onSeek={seek}
              songConfig={birthdayConfig.music}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Responsive Viewport Container */}
      <main className="relative h-full w-full sm:h-[92vh] sm:max-w-md md:max-w-lg mx-auto overflow-hidden bg-black sm:rounded-3xl sm:border sm:border-white/15 sm:shadow-[0_0_60px_rgba(0,0,0,0.9)]">
        <AnimatePresence mode="wait">
          {currentScene === SCENES.INTRO && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <IntroScene onNext={nextScene} config={birthdayConfig} />
            </motion.div>
          )}

          {currentScene === SCENES.TITLE && (
            <motion.div
              key="title"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <BirthdayTitleScene onNext={nextScene} config={birthdayConfig} />
            </motion.div>
          )}

          {currentScene === SCENES.TREE && (
            <motion.div
              key="tree"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <BirthdayTreeScene onNext={nextScene} config={birthdayConfig} />
            </motion.div>
          )}

          {currentScene === SCENES.CAKE && (
            <motion.div
              key="cake"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <CakeScene onNext={nextScene} config={birthdayConfig} />
            </motion.div>
          )}

          {currentScene === SCENES.BALLOONS && (
            <motion.div
              key="balloons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <BalloonsScene
                onNext={nextScene}
                config={birthdayConfig}
                playPopSfx={playPopSfx}
              />
            </motion.div>
          )}

          {currentScene === SCENES.ENVELOPE && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <EnvelopeScene onNext={nextScene} config={birthdayConfig} />
            </motion.div>
          )}

          {currentScene === SCENES.LETTER && (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <LetterScene onNext={nextScene} config={birthdayConfig} />
            </motion.div>
          )}

          {currentScene === SCENES.FINAL && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="h-full w-full"
            >
              <FinalCelebrationScene onRestart={resetAll} config={birthdayConfig} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
