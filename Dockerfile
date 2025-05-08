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

# Crear usuario para producción
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos necesarios desde la etapa de builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma

# Crear directorio de uploads y darle permisos al usuario nextjs
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public/uploads

# Cambiar al usuario non-root para producción
USER nextjs

# Exponer el puerto y definir comando de inicio
EXPOSE 1011
ENV PORT 1011

CMD ["node", "server.js"]