"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"
import { Edit, Trash, Loader2, PlusCircle, Search, MoreHorizontal, Download, Upload, FileCode } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ImportExportDialog } from '@/components/clientes/ImportExportDialog'

interface Cliente {
  id: string
  nombre: string
  nif: string | null
  direccion: string | null
  email: string | null
  telefono: string | null
  tipo: "PARTICULAR" | "EMPRESA"
  createdAt: string
  updatedAt: string
}

export default function ClientesPage() {
  const router = useRouter()
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [eliminandoId, setEliminandoId] = useState<string | null>(null)

  // Función para cargar todos los clientes
  const fetchClientes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/clientes')
      
      if (!response.ok) {
        throw new Error("Error al cargar los clientes")
      }
      
      const data = await response.json()
      setClientes(data)
      setError(null)
    } catch (err) {
      console.error('Error al cargar clientes:', err)
      setError('Error al cargar la lista de clientes')
      toast.error('Error al cargar clientes')
    } finally {
      setIsLoading(false)
    }
  }

  // Cargar clientes al iniciar
  useEffect(() => {
    fetchClientes()
  }, [])

  // Filtrar clientes basados en el término de búsqueda
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cliente.nif && cliente.nif.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cliente.email && cliente.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Función para eliminar cliente
  const handleDeleteCliente = async (id: string) => {
    try {
      setEliminandoId(id);
      
      const response = await fetch(`/api/clientes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al eliminar el cliente");
      }
      
      // Actualizar la lista de clientes
      setClientes(clientes.filter(cliente => cliente.id !== id));
      
      // Mostrar mensaje de éxito
      toast.success("Cliente eliminado correctamente");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error instanceof Error ? error.message : "Error al eliminar el cliente");
    } finally {
      setEliminandoId(null);
    }
  };

  // Definir las columnas para la tabla
  const columns = [
    {
      key: "nombre",
      header: "Nombre",
      sortable: true,
      cell: (cliente: Cliente) => (
        <Link 
          href={`/clientes/${cliente.id}`} 
          className="hover:underline font-medium"
        >
          {cliente.nombre}
        </Link>
      )
    },
    {
      key: "nif",
      header: "CIF/NIF",
      sortable: true,
      cell: (cliente: Cliente) => <div>{cliente.nif || "—"}</div>
    },
    {
      key: "email",
      header: "Email",
      sortable: true,
      cell: (cliente: Cliente) => <div>{cliente.email || "—"}</div>
    },
    {
      key: "telefono",
      header: "Teléfono",
      sortable: true,
      cell: (cliente: Cliente) => <div>{cliente.telefono || "—"}</div>
    },
    {
      key: "tipo",
      header: "Tipo",
      sortable: true,
      cell: (cliente: Cliente) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          cliente.tipo === "EMPRESA" 
            ? "bg-blue-100 text-blue-800" 
            : "bg-green-100 text-green-800"
        }`}>
          {cliente.tipo === "EMPRESA" ? "Empresa" : "Autónomo"}
        </span>
      )
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (cliente: Cliente) => (
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            asChild
          >
            <Link href={`/clientes/editar/${cliente.id}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => {
                  const confirmed = confirm("¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.");
                  if (confirmed) {
                    handleDeleteCliente(cliente.id);
                  }
                }}
                disabled={eliminandoId === cliente.id}
                className="text-red-600 flex items-center gap-2"
              >
                <Trash className="h-4 w-4" />
                <span>{eliminandoId === cliente.id ? "Eliminando..." : "Eliminar"}</span>
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
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Cargando clientes...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error}</p>
          <Button onClick={fetchClientes} className="mt-4">
            Intentar de nuevo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <div className="flex gap-2">
        <ImportExportDialog
            trigger={
              <Button variant="outline">
                <FileCode className="mr-2 h-4 w-4" /> 
                Importar / Exportar
              </Button>
            }
            onImportSuccess={fetchClientes}
          />
          <Button asChild>
            <Link href="/clientes/nuevo">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuevo Cliente
            </Link>
          </Button>
          
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Clientes</CardTitle>
          <CardDescription>
            Administra todos tus clientes desde aquí
          </CardDescription>
          
          <div className="flex items-center mt-4">
            <Search className="h-4 w-4 mr-2 opacity-50" />
            <Input
              placeholder="Buscar por nombre, NIF o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredClientes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm 
                ? "No se encontraron clientes que coincidan con tu búsqueda" 
                : "No hay clientes registrados aún"}
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={filteredClientes}
            />
          )}
        </CardContent>
      </Card>
      
      {/* Toaster para notificaciones */}
      <Toaster />
    </div>
  )
} 