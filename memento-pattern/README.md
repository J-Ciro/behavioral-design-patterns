# 🎮 Behavioral Design Patterns - Elige Tu Propia Aventura

> Proyecto React profesional que implementa los patrones de diseño **Memento** e **Iterator** con arquitectura limpia, principios **SOLID** y **Clean Code**.

## ⚡ Inicio Rápido

```bash
npm install    # Instalar dependencias
npm run dev    # Ejecutar en desarrollo
```

👉 **¿Prisa?** Ver [QUICKSTART.md](./QUICKSTART.md) para inicio en 3 pasos.

## 📋 Tabla de Contenidos

- [Visión General](#visión-general)
- [Características](#características)
- [🆕 Sistema de Base de Datos](#-sistema-de-base-de-datos)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Patrones de Diseño](#patrones-de-diseño)
- [Principios SOLID](#principios-solid)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Desarrollo](#desarrollo)
- [Contribuir](#contribuir)

---

## 🆕 Sistema de Base de Datos

**Novedad**: El proyecto ahora incluye un sistema completo de persistencia con **SQLite**, **migraciones automáticas** y **sincronización con Firebase**.

### ¿Qué es?
- 🗄️ **SQLite**: Base de datos relacional en el navegador (sin servidor)
- 🔄 **Migraciones**: Cambios de esquema automáticos
- 🌐 **Firebase**: Sincronización opcional con la nube
- 💾 **Persistencia**: Los datos sobreviven a los refrescos

### Documentación Rápida

| Necesito... | Leer... |
|------------|---------|
| Empezar en 5 minutos | [`QUICK_START_DB.md`](./QUICK_START_DB.md) |
| Entender la arquitectura | [`ARCHITECTURE.md`](./ARCHITECTURE.md) |
| Integrar en mis componentes | [`CHECKPOINT_INTEGRATION.md`](./CHECKPOINT_INTEGRATION.md) |
| Referencia técnica completa | [`DATABASE_SETUP.md`](./DATABASE_SETUP.md) |
| Ver ejemplos de código | [`src/examples/database-usage.example.ts`](./src/examples/database-usage.example.ts) |
| Navegación de documentos | [`NAVIGATION_MAP.md`](./NAVIGATION_MAP.md) |

### Ejemplo Rápido
```tsx
// 1. Inicializar BD en App.tsx
const { isInitialized } = useDatabase();

// 2. Guardar checkpoint
const caretaker = new CheckpointCaretaker('userId');
await caretaker.saveCheckpoint(memento);

// 3. ¡Listo! Los datos persisten automáticamente en SQLite
```

**📦 Instalación**: Solo ejecuta `npm install` - `sql.js` ya está en `package.json`

---

## 🎯 Visión General

Este proyecto es un juego interactivo de "Elige Tu Propia Aventura" que demuestra la implementación práctica de dos patrones de diseño comportamental importantes:

- **Iterator Pattern**: Navega a través de diferentes escenas de forma segura y reutilizable
- **Memento Pattern**: Guarda y restaura el progreso del jugador en puntos de control

El proyecto está estructurado siguiendo principios **SOLID**, **Clean Code** y mejores prácticas de desarrollo React.

---

## ✨ Características

- ✅ Navegación intuitiva entre escenas
- ✅ Sistema de guardado de puntos de control (checkpoints)
- ✅ Carga de progreso anterior
- ✅ Reinicio de la aventura
- ✅ Integración con Firebase (autenticación)
- ✅ **NEW: SQLite con persistencia automática**
- ✅ **NEW: Migraciones de base de datos**
- ✅ **NEW: Sincronización con Firebase**
- ✅ UI moderna con Tailwind CSS
- ✅ Código fuertemente tipado con TypeScript
- ✅ Arquitectura limpia y escalable
- ✅ Componentes reutilizables
- ✅ Hooks personalizados para lógica de negocio

---

## 📁 Estructura del Proyecto

```
behavioral-design-patterns/
├── src/
│   ├── components/                 # Componentes React presentacionales
│   │   ├── AdventureGame/         # Componente principal
│   │   ├── SceneDisplay/          # Muestra la escena actual
│   │   ├── CheckpointManager/     # Gestiona el guardado
│   │   └── CheckpointHistory/     # Muestra historial de guardados
│   │
│   ├── patterns/                   # Patrones de diseño implementados
│   │   ├── iterator/
│   │   │   └── AdventureNavigator.ts    # Patrón Iterator + Originator
│   │   └── memento/
│   │       ├── ScenePositionMemento.ts  # Patrón Memento
│   │       └── CheckpointCaretaker.ts   # Patrón Caretaker
│   │
│   ├── hooks/                      # Hooks personalizados React
│   │   ├── useAdventure.ts        # Orquesta patrones Memento + Iterator
│   │   └── useAuthentication.ts   # Gestiona autenticación Firebase
│   │
│   ├── services/                   # Servicios de negocio
│   │   ├── AuthenticationService.ts
│   │   └── AdventureDataService.ts
│   │
│   ├── config/                     # Configuración
│   │   ├── adventureScenes.ts     # Datos de las escenas
│   │   └── firebase.ts            # Configuración Firebase
│   │
│   ├── types/                      # Interfaces y tipos TypeScript
│   │   └── index.ts
│   │
│   ├── utils/                      # Funciones auxiliares
│   │   └── helpers.ts
│   │
│   ├── index.tsx                   # Punto de entrada
│   └── index.css                   # Estilos globales
│
├── package.json                    # Dependencias
├── tsconfig.json                   # Configuración TypeScript
├── vite.config.ts                  # Configuración Vite
├── tailwind.config.js              # Configuración Tailwind CSS
├── postcss.config.js               # Configuración PostCSS
├── eslint.config.js                # Configuración ESLint
├── .env.example                    # Variables de entorno (ejemplo)
├── .gitignore                      # Archivos ignorados por git
├── index.html                      # HTML principal
└── README.md                       # Este archivo
```

---

## 🏗️ Patrones de Diseño

### 1️⃣ Iterator Pattern

**Ubicación**: `src/patterns/iterator/AdventureNavigator.ts`

**Propósito**: Proporciona una forma para acceder secuencialmente a los elementos de una colección sin exponer su representación subyacente.

**Implementación**:
```typescript
// En AdventureNavigator
selectChoice(nextStepId: number): Scene {
  const nextIndex = this._indexMap.get(nextStepId);
  if (nextIndex !== undefined) {
    this._currentIndex = nextIndex;
  }
  return this.getCurrentScene();
}
```

**Beneficios**:
- Navegación limpia entre escenas
- Validación automática de IDs
- Acceso O(1) mediante mapeo de índices

### 2️⃣ Memento Pattern

**Ubicación**: `src/patterns/memento/`

**Propósito**: Captura y externaliza un estado interno de un objeto sin violar la encapsulación.

**Componentes**:

- **Memento** (`ScenePositionMemento.ts`): Almacena el estado
  ```typescript
  class ScenePositionMemento {
    constructor(index: number, name: string, sceneId: number)
    getState(): SceneState
  }
  ```

- **Originator** (`AdventureNavigator.ts`): Crea y restaura Mementos
  ```typescript
  createMemento(name: string): ScenePositionMemento
  restoreFromMemento(memento: ScenePositionMemento): boolean
  ```

- **Caretaker** (`CheckpointCaretaker.ts`): Gestiona colección de Mementos
  ```typescript
  saveCheckpoint(memento: ScenePositionMemento): void
  getCheckpoints(): readonly ScenePositionMemento[]
  ```

**Beneficios**:
- Guardado de progreso sin exponer detalles internos
- Múltiples puntos de guardado
- Restauración segura

---

## 🔷 Principios SOLID

### S - Single Responsibility

Cada clase tiene una única responsabilidad:

- `ScenePositionMemento`: Solo almacena estado
- `AdventureNavigator`: Solo navega y crea Mementos
- `CheckpointCaretaker`: Solo gestiona colección de Mementos
- `AuthenticationService`: Solo gestiona autenticación

### O - Open/Closed

Las clases están abiertas para extensión pero cerradas para modificación:

```typescript
// Puedes extender AdventureNavigator sin modificar el código existente
class CustomNavigator extends AdventureNavigator {
  // Nueva funcionalidad
}
```

### L - Liskov Substitution

Los tipos son intercambiables:

```typescript
type SceneCollection = readonly Scene[];
// Puedes pasar cualquier array de escenas sin problemas
```

### I - Interface Segregation

Las interfaces son específicas y pequeñas:

```typescript
interface SceneDisplayProps {
  scene: Scene;
  isFinished: boolean;
  onChoiceSelect: (nextStepId: number) => void;
}
```

### D - Dependency Inversion

Los componentes dependen de abstracciones, no de implementaciones concretas:

```typescript
// En AdventureNavigator
constructor(scenes: readonly Scene[]) {
  // Depende de la interfaz Scene, no de una implementación específica
}
```

---

## 💡 Clean Code

El proyecto implementa principios de **Clean Code**:

- **Nombres descriptivos**: Variables y funciones tienen nombres claros
- **Funciones pequeñas**: Cada función hace una cosa bien
- **Tipos explícitos**: TypeScript asegura claridad
- **Comentarios claros**: Solo documentación necesaria
- **Manejo de errores**: Validaciones apropiadas
- **Reutilización**: DRY (Don't Repeat Yourself)

---

## 📋 Requisitos Previos

- **Node.js**: v16.0.0 o superior
- **npm**: v7.0.0 o superior (o yarn/pnpm)
- **Cuenta Firebase** (opcional, para integración)

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/J-Ciro/behavioral-design-patterns.git
cd behavioral-design-patterns
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno (opcional)

Copia `.env.example` a `.env.local` y completa con tus valores:

```bash
cp .env.example .env.local
```

```env
VITE_FIREBASE_API_KEY=tu_valor_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_valor_aqui
# ... otros valores
```

---

## 💻 Uso

### Modo Desarrollo

```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

### Compilar para Producción

```bash
npm run build
```

### Preview de Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Type Checking

```bash
npm run type-check
```

---

## 🎮 Cómo Jugar

1. **Lee la escena**: Cada página presenta un fragmento de la aventura
2. **Elige una opción**: Haz clic en uno de los botones para navegar
3. **Guarda tu progreso**: Usa "Guardar" para crear puntos de control
4. **Carga un guardado**: Desde el panel derecho, restaura un progreso anterior
5. **Reinicia**: Vuelve al principio en cualquier momento

---

## 🔧 Desarrollo

### Agregar una Nueva Escena

1. Edita `src/config/adventureScenes.ts`:

```typescript
{
  id: 500,
  title: "Tu Nueva Escena",
  storyText: "Descripción de la escena",
  choices: [
    { text: "Opción 1", nextStepId: 600 },
    { text: "Opción 2", nextStepId: 700 }
  ]
}
```

### Extender Funcionalidad

1. **Agregar nuevo Hook**: `src/hooks/useNuevoHook.ts`
2. **Crear Servicio**: `src/services/NuevoService.ts`
3. **Nuevo Componente**: `src/components/NuevoComponente/`

---

## 📦 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `react` | ^18.2.0 | Framework UI |
| `react-dom` | ^18.2.0 | Renderizado DOM |
| `firebase` | ^10.7.0 | Autenticación y base de datos |
| `lucide-react` | ^0.344.0 | Iconos |
| `tailwindcss` | ^3.3.0 | Estilos CSS |
| `typescript` | ^5.3.0 | Tipado estático |
| `vite` | ^5.0.0 | Build tool |

---

## 🧪 Testing

El proyecto está preparado para agregar tests. Se recomienda:

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Cypress o Playwright

Ejemplo:
```bash
npm install --save-dev jest @testing-library/react
```

---

## 🌐 Integración Firebase

El proyecto incluye servicios para:

- ✅ Autenticación anónima
- ✅ Autenticación con token personalizado
- ✅ Observador de cambios de estado
- ⏳ Almacenamiento de guardados (Firestore)

### Configuración

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Obtén las credenciales
3. Copia a `.env.local`

---

## 📚 Recursos Adicionales

### Patrones de Diseño

- [Refactoring Guru - Iterator](https://refactoring.guru/design-patterns/iterator)
- [Refactoring Guru - Memento](https://refactoring.guru/design-patterns/memento)

### SOLID

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Uncle Bob's Blog](https://blog.cleancoder.com/)

### React

- [React Documentation](https://react.dev)
- [React Hooks](https://react.dev/reference/react)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**J-Ciro**

- GitHub: [@J-Ciro](https://github.com/J-Ciro)
- Proyecto: Behavioral Design Patterns

---

## 🙏 Agradecimientos

- Inspirado en patrones clásicos de Gang of Four
- Comunidad React y TypeScript
- Principios SOLID y Clean Code

---

**Última actualización**: Noviembre 2025

