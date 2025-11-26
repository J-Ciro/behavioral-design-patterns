# 📖 Por Dónde Empezar

Bienvenido al proyecto de **Behavioral Design Patterns**. Aquí te mostramos qué archivo leer según tu necesidad.

---

## 🚀 Quiero Ejecutar el Proyecto

**Tiempo estimado: 3 minutos**

1. Lee: [QUICKSTART.md](./QUICKSTART.md)
2. Ejecuta: `npm install && npm run dev`
3. ¡Juega!

---

## 📚 Quiero Entender el Proyecto

**Tiempo estimado: 30 minutos**

Sigue este orden:

1. **[README.md](./README.md)** - Visión general completa (15 min)
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Cómo está estructurado (15 min)
3. **Explora [src/](./src/)** - Lee el código con comentarios

---

## 🏗️ Quiero Aprender sobre Patrones

**Tiempo estimado: 45 minutos**

1. **[README.md](./README.md)** - Sección "Patrones de Diseño"
2. **[src/patterns/iterator/](./src/patterns/iterator/)** - Código Iterator
3. **[src/patterns/memento/](./src/patterns/memento/)** - Código Memento
4. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Flujo de datos

---

## 💻 Quiero Aprender SOLID

**Tiempo estimado: 30 minutos**

1. **[README.md](./README.md)** - Sección "Principios SOLID"
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Sección "Separación de Responsabilidades"
3. Revisa cada clase en [src/](./src/) viendo cómo aplica SOLID

---

## 🤝 Quiero Contribuir

**Tiempo estimado: 15 minutos**

1. Lee: [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Entiende: [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Clona, crea rama, código, PR

---

## 🔍 Quiero Verificar Completitud

**Tiempo estimado: 5 minutos**

Lee: [CHECKLIST.md](./CHECKLIST.md)

---

## 📄 Quiero Ver el Código Original

**Tiempo estimado: 10 minutos**

Lee: [ORIGINAL_CODE.md](./ORIGINAL_CODE.md)

---

## 🎓 Quiero Aprender Clean Code

**Tiempo estimado: 20 minutos**

1. **[README.md](./README.md)** - Sección "Clean Code"
2. **Explora [src/](./src/)** - Lee comentarios en el código
3. Compara con [ORIGINAL_CODE.md](./ORIGINAL_CODE.md)

---

## 🔧 Configuración Específica

### ¿Cómo Agregar Firebase?

1. Edita `.env.local` (copia de `.env.example`)
2. Agrega tus credenciales
3. Reinicia el servidor

### ¿Cómo Agregar Nuevas Escenas?

1. Abre `src/config/adventureScenes.ts`
2. Agrega tu escena al array
3. Asegúrate de que los IDs sean únicos

### ¿Cómo Ejecutar Tests?

Ver próximas versiones. El código está preparado para testing.

---

## 📊 Estructura de Documentación

```
Documentación/
├── README.md           ← Comienza aquí
├── QUICKSTART.md       ← Inicio en 3 pasos
├── ARCHITECTURE.md     ← Arquitectura detallada
├── CONTRIBUTING.md     ← Contribuir al proyecto
├── CHECKLIST.md        ← Verificación de completitud
├── PROJECT_SUMMARY.md  ← Resumen de lo hecho
├── ORIGINAL_CODE.md    ← Código original antes de refactorizar
├── START_HERE.md       ← Este archivo
└── .env.example        ← Variables de entorno
```

---

## 🎯 Rutas de Aprendizaje

### Para Principiantes
1. QUICKSTART.md
2. README.md (sin secciones técnicas)
3. Juega la aventura
4. Lee ARCHITECTURE.md
5. Explora src/components/

### Para Intermedios
1. README.md (completo)
2. ARCHITECTURE.md
3. CONTRIBUTING.md
4. Explora todo en src/
5. Modifica el código

### Para Avanzados
1. ARCHITECTURE.md
2. Revisa patrones en src/patterns/
3. Revisa servicios en src/services/
4. Diseña mejoras
5. Contribuye

---

## 🤔 Preguntas Rápidas

### ¿Dónde está el componente principal?
`src/components/AdventureGame/AdventureGame.tsx`

### ¿Dónde están los patrones?
`src/patterns/` - Iterator y Memento

### ¿Dónde está la configuración del juego?
`src/config/adventureScenes.ts`

### ¿Cómo agrego estilos?
El proyecto usa **Tailwind CSS**. Edita los `className` en componentes.

### ¿Dónde están los tipos?
`src/types/index.ts`

### ¿Puedo usarlo como base para otro proyecto?
¡Claro! El código es profesional y reutilizable.

---

## 📈 Progresión Típica

```
Día 1:
├─ Lees QUICKSTART.md
├─ Ejecutas npm install && npm run dev
└─ Juegas la aventura

Día 2:
├─ Lees README.md
├─ Entiendes patrones
└─ Revisa ARCHITECTURE.md

Día 3:
├─ Explora src/patterns/
├─ Entiende servicios
└─ Lee CONTRIBUTING.md

Día 4:
├─ Haces cambios
├─ Mejoras componentes
└─ Contribuyes ideas
```

---

## 💡 Consejos

1. **Lee el código, no solo documentación**. Los comentarios son educativos.
2. **Ejecuta el proyecto**. Ver funcionar ayuda a entender.
3. **Modifica y experimenta**. No tengas miedo de cambiar.
4. **Haz preguntas**. GitHub Issues son bienvenidas.
5. **Contribuye**. Tus ideas hacen el proyecto mejor.

---

## 🎓 Recursos Externos

### Patrones de Diseño
- [Refactoring Guru](https://refactoring.guru/design-patterns)
- [Gang of Four Book](https://en.wikipedia.org/wiki/Design_Patterns)

### SOLID
- [Uncle Bob - SOLID](https://blog.cleancoder.com/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)

### React & TypeScript
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Clean Code
- [Clean Code Book](https://www.oreilly.com/library/view/clean-code-a/9780136083238/)

---

## ✅ Checklist de Orientación

- [ ] Leí QUICKSTART.md
- [ ] Ejecuté `npm install`
- [ ] Ejecuté `npm run dev`
- [ ] Jugué la aventura
- [ ] Leí README.md
- [ ] Exploré src/components/
- [ ] Exploré src/patterns/
- [ ] Leí ARCHITECTURE.md
- [ ] Entiendo los patrones
- [ ] Entiendo SOLID
- [ ] Estoy listo para modificar

---

**¿Listo? ¡Empieza con [QUICKSTART.md](./QUICKSTART.md)! 🚀**
