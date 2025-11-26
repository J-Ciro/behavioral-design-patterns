import { useState, useCallback } from 'react';
import { AdventureNavigator } from '../patterns/iterator';
import { CheckpointCaretaker, ScenePositionMemento } from '../patterns/memento';
import type { Scene } from '../types';

/**
 * Hook personalizado para gestionar la lógica de la aventura
 * Encapsula Iterator, Memento y Caretaker en un interfaz limpio
 * 
 * Principio SOLID:
 * - Single Responsibility: Solo gestiona la lógica de aventura
 * - Interface Segregation: Expone solo lo necesario
 * - Composition over Inheritance: Compone los patrones
 */
export const useAdventure = (scenes: readonly Scene[]) => {
  const [navigator] = useState(() => new AdventureNavigator(scenes));
  const [caretaker] = useState(() => new CheckpointCaretaker());
  const [currentScene, setCurrentScene] = useState(navigator.getCurrentScene());
  const [savedCheckpoints, setSavedCheckpoints] = useState<
    readonly ScenePositionMemento[]
  >([]);

  /**
   * Selecciona una opción y navega a la siguiente escena
   */
  const selectChoice = useCallback(
    (nextStepId: number) => {
      const nextScene = navigator.selectChoice(nextStepId);
      setCurrentScene(nextScene);
    },
    [navigator]
  );

  /**
   * Guarda un punto de control
   */
  const saveCheckpoint = useCallback(
    (name: string) => {
      const memento = navigator.createMemento(name);
      caretaker.saveCheckpoint(memento);
      setSavedCheckpoints(caretaker.getCheckpoints());
    },
    [navigator, caretaker]
  );

  /**
   * Carga un punto de control
   */
  const loadCheckpoint = useCallback(
    (memento: ScenePositionMemento) => {
      const success = navigator.restoreFromMemento(memento);
      if (success) {
        setCurrentScene(navigator.getCurrentScene());
      }
      return success;
    },
    [navigator]
  );

  /**
   * Reinicia la aventura
   */
  const resetAdventure = useCallback(() => {
    const firstScene = navigator.reset();
    setCurrentScene(firstScene);
  }, [navigator]);

  /**
   * Obtiene información del estado actual
   */
  const getCurrentSceneInfo = useCallback(
    () => navigator.getCurrentSceneInfo(),
    [navigator]
  );

  return {
    currentScene,
    savedCheckpoints,
    selectChoice,
    saveCheckpoint,
    loadCheckpoint,
    resetAdventure,
    getCurrentSceneInfo,
    checkpointCount: caretaker.getCheckpointCount(),
  };
};
