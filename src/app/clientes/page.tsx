"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast, Toaster } from "sonner"
import { Pencil, Trash, Loader2, PlusCircle } from "lucide-react"

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
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Estado para el diálogo de nuevo cliente
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newNombre, setNewNombre] = useState("")
  const [newNif, setNewNif] = useState("")
  const [newDireccion, setNewDireccion] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newTelefono, setNewTelefono] = useState("")
  const [newTipo, setNewTipo] = useState<"PARTICULAR" | "EMPRESA">("EMPRESA")
  const [isSaving, setIsSaving] = useState(false)
  
  // Estado para el diálogo de editar cliente
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editClienteId, setEditClienteId] = useState<string | null>(null)
  const [editNombre, setEditNombre] = useState("")
  const [editNif, setEditNif] = useState("")
  const [editDireccion, setEditDireccion] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editTelefono, setEditTelefono] = useState("")
  const [editTipo, setEditTipo] = useState<"PARTICULAR" | "EMPRESA">("EMPRESA")
  const [isEditing, setIsEditing] = useState(false)
  
  // Estado para el diálogo de eliminar cliente
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteClienteId, setDeleteClienteId] = useState<string | null>(null)
  const [deleteClienteNombre, setDeleteClienteNombre] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

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

  // Función para crear un nuevo cliente
  const handleAddCliente = async () => {
    try {
      setIsSaving(true)
      
      const response = await fetch("/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: newNombre,
          nif: newNif || null,
          direccion: newDireccion || null,
          email: newEmail || null,
          telefono: newTelefono || null,
          tipo: newTipo,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear el cliente")
      }

      const newCliente = await response.json()
      
      // Actualizar la lista de clientes
      setClientes([...clientes, newCliente])
      
      // Mostrar mensaje de éxito
      toast.success("Cliente creado correctamente")
      
      // Limpiar el formulario
      setNewNombre("")
      setNewNif("")
      setNewDireccion("")
      setNewEmail("")
      setNewTelefono("")
      setNewTipo("EMPRESA")
      
      // Cerrar el diálogo
      setShowAddDialog(false)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al crear el cliente")
    } finally {
      setIsSaving(false)
    }
  }

  // Función para abrir el diálogo de edición
  const handleOpenEditDialog = (cliente: Cliente) => {
    setEditClienteId(cliente.id)
    setEditNombre(cliente.nombre)
    setEditNif(cliente.nif || "")
    setEditDireccion(cliente.direccion || "")
    setEditEmail(cliente.email || "")
    setEditTelefono(cliente.telefono || "")
    setEditTipo(cliente.tipo)
    setShowEditDialog(true)
  }

  // Función para guardar edición de cliente
  const handleSaveEdit = async () => {
    if (!editClienteId) return
    
    try {
      setIsEditing(true)
      
      const response = await fetch(`/api/clientes/${editClienteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: editNombre,
          nif: editNif || null,
          direccion: editDireccion || null,
          email: editEmail || null,
          telefono: editTelefono || null,
          tipo: editTipo,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al actualizar el cliente")
      }

      const updatedCliente = await response.json()
      
      // Actualizar la lista de clientes
      setClientes(clientes.map(cliente => 
        cliente.id === editClienteId ? { ...cliente, ...updatedCliente } : cliente
      ))
      
      // Mostrar mensaje de éxito
      toast.success("Cliente actualizado correctamente")
      
      // Cerrar el diálogo
      setShowEditDialog(false)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al actualizar el cliente")
    } finally {
      setIsEditing(false)
    }
  }

  // Función para abrir el diálogo de eliminación
  const handleOpenDeleteDialog = (cliente: Cliente) => {
    setDeleteClienteId(cliente.id)
    setDeleteClienteNombre(cliente.nombre)
    setShowDeleteDialog(true)
  }

  // Función para eliminar cliente
  const handleDeleteCliente = async () => {
    if (!deleteClienteId) return
    
    try {
      setIsDeleting(true)
      
      const response = await fetch(`/api/clientes/${deleteClienteId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al eliminar el cliente")
      }
      
      // Actualizar la lista de clientes
      setClientes(clientes.filter(cliente => cliente.id !== deleteClienteId))
      
      // Mostrar mensaje de éxito
      toast.success("Cliente eliminado correctamente")
      
      // Cerrar el diálogo
      setShowDeleteDialog(false)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al eliminar el cliente")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
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
          <Button onClick={() => window.location.reload()} className="mt-4">
            Intentar de nuevo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>CIF/NIF</TableHead>
              <TableHead>Dirección</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No hay clientes registrados. Crea uno para empezar.
                </TableCell>
              </TableRow>
            ) : (
              clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nombre}</TableCell>
                  <TableCell>{cliente.nif || "-"}</TableCell>
                  <TableCell>{cliente.direccion || "-"}</TableCell>
                  <TableCell>{cliente.email || "-"}</TableCell>
                  <TableCell>{cliente.telefono || "-"}</TableCell>
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
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 border-amber-200"
                        onClick={() => handleOpenEditDialog(cliente)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button 
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={() => handleOpenDeleteDialog(cliente)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Diálogo para Añadir Cliente */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nuevo cliente</DialogTitle>
            <DialogDescription>
              Complete los datos del cliente y haga clic en guardar para crearlo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre*</Label>
              <Input
                id="nombre"
                placeholder="Nombre de la empresa o cliente"
                value={newNombre}
                onChange={(e) => setNewNombre(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nif">CIF/NIF</Label>
              <Input
                id="nif"
                placeholder="CIF o NIF"
                value={newNif}
                onChange={(e) => setNewNif(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                placeholder="Dirección completa"
                value={newDireccion}
                onChange={(e) => setNewDireccion(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Correo electrónico"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                placeholder="Número de teléfono"
                value={newTelefono}
                onChange={(e) => setNewTelefono(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de cliente</Label>
              <select 
                id="tipo"
                value={newTipo}
                onChange={(e) => setNewTipo(e.target.value as "PARTICULAR" | "EMPRESA")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="EMPRESA">Empresa</option>
                <option value="PARTICULAR">Autónomo</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)} disabled={isSaving}>
              Cancelar
            </Button>
            <Button onClick={handleAddCliente} disabled={isSaving || !newNombre}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar cliente'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para Editar Cliente */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar cliente</DialogTitle>
            <DialogDescription>
              Actualice los datos del cliente y haga clic en guardar para aplicar los cambios.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editNombre">Nombre*</Label>
              <Input
                id="editNombre"
                placeholder="Nombre de la empresa o cliente"
                value={editNombre}
                onChange={(e) => setEditNombre(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editNif">CIF/NIF</Label>
              <Input
                id="editNif"
                placeholder="CIF o NIF"
                value={editNif}
                onChange={(e) => setEditNif(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editDireccion">Dirección</Label>
              <Input
                id="editDireccion"
                placeholder="Dirección completa"
                value={editDireccion}
                onChange={(e) => setEditDireccion(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                placeholder="Correo electrónico"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editTelefono">Teléfono</Label>
              <Input
                id="editTelefono"
                placeholder="Número de teléfono"
                value={editTelefono}
                onChange={(e) => setEditTelefono(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editTipo">Tipo de cliente</Label>
              <select 
                id="editTipo"
                value={editTipo}
                onChange={(e) => setEditTipo(e.target.value as "PARTICULAR" | "EMPRESA")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="EMPRESA">Empresa</option>
                <option value="PARTICULAR">Autónomo</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)} disabled={isEditing}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={isEditing || !editNombre}>
              {isEditing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar cambios'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo para Eliminar Cliente */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar cliente</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea eliminar este cliente? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center">
              Va a eliminar a: <span className="font-medium">{deleteClienteNombre}</span>
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteCliente} 
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                'Eliminar cliente'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Toaster para notificaciones */}
      <Toaster />
    </div>
  )
} 