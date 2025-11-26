#!/bin/bash

# Script de instalación y configuración rápida
# Ejecutar con: bash setup.sh

echo "🚀 Iniciando configuración del proyecto..."
echo "================================"

# Verificar Node.js
echo "✓ Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Descárgalo en https://nodejs.org"
    exit 1
fi
NODE_VERSION=$(node --version)
echo "   Node.js $NODE_VERSION encontrado"

# Instalar dependencias
echo ""
echo "📦 Instalando dependencias..."
npm install

# Crear archivo .env.local
echo ""
echo "🔧 Configurando variables de entorno..."
if [ ! -f ".env.local" ]; then
    echo "   Creando .env.local..."
    cp .env.example .env.local
    echo "   ⚠️  Edita .env.local con tus credenciales de Firebase"
else
    echo "   ✓ .env.local ya existe"
fi

# Verificar instalación
echo ""
echo "✅ Verificando instalación..."
npm run type-check > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✓ Type checking OK"
else
    echo "   ⚠️  Error en type checking"
fi

echo ""
echo "================================"
echo "✨ ¡Configuración completada!"
echo ""
echo "Próximos pasos:"
echo "  1. Edita .env.local con tus credenciales Firebase"
echo "  2. Ejecuta: npm run dev"
echo "  3. La app se abrirá en http://localhost:3000"
echo ""
echo "Comandos útiles:"
echo "  npm run dev        - Desarrollo con hot reload"
echo "  npm run build      - Compilar para producción"
echo "  npm run lint       - Verificar código"
echo "  npm run type-check - Verificar tipos TypeScript"
echo ""
