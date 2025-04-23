"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import { 
  ArrowLeft, 
  FileDown, 
  FileEdit, 
  Loader2, 
  Calendar,
  Clock,
  ClipboardList,
  Printer,
  Trash
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/utils'
import { EliminarPresupuestoDialog } from '@/components/presupuestos/eliminar-presupuesto-dialog'
import { EstadoBadge } from '@/components/presupuestos/estado-badge'
import { CambiarEstadoDialog } from '@/components/presupuestos/cambiar-estado-dialog'

interface Presupuesto {
  id: string
  numero: string
  nombre?: string | null
  referencia?: string | null
  fecha: string
  fechaValidez: string
  fechaMontaje?: string | null
  fechaInicio?: string | null
  fechaFin?: string | null
  clienteId?: string
  cliente?: {
    nombre: string
    email?: string | null
    telefono?: string | null
    direccion?: string | null
    nif?: string | null
  }
  estado: "PENDIENTE" | "APROBADO" | "RECHAZADO" | "FACTURADO"
  observaciones?: string | null
  subtotal: number
  iva: number
  total: number
  items: ItemPresupuesto[]
}

interface ItemPresupuesto {
  id: string
  productoId: string
  producto: {
    nombre: string
    descripcion: string | null
    precioBase: number
  }
  cantidad: number
  precioUnitario: number
  descuento: number
  iva: number
  total: number
  dias?: number
  partidaId?: string | null
  partida?: {
    id: string
    nombre: string
  } | null
  tipo?: string | null
  nombre?: string
}

