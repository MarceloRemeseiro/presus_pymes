# Configuración de Base de Datos y Entornos

Este proyecto utiliza PostgreSQL como base de datos y Prisma como ORM. A continuación se detallan los pasos para configurar entornos de desarrollo y producción.

## Requisitos previos

- Docker y Docker Compose instalados en tu sistema
- Node.js y npm (según las versiones especificadas en package.json)

## Configuración de la base de datos con Docker (Desarrollo)

1. Inicia la base de datos PostgreSQL usando Docker Compose:

```bash
docker-compose up -d
```

Este comando iniciará un contenedor de PostgreSQL con los siguientes parámetros:
- Puerto: 5432 (accesible localmente)
- Usuario: postgres
- Contraseña: postgres
- Base de datos: presus_pymes

## Configuración de entornos

### Entorno de Desarrollo

1. Crea un archivo `.env.development` en la raíz del proyecto con el siguiente contenido:

```
# Variables de entorno para DESARROLLO
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/presus_pymes"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

2. Para usar este entorno, ejecuta la aplicación con:

```bash
NODE_ENV=development npm run dev
```

3. Para ejecutar migraciones de Prisma en desarrollo:

```bash
NODE_ENV=development npx prisma migrate dev
```

### Entorno de Producción

1. Crea un archivo `.env.production` en la raíz del proyecto con el siguiente contenido:

```
# Variables de entorno para PRODUCCIÓN
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/nombre_db"
NEXT_PUBLIC_APP_URL="https://tu-dominio.com"
```

2. Para usar este entorno en producción:

```bash
NODE_ENV=production npm run start
```

3. Para aplicar migraciones en producción (sin generar nuevas migraciones):

```bash
NODE_ENV=production npx prisma migrate deploy
```

## Script de ayuda para gestionar entornos

Para facilitar el cambio entre entornos, puedes crear un script en `package.json`:

```json
"scripts": {
  "dev": "NODE_ENV=development next dev --turbopack",
  "build": "NODE_ENV=production next build",
  "start": "NODE_ENV=production next start",
  "prisma:dev": "NODE_ENV=development prisma migrate dev",
  "prisma:deploy": "NODE_ENV=production prisma migrate deploy",
  "prisma:studio": "NODE_ENV=development prisma studio"
}
```

## Gestión del contenedor Docker

- Para detener el contenedor: `docker-compose stop`
- Para iniciar el contenedor: `docker-compose start`
- Para detener y eliminar el contenedor: `docker-compose down`
- Para detener y eliminar el contenedor y los volúmenes (borrando todos los datos): `docker-compose down -v`

## Configuración de Prisma para múltiples entornos

Para que Prisma utilice el archivo de entorno correcto según el valor de NODE_ENV, crea un archivo `prisma/index.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

// Usa variables de entorno específicas según NODE_ENV
// Prisma usa automáticamente DATABASE_URL de .env.development o .env.production

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## Solución de problemas

Si encuentras problemas de conexión a la base de datos, verifica:

1. Que el contenedor esté en ejecución: `docker ps`
2. Que puedas conectarte a la base de datos: `docker exec -it presus-pymes-db psql -U postgres`
3. Que la URL de conexión en tu archivo de entorno sea correcta
4. Que estés usando el valor correcto de NODE_ENV para el entorno deseado 