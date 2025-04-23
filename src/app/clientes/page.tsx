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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"
import { Edit, Trash, Loader2, PlusCircle, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
  const [isDeleting, setIsDeleting] = useState(false)
  const [clienteIdToDelete, setClienteIdToDelete] = useState<string | null>(null)

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
    if (!window.confirm("¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.")) {
      return
    }
    
    try {
      setIsDeleting(true)
      setClienteIdToDelete(id)
      
      const response = await fetch(`/api/clientes/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al eliminar el cliente")
      }
      
      // Actualizar la lista de clientes
      setClientes(clientes.filter(cliente => cliente.id !== id))
      
      // Mostrar mensaje de éxito
      toast.success("Cliente eliminado correctamente")
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al eliminar el cliente")
    } finally {
      setIsDeleting(false)
      setClienteIdToDelete(null)
    }
  }

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
        <Button asChild>
          <Link href="/clientes/nuevo">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Link>
        </Button>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>CIF/NIF</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id}>
                    <TableCell className="font-medium">
                      <Link 
                        href={`/clientes/${cliente.id}`} 
                        className="hover:underline"
                      >
                        {cliente.nombre}
                      </Link>
                    </TableCell>
                    <TableCell>{cliente.nif || "—"}</TableCell>
                    <TableCell>{cliente.email || "—"}</TableCell>
                    <TableCell>{cliente.telefono || "—"}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        cliente.tipo === "EMPRESA" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {cliente.tipo === "EMPRESA" ? "Empresa" : "Autónomo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
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
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteCliente(cliente.id)}
                          disabled={isDeleting && clienteIdToDelete === cliente.id}
                        >
                          {isDeleting && clienteIdToDelete === cliente.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      
      {/* Toaster para notificaciones */}
      <Toaster />
    </div>
  )
} 