export default function PresupuestoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [presupuesto, setPresupuesto] = useState<Presupuesto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [presupuestoId, setPresupuestoId] = useState<string | null>(null)

  // Extraer el ID del presupuesto de forma segura
  useEffect(() => {
    const extractParams = async () => {
      try {
        const resolvedParams = await params
        setPresupuestoId(resolvedParams.id)
      } catch (err) {
        console.error('Error al resolver parámetros:', err)
        setError('Error al cargar los parámetros de la página.')
      }
    }
    
    extractParams()
  }, [params])

  // Cargar datos del presupuesto cuando tenemos el ID
  useEffect(() => {
    if (!presupuestoId) return
    
    const fetchPresupuesto = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/presupuestos/${presupuestoId}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Presupuesto no encontrado")
          }
          throw new Error("Error al cargar el presupuesto")
        }
        
        const data = await response.json()
        setPresupuesto(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar presupuesto:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar el presupuesto')
        toast.error('Error al cargar presupuesto')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPresupuesto()
  }, [presupuestoId])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '--'
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  // Agrupar items por partida
  const getItemsGroupedByPartida = () => {
    if (!presupuesto || !presupuesto.items || presupuesto.items.length === 0) {
      return []
    }

    interface GroupedItems {
      partidaId: string | null
      partidaNombre: string
      items: ItemPresupuesto[]
      subtotal: number
    }

    const groupedItems: GroupedItems[] = []
    const sinPartida: ItemPresupuesto[] = []

    // Agrupar items por partida
    presupuesto.items.forEach(item => {
      // Calcular el subtotal real del item (sin IVA)
      const itemSubtotal = item.cantidad * item.precioUnitario * (item.dias || 1) * (1 - item.descuento / 100)
      
      if (item.partidaId && item.partida) {
        // Buscar si ya existe el grupo
        const groupIndex = groupedItems.findIndex(g => g.partidaId === item.partidaId)
        
        if (groupIndex >= 0) {
          // Agregar al grupo existente
          groupedItems[groupIndex].items.push(item)
          groupedItems[groupIndex].subtotal += itemSubtotal
        } else {
          // Crear nuevo grupo
          groupedItems.push({
            partidaId: item.partidaId,
            partidaNombre: item.partida.nombre,
            items: [item],
            subtotal: itemSubtotal
          })
        }
      } else {
        // Items sin partida
        sinPartida.push(item)
      }
    })

    // Si hay items sin partida, agregarlos como un grupo especial
    if (sinPartida.length > 0) {
      const subtotal = sinPartida.reduce((sum, item) => {
        const itemSubtotal = item.cantidad * item.precioUnitario * (item.dias || 1) * (1 - item.descuento / 100)
        return sum + itemSubtotal
      }, 0)
      
      groupedItems.push({
        partidaId: null,
        partidaNombre: "Otros elementos",
        items: sinPartida,
        subtotal
      })
    }

    return groupedItems
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Cargando presupuesto...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error}</p>
          <Button asChild className="mt-4">
            <Link href="/presupuestos">Volver a presupuestos</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!presupuesto) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>No se encontró el presupuesto solicitado</p>
          <Button asChild className="mt-4">
            <Link href="/presupuestos">Volver a presupuestos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Cabecera y acciones */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/presupuestos">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Presupuesto #{presupuesto.numero}</h1>
            {presupuesto.nombre && <p className="text-sm text-muted-foreground">{presupuesto.nombre}</p>}
          </div>
          <EstadoBadge estado={presupuesto.estado} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button 
            variant="outline" 
            className="gap-1"
            asChild
          >
            <Link href={`/presupuestos/editar/${presupuesto.id}`}>
              <FileEdit className="h-4 w-4" />
              Editar
            </Link>
          </Button>
          <EliminarPresupuestoDialog
            presupuestoId={presupuesto.id}
            presupuestoNumero={presupuesto.numero}
            trigger={
              <Button 
                variant="outline" 
                className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              >
                <Trash className="h-4 w-4" />
                Eliminar
              </Button>
            }
          />
          <CambiarEstadoDialog
            presupuestoId={presupuesto.id}
            estadoActual={presupuesto.estado}
            onEstadoCambiado={(nuevoEstado) => {
              if (presupuesto) {
                setPresupuesto({
                  ...presupuesto,
                  estado: nuevoEstado
                });
              }
            }}
            trigger={
              <Button variant="default" className="gap-1">
                <ClipboardList className="h-4 w-4" />
                Cambiar estado
              </Button>
            }
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Información del cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {presupuesto.cliente ? (
              <>
                <p className="font-medium">{presupuesto.cliente.nombre}</p>
                {presupuesto.cliente.direccion && <p>{presupuesto.cliente.direccion}</p>}
                {presupuesto.cliente.email && <p>Email: {presupuesto.cliente.email}</p>}
                {presupuesto.cliente.telefono && <p>Tel: {presupuesto.cliente.telefono}</p>}
              </>
            ) : (
              <div className="text-muted-foreground italic">
                <p>No hay cliente seleccionado</p>
                <p className="text-xs mt-2">Edite el presupuesto para asignar un cliente</p>
              </div>
            )}
            {presupuesto.referencia && (
              <div className="mt-4 pt-4 border-t border-border">
                <p><span className="text-muted-foreground">Ref: </span>{presupuesto.referencia}</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Fechas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fechas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Emisión:</span> {formatDate(presupuesto.fecha)}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Validez:</span> {formatDate(presupuesto.fechaValidez)}
            </div>
            {presupuesto.fechaMontaje && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Montaje:</span> {formatDate(presupuesto.fechaMontaje)}
              </div>
            )}
            {presupuesto.fechaInicio && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Inicio:</span> {formatDate(presupuesto.fechaInicio)}
              </div>
            )}
            {presupuesto.fechaFin && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Fin:</span> {formatDate(presupuesto.fechaFin)}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Totales */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal (sin IVA):</span>
              <span>{formatCurrency(presupuesto.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA:</span>
              <span>{formatCurrency(presupuesto.iva)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total (con IVA):</span>
              <span>{formatCurrency(presupuesto.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detalles del presupuesto */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle del presupuesto</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Renderizar cada partida y sus items */}
          {getItemsGroupedByPartida().map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h3 className="text-md font-medium mb-2">{group.partidaNombre}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Días</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Descuento</TableHead>
                    <TableHead>Subtotal (sin IVA)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.items.map((item) => (
                    item.tipo === "CATEGORIA" ? (
                      // Categoría como subcabecera
                      <TableRow key={item.id} className="bg-muted/40">
                        <TableCell colSpan={6} className="font-semibold">
                          {item.nombre || item.producto?.nombre || "Categoría sin nombre"}
                        </TableCell>
                      </TableRow>
                    ) : item.tipo === "SEPARADOR" ? (
                      // Separador igual que categoría pero con texto centrado
                      <TableRow key={item.id} className="bg-muted/40">
                        <TableCell colSpan={6} className="py-2 text-center">
                          <div className="text-sm">
                            {item.nombre || item.producto?.nombre || "Separador"}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.producto.nombre}</TableCell>
                        <TableCell>{item.dias || 1}</TableCell>
                        <TableCell>{item.cantidad}</TableCell>
                        <TableCell>{formatCurrency(item.precioUnitario)}</TableCell>
                        <TableCell>{item.descuento > 0 ? `${item.descuento}%` : '-'}</TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(item.cantidad * item.precioUnitario * (item.dias || 1) * (1 - item.descuento / 100))}
                        </TableCell>
                      </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {/* Observaciones */}
      {presupuesto.observaciones && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Observaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{presupuesto.observaciones}</p>
          </CardContent>
        </Card>
      )}
      
      <Toaster />
    </div>
  )
} 