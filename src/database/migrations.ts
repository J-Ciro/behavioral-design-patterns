/**
 * Migraciones de Base de Datos
 * Define los cambios estructurales de la DB que se ejecutan automáticamente
 */

export interface Migration {
  version: number;
  name: string;
  up: (db: any) => void;
}

/**
 * Migraciones disponibles
 * Se ejecutan en orden de versión
 */
export const migrations: Migration[] = [
  {
    version: 1,
    name: 'create_checkpoints_table',
    up: (db: any) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS checkpoints (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          scene_id INTEGER NOT NULL,
          scene_name TEXT NOT NULL,
          scene_index INTEGER NOT NULL,
          timestamp TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          user_id TEXT,
          synced_to_firebase BOOLEAN DEFAULT 0
        );
      `);

      // Índice para búsquedas rápidas por user_id
      db.run(`
        CREATE INDEX IF NOT EXISTS idx_checkpoints_user_id 
        ON checkpoints(user_id);
      `);

      // Índice para sincronización con Firebase
      db.run(`
        CREATE INDEX IF NOT EXISTS idx_checkpoints_synced 
        ON checkpoints(synced_to_firebase);
      `);
    },
  },
  {
    version: 2,
    name: 'add_metadata_column',
    up: (db: any) => {
      db.run(`
        ALTER TABLE checkpoints 
        ADD COLUMN metadata TEXT;
      `);
    },
  },
];

/**
 * Obtiene la versión actual de la BD
 */
export const getCurrentVersion = (db: any): number => {
  try {
    const result = db.exec(
      `SELECT user_version FROM pragma_user_version;`
    );
    return result.length > 0 ? result[0].values[0][0] : 0;
  } catch {
    return 0;
  }
};

/**
 * Ejecuta las migraciones pendientes
 */
export const runMigrations = (db: any): void => {
  const currentVersion = getCurrentVersion(db);

  const pendingMigrations = migrations.filter(
    (m) => m.version > currentVersion
  );

  if (pendingMigrations.length === 0) {
    console.log('✓ Base de datos actualizada');
    return;
  }

  console.log(
    `Ejecutando ${pendingMigrations.length} migración(es)...`
  );

  pendingMigrations.forEach((migration) => {
    try {
      console.log(`→ Migración ${migration.version}: ${migration.name}`);
      migration.up(db);

      // Actualiza la versión de la BD
      db.run(`PRAGMA user_version = ${migration.version};`);
      console.log(
        `✓ Migración ${migration.version} completada`
      );
    } catch (error) {
      console.error(
        `✗ Error en migración ${migration.version}:`,
        error
      );
      throw error;
    }
  });

  console.log('✓ Todas las migraciones ejecutadas correctamente');
};
