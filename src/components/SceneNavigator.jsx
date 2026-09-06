import React, { useState } from 'react';
import { Sparkles, Layers, ChevronRight } from 'lucide-react';

export function SceneNavigator({ currentScene, onSelectScene, scenesOrder }) {
  const [isOpen, setIsOpen] = useState(false);

  const sceneLabels = {
    intro: "1. Bow & Arrow",
    title: "2. Make a Wish",
    tree: "3. Growing Tree",
    cake: "4. Birthday Cake",
    balloons: "5. Reason Balloons",
    envelope: "6. Sealed Envelope",
    letter: "7. Heartfelt Letter",
    final: "8. Grand Celebration"
  };

  const currentIndex = scenesOrder.indexOf(currentScene);

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2 select-none">
      {/* Menu Toggle Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2 text-xs font-semibold text-white shadow-lg transition-transform active:scale-95 hover:bg-white/20 font-sans-poppins"
      >
        <Layers className="h-3.5 w-3.5 text-amber-300" />
        <span>Templates ({currentIndex + 1}/{scenesOrder.length})</span>
      </button>

      {/* Dropdown Scene Selector Menu */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-52 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/20 p-2 shadow-2xl space-y-1 text-white font-sans-poppins text-xs z-50">
          <div className="px-2.5 py-1 text-[10px] font-semibold text-amber-200 uppercase tracking-wider flex items-center justify-between">
            <span>Select Template Scene</span>
            <Sparkles className="h-3 w-3 text-amber-300" />
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
            {scenesOrder.map((sceneKey) => {
              const isActive = currentScene === sceneKey;
              return (
                <button
                  key={sceneKey}
                  onClick={() => {
                    onSelectScene(sceneKey);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow'
                      : 'hover:bg-white/10 text-white/80'
                  }`}
                >
                  <span>{sceneLabels[sceneKey] || sceneKey}</span>
                  {isActive && <ChevronRight className="h-3 w-3 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
