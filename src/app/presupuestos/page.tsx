"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"
import { PlusCircle, Loader2, Search, MoreHorizontal, CheckCircle, XCircle, ClipboardList, AlertCircle, FileText } from "lucide-react"
import { EstadoBadge } from "@/components/presupuestos/estado-badge"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/ui/data-table"
import { formatCurrency } from "@/lib/utils"

interface Presupuesto {
  id: string
  numero: string
  nombre?: string | null
  referencia?: string | null
  fecha: string
  fechaValidez: string
  clienteId?: string
  cliente?: {
    nombre: string
  }
  estado: "PENDIENTE" | "APROBADO" | "RECHAZADO" | "FACTURADO"
  subtotal: number
  iva: number
  total: number
}

export default function PresupuestosPage() {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  
  useEffect(() => {
    const fetchPresupuestos = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/presupuestos')
        
        if (!response.ok) {
          throw new Error("Error al cargar los presupuestos")
        }
        
        const data = await response.json()
        setPresupuestos(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar presupuestos:', err)
        setError('Error al cargar la lista de presupuestos')
        toast.error('Error al cargar presupuestos')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPresupuestos()
  }, [])

  // Filtrar presupuestos basados en el término de búsqueda
  const filteredPresupuestos = presupuestos.filter(
    (presupuesto) =>
      presupuesto.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (presupuesto.nombre && presupuesto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (presupuesto.referencia && presupuesto.referencia.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (presupuesto.cliente?.nombre && presupuesto.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Función para crear un nuevo presupuesto vacío
  const crearNuevoPresupuesto = async () => {
    try {
      setIsCreating(true)
      
      // Obtener el siguiente número de presupuesto
      const numeroResponse = await fetch('/api/configuracion/siguiente-numero?tipo=presupuesto')
      if (!numeroResponse.ok) {
        throw new Error('Error al generar el número de presupuesto')
      }
      
      const { numero: numeroPresupuesto } = await numeroResponse.json()
      
      // Obtener la fecha actual y calcular validez
      const today = new Date()
      
      // Calcular fecha de validez (15 días después)
      const validityDate = new Date(today)
      validityDate.setDate(validityDate.getDate() + 15)
      
      // Datos mínimos para el presupuesto
      const presupuestoData = {
        numero: numeroPresupuesto,
        fecha: today.toISOString(),
        fechaValidez: validityDate.toISOString(),
        estado: "PENDIENTE",
        subtotal: 0,
        iva: 0,
        total: 0,
        items: []
      }
      
      console.log('Datos recibidos:', presupuestoData)
      
      // Crear el presupuesto vacío
      const response = await fetch('/api/presupuestos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(presupuestoData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear el presupuesto')
      }
      
      const presupuestoCreado = await response.json()
      
      // Redirigir a la página de edición del presupuesto
      router.push(`/presupuestos/editar/${presupuestoCreado.id}`)
      
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al crear el presupuesto')
      setIsCreating(false)
    }
  }

  // Función para cambiar el estado de un presupuesto
  const cambiarEstadoPresupuesto = async (presupuestoId: string, nuevoEstado: string) => {
    try {
      const response = await fetch(`/api/presupuestos/${presupuestoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: nuevoEstado
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error al cambiar el estado del presupuesto`)
      }
      
      const presupuestoActualizado = await response.json()
      
      // Actualizar la lista de presupuestos
      setPresupuestos(presupuestos.map(p => 
        p.id === presupuestoId ? { ...p, estado: nuevoEstado as any } : p
      ))
      
      toast.success(`Estado cambiado a ${getNombreEstado(nuevoEstado)}`)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al cambiar el estado del presupuesto")
    }
  }
  
  // Función para crear una factura a partir de un presupuesto
  const [creandoFactura, setCreandoFactura] = useState<string | null>(null)
  
  const crearFacturaDesdePresupuesto = async (presupuestoId: string) => {
    try {
      setCreandoFactura(presupuestoId)
      
      // Llamada a la API para crear la factura
      const response = await fetch(`/api/facturas/desde-presupuesto/${presupuestoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear la factura')
      }
      
      const facturaCreada = await response.json()
      
      // Actualizar el estado del presupuesto a FACTURADO
      await cambiarEstadoPresupuesto(presupuestoId, "FACTURADO")
      
      toast.success('Factura creada correctamente')
      
      // Redirigir a la página de edición de la factura
      router.push(`/facturas/editar/${facturaCreada.id}`)
      
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al crear la factura')
    } finally {
      setCreandoFactura(null)
    }
  }
  
  const getNombreEstado = (estado: string): string => {
    switch (estado) {
      case "PENDIENTE": return "Pendiente"
      case "APROBADO": return "Aprobado"
      case "RECHAZADO": return "Rechazado"
      case "FACTURADO": return "Facturado"
      default: return estado
    }
  }

  // Definir las columnas para la tabla
  const columns = [
    {
      key: "numero",
      header: "Número",
      sortable: true,
      defaultSort: "desc",
      cell: (presupuesto: Presupuesto) => (
        <Link 
          href={`/presupuestos/${presupuesto.id}`}
          className="hover:underline font-medium"
        >
          {presupuesto.numero}
        </Link>
      )
    },
    {
      key: "nombre",
      header: "Nombre",
      sortable: true,
      cell: (presupuesto: Presupuesto) => presupuesto.nombre || '-'
    },
    {
      key: "referencia",
      header: "Referencia",
      sortable: true,
      cell: (presupuesto: Presupuesto) => presupuesto.referencia || '-'
    },
    {
      key: "cliente.nombre",
      header: "Cliente",
      sortable: true,
      cell: (presupuesto: Presupuesto) => presupuesto.cliente?.nombre || 'Sin cliente'
    },
    {
      key: "fecha",
      header: "Fecha",
      sortable: true,
      cell: (presupuesto: Presupuesto) => new Date(presupuesto.fecha).toLocaleDateString()
    },
    {
      key: "fechaValidez",
      header: "Válido hasta",
      sortable: true,
      cell: (presupuesto: Presupuesto) => new Date(presupuesto.fechaValidez).toLocaleDateString()
    },
    {
      key: "estado",
      header: "Estado",
      sortable: true,
      cell: (presupuesto: Presupuesto) => (
        <div className="relative inline-flex items-center group">
          <EstadoBadge estado={presupuesto.estado} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-6 w-5 p-0 absolute right-0 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => cambiarEstadoPresupuesto(presupuesto.id, "PENDIENTE")}
                disabled={presupuesto.estado === "PENDIENTE"}
                className="flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4" />
                <span>Pendiente</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => cambiarEstadoPresupuesto(presupuesto.id, "APROBADO")}
                disabled={presupuesto.estado === "APROBADO"}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Aprobado</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => cambiarEstadoPresupuesto(presupuesto.id, "RECHAZADO")}
                disabled={presupuesto.estado === "RECHAZADO"}
                className="flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                <span>Rechazado</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => cambiarEstadoPresupuesto(presupuesto.id, "FACTURADO")}
                disabled={presupuesto.estado === "FACTURADO"}
                className="flex items-center gap-2"
              >
                <ClipboardList className="h-4 w-4" />
                <span>Facturado</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    {
      key: "total",
      header: "Total",
      sortable: true,
      cell: (presupuesto: Presupuesto) => (
        <div className="text-right">{formatCurrency(presupuesto.total)}</div>
      )
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (presupuesto: Presupuesto) => (
        <div className="flex justify-start gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/presupuestos/${presupuesto.id}`}>
              Ver
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/presupuestos/editar/${presupuesto.id}`}>
              Editar
            </Link>
          </Button>
          {/* Botón para crear factura - solo disponible para presupuestos APROBADOS */}
          {presupuesto.estado === "APROBADO" && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => crearFacturaDesdePresupuesto(presupuesto.id)}
              disabled={creandoFactura === presupuesto.id}
              className="text-green-600 hover:bg-green-50 hover:text-green-700 border-green-200"
            >
              {creandoFactura === presupuesto.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-1" />
                  Facturar
                </>
              )}
            </Button>
          )}
        </div>
      )
    }
  ]

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Cargando presupuestos...</p>
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
      <Toaster />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Presupuestos</h1>
        <Button onClick={crearNuevoPresupuesto} disabled={isCreating}>
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Presupuesto
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Presupuestos</CardTitle>
          <CardDescription>
            Administra todos tus presupuestos desde aquí
          </CardDescription>
          
          <div className="flex items-center mt-4">
            <Search className="h-4 w-4 mr-2 opacity-50" />
            <Input
              placeholder="Buscar por número, nombre, referencia o cliente..."
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
          ) : filteredPresupuestos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm 
                ? "No se encontraron presupuestos que coincidan con tu búsqueda" 
                : "No hay presupuestos registrados aún"}
            </div>
          ) : (
            <DataTable columns={columns} data={filteredPresupuestos} />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 