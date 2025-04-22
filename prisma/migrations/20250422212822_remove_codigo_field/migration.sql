/*
  Warnings:

  - You are about to drop the column `codigo` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `Producto` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Cliente_codigo_key";

-- DropIndex
DROP INDEX "Producto_codigo_key";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "codigo";

-- AlterTable
ALTER TABLE "EquipoItem" ADD COLUMN     "precioCompra" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "codigo";
