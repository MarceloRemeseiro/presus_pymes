-- CreateTable
CREATE TABLE "PresupuestoProveedor" (
    "id" TEXT NOT NULL,
    "presupuestoId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DOUBLE PRECISION NOT NULL,
    "precioConIVA" BOOLEAN NOT NULL,
    "proveedorId" TEXT,
    "archivoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PresupuestoProveedor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PresupuestoProveedor" ADD CONSTRAINT "PresupuestoProveedor_presupuestoId_fkey" FOREIGN KEY ("presupuestoId") REFERENCES "Presupuesto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PresupuestoProveedor" ADD CONSTRAINT "PresupuestoProveedor_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
