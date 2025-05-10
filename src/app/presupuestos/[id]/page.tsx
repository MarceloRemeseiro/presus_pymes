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
  Trash,
  PlusCircle,
  CheckCircleIcon,
  XCircleIcon,
  TimerIcon,
  FileText,
  Download,
  ChevronDown
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
import { PresupuestoProveedorDialog } from '@/components/presupuestos/presupuesto-proveedor-dialog'
import { MargenCard } from "@/components/presupuestos/margen-card"
import { generatePresupuestoPDF } from '@/lib/utils/pdfGenerator'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  presupuestosProveedores?: PresupuestoProveedor[]
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

interface PresupuestoProveedor {
  id: string
  proveedorId: string
  proveedor: {
    id: string
    nombre: string
  }
  nombre: string
  descripcion?: string | null
  precio: number
  precioConIVA: boolean
  tipoEspecial?: string | null
  partidaId?: string | null
  archivoUrl?: string | null
  documentoNombre?: string | null
  documentoFecha?: string | null
  createdAt: string
  updatedAt: string
}

// Agregar interfaz para datos de la empresa
interface Empresa {
  id: string;
  nombre: string;
  cif: string;
  direccion: string;
  email: string;
  telefono: string;
  logoUrl?: string | null;
}

// Función auxiliar para limpiar nombres de archivo
function sanitizeFilename(filename: string): string {
  // Reemplaza caracteres no permitidos en nombres de archivo con guion bajo
  // Permite letras, números, guiones bajos, guiones y puntos.
  return filename.replace(/[^a-z0-9_.-]/gi, '_').replace(/_+/g, '_');
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
    const date = new Date(dateString)
    // Ajustar la fecha para evitar problemas de zona horaria
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    return format(date, 'dd/MM/yyyy', { locale: es })
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

  // Manejar cambio de estado
  const handleChangeEstado = async (nuevoEstado: string) => {
    try {
      if (!presupuestoId) return;
      
      const response = await fetch(`/api/presupuestos/${presupuestoId}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (!response.ok) {
        throw new Error("Error al cambiar el estado del presupuesto");
      }

      // Actualizar el presupuesto en el estado local
      setPresupuesto((prevPresupuesto) => 
        prevPresupuesto ? 
          { ...prevPresupuesto, estado: nuevoEstado as Presupuesto["estado"] } : 
          null
      );

      toast.success("Estado actualizado");
    } catch (error) {
      toast.error("No se pudo actualizar el estado del presupuesto");
      console.error("Error al actualizar estado del presupuesto:", error);
    }
  };

  // Función para imprimir el presupuesto
  const handleImprimirPresupuesto = async (nivelDetalle: 'completo' | 'medio' | 'minimo' = 'completo') => {
    if (!presupuesto) return;
    
    toast.loading('Generando PDF...');
    
    try {
      // Obtener datos de la empresa para el PDF
      const empresaResponse = await fetch('/api/empresa');
      if (!empresaResponse.ok) {
        throw new Error('Error al obtener datos de la empresa');
      }
      const empresa: Empresa = await empresaResponse.json();
      
      // Obtener la configuración para el color del presupuesto y las condiciones
      const configResponse = await fetch('/api/configuracion');
      if (!configResponse.ok) {
        throw new Error('Error al obtener configuración');
      }
      const config = await configResponse.json();
      
      // Preparar los datos agrupados
      const partidasAgrupadas = getItemsGroupedByPartida();
      
      // Generar el PDF y abrirlo en nueva pestaña (manejado dentro de generatePresupuestoPDF)
      await generatePresupuestoPDF(
        presupuesto as any, 
        partidasAgrupadas as any,
        empresa,
        config.colorPresupuesto,
        nivelDetalle,
        {
          condicionesPresupuesto: config.condicionesPresupuesto || []
        }
      );
      
      // Cerrar el indicador de carga
      toast.dismiss();
      
    } catch (error) {
      toast.dismiss();
      console.error('Error al generar el PDF:', error);
      toast.error('Error al generar el PDF');
    }
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-1">
                <Printer className="h-4 w-4" />
                Imprimir
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Nivel de detalle</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleImprimirPresupuesto('completo')}>
                Detalle completo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleImprimirPresupuesto('medio')}>
                Detalle medio
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleImprimirPresupuesto('minimo')}>
                Detalle mínimo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          {presupuesto.estado !== "APROBADO" && (
            <Button
              variant="outline"
              className="gap-1 border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => handleChangeEstado("APROBADO")}
            >
              <CheckCircleIcon className="h-4 w-4" />
              Aprobar
            </Button>
          )}
          {presupuesto.estado !== "RECHAZADO" && (
            <Button
              variant="outline"
              className="gap-1 border-red-500 text-red-600 hover:bg-red-50"
              onClick={() => handleChangeEstado("RECHAZADO")}
            >
              <XCircleIcon className="h-4 w-4" />
              Rechazar
            </Button>
          )}
          {presupuesto.estado !== "PENDIENTE" && (
            <Button
              variant="outline"
              className="gap-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
              onClick={() => handleChangeEstado("PENDIENTE")}
            >
              <TimerIcon className="h-4 w-4" />
              Marcar como pendiente
            </Button>
          )}
          <div className="ml-4">
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
          </div>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {/* Datos del presupuesto - columna 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datos de presupuesto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Número:</span>
              <span>{presupuesto.numero}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Estado:</span>
              <EstadoBadge estado={presupuesto.estado} />
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Cliente:</span>
              <span>{presupuesto.cliente?.nombre || "Sin cliente"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Referencia:</span>
              <span>{presupuesto.referencia || "-"}</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Fechas y datos adicionales - columna 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fechas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Columna izquierda de fechas - alineada a la izquierda */}
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Fecha:</span> {formatDate(presupuesto.fecha)}
                </div>
                
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
              </div>
              
              {/* Columna derecha de fechas - alineada a la derecha */}
              <div className="space-y-3 text-right">
              {presupuesto.fechaMontaje && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Montaje:</span> {formatDate(presupuesto.fechaMontaje)}
                  </div>
                )}
                {presupuesto.fechaValidez && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Validez:</span> {formatDate(presupuesto.fechaValidez)}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Totales - columna 3 */}
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
            <div key={groupIndex} className="mb-8 border rounded-lg overflow-hidden">
              <h3 className="text-lg font-bold bg-primary/10 p-4 text-primary-foreground dark:bg-primary/20">
                {group.partidaNombre}
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left py-3 px-4">Descripción</TableHead>
                    <TableHead className="text-left py-3 px-4">Cantidad</TableHead>
                    <TableHead className="text-left py-3 px-4">Días</TableHead>
                    <TableHead className="text-left py-3 px-4">Precio</TableHead>
                    <TableHead className="text-left py-3 px-4">Descuento</TableHead>
                    <TableHead className="text-left py-3 px-4">Subtotal (sin IVA)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.items.map((item) => (
                    item.tipo === "CATEGORIA" ? (
                      // Categoría como subcabecera
                      <TableRow key={item.id} className="bg-secondary/20 dark:bg-secondary/10 border-t border-b">
                        <TableCell colSpan={6} className="font-semibold text-left py-3 px-4">
                          {item.nombre || item.producto?.nombre || "Categoría sin nombre"}
                        </TableCell>
                      </TableRow>
                    ) : item.tipo === "SEPARADOR" ? (
                      // Separador con estilo distintivo
                      <TableRow key={item.id} className="bg-muted/30 dark:bg-muted/10 border-t border-b border-dashed">
                        <TableCell colSpan={6} className="py-2 text-center px-4">
                          <div className="text-sm font-medium text-muted-foreground">
                            {item.nombre || item.producto?.nombre || "Separador"}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={item.id} className="hover:bg-muted/10">
                        <TableCell className="font-medium w-1/3 text-left px-4">{item.tipo === "PERSONAL" || item.tipo === "PERSONALIZADO" ? item.nombre : item.producto.nombre}</TableCell>
                        <TableCell className="text-left px-4">{item.cantidad}</TableCell>
                        <TableCell className="text-left px-4">{item.dias || 1}</TableCell>
                        <TableCell className="text-left px-4">{formatCurrency(item.precioUnitario)}</TableCell>
                        <TableCell className="text-left px-4">{item.descuento > 0 ? `${item.descuento}%` : '-'}</TableCell>
                        <TableCell className="font-medium text-left px-4">
                          {formatCurrency(item.cantidad * item.precioUnitario * (item.dias || 1) * (1 - item.descuento / 100))}
                        </TableCell>
                      </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
              <div className="p-3 bg-muted/20 dark:bg-muted/10 flex justify-end">
                <div className="text-sm font-medium">
                  Subtotal de partida: {formatCurrency(group.subtotal)}
                </div>
              </div>
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
      
      {/* Presupuestos de Proveedores */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Presupuestos de Proveedores</CardTitle>
          <PresupuestoProveedorDialog
            presupuestoId={presupuesto.id}
            onSuccess={() => {
              // Recargar los datos del presupuesto
              if (presupuestoId) {
                fetch(`/api/presupuestos/${presupuestoId}`)
                .then(response => {
                  if (response.ok) return response.json()
                    throw new Error("Error al recargar el presupuesto")
                })
                .then(data => setPresupuesto(data))
                .catch(err => {
                  console.error(err)
                  toast.error("Error al actualizar la información")
                })
              }
            }}
            trigger={
              <Button variant="outline" size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Añadir presupuesto de proveedor
              </Button>
            }
            />
        </CardHeader>
        <CardContent>
          {presupuesto.presupuestosProveedores && presupuesto.presupuestosProveedores.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proveedor</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Notas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {presupuesto.presupuestosProveedores.map((presupuestoProveedor) => (
                  <TableRow key={presupuestoProveedor.id}>
                    <TableCell className="font-medium">
                      {presupuestoProveedor.proveedor?.nombre || 
                       (presupuestoProveedor.nombre && presupuestoProveedor.nombre.includes('GASTOS GENERALES') ? 'GASTOS GENERALES' : 
                        (presupuestoProveedor.nombre && presupuestoProveedor.nombre.includes('FREELANCE') ? 'FREELANCE' : 
                         (presupuestoProveedor.nombre && presupuestoProveedor.nombre.includes('DIETAS') ? 'DIETAS' : 
                          (presupuestoProveedor.tipoEspecial === 'dietas' ? 'DIETAS' : 'Sin proveedor'))))}
                    </TableCell>
                    <TableCell>{formatCurrency(presupuestoProveedor.precio)}</TableCell>
                    <TableCell>{formatDate(presupuestoProveedor.createdAt)}</TableCell>
                    <TableCell>{presupuestoProveedor.descripcion || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        {presupuestoProveedor.archivoUrl && (
                          <>
                            <a 
                              href={presupuestoProveedor.archivoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                              title={presupuestoProveedor.documentoNombre || "Ver documento"}
                            >
                              <FileText className="h-4 w-4" />
                            </a>
                            <a 
                              href={presupuestoProveedor.archivoUrl} 
                              download={presupuestoProveedor.documentoNombre ? `${presupuestoProveedor.documentoNombre}.pdf` : "documento.pdf"}
                              className="inline-flex text-xs px-2 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
                              title="Descargar documento"
                            >
                              <FileDown className="h-4 w-4" />
                            </a>
                          </>
                        )}
                        <PresupuestoProveedorDialog
                        presupuestoId={presupuesto.id}
                        presupuestoProveedorId={presupuestoProveedor.id}
                        proveedorIdInicial={presupuestoProveedor.proveedorId || presupuestoProveedor.tipoEspecial || ""}
                        partidaIdInicial={presupuestoProveedor.partidaId || "sin-partida"}
                        montoInicial={presupuestoProveedor.precio}
                        notasIniciales={presupuestoProveedor.descripcion || ''}
                        archivoUrlInicial={presupuestoProveedor.archivoUrl || ''}
                        documentoNombreInicial={presupuestoProveedor.documentoNombre || ''}
                        documentoFechaInicial={presupuestoProveedor.documentoFecha || ''}
                        onSuccess={() => {
                          // Recargar los datos del presupuesto
                          if (presupuestoId) {
                            fetch(`/api/presupuestos/${presupuestoId}`)
                            .then(response => {
                              if (response.ok) return response.json()
                                throw new Error("Error al recargar el presupuesto")
                            })
                            .then(data => setPresupuesto(data))
                            .catch(err => {
                              console.error(err)
                              toast.error("Error al actualizar la información")
                            })
                          }
                        }}
                        trigger={
                          <Button variant="ghost" size="sm">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                        }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No hay presupuestos de proveedores registrados
            </div>
          )}
        </CardContent>
      </Card>
      {/* Análisis de Margen */}
      {presupuesto.presupuestosProveedores && presupuesto.presupuestosProveedores.length > 0 && (
        <div className="mb-6">
          <MargenCard 
            subtotalPresupuesto={presupuesto.subtotal}
            ivaPresupuesto={presupuesto.iva}
            totalPresupuesto={presupuesto.total}
            presupuestosProveedores={presupuesto.presupuestosProveedores} 
            itemsAgrupados={getItemsGroupedByPartida()}
          />
        </div>
      )}
      
      <Toaster />
    </div>
  )
} 