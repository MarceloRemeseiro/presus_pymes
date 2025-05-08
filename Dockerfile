FROM node:20-alpine AS base

# Instalar dependencias solo en la etapa de compilación
FROM base AS deps
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Etapa de compilación: instalar todas las dependencias y compilar
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Configuración específica para Prisma en Docker
RUN npx prisma generate

# Compilar la aplicación Next.js
RUN npm run build

# Etapa de producción: copiar solo los archivos necesarios
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# --- Instalar su-exec ---
RUN apk add --no-cache su-exec

# Crear usuario y grupo para producción
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios desde la etapa de builder
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public/
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next/standalone ./standalone/
COPY --from=builder /app/server.js ./
COPY --from=builder /app/.next/static ./.next/static/
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma/

# Reubicar el contenido de standalone al directorio actual
# Esto es necesario porque Next.js en modo standalone espera encontrar server.js y otros archivos en el directorio raíz, no en ./standalone
RUN cp -r ./standalone/. .
RUN rm -rf ./standalone

# Copiar script de entrada
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Crear directorio de uploads DENTRO de la imagen (será sobreescrito por el mount, pero es buena práctica)
RUN mkdir -p ./public/uploads && chown nextjs:nodejs ./public/uploads

# --- NO cambiar a USER nextjs aquí ---
# USER nextjs # El entrypoint lo hará

# Exponer el puerto
EXPOSE 1011
ENV PORT 1011

# Usar el script de entrada para iniciar la aplicación
ENTRYPOINT ["docker-entrypoint.sh"]
# El comando que ejecutará el entrypoint como usuario nextjs
CMD ["node", "server.js"]