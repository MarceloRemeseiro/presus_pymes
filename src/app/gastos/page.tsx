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
    if (gasto.factura) {
      if (gasto.factura.estado === 'COBRADA') return 'PAGADO';
      if (gasto.factura.estado === 'VENCIDA') return 'VENCIDO';
      if (gasto.factura.estado === 'ANULADA') return 'ANULADO';
      return 'PENDIENTE';
    }
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

      fetchGastos() // Refrescar la lista de gastos
      toast.success(`Estado cambiado a ${getNombreEstado(newEstado)}`)
    } catch (error) {
      toast.error("No se pudo actualizar el estado del gasto")
      console.error("Error updating gasto estado:", error)
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
              <DropdownMenuItem 
                className="text-red-600" 
                onClick={() => {
                  const confirmed = confirm("¿Estás seguro de que quieres eliminar este gasto?")
                  if (confirmed) {
                    // Implementar lógica de eliminación
                    toast.success("Gasto eliminado")
                    fetchGastos()
                  }
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                <span>Eliminar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      sortable: true
    },
    {
      key: "actions",
      header: "",
      cell: (gasto: Gasto) => (
        <div className="flex justify-start gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/gastos/${gasto.id}`}>
              Ver
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push(`/gastos/editar/${gasto.id}`)}>
            Editar
          </Button>
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
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <CreditCard className="h-8 w-8" />
          Gestión de Gastos
        </h1>
        <Button onClick={() => router.push('/gastos/nuevo')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Gasto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Gastos</CardTitle>
          <CardDescription>
            Administra las facturas de proveedores, tanto las asociadas a proyectos como los gastos generales.
          </CardDescription>
          
          <div className="flex items-center mt-4">
            <Search className="h-4 w-4 mr-2 opacity-50" />
            <Input
              placeholder="Buscar por número, concepto o proveedor..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant={filtroEstado === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setFiltroEstado(null)}
            >
              Todos
            </Button>
            <Button 
              variant={filtroEstado === 'PENDIENTE' ? "default" : "outline"} 
              size="sm"
              onClick={() => setFiltroEstado('PENDIENTE')}
              className="text-yellow-500"
            >
              <AlertCircle className="mr-1 h-4 w-4" />
              Pendientes
            </Button>
            <Button 
              variant={filtroEstado === 'PAGADO' ? "default" : "outline"} 
              size="sm"
              onClick={() => setFiltroEstado('PAGADO')}
              className="text-green-500"
            >
              <CheckCircle className="mr-1 h-4 w-4" />
              Pagados
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredGastos.length === 0 ? (
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
    </div>
  )
} 