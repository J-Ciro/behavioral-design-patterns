# 🚀 Guía Rápida de Inicio

## En 3 Pasos

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno (Opcional)
```bash
cp .env.example .env.local
# Edita .env.local con tus credenciales de Firebase
```

### 3. Ejecutar en Desarrollo
```bash
npm run dev
```

La aplicación se abrirá automáticamente en **http://localhost:3000**

---

## 📚 Documentación

- **README.md** - Documentación completa del proyecto
- **ARCHITECTURE.md** - Explicación de la arquitectura
- **CONTRIBUTING.md** - Cómo contribuir
- **PROJECT_SUMMARY.md** - Resumen de lo implementado
- **CHECKLIST.md** - Verificación de completitud

---

## 🎮 Cómo Jugar

1. Lee la escena que aparece
2. Haz clic en una opción para avanzar
3. Guarda tu progreso con el botón "Guardar"
4. Carga un guardado anterior desde el panel derecho
5. Reinicia la aventura cuando quieras

---

## 🛠️ Comandos Disponibles

```bash
npm run dev          # Desarrollo con hot reload
npm run build        # Compilar para producción
npm run preview      # Ver preview del build
npm run lint         # Verificar código
npm run lint:fix     # Corregir automáticamente
npm run type-check   # Verificar tipos TypeScript
```

---

## 📁 Estructura Importante

```
src/
├── patterns/        # Patrones Iterator y Memento
├── components/      # Componentes React
├── hooks/          # Hooks personalizados
├── services/       # Servicios de negocio
├── config/         # Configuración
└── types/          # Tipos TypeScript
```

---

## ✨ Características Principales

- ✅ Navegación intuitiva entre escenas
- ✅ Sistema de guardado de progreso
- ✅ Patrones de diseño Iterator y Memento
- ✅ Código tipado con TypeScript
- ✅ Componentes React optimizados
- ✅ UI moderna con Tailwind CSS
- ✅ Integración con Firebase (opcional)

---

## 🤔 Preguntas Frecuentes

### ¿Es obligatorio configurar Firebase?
No, el proyecto funciona sin Firebase. Solo necesitas configurarlo si quieres autenticación.

### ¿Puedo agregar más escenas?
Sí, edita `src/config/adventureScenes.ts` y agrega nuevas escenas.

### ¿Dónde se guardan los puntos de control?
En memoria del navegador. Para persistencia, implementa Firestore.

### ¿Cómo agrego nuevas features?
Sigue la guía en `CONTRIBUTING.md`

---

## 🐛 Solución de Problemas

### Puerto 3000 ocupado
```bash
# Usa otro puerto
npm run dev -- --port 3001
```

### Error de dependencias
```bash
# Limpia e reinstala
rm -rf node_modules package-lock.json
npm install
```

### Error de tipos
```bash
npm run type-check
# Verifica el output
```

---

## 📞 Necesitas Ayuda?

1. Revisa los archivos MD de documentación
2. Verifica los comentarios en el código
3. Lee los ejemplos en los componentes

---

**¡Listo para jugar! 🎮**

Ejecuta `npm run dev` y disfruta de la aventura.
