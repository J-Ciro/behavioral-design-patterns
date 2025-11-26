import { ScenePositionMemento } from './ScenePositionMemento';
import { DatabaseService } from '../../database';

/**
 * CheckpointCaretaker - Clase Caretaker
 * Responsabilidad única: Gestionar la colección de Mementos
 * Ahora persiste en SQLite y sincroniza con Firebase
 * Principio SOLID: Single Responsibility, Interface Segregation, Dependency Inversion
 */
export class CheckpointCaretaker {
  private _checkpoints: ScenePositionMemento[] = [];
  private _db: DatabaseService;
  private _userId?: string;
  private _firebaseService?: any;

  constructor(userId?: string, firebaseService?: any) {
    this._db = DatabaseService.getInstance();
    this._userId = userId;
    this._firebaseService = firebaseService;

    // Carga los checkpoints guardados en la BD
    this._loadCheckpointsFromDatabase();
  }

  /**
   * Carga los checkpoints desde SQLite
   */
  private _loadCheckpointsFromDatabase(): void {
    try {
      const checkpoints = this._userId
        ? this._db.getCheckpointsByUserId(this._userId)
        : this._db.getAllCheckpoints();

      this._checkpoints = checkpoints.map(
        (cp) =>
          new ScenePositionMemento(cp.scene_index, cp.scene_name, cp.scene_id)
      );

      console.log(
        `✓ Cargados ${this._checkpoints.length} checkpoints desde la BD`
      );
    } catch (error) {
      console.error('Error cargando checkpoints:', error);
      this._checkpoints = [];
    }
  }

  /**
   * Almacena un nuevo punto de control
   * Lo guarda tanto en memoria como en SQLite y Firebase
   */
  async saveCheckpoint(memento: ScenePositionMemento): Promise<void> {
    try {
      // Guarda en memoria
      this._checkpoints.push(memento);

      // Guarda en SQLite
      const state = memento.getState();
      this._db.saveCheckpoint(
        state.sceneId,
        state.name,
        state.index,
        state.timestamp,
        this._userId
      );

      console.log(`✓ Checkpoint guardado: ${state.name} (${state.sceneId})`);

      // Intenta sincronizar con Firebase si está disponible
      if (this._firebaseService && this._userId) {
        await this._syncToFirebase(memento);
      }
    } catch (error) {
      console.error('Error guardando checkpoint:', error);
      throw error;
    }
  }

  /**
   * Sincroniza el checkpoint con Firebase
   */
  private async _syncToFirebase(memento: ScenePositionMemento): Promise<void> {
    try {
      if (!this._firebaseService) {
        return;
      }

      const state = memento.getState();
      await this._firebaseService.saveCheckpoint({
        userId: this._userId,
        sceneId: state.sceneId,
        sceneName: state.name,
        sceneIndex: state.index,
        timestamp: state.timestamp,
      });

      console.log(
        `✓ Checkpoint sincronizado con Firebase: ${state.name}`
      );
    } catch (error) {
      console.error('Error sincronizando con Firebase:', error);
      // No lance el error, solo registre - la BD local es el respaldo
    }
  }

  /**
   * Obtiene todos los puntos de control guardados
   * Retorna copia para evitar mutación externa
   */
  getCheckpoints(): readonly ScenePositionMemento[] {
    return [...this._checkpoints];
  }

  /**
   * Obtiene los checkpoints no sincronizados con Firebase
   */
  getUnsyncedCheckpoints(): ScenePositionMemento[] {
    try {
      const unsynced = this._db.getUnsyncedCheckpoints();
      return unsynced.map(
        (cp) =>
          new ScenePositionMemento(cp.scene_index, cp.scene_name, cp.scene_id)
      );
    } catch (error) {
      console.error('Error obteniendo checkpoints no sincronizados:', error);
      return [];
    }
  }

  /**
   * Limpia todos los puntos de control
   */
  clearCheckpoints(): void {
    this._checkpoints = [];
    this._db.clearAllCheckpoints();
    console.log('✓ Todos los checkpoints han sido eliminados');
  }

  /**
   * Obtiene el número de puntos guardados
   */
  getCheckpointCount(): number {
    return this._checkpoints.length;
  }

  /**
   * Elimina un punto de control específico
   */
  removeCheckpoint(index: number): boolean {
    if (index >= 0 && index < this._checkpoints.length) {
      this._checkpoints.splice(index, 1);
      // También elimina de la BD
      try {
        const allCheckpoints = this._db.getAllCheckpoints();
        if (allCheckpoints[index]) {
          this._db.deleteCheckpoint(allCheckpoints[index].id);
        }
      } catch (error) {
        console.error('Error eliminando checkpoint de BD:', error);
      }
      return true;
    }
    return false;
  }

  /**
   * Obtiene estadísticas de los checkpoints
   */
  getStats(): { total: number; unsynced: number } {
    try {
      const stats = this._db.getStats();
      return {
        total: stats.totalCheckpoints,
        unsynced: stats.unsyncedCount,
      };
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      return { total: this._checkpoints.length, unsynced: 0 };
    }
  }

  /**
   * Sincroniza todos los checkpoints no sincronizados con Firebase
   */
  async syncAllToFirebase(): Promise<void> {
    if (!this._firebaseService) {
      console.warn('Firebase service no está disponible');
      return;
    }

    try {
      const unsynced = this.getUnsyncedCheckpoints();
      console.log(`Sincronizando ${unsynced.length} checkpoints...`);

      for (const checkpoint of unsynced) {
        await this._syncToFirebase(checkpoint);
      }

      console.log(`✓ ${unsynced.length} checkpoints sincronizados`);
    } catch (error) {
      console.error('Error sincronizando checkpoints:', error);
    }
  }
}
