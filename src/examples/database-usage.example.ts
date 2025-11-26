/**
 * Ejemplo de uso: Integración de CheckpointCaretaker con SQLite y Firebase
 * Este archivo muestra cómo usar el sistema de persistencia completo
 */

import { CheckpointCaretaker } from '../patterns/memento';
import { ScenePositionMemento } from '../patterns/memento';
import { DatabaseService } from '../services';

/**
 * Ejemplo 1: Inicialización básica
 * Se ejecuta automáticamente con useDatabase() hook
 */
export async function exampleBasicInitialization() {
  const db = DatabaseService.getInstance();
  await db.initialize();

  console.log('✓ Base de datos inicializada');
  console.log('Estadísticas:', db.getStats());
}

/**
 * Ejemplo 2: Guardar checkpoints con persistencia automática
 */
export async function exampleSaveCheckpoints() {
  // Crear caretaker sin Firebase (solo SQLite)
  const caretaker = new CheckpointCaretaker('user123');

  // Crear mementos
  const memento1 = new ScenePositionMemento(0, 'Escena Inicial', 1);
  const memento2 = new ScenePositionMemento(1, 'La Encrucijada', 2);

  // Guardar (automáticamente persiste en SQLite)
  await caretaker.saveCheckpoint(memento1);
  await caretaker.saveCheckpoint(memento2);

  console.log(`Guardados ${caretaker.getCheckpointCount()} checkpoints`);
}

/**
 * Ejemplo 3: Recuperar checkpoints desde BD
 */
export function exampleRetrieveCheckpoints() {
  const db = DatabaseService.getInstance();

  // Obtener todos los checkpoints
  const allCheckpoints = db.getAllCheckpoints();
  console.log('Todos los checkpoints:', allCheckpoints);

  // Obtener por usuario
  const userCheckpoints = db.getCheckpointsByUserId('user123');
  console.log('Checkpoints del usuario:', userCheckpoints);

  // Obtener no sincronizados
  const unsynced = db.getUnsyncedCheckpoints();
  console.log('No sincronizados con Firebase:', unsynced);
}

/**
 * Ejemplo 4: Sincronizar con Firebase
 */
export async function exampleSyncToFirebase() {
  const caretaker = new CheckpointCaretaker(
    'user123',
    null // Aquí pasarías el firebaseService
  );

  // Ver estadísticas
  const stats = caretaker.getStats();
  console.log(`Total: ${stats.total}, No sincronizados: ${stats.unsynced}`);

  // Sincronizar todos
  await caretaker.syncAllToFirebase();
}

/**
 * Ejemplo 5: Usar queries personalizadas
 */
export function exampleCustomQueries() {
  const db = DatabaseService.getInstance();

  // Query personalizada: últimos 5 checkpoints
  const recent = db.query(`
    SELECT * FROM checkpoints 
    ORDER BY created_at DESC 
    LIMIT 5
  `);

  console.log('Últimos 5 checkpoints:', recent);

  // Query con condiciones
  const filtered = db.query(`
    SELECT * FROM checkpoints 
    WHERE user_id = ? AND synced_to_firebase = 0
  `, ['user123']);

  console.log('Checkpoints no sincronizados del usuario:', filtered);
}

/**
 * Ejemplo 6: Eliminar checkpoints
 */
export function exampleDeleteCheckpoints() {
  const db = DatabaseService.getInstance();

  // Obtener todos
  const all = db.getAllCheckpoints();

  if (all.length > 0) {
    // Eliminar el primero
    const deleted = db.deleteCheckpoint(all[0].id);
    console.log(`Checkpoint eliminado: ${deleted}`);
  }

  // Limpiar todos
  db.clearAllCheckpoints();
  console.log('✓ Todos los checkpoints eliminados');
}

/**
 * Ejemplo 7: Marcar como sincronizado
 */
export function exampleMarkAsSynced() {
  const db = DatabaseService.getInstance();

  const checkpoints = db.getUnsyncedCheckpoints();

  if (checkpoints.length > 0) {
    const synced = db.markAsSyncedToFirebase(checkpoints[0].id);
    console.log(`Marcado como sincronizado: ${synced}`);
  }
}

/**
 * Flujo completo de una aventura con persistencia
 */
export async function exampleCompleteFlow() {
  console.log('=== FLUJO COMPLETO ===\n');

  // 1. Inicializar BD
  console.log('1️⃣ Inicializando BD...');
  const db = DatabaseService.getInstance();
  await db.initialize();

  // 2. Crear caretaker
  console.log('\n2️⃣ Creando caretaker...');
  const caretaker = new CheckpointCaretaker('player-001');

  // 3. Guardar checkpoints
  console.log('\n3️⃣ Guardando checkpoints...');
  const scenes = [
    { index: 0, name: 'La Taberna', id: 1 },
    { index: 1, name: 'El Bosque Oscuro', id: 2 },
    { index: 2, name: 'La Cueva del Dragón', id: 3 },
  ];

  for (const scene of scenes) {
    const memento = new ScenePositionMemento(scene.index, scene.name, scene.id);
    await caretaker.saveCheckpoint(memento);
  }

  // 4. Ver estadísticas
  console.log('\n4️⃣ Estadísticas:');
  const stats = caretaker.getStats();
  console.log(`Total guardados: ${stats.total}`);
  console.log(`No sincronizados: ${stats.unsynced}`);

  // 5. Recuperar checkpoints
  console.log('\n5️⃣ Checkpoints guardados:');
  caretaker.getCheckpoints().forEach((cp) => {
    const state = cp.getState();
    console.log(`  - ${state.name} (${state.timestamp})`);
  });

  // 6. Limpiar
  console.log('\n6️⃣ Limpiando...');
  caretaker.clearCheckpoints();
  console.log('✓ Proceso completado');
}

