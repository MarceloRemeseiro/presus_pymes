#!/bin/sh
set -e

# Verificar y crear el directorio de uploads si no existe
UPLOADS_DIR="/app/public/uploads"
echo "Verificando directorio de uploads: $UPLOADS_DIR"
if [ ! -d "$UPLOADS_DIR" ]; then
  echo "Creando directorio de uploads..."
  mkdir -p "$UPLOADS_DIR"
  echo "Directorio de uploads creado."
else
  echo "El directorio de uploads ya existe."
fi

# Verificar permisos
echo "Verificando permisos del directorio de uploads..."
if [ ! -w "$UPLOADS_DIR" ]; then
  echo "ADVERTENCIA: El directorio de uploads no tiene permisos de escritura."
  echo "Intentando corregir permisos..."
  chmod -R 777 "$UPLOADS_DIR" || true
else
  echo "Permisos del directorio de uploads OK."
fi

# Mostrar información del directorio
ls -la "$UPLOADS_DIR"

# Verificar estructura de archivos clave
echo "Verificando archivos clave de la aplicación..."
if [ -f "/app/server.js" ]; then
  echo "✅ server.js encontrado"
else
  echo "❌ ERROR: server.js no encontrado"
  echo "Contenido del directorio raíz:"
  ls -la /app
fi

# Verificar estructura de .next
if [ -d "/app/.next" ]; then
  echo "✅ Directorio .next encontrado"
  echo "Contenido de .next:"
  ls -la /app/.next
else
  echo "❌ ERROR: Directorio .next no encontrado"
fi

# Iniciar la aplicación
echo "Iniciando servidor Next.js..."
exec "$@" 