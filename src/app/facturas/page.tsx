"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusCircle, Loader2, Search, MoreHorizontal, 
  FileText, CreditCard, XCircle, ClockIcon, SendIcon, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { toast, Toaster } from "sonner"
import { useRouter } from "next/navigation"
import { formatCurrency } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EstadoBadge } from "@/components/facturas/estado-badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/ui/data-table"

interface Cliente {
  id: string
  nombre: string
}

interface Factura {
  id: string
  numero: string
  fecha: string
  fechaVencimiento: string
  clienteId: string
  cliente: Cliente
  estado: "PENDIENTE" | "ENVIADA" | "PAGADA" | "VENCIDA" | "ANULADA"
  subtotal: number
  iva: number
  total: number
}

export default function FacturasPage() {
  const router = useRouter()
  const [facturas, setFacturas] = useState<Factura[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFacturas = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/facturas")
      if (!response.ok) {
        throw new Error("Error al cargar las facturas")
      }
      const data = await response.json()
      setFacturas(data)
    } catch (error) {
      setError("Error al cargar las facturas. Inténtalo de nuevo más tarde.")
      console.error("Error fetching facturas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFacturas()
  }, [])

  // Filtrar facturas basadas en el término de búsqueda
  const filteredFacturas = facturas.filter(
    (factura) =>
      factura.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (factura.cliente?.nombre && factura.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleCreateFactura = async () => {
    try {
      setIsCreating(true)
      const response = await fetch("/api/facturas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })

      if (!response.ok) {
        throw new Error("Error al crear la factura")
      }

      const data = await response.json()
      toast.success(`Se ha creado la factura ${data.numero}`)
      
      // Redirigir a la página de edición de la factura
      router.push(`/facturas/editar/${data.id}`)
    } catch (error) {
      toast.error("No se pudo crear la factura")
      console.error("Error creating factura:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleChangeEstado = async (facturaId: string, newEstado: string) => {
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
      setFacturas((prevFacturas) =>
        prevFacturas.map((factura) =>
          factura.id === facturaId
            ? { ...factura, estado: newEstado as Factura["estado"] }
            : factura
        )
      )

      toast.success(`Estado cambiado a ${getNombreEstado(newEstado)}`)
    } catch (error) {
      toast.error("No se pudo actualizar el estado de la factura")
      console.error("Error updating factura estado:", error)
    }
  }

  const getNombreEstado = (estado: string): string => {
    switch (estado) {
      case "PENDIENTE": return "Pendiente"
      case "ENVIADA": return "Enviada"
      case "PAGADA": return "Pagada"
      case "VENCIDA": return "Vencida"
      case "ANULADA": return "Anulada"
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
      cell: (factura: Factura) => (
        <Link 
          href={`/facturas/${factura.id}`}
          className="hover:underline font-medium"
        >
          {factura.numero}
        </Link>
      )
    },
    {
      key: "fecha",
      header: "Fecha",
      sortable: true,
      cell: (factura: Factura) => format(new Date(factura.fecha), "dd/MM/yyyy", { locale: es })
    },
    {
      key: "fechaVencimiento",
      header: "Vencimiento",
      sortable: true,
      cell: (factura: Factura) => 
        factura.fechaVencimiento ? 
        format(new Date(factura.fechaVencimiento), "dd/MM/yyyy", { locale: es }) :
        "-"
    },
    {
      key: "cliente.nombre",
      header: "Cliente",
      sortable: true,
      cell: (factura: Factura) => factura.cliente?.nombre || 'Sin cliente'
    },
    {
      key: "estado",
      header: "Estado",
      sortable: true,
      cell: (factura: Factura) => (
        <div className="relative inline-flex items-center group">
          <EstadoBadge estado={factura.estado} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-6 w-5 p-0 absolute right-0 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleChangeEstado(factura.id, "PENDIENTE")}
                disabled={factura.estado === "PENDIENTE"}
                className="flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4" />
                <span>Pendiente</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleChangeEstado(factura.id, "ENVIADA")}
                disabled={factura.estado === "ENVIADA"}
                className="flex items-center gap-2"
              >
                <SendIcon className="h-4 w-4" />
                <span>Enviada</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleChangeEstado(factura.id, "PAGADA")}
                disabled={factura.estado === "PAGADA"}
                className="flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Pagada</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleChangeEstado(factura.id, "VENCIDA")}
                disabled={factura.estado === "VENCIDA"}
                className="flex items-center gap-2"
              >
                <ClockIcon className="h-4 w-4" />
                <span>Vencida</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleChangeEstado(factura.id, "ANULADA")}
                disabled={factura.estado === "ANULADA"}
                className="flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                <span>Anulada</span>
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
      cell: (factura: Factura) => (
        <div className="text-right">{formatCurrency(factura.total)}</div>
      )
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (factura: Factura) => (
        <div className="flex justify-start gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/facturas/${factura.id}`}>
              Ver
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/facturas/editar/${factura.id}`}>
              Editar
            </Link>
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
          <p className="mt-2">Cargando facturas...</p>
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
        <h1 className="text-3xl font-bold">Facturas</h1>
        <Button onClick={handleCreateFactura} disabled={isCreating}>
          {isCreating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creando...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva Factura
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Facturas</CardTitle>
          <CardDescription>
            Administra todas tus facturas desde aquí
          </CardDescription>
          
          <div className="flex items-center mt-4">
            <Search className="h-4 w-4 mr-2 opacity-50" />
            <Input
              placeholder="Buscar por número o cliente..."
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
          ) : filteredFacturas.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm 
                ? "No se encontraron facturas que coincidan con tu búsqueda" 
                : "No hay facturas registradas aún"}
            </div>
          ) : (
            <DataTable columns={columns} data={filteredFacturas} />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 