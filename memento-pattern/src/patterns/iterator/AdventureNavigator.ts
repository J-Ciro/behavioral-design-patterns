import type { Scene, SceneState } from '../../types';
import { ScenePositionMemento } from '../memento/ScenePositionMemento';

/**
 * AdventureNavigator - Clase Originator + Iterator
 * Responsabilidades:
 * - Iterator: Navegar entre escenas de acuerdo a las elecciones del usuario
 * - Originator: Crear Mementos del estado actual para que el Caretaker los guarde
 * 
 * Principio SOLID:
 * - Single Responsibility: Cada método tiene una responsabilidad clara
 * - Interface Segregation: Los clientes pueden usar solo los métodos que necesitan
 * - Dependency Inversion: Depende de abstracciones (Scene interface)
 */
export class AdventureNavigator {
  private _scenes: readonly Scene[];
  private _indexMap: Map<number, number>;
  private _currentIndex: number = 0;

  constructor(scenes: readonly Scene[]) {
    if (scenes.length === 0) {
      throw new Error('AdventureNavigator requiere al menos una escena');
    }
    this._scenes = scenes;
    this._indexMap = this._createIndexMap(scenes);
  }

  /**
   * Crea un mapa ID -> Index para navegación rápida O(1)
   * Principio: Optimización sin comprometer legibilidad
   */
  private _createIndexMap(scenes: readonly Scene[]): Map<number, number> {
    const map = new Map<number, number>();
    scenes.forEach((scene, index) => {
      map.set(scene.id, index);
    });
    return map;
  }

  /**
   * ITERATOR: Navega a la siguiente escena basada en la elección del usuario
   * Retorna la escena siguiente o la escena actual si el ID es inválido
   */
  selectChoice(nextStepId: number): Scene {
    const nextIndex = this._indexMap.get(nextStepId);
    if (nextIndex !== undefined) {
      this._currentIndex = nextIndex;
    } else {
      console.warn(`ID de escena no válido: ${nextStepId}`);
    }
    return this.getCurrentScene();
  }

  /**
   * Obtiene la escena actual
   */
  getCurrentScene(): Scene {
    return this._scenes[this._currentIndex];
  }

  /**
   * Obtiene el índice actual
   */
  getCurrentIndex(): number {
    return this._currentIndex;
  }

  /**
   * ORIGINATOR: Crea un Memento con el estado actual
   * El Memento captura la posición actual para poder restaurarla después
   */
  createMemento(name: string): ScenePositionMemento {
    const currentScene = this.getCurrentScene();
    return new ScenePositionMemento(
      this._currentIndex,
      name,
      currentScene.id
    );
  }

  /**
   * ORIGINATOR: Restaura el estado interno desde un Memento
   * Retorna true si la restauración fue exitosa, false si el estado es inválido
   */
  restoreFromMemento(memento: ScenePositionMemento): boolean {
    const state = memento.getState();
    if (state.index >= 0 && state.index < this._scenes.length) {
      this._currentIndex = state.index;
      return true;
    }
    console.error(`No se puede restaurar: índice ${state.index} fuera de rango`);
    return false;
  }

  /**
   * Reinicia la aventura a la primera escena
   */
  reset(): Scene {
    this._currentIndex = 0;
    return this.getCurrentScene();
  }

  /**
   * Obtiene información de la escena actual (útil para debugging)
   */
  getCurrentSceneInfo(): SceneState {
    const scene = this.getCurrentScene();
    return {
      index: this._currentIndex,
      sceneId: scene.id,
      name: scene.title,
      timestamp: new Date().toLocaleTimeString('es-ES'),
    };
  }
}
