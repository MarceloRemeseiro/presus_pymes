import { prisma } from '@/lib/prisma'

export type Gasto = {
  id: string
  documentoNombre: string | null
  documentoFecha: Date | null
  proveedor: {
    id: string
    nombre: string
  } | null
  nombre: string
  precio: number
  precioConIVA?: boolean
  descripcion?: string | null
  factura: {
    id: string
    numero: string
    estado: string
    fecha: Date
  } | null
  partida: {
    id: string
    nombre: string
  } | null
  createdAt: Date
  tipoEspecial: string | null
}

export async function obtenerGastos() {
  const gastos = await prisma.facturaProveedor.findMany({
    include: {
      proveedor: {
        select: {
          id: true,
          nombre: true,
        },
      },
      factura: {
        select: {
          id: true,
          numero: true,
          estado: true,
          fecha: true,
        },
      },
      partida: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
    orderBy: [
      { documentoFecha: 'desc' },
      { createdAt: 'desc' },
    ],
  })

  return gastos
}

export async function obtenerGasto(id: string) {
  const gasto = await prisma.facturaProveedor.findUnique({
    where: { id },
    include: {
      proveedor: true,
      factura: true,
      partida: true,
    },
  })

  return gasto
}

export async function crearGasto(data: any) {
  const gasto = await prisma.facturaProveedor.create({
    data,
  })

  return gasto
}

export async function actualizarGasto(id: string, data: any) {
  const gasto = await prisma.facturaProveedor.update({
    where: { id },
    data,
  })

  return gasto
}

export async function eliminarGasto(id: string) {
  await prisma.facturaProveedor.delete({
    where: { id },
  })

  return { success: true }
}

export async function obtenerProveedores() {
  const proveedores = await prisma.proveedor.findMany({
    orderBy: { nombre: 'asc' },
    select: {
      id: true,
      nombre: true,
    },
  })

  return proveedores
}

export async function obtenerPartidas() {
  const partidas = await prisma.partidaPresupuesto.findMany({
    orderBy: { nombre: 'asc' },
    select: {
      id: true,
      nombre: true,
    },
  })

  return partidas
}

export async function obtenerFacturas() {
  const facturas = await prisma.factura.findMany({
    orderBy: { fecha: 'desc' },
    select: {
      id: true,
      numero: true,
      fecha: true,
      cliente: {
        select: {
          id: true,
          nombre: true,
        },
      },
    },
  })

  return facturas
} 