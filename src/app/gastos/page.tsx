"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusCircle, Loader2, Search, MoreHorizontal, 
  CreditCard, XCircle, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { toast, Toaster } from "sonner"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EstadoBadge } from "@/components/gastos/estado-badge"
import { GastoDialog } from "@/components/gastos/gasto-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/ui/data-table"

interface Proveedor {
  id: string
  nombre: string
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
  precio: number
  precioConIVA: boolean
  documentoNombre: string | null
  documentoFecha: string | null
  proveedor: Proveedor | null
  partida: Partida | null
  factura: Factura | null
  tipoEspecial: string | null
  createdAt: string
}



export default function GastosPage() {
  const router = useRouter()
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroEstado, setFiltroEstado] = useState<string | null>(null)
  const [eliminandoId, setEliminandoId] = useState<string | null>(null)

  const fetchGastos = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/gastos")
      if (!response.ok) {
        throw new Error("Error al cargar los gastos")
      }
      const data = await response.json()
      setGastos(data)
    } catch (error) {
      setError("Error al cargar los gastos. Inténtalo de nuevo más tarde.")
      console.error("Error fetching gastos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGastos()
  }, [])

  // Determinar el estado del gasto
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

  // Filtrar gastos basados en el término de búsqueda y estado
  const filteredGastos = gastos.filter(
    (gasto) => {
      const matchesSearch = 
        (gasto.documentoNombre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        gasto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (gasto.proveedor?.nombre?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      
      const matchesEstado = !filtroEstado || getEstadoGasto(gasto) === filtroEstado;
      
      return matchesSearch && matchesEstado;
    }
  )

  const handleChangeEstado = async (gastoId: string, newEstado: string) => {
    try {
      console.log("Cambiando estado para gastoId:", gastoId, "a", newEstado);
      
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

      const gastoActualizado = await response.json();
      console.log("Gasto actualizado:", gastoActualizado);
      
      // Actualizar solo el gasto modificado en lugar de recargar toda la lista
      setGastos(gastos.map(gasto => 
        gasto.id === gastoId ? {...gasto, tipoEspecial: gastoActualizado.tipoEspecial, factura: gastoActualizado.factura} : gasto
      ));
      
      toast.success(`Estado cambiado a ${getNombreEstado(newEstado)}`)
    } catch (error) {
      console.error("Error updating gasto estado:", error);
      toast.error("No se pudo actualizar el estado del gasto")
    }
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

  // Función para formatear fechas correctamente (evitando problemas de zona horaria)
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '--'
    const date = new Date(dateString)
    // Ajustar la fecha para evitar problemas de zona horaria
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    return format(date, 'dd/MM/yyyy', { locale: es })
  }

  // Función para eliminar un gasto
  const eliminarGasto = async (gastoId: string) => {
    try {
      setEliminandoId(gastoId);
      
      // Primero obtener la información del gasto para ver si tiene archivo
      const gastoResponse = await fetch(`/api/gastos/${gastoId}`);
      if (!gastoResponse.ok) {
        throw new Error('Error al obtener información del gasto');
      }
      
      const gastoData = await gastoResponse.json();
      
      // Si hay un archivo, eliminarlo primero
      if (gastoData.archivoUrl) {
        try {
          const fileResponse = await fetch('/api/upload', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filePath: gastoData.archivoUrl }),
          });
          
          if (!fileResponse.ok) {
            console.error('Error al eliminar archivo del gasto, continuando con la eliminación del gasto');
          } else {
            console.log('Archivo eliminado correctamente:', gastoData.archivoUrl);
          }
        } catch (fileError) {
          console.error('Error al eliminar archivo:', fileError);
          // Continuamos con la eliminación del gasto aunque falle la eliminación del archivo
        }
      }
      
      // Eliminar el gasto
      const response = await fetch(`/api/gastos/${gastoId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al eliminar el gasto');
      }
      
      // Actualizar la lista de gastos
      setGastos(gastos.filter(gasto => gasto.id !== gastoId));
      toast.success('Gasto eliminado correctamente');
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : 'Error al eliminar el gasto');
    } finally {
      setEliminandoId(null);
    }
  };

  const columns = [
    {
      key: "documentoFecha",
      header: "Fecha",
      cell: (gasto: Gasto) => (
        <div>{formatDate(gasto.documentoFecha || gasto.createdAt)}</div>
      ),
      sortable: true,
      defaultSort: "desc" as const
    },
    {
      key: "factura.nombre",
      header: "Nombre",
      cell: (gasto: Gasto) => (
        <div className="max-w-xs truncate">
          {gasto.factura?.nombre || '-'}
        </div>
      ),
      sortable: true
    },
    {
      key: "nombre",
      header: "Descripción",
      cell: (gasto: Gasto) => (
        <div className="max-w-xs truncate">
          <Link 
            href={`/gastos/${gasto.id}`}
            className="hover:underline font-medium"
          >
            {gasto.nombre}
          </Link>
        </div>
      ),
      sortable: true
    },
    {
      key: "proveedor.nombre",
      header: "Proveedor",
      cell: (gasto: Gasto) => (
        <div>{gasto.proveedor?.nombre || "Sin proveedor"}</div>
      ),
      sortable: true
    },
    {
      key: "documentoNombre",
      header: "Factura/Documento",
      cell: (gasto: Gasto) => (
        <div className="font-medium hover:underline">
          {gasto.documentoNombre || "Sin documento"}
        </div>
      ),
      sortable: true
    },
    {
      key: "precio",
      header: "Importe",
      cell: (gasto: Gasto) => (
        <div className="text-right font-medium">{formatCurrency(gasto.precio)}</div>
      ),
      sortable: true
    },
    {
      key: "estado",
      header: "Estado",
      cell: (gasto: Gasto) => (
        <div className="relative inline-flex items-center group">
          <EstadoBadge estado={getEstadoGasto(gasto) as any} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-6 w-5 p-0 absolute right-0 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {getEstadoGasto(gasto) !== 'PAGADO' && (
                <DropdownMenuItem onClick={() => handleChangeEstado(gasto.id, 'PAGADO')}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Marcar como pagado</span>
                </DropdownMenuItem>
              )}
              {getEstadoGasto(gasto) === 'PAGADO' && (
                <DropdownMenuItem onClick={() => handleChangeEstado(gasto.id, 'PENDIENTE')}>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>Marcar como pendiente</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      sortable: true
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (gasto: Gasto) => (
        <div className="flex justify-start gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/gastos/${gasto.id}`}>
              Ver
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => {
                  const confirmed = confirm("¿Estás seguro de que quieres eliminar este gasto? Esta acción no se puede deshacer.");
                  if (confirmed) {
                    eliminarGasto(gasto.id);
                  }
                }}
                disabled={eliminandoId === gasto.id}
                className="text-red-600 flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                <span>{eliminandoId === gasto.id ? "Eliminando..." : "Eliminar"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ]

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Cargando gastos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Intentar de nuevo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gastos</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {filtroEstado ? getNombreEstado(filtroEstado) : "Todos los estados"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFiltroEstado(null)}>
                Todos los estados
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFiltroEstado("PENDIENTE")}>
                Pendientes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFiltroEstado("PAGADO")}>
                Pagados
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFiltroEstado("VENCIDO")}>
                Vencidos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFiltroEstado("ANULADO")}>
                Anulados
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <GastoDialog
            trigger={
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo Gasto
              </Button>
            }
            onSuccess={fetchGastos}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Gastos</CardTitle>
          <CardDescription>
            Administra todos tus gastos y facturas de proveedores desde aquí
          </CardDescription>
          
          <div className="flex items-center mt-4">
            <Search className="h-4 w-4 mr-2 opacity-50" />
            <Input
              placeholder="Buscar por concepto, proveedor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin opacity-70" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md">
              {error}
            </div>
          ) : filteredGastos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm 
                ? "No se encontraron gastos que coincidan con tu búsqueda" 
                : "No hay gastos registrados aún"}
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={filteredGastos}
            />
          )}
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 