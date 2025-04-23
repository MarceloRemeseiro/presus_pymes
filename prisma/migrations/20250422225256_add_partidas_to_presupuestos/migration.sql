-- AlterTable
ALTER TABLE "ItemPresupuesto" ADD COLUMN     "partidaId" TEXT;

-- AlterTable
ALTER TABLE "Presupuesto" ADD COLUMN     "fechaFin" TIMESTAMP(3),
ADD COLUMN     "fechaInicio" TIMESTAMP(3),
ADD COLUMN     "fechaMontaje" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "partidas_presupuesto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partidas_presupuesto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemPresupuesto" ADD CONSTRAINT "ItemPresupuesto_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "partidas_presupuesto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
