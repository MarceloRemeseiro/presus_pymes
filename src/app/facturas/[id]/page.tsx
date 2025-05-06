"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import {
  ArrowLeft,
  FileEdit,
  Printer,
  CheckCircleIcon,
  XCircleIcon,
  TimerIcon,
  ClockIcon,
  SendIcon,
  Loader2,
  Calendar,
  PlusCircle,
  FileText,
  FileDown
} from "lucide-react"
import { use } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast, Toaster } from "sonner"
import { EstadoBadge } from "@/components/facturas/estado-badge"
import { FacturaProveedorDialog } from '@/components/facturas/factura-proveedor-dialog'
import { MargenCard } from "@/components/presupuestos/margen-card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency } from '@/lib/utils'
import { generateFacturaPDF } from '@/lib/utils/facturaGenerator'

interface Cliente {
  id: string
  nombre: string
  nif?: string
  direccion?: string
  ciudad?: string
  email?: string
  telefono?: string
}

interface Producto {
  id: string
  nombre: string
}

interface ItemFactura {
  id: string
  productoId: string
  producto: Producto
  cantidad: number
  precioUnitario: number
  descuento: number
  iva: number
  total: number
  nombre?: string
  tipo?: "CATEGORIA" | "EQUIPO" | "PERSONAL" | "SEPARADOR" | string
  dias?: number
  partidaId?: string
  partida?: {
    id: string
    nombre: string
  }
}

interface Presupuesto {
  id: string
  numero: string
}

interface FacturaProveedor {
  id: string
  proveedorId: string
  proveedor: {
    id: string
    nombre: string
  } | null
  nombre: string
  descripcion?: string | null
  precio: number
  precioConIVA: boolean
  tipoEspecial?: string | null
  partidaId?: string | null
  partida?: {
    id: string
    nombre: string
  } | null
  createdAt: string
  updatedAt: string
  archivoUrl?: string | null
  documentoNombre?: string | null
  documentoFecha?: string | null
}

interface Empresa {
  id: string;
  nombre: string;
  cif: string;
  direccion: string;
  email: string;
  telefono: string;
  logoUrl?: string | null;
}

interface Factura {
  id: string
  numero: string
  numeroPedido?: string | null
  fecha: string
  fechaVencimiento: string
  clienteId: string
  cliente: Cliente
  estado: "PENDIENTE" | "ENVIADA" | "COBRADA" | "VENCIDA" | "ANULADA"
  observaciones?: string
  subtotal: number
  iva: number
  total: number
  items: ItemFactura[]
  presupuestos: Presupuesto[]
  facturasProveedores: FacturaProveedor[]
  createdAt: string
  updatedAt: string
}

