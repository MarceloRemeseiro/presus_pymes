#!/bin/sh
set -e

UPLOADS_DIR="/app/public/uploads"

echo "Running as $(id)"

# Asegurar que el directorio de uploads exista (puede ser creado por el mount)
echo "Verificando directorio de uploads: $UPLOADS_DIR"
if [ ! -d "$UPLOADS_DIR" ]; then
  echo "Creando directorio de uploads..."
  mkdir -p "$UPLOADS_DIR"
  echo "Directorio de uploads creado."
fi

# Cambiar propietario del directorio montado al usuario/grupo nextjs (UID/GID 1001)
echo "Asegurando propiedad de $UPLOADS_DIR para el usuario 1001:1001..."
chown -R 1001:1001 "$UPLOADS_DIR"

# Opcional: Establecer permisos si es necesario (chown debería ser suficiente)
# echo "Estableciendo permisos para $UPLOADS_DIR..."
# chmod -R 777 "$UPLOADS_DIR"

echo "Permisos de $UPLOADS_DIR después de chown:"
ls -la /app/public

echo "Contenido de $UPLOADS_DIR después de chown:"
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

# Identificar usuario actual
echo "Usuario actual ejecutando la aplicación:"
id

# Iniciar la aplicación
echo "Iniciando servidor Next.js..."
exec su-exec nextjs "$@" 