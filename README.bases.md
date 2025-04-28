# Configuración de Entornos

Este proyecto utiliza Next.js con configuración de entornos separados para desarrollo y producción.

## Entorno de Desarrollo

Ya está configurado con el archivo `.env.development` que contiene:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/presus_pymes"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Para iniciar el entorno de desarrollo:

1. Inicia la base de datos con Docker:
   ```bash
   npm run docker:up
   ```

2. Ejecuta las migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Entorno de Producción

1. Crea un archivo `.env.production` basado en el ejemplo proporcionado en `.env.production.example`

2. Reemplaza los valores con los datos reales de tu servidor de producción

3. Para construir e iniciar la aplicación en producción:
   ```bash
   npm run build
   npm run start
   ```

4. Para aplicar migraciones en producción (sin generar nuevas):
   ```bash
   NODE_ENV=production npx prisma migrate deploy
   ```

## Eliminando los scripts innecesarios

Los scripts `setup-dev-env.sh` y `setup-prod-env.sh` ya no son necesarios porque Next.js usa automáticamente los archivos `.env.development` y `.env.production` según el entorno. Puedes eliminarlos con:

```bash
rm setup-dev-env.sh setup-prod-env.sh
``` 