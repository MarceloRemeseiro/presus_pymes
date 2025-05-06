/*
  Warnings:

  - The values [PAGADA] on the enum `EstadoFactura` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EstadoFactura_new" AS ENUM ('PENDIENTE', 'ENVIADA', 'COBRADA', 'VENCIDA', 'ANULADA');
ALTER TABLE "Factura" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "Factura" ALTER COLUMN "estado" TYPE "EstadoFactura_new" USING ("estado"::text::"EstadoFactura_new");
ALTER TYPE "EstadoFactura" RENAME TO "EstadoFactura_old";
ALTER TYPE "EstadoFactura_new" RENAME TO "EstadoFactura";
DROP TYPE "EstadoFactura_old";
ALTER TABLE "Factura" ALTER COLUMN "estado" SET DEFAULT 'PENDIENTE';
COMMIT;
