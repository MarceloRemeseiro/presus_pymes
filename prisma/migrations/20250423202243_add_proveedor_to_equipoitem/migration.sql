-- AlterTable
ALTER TABLE "EquipoItem" ADD COLUMN     "proveedorId" TEXT;

-- AddForeignKey
ALTER TABLE "EquipoItem" ADD CONSTRAINT "EquipoItem_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
