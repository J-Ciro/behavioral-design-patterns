# 🚀 Quick Start: SQLite + Migraciones + Firebase

## 3 Pasos para Implementar

### 1️⃣ Instalar Dependencias
```bash
npm install
```

**Se instala automáticamente**: `sql.js` (SQLite para el navegador)

### 2️⃣ Usar en tu App (App.tsx)

```tsx
import { useDatabase } from './hooks';

export function App() {
  const { isInitialized, isLoading, error } = useDatabase();

  if (isLoading) return <div>Inicializando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return isInitialized ? <YourApp /> : null;
}
```

✅ Eso es todo. La BD se inicializa y las migraciones se ejecutan automáticamente.

### 3️⃣ Usar CheckpointCaretaker

```tsx
import { CheckpointCaretaker } from './patterns/memento';
import { ScenePositionMemento } from './patterns/memento';

const handleSave = async () => {
  const memento = new ScenePositionMemento(0, 'Mi Escena', 1);
  const caretaker = new CheckpointCaretaker('userId');
  
  await caretaker.saveCheckpoint(memento);
};
```

✅ Automáticamente guarda en SQLite, persiste en localStorage, y sincroniza con Firebase si está disponible.

---

## 📊 Lo que Sucede Automáticamente

```
npm run dev
   ↓
useDatabase() se ejecuta
   ↓
SQLite se inicializa
   ↓
Se detecta que es primera vez
   ↓
Migración 1: Se crea tabla 'checkpoints'
Migración 2: Se agrega columna 'metadata'
   ↓
Base de datos lista
   ↓
App inicia con persistencia
```

## 🔄 Guardado y Sincronización

```
caretaker.saveCheckpoint(memento)
   ↓
   ├─> Guarda en SQLite (inmediato ✓)
   ├─> Persiste en localStorage (respaldo ✓)
   └─> Intenta Firebase (si disponible)
```

## 📁 Archivos Nuevos

```
src/database/
  ├── DatabaseService.ts    - Servicio principal
  ├── migrations.ts         - Definición de migraciones
  └── index.ts             - Exportaciones

src/hooks/
  ├── useDatabase.ts       - Hook de inicialización
  └── index.ts             - (Actualizado)

src/examples/
  └── database-usage.example.ts - Ejemplos de uso
```

## 🛠️ Verificar que Funciona

En consola del navegador:
```js
// Ver la BD guardada
localStorage.getItem('checkpoint_db')

// Ver estadísticas
import { DatabaseService } from './src/services';
DatabaseService.getInstance().getStats()
```

## 📚 Documentación Completa

- `DATABASE_SETUP.md` - Documentación técnica
- `INTEGRATION_GUIDE.md` - Guía detallada
- `DATABASE_IMPLEMENTATION_SUMMARY.md` - Resumen de cambios
- `CHECKPOINT_INTEGRATION.md` - Integración en CheckpointManager

## ❓ Preguntas Rápidas

**P: ¿Necesito hacer algo más?**
R: No, SQLite se inicializa automáticamente.

**P: ¿Dónde se guardan los datos?**
R: En localStorage bajo la clave `checkpoint_db`.

**P: ¿Qué pasa si cargo la página?**
R: Los datos se recuperan automáticamente desde localStorage.

**P: ¿Cómo agrego una migración nueva?**
R: Edita `src/database/migrations.ts`, agregaa una nueva versión.

**P: ¿Funciona sin Firebase?**
R: Sí, SQLite funciona completamente sin Firebase.

---

## 🎉 ¡Listo!

Eso es todo lo que necesitas. El sistema está completamente integrado y funcional.

```bash
npm install
npm run dev
```

¡Disfruta! 🚀
