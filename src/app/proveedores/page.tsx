"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Toaster, toast } from "sonner"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Search, Trash2, Edit, MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Proveedor {
  id: string
  nombre: string
  telefono?: string | null
  email?: string | null
  direccion?: string | null
  nif?: string | null
  contacto?: string | null
  createdAt: string
  updatedAt: string
}

export default function ProveedoresPage() {
  const router = useRouter()
  const [proveedores, setProveedores] = useState<Proveedor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [eliminandoId, setEliminandoId] = useState<string | null>(null)

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/proveedores")
        
        if (!response.ok) {
          throw new Error("Error al cargar proveedores")
        }
        
        const data = await response.json()
        setProveedores(data)
      } catch (err) {
        console.error("Error:", err)
        setError("Error al cargar los proveedores. Por favor, intenta de nuevo.")
        toast.error("Error al cargar proveedores")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProveedores()
  }, [])

  // Filtrar proveedores basados en el término de búsqueda
  const filteredProveedores = proveedores.filter(
    (proveedor) =>
      proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proveedor.nif && proveedor.nif.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (proveedor.email && proveedor.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Eliminar un proveedor
  const handleDelete = async (id: string) => {
    try {
      setEliminandoId(id);
      
      const response = await fetch(`/api/proveedores/${id}`, {
        method: "DELETE"
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar el proveedor");
      }
      
      setProveedores(prevProveedores => 
        prevProveedores.filter(proveedor => proveedor.id !== id)
      );
      
      toast.success("Proveedor eliminado correctamente");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : "Error al eliminar el proveedor"}`);
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
      cell: (proveedor: Proveedor) => (
        <Link 
          href={`/proveedores/${proveedor.id}`} 
          className="hover:underline font-medium"
        >
          {proveedor.nombre}
        </Link>
      )
    },
    {
      key: "nif",
      header: "NIF",
      sortable: true,
      cell: (proveedor: Proveedor) => <div>{proveedor.nif || "—"}</div>
    },
    {
      key: "contacto",
      header: "Contacto",
      sortable: false,
      cell: (proveedor: Proveedor) => (
        <div>
          {proveedor.email || proveedor.telefono 
            ? `${proveedor.email || ""} ${proveedor.telefono ? `· ${proveedor.telefono}` : ""}`
            : "—"}
        </div>
      )
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (proveedor: Proveedor) => (
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            asChild
          >
            <Link href={`/proveedores/editar/${proveedor.id}`}>
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
                  const confirmed = confirm("¿Estás seguro de eliminar este proveedor? Esta acción no se puede deshacer.");
                  if (confirmed) {
                    handleDelete(proveedor.id);
                  }
                }}
                disabled={eliminandoId === proveedor.id}
                className="text-red-600 flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>{eliminandoId === proveedor.id ? "Eliminando..." : "Eliminar"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ]

  return (
    <div className="py-10">
      <Toaster />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Proveedores</h1>
        <Button asChild>
          <Link href="/proveedores/nuevo">
            <Plus className="mr-2 h-4 w-4" /> Nuevo Proveedor
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Proveedores</CardTitle>
          <CardDescription>
            Administra todos tus proveedores desde aquí
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
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin opacity-70" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md">
              {error}
            </div>
          ) : filteredProveedores.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm 
                ? "No se encontraron proveedores que coincidan con tu búsqueda" 
                : "No hay proveedores registrados aún"}
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={filteredProveedores}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 