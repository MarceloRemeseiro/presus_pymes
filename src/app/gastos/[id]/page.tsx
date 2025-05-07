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
  FileText,
  FileDown,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  CreditCard
} from "lucide-react"
import { use } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toast, Toaster } from "sonner"
import { EstadoBadge } from "@/components/gastos/estado-badge"
import { formatCurrency } from '@/lib/utils'
import { GastoDialog } from "@/components/gastos/gasto-dialog"

interface Proveedor {
  id: string
  nombre: string
  nif?: string
  direccion?: string
  email?: string
  telefono?: string
}

interface Partida {
  id: string
  nombre: string
}

interface Factura {
  id: string
  numero: string
  nombre?: string
  estado: string
  fecha: string
}

interface Gasto {
  id: string
  nombre: string
  descripcion?: string | null
  precio: number
  precioConIVA: boolean
  proveedorId?: string | null
  proveedor?: Proveedor | null
  facturaId?: string | null
  factura?: Factura | null
  tipoEspecial?: string | null
  partidaId?: string | null
  partida?: Partida | null
  archivoUrl?: string | null
  documentoNombre?: string | null
  documentoFecha?: string | null
  createdAt: string
  updatedAt: string
}

export default function GastoDetallePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const gastoId = resolvedParams.id
  
  const [gasto, setGasto] = useState<Gasto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGasto = async () => {
    try {
      setIsLoading(true)
      
      const response = await fetch(`/api/gastos/${gastoId}`)
      if (!response.ok) {
        if (response.status === 404) {
          // Si el gasto no existe, mostrar error y redirigir después de un momento
          setError('El gasto no existe o ha sido eliminado')
          setTimeout(() => {
            router.push('/gastos')
          }, 3000)
          return
        }
        throw new Error(`Error al cargar gasto: ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // Guardar los datos
      setGasto(data)
      setError(null)
    } catch (err) {
      console.error('Error al cargar gasto:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar el gasto')
      
      // Si es un error de red o servidor, mostrar un mensaje
      if (err instanceof Error && err.message.includes('failed to fetch')) {
        setError('Error de conexión. No se pudo cargar el gasto.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGasto()
  }, [gastoId])

  const handleChangeEstado = async (newEstado: string) => {
    try {
      const response = await fetch(`/api/gastos/${gastoId}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: newEstado }),
      })

      if (!response.ok) {
        throw new Error("Error al cambiar el estado del gasto")
      }

      // Actualizar el gasto en el estado local
      fetchGasto()
      toast.success(`Estado cambiado a ${getNombreEstado(newEstado)}`)
    } catch (error) {
      toast.error("No se pudo actualizar el estado del gasto")
      console.error("Error updating gasto estado:", error)
    }
  }

  const getEstadoGasto = (gasto: Gasto): string => {
    // Primero verificar si hay un estado personalizado en tipoEspecial
    if (gasto.tipoEspecial && gasto.tipoEspecial.startsWith('estado_')) {
      const estado = gasto.tipoEspecial.replace('estado_', '').toUpperCase();
      return estado === 'PAGADO' ? 'PAGADO' : 'PENDIENTE';
    }
    
    // Si tiene factura y no tiene estado personalizado, usar el estado de la factura
    if (gasto.factura) {
      if (gasto.factura.estado === 'COBRADA') return 'PAGADO';
      if (gasto.factura.estado === 'VENCIDA') return 'VENCIDO';
      if (gasto.factura.estado === 'ANULADA') return 'ANULADO';
      return 'PENDIENTE';
    }
    
    // Por defecto, pendiente
    return 'PENDIENTE';
  }

  const getNombreEstado = (estado: string): string => {
    switch (estado) {
      case "PENDIENTE": return "Pendiente"
      case "PAGADO": return "Pagado"
      case "VENCIDO": return "Vencido"
      case "ANULADO": return "Anulado"
      default: return estado
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '--'
    const date = new Date(dateString)
    // Ajustar la fecha para evitar problemas de zona horaria
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    return format(date, 'dd/MM/yyyy', { locale: es })
  }

  const handleImprimirDocumento = () => {
    if (gasto?.archivoUrl) {
      window.open(gasto.archivoUrl, '_blank')
    } else {
      toast.error("No hay documento disponible para imprimir")
    }
  }

  const handleDescargarDocumento = () => {
    if (gasto?.archivoUrl) {
      // Crear un elemento <a> y simular un click para descargar
      const link = document.createElement('a')
      link.href = gasto.archivoUrl
      link.download = gasto.documentoNombre || `documento-${gasto.id}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      toast.error("No hay documento disponible para descargar")
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Cargando detalles del gasto...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p className="mb-3">{error}</p>
          {error.includes('no existe o ha sido eliminado') && (
            <p className="text-sm text-red-600 mb-3">
              Serás redirigido automáticamente a la lista de gastos en unos segundos...
            </p>
          )}
          <Button onClick={() => router.push('/gastos')} className="mt-2">
            Volver a gastos ahora
          </Button>
        </div>
      </div>
    )
  }

  if (!gasto) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>No se pudo encontrar el gasto solicitado</p>
          <Button onClick={() => router.push('/gastos')} className="mt-4">
            Volver a gastos
          </Button>
        </div>
      </div>
    )
  }

  const estadoActual = getEstadoGasto(gasto)

  return (
    <div className="py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/gastos">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Detalles del Gasto</h1>
        </div>
        <div className="flex items-center gap-2">
          <GastoDialog
            trigger={
              <Button variant="outline">
                <FileEdit className="mr-2 h-4 w-4" />
                Editar
              </Button>
            }
            gastoId={gasto.id}
            onSuccess={fetchGasto}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Columna 1: Información general */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Nombre</h3>
                <p className="text-lg font-medium">{gasto.nombre}</p>
              </div>
              {gasto.factura?.nombre && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Nombre factura</h3>
                  <p className="text-lg font-medium">{gasto.factura.nombre}</p>
                </div>
              )}
              {gasto.descripcion && (
                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Descripción</h3>
                  <p className="text-lg">{gasto.descripcion}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
                <div className="mt-1 flex items-center">
                  <EstadoBadge estado={estadoActual as any} />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Importe</h3>
                <p className="text-lg font-medium">{formatCurrency(gasto.precio)}</p>
                <p className="text-xs text-muted-foreground">
                  {gasto.precioConIVA ? 'Precio con IVA incluido' : 'Precio sin IVA'}
                </p>
              </div>
              {gasto.proveedor && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Proveedor</h3>
                  <p className="text-lg">{gasto.proveedor.nombre}</p>
                </div>
              )}
              {gasto.partida && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Partida</h3>
                  <p className="text-lg">{gasto.partida.nombre}</p>
                </div>
              )}
              {gasto.factura && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Factura asociada</h3>
                  <Link 
                    href={`/facturas/${gasto.factura.id}`}
                    className="text-lg text-blue-600 hover:underline"
                  >
                    {gasto.factura.numero}
                  </Link>
                </div>
              )}
              {gasto.documentoFecha && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Fecha del documento</h3>
                  <p className="text-lg">{formatDate(gasto.documentoFecha)}</p>
                </div>
              )}
              {gasto.documentoNombre && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Documento</h3>
                  <p className="text-lg">{gasto.documentoNombre}</p>
                </div>
              )}
              {gasto.tipoEspecial && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Tipo especial</h3>
                  <p className="text-lg">{gasto.tipoEspecial}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Fecha de creación</h3>
                <p className="text-lg">{formatDate(gasto.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Última modificación</h3>
                <p className="text-lg">{formatDate(gasto.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna 2: Acciones y Estado */}
        <Card>
          <CardHeader>
            <CardTitle>Estado y Acciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Estado actual</h3>
                <div className="flex items-center">
                  <EstadoBadge estado={estadoActual as any} />
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Cambiar estado</h3>
                <div className="flex flex-col gap-2">
                  {estadoActual !== 'PAGADO' && (
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleChangeEstado('PAGADO')}
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Marcar como pagado
                    </Button>
                  )}
                  {estadoActual === 'PAGADO' && (
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleChangeEstado('PENDIENTE')}
                    >
                      <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                      Marcar como pendiente
                    </Button>
                  )}
                </div>
              </div>
              
              {gasto.archivoUrl && (
                <>
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Documento</h3>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={handleImprimirDocumento}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Ver documento
                      </Button>
                      <Button 
                        variant="outline" 
                        className="justify-start"
                        onClick={handleDescargarDocumento}
                      >
                        <FileDown className="mr-2 h-4 w-4" />
                        Descargar documento
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Toaster />
    </div>
  )
} 