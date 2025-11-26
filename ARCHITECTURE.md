# 🏗️ Documentación de Arquitectura

## Visión General de la Arquitectura

Este documento detalla la arquitectura del proyecto, cómo se organizan los componentes y cómo se comunican entre sí.

---

## 1. Capas de la Aplicación

### 📊 Diagrama de Capas

```
┌─────────────────────────────────────────┐
│     PRESENTATION LAYER (UI)             │
│  Componentes React + Tailwind CSS       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     BUSINESS LOGIC LAYER                │
│  Hooks + Patrones de Diseño             │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     DATA LAYER                          │
│  Services + Configuration               │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│     EXTERNAL SERVICES                   │
│  Firebase, APIs                         │
└─────────────────────────────────────────┘
```

---

## 2. Componentes Principales

### A. Patrones de Diseño

#### Iterator Pattern
```
AdventureNavigator (src/patterns/iterator/AdventureNavigator.ts)
├── Responsabilidad: Navegar entre escenas
├── Métodos principales:
│   ├── selectChoice(nextStepId) → Scene
│   ├── getCurrentScene() → Scene
│   ├── reset() → Scene
│   └── getCurrentIndex() → number
└── Integración: Orquestado por useAdventure Hook
```

#### Memento Pattern
```
ScenePositionMemento
├── Almacena: {index, sceneId, timestamp, name}
├── Acceso: getState() → SceneState (inmutable)
└── Creador: AdventureNavigator.createMemento()

CheckpointCaretaker
├── Responsabilidad: Gestionar colección de Mementos
├── Métodos:
│   ├── saveCheckpoint(memento)
│   ├── getCheckpoints() → readonly[]
│   └── removeCheckpoint(index)
└── Integración: Orquestado por useAdventure Hook
```

### B. Servicios

#### AuthenticationService
```typescript
AuthenticationService
├── Firebase Integration
├── Métodos públicos:
│   ├── signInAnonymously()
│   ├── signInWithToken(token)
│   ├── onAuthStateChanged(callback)
│   └── getCurrentUser()
└── Patrón: Singleton (instanciado una vez por hook)
```

#### AdventureDataService
```typescript
AdventureDataService
├── Gestión de datos de escenas
├── Métodos:
│   ├── getAllScenes()
│   ├── getSceneById(id)
│   ├── getInitialScene()
│   └── isValidSceneId(id)
└── Inyección: Por constructor
```

### C. Hooks Personalizados

#### useAdventure
```typescript
useAdventure(scenes: Scene[])
├── Estado interno:
│   ├── AdventureNavigator
│   ├── CheckpointCaretaker
│   ├── currentScene
│   └── savedCheckpoints
├── Retorna:
│   ├── currentScene
│   ├── savedCheckpoints
│   ├── selectChoice()
│   ├── saveCheckpoint()
│   ├── loadCheckpoint()
│   ├── resetAdventure()
│   └── getCurrentSceneInfo()
└── Ubicación: src/hooks/useAdventure.ts
```

#### useAuthentication
```typescript
useAuthentication(firebaseConfig)
├── Estado:
│   ├── user
│   ├── loading
│   └── error
├── Efectos:
│   └── onAuthStateChanged listener
└── Ubicación: src/hooks/useAuthentication.ts
```

### D. Componentes React

#### Arquitectura de Componentes
```
AdventureGame (Contenedor)
├── SceneDisplay (Presentacional)
│   ├── Título de escena
│   ├── Texto de historia
│   └── Botones de opciones
├── CheckpointManager (Presentacional)
│   ├── Input para nombre
│   ├── Botón Guardar
│   └── Botón Reiniciar
└── CheckpointHistory (Presentacional)
    ├── Lista de guardados
    └── Botones de cargar
```

**Propiedades Clave**:
- ✅ Memoización: Todos los componentes usan `React.memo()`
- ✅ Props tipadas: Interfaces explícitas
- ✅ Sin lógica de negocio: Solo presentación
- ✅ Accesibilidad: roles y atributos aria

---

## 3. Flujo de Datos

### A. Flujo de Selección de Opción

```
Usuario hace clic en botón
    ↓
SceneDisplay.onChoiceSelect(nextStepId)
    ↓
AdventureGame.selectChoice(nextStepId)
    ↓
useAdventure.selectChoice(nextStepId)
    ↓
AdventureNavigator.selectChoice(nextStepId)
    ├── Valida ID
    ├── Actualiza índice interno
    └── Retorna nueva Scene
    ↓
setCurrentScene(newScene)
    ↓
Re-render de SceneDisplay con nueva escena
```

### B. Flujo de Guardado

```
Usuario cliquea "Guardar"
    ↓
CheckpointManager.handleSubmit()
    ↓
AdventureGame.handleSaveCheckpoint(name)
    ↓
useAdventure.saveCheckpoint(name)
    ├── AdventureNavigator.createMemento(name)
    ├── CheckpointCaretaker.saveCheckpoint(memento)
    └── setSavedCheckpoints(caretaker.getCheckpoints())
    ↓
CheckpointHistory re-renderiza con nuevos guardados
```

### C. Flujo de Carga

