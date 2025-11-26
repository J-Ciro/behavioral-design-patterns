import type { Scene } from '../types';

/**
 * AdventureDataService
 * Gestiona acceso a los datos de la aventura
 * 
 * Principio SOLID:
 * - Single Responsibility: Solo gestiona datos de la aventura
 * - Dependency Inversion: Recibe datos inyectados
 */
export class AdventureDataService {
  constructor(private scenes: readonly Scene[]) {
    if (scenes.length === 0) {
      throw new Error('AdventureDataService requiere al menos una escena');
    }
  }

  /**
   * Obtiene todas las escenas
   */
  getAllScenes(): readonly Scene[] {
    return this.scenes;
  }

  /**
   * Obtiene una escena por ID
   */
  getSceneById(id: number): Scene | null {
    return this.scenes.find((scene) => scene.id === id) || null;
  }

  /**
   * Obtiene la escena inicial (primera de la lista)
   */
  getInitialScene(): Scene {
    return this.scenes[0];
  }

  /**
   * Valida que una escena existe
   */
  isValidSceneId(id: number): boolean {
    return this.scenes.some((scene) => scene.id === id);
  }

  /**
   * Obtiene el número total de escenas
   */
  getTotalScenes(): number {
    return this.scenes.length;
  }
}
