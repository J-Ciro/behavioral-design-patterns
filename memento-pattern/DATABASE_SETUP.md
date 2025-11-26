# Sistema de Persistencia con SQLite y Firebase

Este documento explica cómo funciona la integración de SQLite con migraciones automáticas y sincronización con Firebase.

## 🏗️ Arquitectura

```
src/
├── database/
│   ├── DatabaseService.ts     # Servicio principal de BD
│   ├── migrations.ts           # Definición de migraciones
│   └── index.ts               # Exportaciones
├── patterns/memento/
│   └── CheckpointCaretaker.ts # Actualizado para usar BD
├── hooks/
│   └── useDatabase.ts         # Hook para inicializar BD
└── services/
    └── index.ts               # Exporta DatabaseService
```

## 🚀 Características

### 1. **Migraciones Automáticas**
Las migraciones se ejecutan automáticamente cuando la app inicia:
- Si es la primera vez, crea las tablas necesarias
- Si ya existe BD, actualiza al schema más reciente
- Se guardan en `localStorage` como base64

### 2. **SQLite en el Navegador**
Usa `sql.js` para ejecutar SQLite completamente en el cliente:
- Sin servidor requerido
- Persistencia en localStorage
- Soporte para consultas SQL complejas

### 3. **Sincronización con Firebase**
Los checkpoints se sincronizan automáticamente:
- Se guardan primero en SQLite (rápido, offline)
- Se sincronizan con Firebase cuando sea posible
- Las datos locales son el respaldo en caso de fallo

## 📋 Tabla de Checkpoints

```sql
CREATE TABLE checkpoints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  scene_id INTEGER NOT NULL,
  scene_name TEXT NOT NULL,
  scene_index INTEGER NOT NULL,
  timestamp TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id TEXT,
  synced_to_firebase BOOLEAN DEFAULT 0,
  metadata TEXT
);
```

## 🔧 Uso

### 1. Inicializar BD al Arrancar la App

En tu componente raíz (App.tsx):

```tsx
import { useDatabase } from './hooks';

export function App() {
  const { isInitialized, isLoading, error } = useDatabase();

  if (isLoading) {
    return <div>Cargando base de datos...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {isInitialized && <YourComponent />}
    </div>
  );
}
```

### 2. Usar DatabaseService Directamente

```ts
import { DatabaseService } from './services';

const db = DatabaseService.getInstance();

// Obtener un checkpoint
const checkpoints = db.getAllCheckpoints();

// Guardar un checkpoint
db.saveCheckpoint(1, 'Escena 1', 0, '10:30:45');

// Obtener por usuario
const userCheckpoints = db.getCheckpointsByUserId('user123');

// Marcar como sincronizado
db.markAsSyncedToFirebase(checkpointId);

// Obtener no sincronizados
const unsynced = db.getUnsyncedCheckpoints();
```

### 3. Usar CheckpointCaretaker con BD

```ts
import { CheckpointCaretaker } from './patterns/memento';

// Con soporte a Firebase
const caretaker = new CheckpointCaretaker('user123', firebaseService);

// Guardar (automáticamente persiste en BD y Firefox)
await caretaker.saveCheckpoint(memento);

// Obtener estadísticas
const stats = caretaker.getStats();
console.log(`Total: ${stats.total}, No sincronizados: ${stats.unsynced}`);

// Sincronizar todos
await caretaker.syncAllToFirebase();
```

## 📊 Características Avanzadas

### Estadísticas
```ts
const stats = db.getStats();
// { totalCheckpoints: 15, unsyncedCount: 3 }
```

### Queries Personalizadas
```ts
const db = DatabaseService.getInstance();
const results = db.query(
  `SELECT * FROM checkpoints WHERE user_id = ? ORDER BY created_at DESC`,
  ['user123']
);
```

### Agregar Migraciones Nuevas

En `src/database/migrations.ts`:

```ts
{
  version: 3,
  name: 'add_new_column',
  up: (db: any) => {
    db.run(`ALTER TABLE checkpoints ADD COLUMN new_col TEXT;`);
  }
}
```

Automáticamente se ejecutará al siguiente arranque si `version > currentVersion`.

## 🔄 Flujo de Sincronización

```
1. Usuario guarda un checkpoint
   ↓
2. CheckpointCaretaker.saveCheckpoint()
   ↓
3. Se guarda en SQLite (inmediato)
   ↓
4. Se intenta sincronizar con Firebase (async)
   ↓
5. Si falla Firebase, el dato persiste en SQLite
   ↓
6. Se puede sincronizar manualmente después con syncAllToFirebase()
```

## 🛠️ Mantenimiento

### Ver Datos en DevTools
```js
// En consola del navegador
localStorage.getItem('checkpoint_db')
// Muestra la BD en base64
```

### Limpiar BD
```js
import { DatabaseService } from './services';
DatabaseService.getInstance().clearAllCheckpoints();
```

### Verificar Estado
```js
const db = DatabaseService.getInstance();
console.log(db.getStats());
```

## 📦 Dependencias Agregadas

```json
{
  "sql.js": "^1.8.0"
}
```

Instala con: `npm install`

## ⚠️ Notas Importantes

1. **localStorage**: Tiene límite de ~5-10 MB. Para apps grandes considera IndexedDB
2. **Sincronización**: No es instantánea, puede haber delay con Firebase
3. **Seguridad**: Los datos están en el navegador. Encripta datos sensibles
4. **Compatibilidad**: SQLite.js funciona en todos los navegadores modernos

## 🔐 Consideraciones de Seguridad

- Los datos se guardan en localStorage (accesible via JavaScript)
- Para datos sensibles, encripta antes de guardar
- Implementa validación en el servidor (Firebase rules)
- Considera usar Firebase Realtime Database con seguridad

## 📝 Próximos Pasos

- [ ] Agregar validación de integridad de datos
- [ ] Implementar compresión de datos para localStorage
- [ ] Agregar soporte para exportar/importar BD
- [ ] Considerar migrar a IndexedDB para mayor capacidad
