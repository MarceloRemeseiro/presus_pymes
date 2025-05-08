"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast, Toaster } from "sonner"
import { Plus, Search, Eye, Pencil, Trash2, LayoutList, Loader2, MoreHorizontal, FileCode } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { DataTable } from "@/components/ui/data-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ImportExportDialogInventario } from "@/components/inventario/ImportExportDialogInventario"

interface Producto {
  id: string
  nombre: string
  descripcion: string | null
  stock: number
  precio: number
  precioCompra: number | null
  precioAlquiler: number | null
  categoriaId: string
  marcaId: string | null
  modelo: string | null
  categoria: {
    id: string
    nombre: string
  }
  marca: {
    id: string
    nombre: string
  } | null
}

export default function InventarioPage() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [eliminandoId, setEliminandoId] = useState<string | null>(null)

  const fetchProductos = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/productos')
      
      if (!response.ok) {
        throw new Error('Error al cargar productos')
      }
      
      const data = await response.json()
      const filteredData = Array.isArray(data) 
        ? data.filter(p => p.categoria?.nombre !== '__SISTEMA__')
        : []
      setProductos(filteredData)
      setError(null)
    } catch (err) {
      console.error('Error al cargar datos:', err)
      setError('Error al cargar los productos. Por favor, intente de nuevo más tarde.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProductos()
  }, [])

  // Filtrar productos basados en el término de búsqueda
  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.marca?.nombre && producto.marca.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (producto.modelo && producto.modelo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (producto.categoria?.nombre && producto.categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Eliminar un producto
  const handleDelete = async (id: string, nombre: string) => {
    try {
      setEliminandoId(id);
      
      const response = await fetch(`/api/productos/${id}`, {
        method: "DELETE"
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar el producto");
      }
      
      setProductos(prevProductos => 
        prevProductos.filter(producto => producto.id !== id)
      );
      
      toast.success("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : "Error al eliminar el producto"}`);
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
      cell: (producto: Producto) => (
        <Link 
          href={`/inventario/${producto.id}`} 
          className="hover:underline font-medium"
        >
          {producto.nombre}
        </Link>
      )
    },
    {
      key: "marca.nombre",
      header: "Marca / Modelo",
      sortable: true,
      cell: (producto: Producto) => (
        <div>
          {producto.marca ? (
            <>
              {producto.marca.nombre}
              {producto.modelo && <span className="text-muted-foreground ml-1">{producto.modelo}</span>}
            </>
          ) : (
            producto.modelo || "-"
          )}
        </div>
      )
    },
    {
      key: "categoria.nombre",
      header: "Categoría",
      sortable: true,
      cell: (producto: Producto) => <div>{producto.categoria?.nombre || '-'}</div>
    },
    {
      key: "stock",
      header: "Stock",
      sortable: true,
      cell: (producto: Producto) => (
        <div className="flex justify-start gap-2">
          {producto.stock}
        </div>
      )
    },
    {
      key: "precioAlquiler",
      header: "Precio Alquiler",
      sortable: true,
      cell: (producto: Producto) => (
        <div className="flex justify-start gap-2">
          {producto.precioAlquiler !== null ? formatCurrency(producto.precioAlquiler) : "-"}
        </div>
      )
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (producto: Producto) => (
        <div className="flex justify-start gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            asChild
          >
            <Link href={`/inventario/${producto.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            asChild
          >
            <Link href={`/inventario/editar/${producto.id}`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            asChild
          >
            <Link href={`/inventario/equipos/${producto.id}`}>
              <LayoutList className="h-4 w-4" />
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
                  const confirmed = confirm(`¿Estás seguro de eliminar el producto "${producto.nombre}"? Esta acción no se puede deshacer.`);
                  if (confirmed) {
                    handleDelete(producto.id, producto.nombre);
                  }
                }}
                disabled={eliminandoId === producto.id}
                className="text-red-600 flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>{eliminandoId === producto.id ? "Eliminando..." : "Eliminar"}</span>
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
        <h1 className="text-3xl font-bold">Inventario</h1>
        <div className="flex gap-2">
          <ImportExportDialogInventario 
            trigger={
              <Button variant="outline">
                <FileCode className="mr-2 h-4 w-4" /> 
                Importar / Exportar
              </Button>
            }
            onImportSuccess={fetchProductos}
          />
          <Button asChild>
            <Link href="/inventario/nuevo">
              <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Inventario</CardTitle>
          <CardDescription>
            Administra todos tus productos desde aquí
          </CardDescription>
          
          <div className="flex items-center mt-4">
            <Search className="h-4 w-4 mr-2 opacity-50" />
            <Input
              placeholder="Buscar por nombre, código, categoría, marca o modelo..."
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
          ) : filteredProductos.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm 
                ? "No se encontraron productos que coincidan con tu búsqueda" 
                : "No hay productos registrados aún"}
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={filteredProductos}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
} 