"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
import { NuevoProductoDialog } from "@/components/productos/nuevo-producto-dialog"
import { EditarProductoDialog } from "@/components/productos/editar-producto-dialog"
import { EliminarProductoDialog } from "@/components/productos/eliminar-producto-dialog"
import { Toaster } from "@/components/ui/toaster"
import { LayoutListIcon, Pencil, Trash2 } from "lucide-react"

interface Producto {
  id: string
  codigo: string
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
  _count?: {
    equipoItems: number
  }
}

interface Categoria {
  id: string
  nombre: string
}

interface Marca {
  id: string
  nombre: string
}

export default function InventarioPage() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Función para refrescar los datos
  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Cargar categorías
        const categoriasResponse = await fetch('/api/categorias')
        const categoriasData = await categoriasResponse.json()
        setCategorias(categoriasData)
        
        // Cargar marcas
        const marcasResponse = await fetch('/api/marcas')
        const marcasData = await marcasResponse.json()
        setMarcas(marcasData)
        
        // Cargar productos con conteo de equipoItems
        const productosResponse = await fetch('/api/productos?includeEquipoItems=true')
        if (!productosResponse.ok) {
          throw new Error('Error al cargar productos')
        }
        const productosData = await productosResponse.json()
        
        // Verificar que sea un array
        if (Array.isArray(productosData)) {
          setProductos(productosData)
        } else {
          console.error('La API no devolvió un array:', productosData)
          setError('Error: Formato de datos incorrecto')
          setProductos([])
        }
        
        setError(null)
      } catch (err) {
        console.error('Error al cargar datos:', err)
        setError('Error al cargar los datos. Por favor, intente de nuevo más tarde.')
        setProductos([]) // Asegurar que productos sea un array vacío
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [refreshTrigger]) // Agregar refreshTrigger como dependencia

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Cargando inventario...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Inventario</h1>
        <NuevoProductoDialog 
          categorias={categorias} 
          marcas={marcas}
          onSuccess={refreshData}
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Marca / Modelo</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Precio Alquiler</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!Array.isArray(productos) || productos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No hay productos en el inventario. Agregue uno para comenzar.
                </TableCell>
              </TableRow>
            ) : (
              productos.map((producto) => (
                <TableRow key={producto.id}>
                  <TableCell className="font-medium">{producto.nombre}</TableCell>
                  <TableCell>
                    {producto.marca ? (
                      <>
                        {producto.marca.nombre}
                        {producto.modelo && <span className="text-muted-foreground ml-1">{producto.modelo}</span>}
                      </>
                    ) : (
                      producto.modelo || "-"
                    )}
                  </TableCell>
                  <TableCell>{producto.categoria.nombre}</TableCell>
                  <TableCell className="text-right">{producto.stock}</TableCell>
                  <TableCell className="text-right">
                    {producto.precioAlquiler !== null ? `$${producto.precioAlquiler.toFixed(2)}` : "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <EditarProductoDialog 
                        producto={producto}
                        categorias={categorias}
                        marcas={marcas}
                        onSuccess={refreshData}
                        trigger={
                          <Button
                            variant="outline"
                            size="icon"
                            title="Editar producto"
                            className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 border-amber-200"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Button>
                        }
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        title="Ver elementos de equipo"
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                      >
                        <Link href={`/inventario/equipos/${producto.id}`}>
                          <LayoutListIcon className="h-4 w-4" />
                          <span className="sr-only">Ver elementos</span>
                        </Link>
                      </Button>
                      <EliminarProductoDialog 
                        productoId={producto.id}
                        productoNombre={producto.nombre}
                        onSuccess={refreshData}
                        trigger={
                          <Button
                            variant="outline"
                            size="icon"
                            title="Eliminar producto"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Toaster />
    </div>
  );
} 