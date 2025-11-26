# Setup Completo: SQLite + Firebase + Migraciones

## 🎯 Objetivo
Integrar SQLite con migraciones automáticas para persistencia de Checkpoints junto con sincronización a Firebase.

## ✅ Lo que se implementó

### 1. **DatabaseService** (`src/database/DatabaseService.ts`)
Servicio singleton que gestiona:
- ✅ Inicialización de SQLite
- ✅ Ejecución de migraciones automáticas
- ✅ Persistencia en localStorage
- ✅ Operaciones CRUD de checkpoints
- ✅ Sincronización con Firebase

**Métodos principales:**
```ts
await db.initialize()           // Inicializa BD
db.saveCheckpoint(...)          // Guarda checkpoint
db.getAllCheckpoints()          // Obtiene todos
db.getCheckpointsByUserId(id)   // Filtra por usuario
db.getUnsyncedCheckpoints()     // Pendientes de sincronizar
db.markAsSyncedToFirebase(id)   // Marca como sincronizado
db.getStats()                   // Estadísticas
db.query(sql, params)           // Query personalizada
```

### 2. **Sistema de Migraciones** (`src/database/migrations.ts`)
Migraciones automáticas que se ejecutan en orden:

**Migración 1**: Crea tabla `checkpoints`
```sql
CREATE TABLE checkpoints (
  id INTEGER PRIMARY KEY,
  scene_id INTEGER,
  scene_name TEXT,
  scene_index INTEGER,
  timestamp TEXT,
  created_at DATETIME,
  user_id TEXT,
  synced_to_firebase BOOLEAN,
  metadata TEXT
);
```

**Migración 2**: Agrega columna `metadata`
```sql
ALTER TABLE checkpoints ADD COLUMN metadata TEXT;
```

Nuevas migraciones se ejecutarán automáticamente.

### 3. **CheckpointCaretaker Mejorado**
Ahora el Caretaker:
- ✅ Persiste en SQLite automáticamente
- ✅ Sincroniza con Firebase (opcional)
- ✅ Carga datos al inicializar
- ✅ Rastrea sincronización
- ✅ Soporta operaciones offline

```ts
const caretaker = new CheckpointCaretaker('userId', firebaseService);
await caretaker.saveCheckpoint(memento);
await caretaker.syncAllToFirebase();
```

### 4. **Hook useDatabase** (`src/hooks/useDatabase.ts`)
Inicializa automáticamente la BD en el arranque:

```tsx
export function App() {
  const { isInitialized, isLoading, error } = useDatabase();
  
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (!isInitialized) return null;
  
  return <YourComponent />;
}
```

## 🚀 Cómo Usar

### Instalación
```bash
npm install
```

### En tu App.tsx
```tsx
import { useDatabase } from './hooks';
import { CheckpointCaretaker } from './patterns/memento';
import { ScenePositionMemento } from './patterns/memento';

export function App() {
  const { isInitialized } = useDatabase();

  const handleSaveCheckpoint = async () => {
    const memento = new ScenePositionMemento(0, 'Mi Escena', 1);
    const caretaker = new CheckpointCaretaker('userId');
    await caretaker.saveCheckpoint(memento);
  };

  return isInitialized ? (
    <button onClick={handleSaveCheckpoint}>Guardar Progreso</button>
  ) : null;
}
```

## 📊 Base de Datos

### Tabla: `checkpoints`
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER | ID primario auto-incrementado |
| scene_id | INTEGER | ID de la escena |
| scene_name | TEXT | Nombre de la escena |
| scene_index | INTEGER | Índice en la aventura |
| timestamp | TEXT | Hora guardada |
| created_at | DATETIME | Timestamp de creación |
| user_id | TEXT | ID del usuario (opcional) |
| synced_to_firebase | BOOLEAN | ¿Sincronizado? |
| metadata | TEXT | Datos extras (JSON) |

### Índices
```sql
CREATE INDEX idx_checkpoints_user_id ON checkpoints(user_id);
CREATE INDEX idx_checkpoints_synced ON checkpoints(synced_to_firebase);
```

## 🔄 Flujo de Sincronización

```
┌─────────────────────────────────────┐
│  Usuario guarda un checkpoint       │
└──────────────┬──────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │ CheckpointCaretaker  │
    │   saveCheckpoint()   │
    └──────────┬───────────┘
               │
         ┌─────┴──────────────┐
         ▼                    ▼
    ┌─────────┐          ┌──────────┐
    │ SQLite  │          │ Firebase │
    │ (sync)  │          │ (async)  │
    └─────────┘          └──────────┘
         │                    │
         ▼                    ▼
    localStorage        Cloud Firestore
    (respaldo)          (sincronizado)
```

## 🔐 Persistencia

### Almacenamiento Local
- **Ubicación**: `localStorage['checkpoint_db']`
- **Formato**: Base64 encoded SQLite binary
- **Límite**: ~5-10 MB
- **Permanencia**: Mientras no limpies localStorage

