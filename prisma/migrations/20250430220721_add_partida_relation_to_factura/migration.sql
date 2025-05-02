-- AlterTable
ALTER TABLE "ItemFactura" ADD COLUMN     "partidaId" TEXT;

-- AddForeignKey
ALTER TABLE "ItemFactura" ADD CONSTRAINT "ItemFactura_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "partidas_presupuesto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
