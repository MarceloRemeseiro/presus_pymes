"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast, Toaster } from "sonner"
import { ArrowLeft, Edit, Loader2, Mail, Phone, MapPin, Building, User, FileText, Trash, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { use } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface PageParams {
  params: Promise<{
    id: string
  }>
}

interface Proveedor {
  id: string
  nombre: string
  nif?: string | null
  direccion?: string | null
  email?: string | null
  telefono?: string | null
  contacto?: string | null
  notas?: string | null
  createdAt: string
  updatedAt: string
}

interface EquipoItem {
  id: string
  productoId: string
  numeroSerie: string | null
  estado: string
  fechaCompra: string | null
  precioCompra: number | null
  producto: {
    nombre: string
    marca?: { nombre: string } | null
    modelo?: string | null
    categoria: { nombre: string }
  }
}

interface ComprasData {
  equipos: EquipoItem[]
  totalGastado: number
}

export default function DetalleProveedorPage({ params }: PageParams) {
  const router = useRouter()
  const resolvedParams = use(params)
  const { id } = resolvedParams
  
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingCompras, setIsLoadingCompras] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [proveedor, setProveedor] = useState<Proveedor | null>(null)
  const [comprasData, setComprasData] = useState<ComprasData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/proveedores/${id}`)
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Proveedor no encontrado")
          }
          throw new Error("Error al cargar la información del proveedor")
        }
        
        const data = await response.json()
        setProveedor(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar proveedor:', err)
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar el proveedor')
        toast.error('Error al cargar proveedor')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProveedor()
  }, [id])

  // Cargar las compras del proveedor
  useEffect(() => {
    const fetchCompras = async () => {
      try {
        setIsLoadingCompras(true)
        const response = await fetch(`/api/proveedores/${id}?equipos=true`)
        
        if (!response.ok) {
          throw new Error("Error al cargar las compras del proveedor")
        }
        
        const data = await response.json()
        setComprasData(data)
      } catch (err) {
        console.error('Error al cargar compras:', err)
        toast.error('Error al cargar el historial de compras')
      } finally {
        setIsLoadingCompras(false)
      }
    }

    if (proveedor) {
      fetchCompras()
    }
  }, [id, proveedor])

  const handleEliminar = async () => {
    if (!window.confirm("¿Estás seguro de eliminar este proveedor? Esta acción no se puede deshacer.")) {
      return
    }
    
    try {
      setIsDeleting(true)
      
      const response = await fetch(`/api/proveedores/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al eliminar el proveedor')
      }
      
      toast.success('Proveedor eliminado correctamente')
      
      // Redirigir a la lista de proveedores
      setTimeout(() => {
        router.push('/proveedores')
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al eliminar el proveedor')
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Cargando información del proveedor...</p>
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
            <Link href="/proveedores">Volver a la lista de proveedores</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/proveedores">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{proveedor?.nombre}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/proveedores/editar/${id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleEliminar}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información General</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {proveedor?.nif && (
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">NIF/CIF:</span>
                <span>{proveedor.nif}</span>
              </div>
            )}
            
            {proveedor?.contacto && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Contacto:</span>
                <span>{proveedor.contacto}</span>
              </div>
            )}
            
            {proveedor?.direccion && (
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
                <span className="text-muted-foreground mr-2">Dirección:</span>
                <span>{proveedor.direccion}</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {proveedor?.telefono && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Teléfono:</span>
                <span>{proveedor.telefono}</span>
              </div>
            )}
            {proveedor?.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground mr-2">Email:</span>
                <span>{proveedor.email}</span>
              </div>
            )}
            {!proveedor?.telefono && !proveedor?.email && (
              <p className="text-muted-foreground">No hay información de contacto registrada</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      {proveedor?.notas && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Notas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground mt-1" />
              <p className="whitespace-pre-line">{proveedor.notas}</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Sección de Compras */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2 text-muted-foreground" />
            <CardTitle>Historial de Compras</CardTitle>
          </div>
          {comprasData && (
            <div className="font-semibold text-lg">
              Total: <span className="text-green-600 dark:text-green-400">${comprasData.totalGastado.toFixed(2)}</span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          {isLoadingCompras ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : comprasData && comprasData.equipos.length > 0 ? (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Nº Serie</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comprasData.equipos.slice(0, 10).map((equipo) => (
                    <TableRow key={equipo.id}>
                      <TableCell className="font-medium">
                        {equipo.producto.nombre}
                        {equipo.producto.marca && equipo.producto.modelo && (
                          <span className="text-xs text-muted-foreground block">
                            {equipo.producto.marca.nombre} {equipo.producto.modelo}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {equipo.numeroSerie || <span className="text-muted-foreground italic">Sin número</span>}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {equipo.producto.categoria.nombre}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {equipo.fechaCompra 
                          ? new Date(equipo.fechaCompra).toLocaleDateString() 
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {equipo.precioCompra !== null 
                          ? `$${equipo.precioCompra.toFixed(2)}` 
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {comprasData.equipos.length > 10 && (
                <div className="p-3 text-center text-sm text-muted-foreground">
                  Mostrando las 10 compras más recientes de un total de {comprasData.equipos.length}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No se han registrado compras con este proveedor aún.
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Información Adicional</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Creado el</span>
              <span>{new Date(proveedor?.createdAt || "").toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Última actualización</span>
              <span>{new Date(proveedor?.updatedAt || "").toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 