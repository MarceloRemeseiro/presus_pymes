-- CreateTable
CREATE TABLE "FacturaProveedor" (
    "id" TEXT NOT NULL,
    "facturaId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DOUBLE PRECISION NOT NULL,
    "precioConIVA" BOOLEAN NOT NULL,
    "proveedorId" TEXT,
    "partidaId" TEXT,
    "tipoEspecial" TEXT,
    "archivoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacturaProveedor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FacturaProveedor" ADD CONSTRAINT "FacturaProveedor_facturaId_fkey" FOREIGN KEY ("facturaId") REFERENCES "Factura"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacturaProveedor" ADD CONSTRAINT "FacturaProveedor_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacturaProveedor" ADD CONSTRAINT "FacturaProveedor_partidaId_fkey" FOREIGN KEY ("partidaId") REFERENCES "partidas_presupuesto"("id") ON DELETE SET NULL ON UPDATE CASCADE;
