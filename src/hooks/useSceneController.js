import { useState, useCallback } from 'react';

export const SCENES = {
  INTRO: 'intro',
  TITLE: 'title',
  TREE: 'tree',
  CAKE: 'cake',
  BALLOONS: 'balloons',
  ENVELOPE: 'envelope',
  LETTER: 'letter',
  FINAL: 'final'
};

const SCENE_ORDER = [
  SCENES.INTRO,
  SCENES.TITLE,
  SCENES.TREE,
  SCENES.CAKE,
  SCENES.BALLOONS,
  SCENES.ENVELOPE,
  SCENES.LETTER,
  SCENES.FINAL
];

export function useSceneController(initialScene = SCENES.INTRO) {
  const [currentScene, setCurrentScene] = useState(initialScene);

  const goToScene = useCallback((sceneName) => {
    if (Object.values(SCENES).includes(sceneName)) {
      setCurrentScene(sceneName);
    }
  }, []);

  const nextScene = useCallback(() => {
    setCurrentScene((prev) => {
      const idx = SCENE_ORDER.indexOf(prev);
      if (idx !== -1 && idx < SCENE_ORDER.length - 1) {
        return SCENE_ORDER[idx + 1];
      }
      return prev;
    });
  }, []);

  const resetAll = useCallback(() => {
    setCurrentScene(SCENES.INTRO);
  }, []);

  return {
    currentScene,
    goToScene,
    nextScene,
    resetAll,
    SCENES,
    SCENE_ORDER
  };
}
