-- AlterTable
ALTER TABLE "PresupuestoProveedor" ADD COLUMN     "partidaId" TEXT;

-- AddForeignKey
ALTER TABLE "PresupuestoProveedor" ADD CONSTRAINT "PresupuestoProveedor_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "partidas_presupuesto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