### Sincronización Remota
- **Servicio**: Firebase (opcional)
- **Tabla remota**: `checkpoints/{userId}`
- **Campo**: `synced_to_firebase` rastrea estado
- **Recuperación**: `getUnsyncedCheckpoints()`

## 📦 Dependencias

Se agregó a `package.json`:
```json
{
  "dependencies": {
    "sql.js": "^1.8.0"
  }
}
```

## 🛠️ Configuración

### Archivos de Configuración
- `tsconfig.json` - TypeScript (sin cambios)
- `package.json` - Dependencias (agregó sql.js)
- `vite.config.ts` - Bundler (sin cambios)

### Variables de Entorno
Para Firebase (opcional):
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
```

## 🧪 Pruebas

### Test Manual en Consola
```js
// 1. Inicializar
import { DatabaseService } from './services';
const db = DatabaseService.getInstance();
await db.initialize();

// 2. Guardar
db.saveCheckpoint(1, 'Test', 0, '10:00:00', 'user1');

// 3. Recuperar
console.log(db.getAllCheckpoints());

// 4. Stats
console.log(db.getStats());
```

### Tests Automatizados
Ver `src/examples/database-usage.example.ts` para ejemplos completos.

## 📈 Monitoreo

### Logs Automáticos
La app registra automáticamente:
```
Inicializando base de datos...
→ Migración 1: create_checkpoints_table
✓ Migración 1 completada
→ Migración 2: add_metadata_column
✓ Migración 2 completada
✓ Todas las migraciones ejecutadas correctamente
✓ Base de datos inicializada correctamente
📊 Base de datos lista: { totalCheckpoints: 5, unsyncedCount: 1 }
```

### Acceso a Estadísticas
```ts
const stats = db.getStats();
console.log(`Total: ${stats.totalCheckpoints}`);
console.log(`Pendientes: ${stats.unsyncedCount}`);
```

## 🔄 Actualizar Esquema

### Agregar Nueva Columna
En `src/database/migrations.ts`:

```ts
{
  version: 3,
  name: 'add_difficulty_level',
  up: (db) => {
    db.run(`
      ALTER TABLE checkpoints 
      ADD COLUMN difficulty_level TEXT;
    `);
  }
}
```

Automáticamente se ejecutará en el próximo inicio.

### Agregar Nuevo Índice
```ts
{
  version: 4,
  name: 'add_scene_id_index',
  up: (db) => {
    db.run(`
      CREATE INDEX idx_checkpoints_scene_id 
      ON checkpoints(scene_id);
    `);
  }
}
```

## 🚨 Troubleshooting

### "Cannot find module 'sql.js'"
```bash
npm install
```

### "Base de datos no inicializada"
Asegúrate de usar `useDatabase` hook en tu App.tsx:
```tsx
const { isInitialized } = useDatabase();
if (!isInitialized) return null;
```

### Datos no se persisten
Verifica que localStorage no esté limpio:
```js
localStorage.getItem('checkpoint_db') !== null
```

### Firebase no sincroniza
Verifica que firebaseService está pasado al Caretaker:
```ts
const caretaker = new CheckpointCaretaker(userId, firebaseService);
```

## 📚 Documentación

- `DATABASE_SETUP.md` - Documentación técnica detallada
- `INTEGRATION_GUIDE.md` - Guía de integración
- `src/examples/database-usage.example.ts` - Ejemplos de código
- `src/database/migrations.ts` - Definiciones de migraciones

## ✨ Resumen de Cambios

| Archivo | Cambio | Razón |
|---------|--------|-------|
| `package.json` | Agregó sql.js | SQLite en browser |
| `src/database/DatabaseService.ts` | NUEVO | Servicio principal |
| `src/database/migrations.ts` | NUEVO | Sistema de migraciones |
| `src/database/index.ts` | NUEVO | Exportaciones |
| `src/hooks/useDatabase.ts` | NUEVO | Hook de inicialización |
| `src/hooks/index.ts` | Actualizado | Exporta useDatabase |
| `src/patterns/memento/CheckpointCaretaker.ts` | Actualizado | Persiste en BD |
| `src/services/index.ts` | Actualizado | Exporta DatabaseService |
| `src/examples/database-usage.example.ts` | NUEVO | Ejemplos |
| `DATABASE_SETUP.md` | NUEVO | Docs técnicas |
| `INTEGRATION_GUIDE.md` | NUEVO | Guía rápida |

## 🎉 Listo Para Usar

¡El sistema está listo! Ahora puedes:

1. ✅ Guardar checkpoints en SQLite
2. ✅ Las migraciones se ejecutan automáticamente
3. ✅ Sincronizar con Firebase (opcional)
4. ✅ Funciona completamente offline
5. ✅ Los datos persisten entre sesiones

¡Que disfrutes! 🚀