```
Usuario cliquea un guardado
    ↓
CheckpointHistory.onLoadCheckpoint(memento)
    ↓
AdventureGame.handleLoadCheckpoint(memento)
    ↓
useAdventure.loadCheckpoint(memento)
    ├── AdventureNavigator.restoreFromMemento(memento)
    ├── Valida índice
    ├── Actualiza estado interno
    └── Retorna boolean (éxito)
    ↓
setCurrentScene(navigator.getCurrentScene())
    ↓
Re-render con escena restaurada
```

---

## 4. Separación de Responsabilidades

### Principio SOLID Aplicado

```
┌─────────────────────────────────────┐
│ UI (React Components)                │
│ - SceneDisplay                       │
│ - CheckpointManager                  │
│ - CheckpointHistory                  │
│ - AdventureGame                      │
└─────────────┬───────────────────────┘
              │ Orquesta
┌─────────────▼───────────────────────┐
│ Business Logic (Hooks)               │
│ - useAdventure                       │
│ - useAuthentication                  │
└─────────────┬───────────────────────┘
              │ Compone y utiliza
┌─────────────▼───────────────────────┐
│ Patrones de Diseño                   │
│ - AdventureNavigator (Iterator)      │
│ - ScenePositionMemento (Memento)     │
│ - CheckpointCaretaker (Caretaker)    │
└─────────────┬───────────────────────┘
              │ Delega datos a
┌─────────────▼───────────────────────┐
│ Servicios                            │
│ - AuthenticationService              │
│ - AdventureDataService               │
└─────────────┬───────────────────────┘
              │ Consume
┌─────────────▼───────────────────────┐
│ Datos Externos                       │
│ - Firebase                           │
│ - Configuración                      │
└─────────────────────────────────────┘
```

---

## 5. Gestión de Estado

### Estado Global vs Local

```javascript
// Global (mediante hooks)
- currentScene (en useAdventure)
- savedCheckpoints (en useAdventure)
- user (en useAuthentication)

// Local (en componentes)
- inputName (en CheckpointManager)

// Persistente (en patrones)
- _currentIndex (en AdventureNavigator)
- _checkpoints (en CheckpointCaretaker)
```

### Flujo de Estado

```
Patrones de Diseño
    ↓ (getter methods)
Hooks (useState)
    ↓ (props)
Componentes React
    ↓ (event handlers)
Patrones de Diseño
```

---

## 6. Ventajas de la Arquitectura

### ✅ Escalabilidad

- Agregar nuevas escenas: Solo editar `config/adventureScenes.ts`
- Agregar nuevos patrones: Crear en `src/patterns/`
- Agregar nuevos componentes: Crear en `src/components/`

### ✅ Testabilidad

- Patrones son independientes de React
- Servicios pueden ser mockeados fácilmente
- Componentes reciben todas las props necesarias

### ✅ Mantenibilidad

- Cada clase tiene una responsabilidad clara
- Código bien documentado
- Tipos explícitos evitan errores

### ✅ Reutilización

- Patrones pueden usarse en otros proyectos
- Servicios son independientes de UI
- Hooks encapsulan lógica compleja

---

## 7. Extensibilidad

### Agregar Nueva Funcionalidad

#### Ejemplo 1: Guardar en Firestore

```typescript
// En AuthenticationService
async saveProgressToFirestore(userId: string, memento: ScenePositionMemento) {
  const docRef = doc(this.firestore, 'users', userId, 'checkpoints', memento.id);
  await setDoc(docRef, memento.getState());
}
```

#### Ejemplo 2: Logros/Badges

```typescript
// Nuevo patrón: Observer Pattern
class AchievementManager {
  onSceneReached(sceneId: number) {
    // Lógica de logros
  }
}
```

---

## 8. Diagrama de Secuencia Completo

```
Usuario -> UI -> Hook -> Patrón -> Servicio -> Firebase
  ↓        ↓      ↓        ↓         ↓          ↓
Click   evento  método  crear/   validar    guardar
                        restaurar

Respuesta:
Firebase -> Servicio -> Patrón -> Hook -> Re-render
   ↓          ↓          ↓        ↓         ↓
Datos      procesar   estado   setState  UI actualizada
```

---

## 9. Configuración y Entorno

### Variables de Entorno

```env
# .env.local (no trackear en git)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
# ...
```

### Configuración en Tiempo de Compilación

```typescript
// src/config/firebase.ts
export const getFirebaseConfig = () => {
  return {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    // ...
  };
};
```

---

## 10. Consideraciones de Desempeño

### Optimizaciones Aplicadas

1. **Memoización de Componentes**: `React.memo()`
2. **Callbacks Memorizados**: `useCallback()`
3. **Índice Map O(1)**: En AdventureNavigator
4. **Copias Defensivas**: `getCheckpoints()` retorna copia

### Futuras Mejoras

- [ ] Code Splitting
- [ ] Lazy Loading de escenas
- [ ] Virtual Scrolling para historial largo
- [ ] Service Workers para offline

---

## Conclusión

La arquitectura está diseñada para ser **limpia, escalable y mantenible**, permitiendo que el código crezca sin volverse caótico.

**Principios fundamentales**:
1. Separación de responsabilidades
2. Inyección de dependencias
3. Composición sobre herencia
4. Inmutabilidad donde sea posible
5. Tipos explícitos