export default function FacturaDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const facturaId = resolvedParams.id
  
  const [factura, setFactura] = useState<Factura | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFactura = async () => {
    try {
      setIsLoading(true)
      
      const response = await fetch(`/api/facturas/${facturaId}`)
      if (!response.ok) {
        throw new Error(`Error al cargar factura: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // Organizar los datos para la visualización
      setFactura(data)
      setError(null)
    } catch (err) {
      console.error('Error al cargar factura:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar la factura')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFactura()
  }, [facturaId])

  const handleChangeEstado = async (newEstado: string) => {
    try {
      const response = await fetch(`/api/facturas/${facturaId}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: newEstado }),
      })

      if (!response.ok) {
        throw new Error("Error al cambiar el estado de la factura")
      }

      // Actualizar la factura en el estado local
      setFactura((prevFactura) => 
        prevFactura ? 
          { ...prevFactura, estado: newEstado as Factura["estado"] } : 
          null
      )

      toast.success("Estado actualizado")
    } catch (error) {
      toast.error("No se pudo actualizar el estado de la factura")
      console.error("Error updating factura estado:", error)
    }
  }

  // Agrupar items por partida
  const getItemsGroupedByPartida = () => {
    if (!factura || !factura.items || factura.items.length === 0) {
      return []
    }

    interface GroupedItems {
      partidaId: string | null
      partidaNombre: string
      items: ItemFactura[]
      subtotal: number
    }

    const groupedItems: GroupedItems[] = []
    const sinPartida: ItemFactura[] = []

    // Agrupar items por partida
    factura.items.forEach(item => {
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '--'
    const date = new Date(dateString)
    // Ajustar la fecha para evitar problemas de zona horaria
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    return format(date, 'dd/MM/yyyy', { locale: es })
  }

  // Función para generar el PDF de la factura
  const handleImprimirFactura = async () => {
    if (!factura) return;
    
    try {
      // Mostrar indicador de carga
      toast.loading("Preparando documento...");
      
      // Obtener datos actualizados de la empresa
      const empresaResponse = await fetch('/api/empresa');
      if (!empresaResponse.ok) {
        throw new Error('Error al obtener datos de la empresa');
      }
      const empresa: Empresa = await empresaResponse.json();
      
      const partidasAgrupadas = getItemsGroupedByPartida();
      
      // Generar el PDF con los datos de la empresa usando el nuevo generador
      const doc = await generateFacturaPDF(
        factura, 
        partidasAgrupadas,
        empresa
      );
      
      // Cerrar el indicador de carga
      toast.dismiss();
      
      // Abrir el PDF en una nueva pestaña
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
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
          <p className="mt-2">Cargando factura...</p>
        </div>
      </div>
    )
  }

  if (error || !factura) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error || "No se pudo cargar la factura"}</p>
          <Button asChild className="mt-4">
            <Link href="/facturas">Volver a facturas</Link>
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
          <Link href="/facturas">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Factura #{factura.numero}</h1>
            {factura.numeroPedido && <p className="text-sm text-muted-foreground">PO: {factura.numeroPedido}</p>}
          </div>
          <EstadoBadge estado={factura.estado} />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1" onClick={handleImprimirFactura}>
            <Printer className="h-4 w-4" />
            Imprimir
          </Button>
          <Button 
            variant="outline" 
            className="gap-1"
            asChild
          >
            <Link href={`/facturas/editar/${factura.id}`}>
              <FileEdit className="h-4 w-4" />
              Editar
            </Link>
          </Button>
          {factura.estado !== "COBRADA" && (
            <Button
              variant="outline"
              className="gap-1 border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => handleChangeEstado("COBRADA")}
            >
              <CheckCircleIcon className="h-4 w-4" />
              Marcar como cobrada
            </Button>
          )}
          {factura.estado !== "ENVIADA" && (
            <Button
              variant="outline"
              className="gap-1 border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={() => handleChangeEstado("ENVIADA")}
            >
              <SendIcon className="h-4 w-4" />
              Marcar como enviada
            </Button>
          )}
          {factura.estado !== "ANULADA" && (
            <Button
              variant="outline"
              className="gap-1 border-red-500 text-red-600 hover:bg-red-50"
              onClick={() => handleChangeEstado("ANULADA")}
            >
              <XCircleIcon className="h-4 w-4" />
              Anular
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {/* Datos de la factura - columna 1 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datos de factura</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Número:</span>
              <span>{factura.numero}</span>
            </div>
            {factura.numeroPedido && (
              <div className="flex justify-between">
                <span className="font-medium">Número de Pedido (PO):</span>
                <span>{factura.numeroPedido}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-medium">Fecha:</span>
              <span>{formatDate(factura.fecha)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Vencimiento:</span>
              <span>{formatDate(factura.fechaVencimiento)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Estado:</span>
              <EstadoBadge estado={factura.estado} />
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Cliente:</span>
              <span>{factura.cliente?.nombre || "Sin cliente"}</span>
            </div>
            {factura.presupuestos.length > 0 && (
              <div className="flex items-center justify-between">
                <span className="font-medium">Presupuestos:</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {factura.presupuestos.map((presupuesto) => (
                    <Link
                      key={presupuesto.id}
                      href={`/presupuestos/${presupuesto.id}`}
                    >
                      <Button variant="outline" size="sm" className="text-xs h-6 px-2">
                        {presupuesto.numero}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Datos del cliente - columna 2 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Datos del cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {factura.cliente ? (
              <>
                <div className="flex justify-between gap-4">
                  <span className="font-medium">Nombre:</span>
                  <span>{factura.cliente.nombre}</span>
                </div>
                {factura.cliente.nif && (
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">NIF/CIF:</span>
                    <span>{factura.cliente.nif}</span>
                  </div>
                )}
                {factura.cliente.direccion && (
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Dirección:</span>
                    <span>{factura.cliente.direccion}</span>
                  </div>
                )}
                {factura.cliente.ciudad && (
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Dirección:</span>
                    <span>{factura.cliente.ciudad}</span>
                  </div>
                )}
                {factura.cliente.email && (
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Email:</span>
                    <span>{factura.cliente.email}</span>
                  </div>
                )}
                {factura.cliente.telefono && (
                  <div className="flex justify-between gap-4">
                    <span className="font-medium">Teléfono:</span>
                    <span>{factura.cliente.telefono}</span>
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">Sin datos de cliente</p>
            )}
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
              <span>{formatCurrency(factura.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>IVA:</span>
              <span>{formatCurrency(factura.iva)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>Total (con IVA):</span>
              <span>{formatCurrency(factura.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detalles de la factura */} 
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Detalle de la factura</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Renderizar cada partida y sus items */}
          {getItemsGroupedByPartida().map((group, groupIndex) => (
            <div key={groupIndex} className="mb-8 border rounded-lg overflow-hidden">
              {/* Título de la partida con estilo destacado */}
              <h3 className="text-lg font-bold bg-primary/10 p-4 text-primary-foreground dark:bg-primary/20">
                {group.partidaNombre}
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="py-3 px-4">Descripción</TableHead>
                    <TableHead className="py-3 px-4">Cantidad</TableHead>
                    <TableHead className="py-3 px-4">Días</TableHead>
                    <TableHead className="py-3 px-4">Precio</TableHead>
                    <TableHead className="py-3 px-4">Descuento</TableHead>
                    <TableHead className="py-3 px-4">Subtotal (sin IVA)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.items.map((item) => (
                    item.tipo === "CATEGORIA" ? (
                      // Categoría como subcabecera
                      <TableRow key={item.id} className="bg-secondary/20 dark:bg-secondary/10 border-t border-b">
                        <TableCell colSpan={6} className="font-semibold py-3 px-4">
                          {item.nombre || (item.producto?.nombre === "__CATEGORIA__" ? "CATEGORÍA" : item.producto?.nombre || "Categoría sin nombre")}
                        </TableCell>
                      </TableRow>
                    ) : item.tipo === "SEPARADOR" ? (
                      // Separador con estilo distintivo
                      <TableRow key={item.id} className="bg-muted/30 dark:bg-muted/10 border-t border-b border-dashed">
                        <TableCell colSpan={6} className="py-2 text-center px-4">
                          <div className="text-sm font-medium text-muted-foreground">
                            {item.nombre || (item.producto?.nombre === "__SEPARADOR__" ? "SEPARADOR" : item.producto?.nombre || "Separador")}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow key={item.id} className="hover:bg-muted/10">
                        <TableCell className="font-medium w-1/3 px-4">{item.tipo === "PERSONAL" || item.tipo === "PERSONALIZADO" ? item.nombre : (item.producto.nombre.startsWith("__") ? item.nombre : item.producto.nombre)}</TableCell>
                        <TableCell className="px-4">{item.cantidad}</TableCell>
                        <TableCell className="px-4">{item.dias || 1}</TableCell>
                        <TableCell className="px-4">{formatCurrency(item.precioUnitario)}</TableCell>
                        <TableCell className="px-4">{item.descuento > 0 ? `${item.descuento}%` : '-'}</TableCell>
                        <TableCell className="font-medium px-4">
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
      {factura.observaciones && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Observaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line">{factura.observaciones}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Facturas de Proveedores */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Facturas de Proveedores</CardTitle>
          <FacturaProveedorDialog
            facturaId={factura.id}
            onSuccess={() => {
              // Recargar los datos de la factura
              if (facturaId) {
                fetch(`/api/facturas/${facturaId}`)
                .then(response => {
                  if (response.ok) return response.json()
                    throw new Error("Error al recargar la factura")
                })
                .then(data => setFactura(data))
                .catch(err => {
                  console.error(err)
                  toast.error("Error al actualizar la información")
                })
              }
            }}
            trigger={
              <Button variant="outline" size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Añadir factura de proveedor
              </Button>
            }
            />
        </CardHeader>
        <CardContent>
          {factura.facturasProveedores && factura.facturasProveedores.length > 0 ? (
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
                {factura.facturasProveedores.map((facturaProveedor) => (
                  <TableRow key={facturaProveedor.id}>
                    <TableCell className="font-medium">
                      {facturaProveedor.proveedor?.nombre || 
                       (facturaProveedor.nombre && facturaProveedor.nombre.includes('GASTOS GENERALES') ? 'GASTOS GENERALES' : 
                        (facturaProveedor.nombre && facturaProveedor.nombre.includes('FREELANCE') ? 'FREELANCE' : 
                         (facturaProveedor.nombre && facturaProveedor.nombre.includes('DIETAS') ? 'DIETAS' : 
                          (facturaProveedor.tipoEspecial === 'dietas' ? 'DIETAS' : 'Sin proveedor'))))}
                    </TableCell>
                    <TableCell>{formatCurrency(facturaProveedor.precio)}</TableCell>
                    <TableCell>{formatDate(facturaProveedor.createdAt)}</TableCell>
                    <TableCell>{facturaProveedor.descripcion || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        {facturaProveedor.archivoUrl && (
                          <>
                            <a 
                              href={facturaProveedor.archivoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                              title={facturaProveedor.documentoNombre || "Ver documento"}
                            >
                              <FileText className="h-4 w-4" />
                            </a>
                            <a 
                              href={facturaProveedor.archivoUrl} 
                              download={facturaProveedor.documentoNombre ? `${facturaProveedor.documentoNombre}.pdf` : "documento.pdf"}
                              className="inline-flex text-xs px-2 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
                              title="Descargar documento"
                            >
                              <FileDown className="h-4 w-4" />
                            </a>
                          </>
                        )}
                        <FacturaProveedorDialog
                        facturaId={factura.id}
                        facturaProveedorId={facturaProveedor.id}
                        proveedorIdInicial={facturaProveedor.proveedorId || facturaProveedor.tipoEspecial || ""}
                        partidaIdInicial={facturaProveedor.partidaId || "sin-partida"}
                        montoInicial={facturaProveedor.precio}
                        notasIniciales={facturaProveedor.descripcion || ''}
                        archivoUrlInicial={facturaProveedor.archivoUrl || ''}
                        documentoNombreInicial={facturaProveedor.documentoNombre || ''}
                        documentoFechaInicial={facturaProveedor.documentoFecha || ''}
                        onSuccess={() => {
                          // Recargar los datos de la factura
                          if (facturaId) {
                            fetch(`/api/facturas/${facturaId}`)
                            .then(response => {
                              if (response.ok) return response.json()
                                throw new Error("Error al recargar la factura")
                            })
                            .then(data => setFactura(data))
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
              No hay facturas de proveedores registradas
            </div>
          )}
        </CardContent>
      </Card>
      {/* Análisis de Margen */}
      {factura.facturasProveedores && factura.facturasProveedores.length > 0 && (
        <div className="mb-6">
          <MargenCard 
            subtotalPresupuesto={factura.subtotal}
            ivaPresupuesto={factura.iva}
            totalPresupuesto={factura.total}
            presupuestosProveedores={factura.facturasProveedores} 
            itemsAgrupados={getItemsGroupedByPartida()}
          />
        </div>
      )}
      
      <Toaster />
    </div>
  )
}