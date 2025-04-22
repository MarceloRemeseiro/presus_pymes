-- CreateEnum
CREATE TYPE "EstadoEquipo" AS ENUM ('DISPONIBLE', 'EN_USO', 'EN_REPARACION', 'BAJA');

-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "marcaId" TEXT,
ADD COLUMN     "modelo" TEXT,
ADD COLUMN     "precioAlquiler" DOUBLE PRECISION,
ADD COLUMN     "precioCompra" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Marca" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipoItem" (
    "id" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "numeroSerie" TEXT,
    "notasInternas" TEXT,
    "estado" "EstadoEquipo" NOT NULL DEFAULT 'DISPONIBLE',
    "fechaCompra" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipoItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Marca_nombre_key" ON "Marca"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "EquipoItem_productoId_numeroSerie_key" ON "EquipoItem"("productoId", "numeroSerie");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "Marca"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipoItem" ADD CONSTRAINT "EquipoItem_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
