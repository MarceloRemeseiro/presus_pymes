/*
  Warnings:

  - You are about to drop the `configuracion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "configuracion";

-- CreateTable
CREATE TABLE "Configuracion" (
    "id" TEXT NOT NULL,
    "ivaPorDefecto" DOUBLE PRECISION NOT NULL DEFAULT 21,
    "moneda" TEXT NOT NULL DEFAULT 'EUR',
    "prefijoFactura" TEXT NOT NULL DEFAULT 'FAC-',
    "prefijoPresupuesto" TEXT NOT NULL DEFAULT 'PRES-',
    "colorFactura" TEXT DEFAULT '#2563eb',
    "colorPresupuesto" TEXT DEFAULT '#84cc16',
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuracion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
