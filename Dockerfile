# Usa una imagen oficial de Node.js (Debian-based slim version)
FROM node:20-slim

WORKDIR /app

# Instala OpenSSL y limpia el caché de apt
RUN apt-get update && apt-get install -y openssl --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Copia los archivos de definición de paquetes y el lockfile
COPY package*.json ./

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Copia el esquema de Prisma
COPY prisma ./prisma/

# Genera el cliente de Prisma (después de instalar dependencias y copiar schema)
RUN npx prisma generate

# Copia el resto del código de la aplicación
COPY . .

# Construye la aplicación Next.js para producción
RUN npm run build

# Expone el puerto en el que corre la aplicación Next.js
EXPOSE 3000

# Comando por defecto para correr la aplicación
# Ejecuta las migraciones de Prisma y luego inicia la aplicación
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]