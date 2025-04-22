"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import React from "react"
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EliminarEquipoDialog } from "@/components/productos/eliminar-equipo-dialog"
import { Toaster } from "@/components/ui/toaster"
import { toast } from "sonner"
import { Trash, Pencil, Loader2 } from "lucide-react"

interface EquipoItem {
  id: string
  productoId: string
  numeroSerie: string | null
  notasInternas: string | null
  estado: "DISPONIBLE" | "EN_USO" | "EN_REPARACION" | "BAJA"
  fechaCompra: string | null
  precioCompra: number | null
  createdAt: string
  updatedAt: string
  producto: {
    id: string
    nombre: string
    marca?: {
      nombre: string
    } | null
    modelo?: string | null
  }
}

interface Producto {
  id: string
  nombre: string
  marca: {
    nombre: string
  } | null
  modelo: string | null
  precioAlquiler: number | null
  stock: number
}

export default function EquiposProductoPage({ params }: { params: Promise<{ productoId: string }> }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [producto, setProducto] = useState<Producto | null>(null)
  const [equipoItems, setEquipoItems] = useState<EquipoItem[]>([])
  
  // Estado para el diálogo de agregar
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newSerialNumber, setNewSerialNumber] = useState("")
  const [newPrecioCompra, setNewPrecioCompra] = useState("")
  const [newNotes, setNewNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  
  // Estado para el diálogo de editar
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editItem, setEditItem] = useState<EquipoItem | null>(null)
  const [editNumeroSerie, setEditNumeroSerie] = useState("")
  const [editEstado, setEditEstado] = useState<"DISPONIBLE" | "EN_USO" | "EN_REPARACION" | "BAJA">("DISPONIBLE")
  const [editPrecioCompra, setEditPrecioCompra] = useState("")
  const [editFechaCompra, setEditFechaCompra] = useState("")
  const [editNotas, setEditNotas] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  
  const [productoId, setProductoId] = useState<string | null>(null)
  
  // Extraer el ID del producto de forma segura
  useEffect(() => {
    const extractParams = async () => {
      try {
        const resolvedParams = await params
        setProductoId(resolvedParams.productoId)
      } catch (err) {
        console.error('Error al resolver parámetros:', err)
        setError('Error al cargar los parámetros de la página.')
      }
    }
    
    extractParams()
  }, [params])

  // Cargar datos cuando tenemos el ID del producto
  useEffect(() => {
    if (!productoId) return
    
    const fetchData = async () => {
      try {
        setIsLoading(true)

        // Cargar el producto
        const productoResponse = await fetch(`/api/productos/${productoId}`)
        if (!productoResponse.ok) {
          throw new Error("Producto no encontrado")
        }
        const productoData = await productoResponse.json()
        setProducto(productoData)

        // Cargar los elementos de equipo
        const equipoItemsResponse = await fetch(`/api/equipo-items?productoId=${productoId}`)
        const equipoItemsData = await equipoItemsResponse.json()
        setEquipoItems(equipoItemsData)

        setError(null)
      } catch (err) {
        console.error('Error al cargar datos:', err)
        setError('Error al cargar los datos. Por favor, intente de nuevo más tarde.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [productoId])

  const handleAddEquipoItem = async () => {
    if (!productoId) {
      toast.error("No se pudo determinar el ID del producto")
      return
    }
    
    try {
      setIsSaving(true)
      
      const response = await fetch("/api/equipo-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productoId: productoId,
          numeroSerie: newSerialNumber || null,
          precioCompra: newPrecioCompra ? parseFloat(newPrecioCompra) : null,
          notasInternas: newNotes || null,
          estado: "DISPONIBLE",
          fechaCompra: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al agregar el elemento de equipo")
      }

      const newItem = await response.json()
      
      // Mostrar mensaje de éxito
      toast.success("Elemento agregado correctamente")
      
      // Actualizar la lista de equipos
      setEquipoItems([...equipoItems, newItem])
      
      // Resetear formulario
      setNewSerialNumber("")
      setNewPrecioCompra("")
      setNewNotes("")
      setShowAddDialog(false)
      
      // Actualizar el stock del producto
      if (producto) {
        setProducto({
          ...producto,
          stock: (producto.stock || 0) + 1
        })
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al agregar el elemento")
    } finally {
      setIsSaving(false)
    }
  }

  // Función para abrir el diálogo de edición y cargar los datos del elemento
  const handleOpenEditDialog = (item: EquipoItem) => {
    setEditItem(item)
    setEditNumeroSerie(item.numeroSerie || "")
    setEditEstado(item.estado)
    setEditPrecioCompra(item.precioCompra !== null ? item.precioCompra.toString() : "")
    setEditFechaCompra(
      item.fechaCompra 
        ? new Date(item.fechaCompra).toISOString().split('T')[0] 
        : ""
    )
    setEditNotas(item.notasInternas || "")
    setShowEditDialog(true)
  }

  // Función para guardar los cambios en un elemento
  const handleSaveEdit = async () => {
    if (!editItem) return
    
    setIsEditing(true)
    
    try {
      const response = await fetch(`/api/equipo-items/${editItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numeroSerie: editNumeroSerie || null,
          notasInternas: editNotas || null,
          estado: editEstado,
          precioCompra: editPrecioCompra ? parseFloat(editPrecioCompra) : null,
          fechaCompra: editFechaCompra ? new Date(editFechaCompra).toISOString() : null,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al actualizar el elemento")
      }

      const updatedItem = await response.json()
      
      // Actualizar la lista de elementos
      setEquipoItems(
        equipoItems.map(item => 
          item.id === editItem.id ? { ...item, ...updatedItem } : item
        )
      )
      
      // Mostrar mensaje de éxito
      toast.success("Elemento actualizado correctamente")
      
      // Cerrar el diálogo
      setShowEditDialog(false)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al actualizar el elemento")
    } finally {
      setIsEditing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Cargando elementos de equipo...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error}</p>
          <Button asChild className="mt-4">
            <Link href="/inventario">Volver al inventario</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>Producto no encontrado</p>
          <Button asChild className="mt-4">
            <Link href="/inventario">Volver al inventario</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex items-center mb-8">
        <Button asChild variant="outline" className="mr-4">
          <Link href="/inventario">
            Volver al inventario
          </Link>
        </Button>
        <h1 className="text-3xl font-bold flex-1">
         {producto.nombre}
          <span className="text-sm ml-2 font-normal text-gray-500">
            {producto.marca && ` - ${producto.marca.nombre}`}
            {producto.modelo && ` ${producto.modelo}`}
          </span>
        </h1>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>Agregar Elemento</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar nuevo elemento de equipo</DialogTitle>
              <DialogDescription>
                Agregue un nuevo elemento de este producto al inventario.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="numeroSerie">Número de Serie</Label>
                <Input
                  id="numeroSerie"
                  placeholder="Ingrese el número de serie"
                  value={newSerialNumber}
                  onChange={(e) => setNewSerialNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="precioCompra">Precio de Compra</Label>
                <Input
                  id="precioCompra"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Ingrese el precio de compra"
                  value={newPrecioCompra}
                  onChange={(e) => setNewPrecioCompra(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notas">Notas Internas</Label>
                <Input
                  id="notas"
                  placeholder="Notas adicionales sobre este elemento"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddEquipoItem} disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar Elemento"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Número de Serie</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha de Compra</TableHead>
              <TableHead className="text-right">Precio Compra</TableHead>
              <TableHead className="text-right">Precio Alquiler</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipoItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                  No hay elementos de equipo para este producto. Agregue uno para comenzar.
                </TableCell>
              </TableRow>
            ) : (
              equipoItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id.substring(0, 8)}</TableCell>
                  <TableCell>{item.numeroSerie || "-"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.estado === "DISPONIBLE" ? "bg-green-100 text-green-800" :
                      item.estado === "EN_USO" ? "bg-blue-100 text-blue-800" :
                      item.estado === "EN_REPARACION" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {item.estado === "DISPONIBLE" ? "Disponible" :
                       item.estado === "EN_USO" ? "En uso" :
                       item.estado === "EN_REPARACION" ? "En reparación" :
                       "Baja"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item.fechaCompra 
                      ? new Date(item.fechaCompra).toLocaleDateString() 
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.precioCompra !== null ? `$${item.precioCompra.toFixed(2)}` : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {producto.precioAlquiler !== null ? `$${producto.precioAlquiler.toFixed(2)}` : "-"}
                  </TableCell>
                  <TableCell>{item.notasInternas || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 border-amber-200"
                        onClick={() => handleOpenEditDialog(item)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <EliminarEquipoDialog
                        equipoId={item.id}
                        numeroSerie={item.numeroSerie || `Elemento #${item.id.substring(0, 8)}`}
                        trigger={
                          <Button 
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        }
                        onSuccess={() => {
                          // Actualizar la lista eliminando el elemento
                          setEquipoItems(equipoItems.filter(equipo => equipo.id !== item.id))
                          // También actualizar el stock del producto
                          if (producto) {
                            setProducto({
                              ...producto,
                              stock: Math.max(0, (producto.stock || 0) - 1)
                            })
                          }
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Diálogo para editar elemento */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar elemento de equipo</DialogTitle>
            <DialogDescription>
              Actualice los datos del elemento y haga clic en guardar cuando termine.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editNumeroSerie">Número de Serie</Label>
              <Input
                id="editNumeroSerie"
                placeholder="Ingrese el número de serie"
                value={editNumeroSerie}
                onChange={(e) => setEditNumeroSerie(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editEstado">Estado</Label>
              <select 
                id="editEstado"
                value={editEstado}
                onChange={(e) => setEditEstado(e.target.value as "DISPONIBLE" | "EN_USO" | "EN_REPARACION" | "BAJA")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="DISPONIBLE">Disponible</option>
                <option value="EN_USO">En Uso</option>
                <option value="EN_REPARACION">En Reparación</option>
                <option value="BAJA">Baja</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editPrecioCompra">Precio de Compra</Label>
              <Input
                id="editPrecioCompra"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ingrese el precio de compra"
                value={editPrecioCompra}
                onChange={(e) => setEditPrecioCompra(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editFechaCompra">Fecha de Compra</Label>
              <Input
                id="editFechaCompra"
                type="date"
                value={editFechaCompra}
                onChange={(e) => setEditFechaCompra(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="editNotas">Notas Internas</Label>
              <Input
                id="editNotas"
                placeholder="Notas adicionales sobre este elemento"
                value={editNotas}
                onChange={(e) => setEditNotas(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)} disabled={isEditing}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={isEditing}>
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
      
      {/* Agregar el toaster para notificaciones */}
      <Toaster />
    </div>
  )
} 