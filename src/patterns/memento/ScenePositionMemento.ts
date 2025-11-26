import type { SceneState } from '../../types';

/**
 * ScenePositionMemento - Clase Memento
 * Responsabilidad única: Almacenar el estado de la posición de la aventura
 * Principio SOLID: Single Responsibility, Immutability
 */
export class ScenePositionMemento {
  private readonly _state: SceneState;

  constructor(index: number, name: string, sceneId: number) {
    this._state = {
      index,
      sceneId,
      timestamp: new Date().toLocaleTimeString('es-ES'),
      name,
    };
  }

  /**
   * Retorna el estado capturado (inmutable)
   */
  getState(): Readonly<SceneState> {
    return Object.freeze({ ...this._state });
  }
}
