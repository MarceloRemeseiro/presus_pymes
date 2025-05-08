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

# Iniciar la aplicación
echo "Iniciando servidor Next.js..."
exec "$@" 