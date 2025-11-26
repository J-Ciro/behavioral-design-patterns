# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto! Esta guía te ayudará a entender cómo contribuir de forma efectiva.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Empezar](#cómo-empezar)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estándares de Código](#estándares-de-código)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)

---

## 🤝 Código de Conducta

### Compromisos

- Respeto mutuo
- Inclusión
- Feedback constructivo
- Colaboración sin ego

### Comportamiento Inaceptable

- Discriminación
- Acoso
- Spam
- Ataques personales

---

## 🚀 Cómo Empezar

### 1. Fork del Proyecto

```bash
# En GitHub, haz clic en "Fork"
# Luego clona tu fork
git clone https://github.com/TU_USUARIO/behavioral-design-patterns.git
cd behavioral-design-patterns
```

### 2. Configurar Upstream

```bash
git remote add upstream https://github.com/J-Ciro/behavioral-design-patterns.git
git fetch upstream
```

### 3. Crear Rama

```bash
git checkout -b feature/tu-feature
# o
git checkout -b bugfix/tu-bugfix
```

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Verificar Setup

```bash
npm run lint
npm run type-check
npm run dev
```

---

## 🔄 Flujo de Trabajo

### 1. Mantén tu Fork Actualizado

```bash
git fetch upstream
git rebase upstream/main
```

### 2. Realiza Cambios

```bash
# Edita archivos
# Prueba localmente
npm run dev
```

### 3. Commit Frecuentes

```bash
git add .
git commit -m "feat: descripción concisa"
```

### 4. Push a tu Fork

```bash
git push origin feature/tu-feature
```

### 5. Pull Request

Abre un PR en GitHub desde tu fork a `main`.

---

## 📝 Estándares de Código

### TypeScript

```typescript
// ✅ BIEN: Tipos explícitos
interface Props {
  scene: Scene;
  onSelect: (id: number) => void;
}

const MyComponent: FC<Props> = ({ scene, onSelect }) => {
  // ...
};

// ❌ MAL: Tipos implícitos
const MyComponent = ({ scene, onSelect }) => {
  // ...
};
```

### Naming Conventions

```typescript
// Clases y tipos
class AdventureNavigator { }
interface Scene { }
type SceneId = number;

// Funciones y variables
const getCurrentScene = () => { }
const isFinished = false;
const handleClick = () => { }
```

### Comentarios

```typescript
// ✅ BIEN: Comentarios significativos
/**
 * Navega a la siguiente escena basada en la elección
 * @param nextStepId - ID de la siguiente escena
 * @returns La escena siguiente o la actual si ID es inválido
 */
selectChoice(nextStepId: number): Scene {
  // ...
}

// ❌ MAL: Comentarios obvios
// Selecciona la opción
selectChoice(nextStepId: number): Scene {
  // ...
}
```

### Longitud de Líneas

Máximo 100 caracteres. Usa el linter:

```bash
npm run lint:fix
```

### Imports

```typescript
// ✅ BIEN: Orden lógico
import React from 'react';
import { useState } from 'react';
import CustomComponent from './components';
import { helper } from './utils';

// ❌ MAL: Desordenado
import { helper } from './utils';
import CustomComponent from './components';
import React from 'react';
```

### Funciones

```typescript
// ✅ BIEN: Función pequeña y clara
const validateScene = (scene: Scene): boolean => {
  return scene.id > 0 && scene.choices.length > 0;
};

// ❌ MAL: Función muy larga con múltiples responsabilidades
const validateAndProcessScene = (scene, db, cache) => {
  // 50 líneas de lógica
};
```

---

## 📌 Commit Messages

Usa formato **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato, sin cambios de lógica
- `refactor`: Reorganización de código
- `perf`: Mejoras de rendimiento
- `test`: Agregar o actualizar tests
- `chore`: Tareas (deps, config)

### Ejemplos

```bash
git commit -m "feat(iterator): agregar método getCurrentSceneInfo"

git commit -m "fix(memento): corregir restauración de índice"

git commit -m "docs: actualizar README con instrucciones"

git commit -m "refactor(components): extraer CheckpointHistory"

git commit -m "perf(navigator): optimizar búsqueda con Map"
```

### Reglas

- Usa imperativo ("agregar", no "agrega")
- No termines con punto
- Máximo 50 caracteres en el subject
- Sé específico y descriptivo

---

## 📤 Pull Requests

### Checklist Antes de Crear PR

- [ ] Código sigue los estándares
- [ ] Tests pasan (si aplica)
- [ ] Linting pasa (`npm run lint`)
- [ ] Type checking pasa (`npm run type-check`)
- [ ] Documentación actualizada
- [ ] Commits bien formateados
- [ ] Rama está actualizada con `main`

### Descripción de PR

```markdown
## Descripción
Breve descripción de los cambios

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Documentación

## Cambios
- Cambio 1
- Cambio 2

## Testing
Cómo probar los cambios

## Screenshots (si aplica)
[Capturas de pantalla]

## Relacionado
Closes #123
```

### Ejemplo PR

```markdown
## Descripción
Implementa la carga de checkpoints desde Firestore para persistencia de datos.

## Cambios
- Agrega método `loadCheckpointsFromFirestore` en AuthenticationService
- Integra carga en useAdventure hook
- Actualiza CheckpointHistory para mostrar checkpoints remotos

## Testing
1. Configura Firebase
2. Guarda un checkpoint
3. Recarga la página
4. Verifica que el checkpoint está disponible
```

---

## 🧪 Testing

### Antes de Hacer PR

```bash
npm run lint
npm run type-check
npm run dev  # Prueba manual
```

### Estructura de Tests (Futura)

```typescript
describe('AdventureNavigator', () => {
  it('should navigate to correct scene', () => {
    const navigator = new AdventureNavigator(SCENES);
    const result = navigator.selectChoice(200);
    expect(result.id).toBe(200);
  });
});
```

---

## 🐛 Reportar Bugs

### Antes de Reportar

- Actualiza a la última versión
- Revisa issues existentes
- Prueba en navegador moderno

### Formato de Issue

```markdown
## Descripción
Descripción clara del bug

## Pasos para Reproducir
1. ...
2. ...
3. ...

## Comportamiento Esperado
Qué debería pasar

## Comportamiento Actual
Qué está pasando

## Entorno
- OS: Windows 10
- Node: v16.0
- Browser: Chrome 120
```

---

## 📚 Solicitar Features

```markdown
## Descripción
Qué nueva funcionalidad solicitas

## Caso de Uso
Por qué la necesitas

## Solución Propuesta
Cómo imaginas que funcione

## Alternativas
Otras soluciones posibles

## Contexto Adicional
Screenshots, links, etc.
```

---

## ✅ Aspectos a Mejorar

Áreas donde puedes contribuir:

- [ ] Agregar tests unitarios
- [ ] Mejorar documentación
- [ ] Optimizar rendimiento
- [ ] Agregar nuevas escenas
- [ ] Mejorar UI/UX
- [ ] Soportar nuevos idiomas
- [ ] Agregar funcionalidades (logros, etc)

---

## 📞 Contacto

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: (si aplica)

---

## 🎓 Recursos

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Git Workflow](https://guides.github.com/introduction/flow/)

---

**¡Gracias por contribuir! Tu ayuda hace que este proyecto sea mejor para todos.**
