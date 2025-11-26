import initSqlJs, { Database } from 'sql.js';
import { runMigrations } from './migrations';

/**
 * DatabaseService
 * Gestiona la conexión y operaciones con SQLite
 * Responsabilidades:
 * - Inicializar la base de datos
 * - Ejecutar migraciones
 * - Guardar y recuperar checkpoints
 */
export class DatabaseService {
  private static instance: DatabaseService;
  private db: Database | null = null;
  private isInitialized = false;

  private constructor() {}

  /**
   * Patrón Singleton - Obtiene la instancia única
   */
  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Inicializa la base de datos y ejecuta migraciones
   * Se llama una sola vez al arrancar la app
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      console.log('Inicializando base de datos...');

      // Carga sql.js
      const SQL = await initSqlJs();

      // Intenta recuperar la DB del localStorage
      const savedDb = localStorage.getItem('checkpoint_db');

      if (savedDb) {
        // Restaura la BD guardada
        const buffer = Buffer.from(savedDb, 'base64');
        this.db = new SQL.Database(new Uint8Array(buffer));
        console.log('✓ Base de datos restaurada del almacenamiento local');
      } else {
        // Crea una nueva BD vacía
        this.db = new SQL.Database();
        console.log('✓ Nueva base de datos creada');
      }

      // Ejecuta migraciones
      runMigrations(this.db);

      // Guarda la BD en localStorage
      this.persist();

      this.isInitialized = true;
      console.log('✓ Base de datos inicializada correctamente');
    } catch (error) {
      console.error('Error inicializando base de datos:', error);
      throw new Error(`No se pudo inicializar la base de datos: ${error}`);
    }
  }

  /**
   * Persiste la base de datos en localStorage
   */
  persist(): void {
    if (!this.db) {
      throw new Error('Base de datos no inicializada');
    }

    const data = this.db.export();
    const buffer = Buffer.from(data).toString('base64');
    localStorage.setItem('checkpoint_db', buffer);
  }

  /**
   * Ejecuta una consulta SELECT
   */
  query(sql: string, params: any[] = []): any[] {
    if (!this.db) {
      throw new Error('Base de datos no inicializada');
    }

    try {
      const stmt = this.db.prepare(sql);
      stmt.bind(params);

      const results = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      stmt.free();

      return results;
    } catch (error) {
      console.error('Error en consulta SELECT:', error);
      throw error;
    }
  }

  /**
   * Ejecuta una operación INSERT/UPDATE/DELETE
   */
  execute(sql: string, params: any[] = []): number {
    if (!this.db) {
      throw new Error('Base de datos no inicializada');
    }

    try {
      const stmt = this.db.prepare(sql);
      stmt.bind(params);
      stmt.step();
      stmt.free();

      this.persist();

      return this.db.getRowsModified();
    } catch (error) {
      console.error('Error ejecutando operación:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los checkpoints
   */
  getAllCheckpoints(): any[] {
    return this.query(`
      SELECT * FROM checkpoints 
      ORDER BY created_at DESC
    `);
  }

  /**
   * Obtiene checkpoints por usuario
   */
  getCheckpointsByUserId(userId: string): any[] {
    return this.query(
      `
      SELECT * FROM checkpoints 
      WHERE user_id = ? 
      ORDER BY created_at DESC
    `,
      [userId]
    );
  }

  /**
   * Guarda un checkpoint en la BD
   */
  saveCheckpoint(
    sceneId: number,
    sceneName: string,
    sceneIndex: number,
    timestamp: string,
    userId?: string
  ): number {
    return this.execute(
      `
      INSERT INTO checkpoints 
      (scene_id, scene_name, scene_index, timestamp, user_id, synced_to_firebase) 
      VALUES (?, ?, ?, ?, ?, 0)
    `,
      [sceneId, sceneName, sceneIndex, timestamp, userId || null]
    );
  }

  /**
   * Marca un checkpoint como sincronizado con Firebase
   */
  markAsSyncedToFirebase(checkpointId: number): boolean {
    const rowsModified = this.execute(
      `
      UPDATE checkpoints 
      SET synced_to_firebase = 1 
      WHERE id = ?
    `,
      [checkpointId]
    );

    return rowsModified > 0;
  }

  /**
   * Obtiene checkpoints no sincronizados con Firebase
   */
  getUnsyncedCheckpoints(): any[] {
    return this.query(`
      SELECT * FROM checkpoints 
      WHERE synced_to_firebase = 0 
      ORDER BY created_at ASC
    `);
  }

  /**
   * Elimina un checkpoint
   */
  deleteCheckpoint(checkpointId: number): boolean {
    const rowsModified = this.execute(
      `DELETE FROM checkpoints WHERE id = ?`,
      [checkpointId]
    );

    return rowsModified > 0;
  }

  /**
   * Limpia todos los checkpoints
   */
  clearAllCheckpoints(): void {
    this.execute(`DELETE FROM checkpoints`);
  }

  /**
   * Obtiene estadísticas de la BD
   */
  getStats(): { totalCheckpoints: number; unsyncedCount: number } {
    const totalResult = this.query(
      `SELECT COUNT(*) as count FROM checkpoints`
    );
    const unsyncedResult = this.query(
      `SELECT COUNT(*) as count FROM checkpoints WHERE synced_to_firebase = 0`
    );

    return {
      totalCheckpoints: totalResult[0]?.count || 0,
      unsyncedCount: unsyncedResult[0]?.count || 0,
    };
  }

  /**
   * Obtiene la instancia de la BD (para queries avanzadas)
   */
  getDatabase(): Database | null {
    return this.db;
  }
}
