"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast, Toaster } from "sonner"
import { PlusCircle, Trash, ArrowLeft, Save, Loader2, Check } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AgregarElementoDialog } from "@/components/presupuestos/agregar-elemento-dialog"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Definición del componente Textarea inline para evitar problemas de importación
const Textarea = React.forwardRef<
  HTMLTextAreaElement, 
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

interface Cliente {
  id: string
  nombre: string
  tipo: "PARTICULAR" | "EMPRESA"
}

interface Partida {
  id: string
  nombre: string
  descripcion?: string | null
}

interface Configuracion {
  id: string
  ivaPorDefecto: number
  moneda: string
  prefijoFactura: string
  prefijoPresupuesto: string
}

interface PartidaLocalState {
  id: string | null // null si es nueva
  nombre: string
  items: ItemPartidaLocalState[]
}

interface ItemPartidaLocalState {
  id: string // ID local temporal para manejo en UI
  tipo?: "CATEGORIA" | "EQUIPO" | "PERSONAL" | "SEPARADOR" | "PERSONALIZADO" // Nuevo campo para identificar tipo de elemento
  productoId?: string
  nombre: string
  descripcion?: string | null
  cantidad: number
  precioUnitario: number
  descuento: number
  iva: number
  subtotal: number
  total: number
  dias: number // Nuevo campo para días
  datosExtra?: any // Campos adicionales según el tipo
  partidaId?: string | null // ID de la partida a la que pertenece
}

interface Presupuesto {
  id: string
  numero: string
  nombre?: string | null
  referencia?: string | null
  fecha: string
  fechaValidez: string
  fechaMontaje?: string | null
  fechaInicio?: string | null
  fechaFin?: string | null
  clienteId?: string
  cliente?: {
    nombre: string
    email?: string | null
    telefono?: string | null
    direccion?: string | null
    nif?: string | null
  }
  estado: "PENDIENTE" | "APROBADO" | "RECHAZADO" | "FACTURADO"
  observaciones?: string | null
  subtotal: number
  iva: number
  total: number
  items: {
    id: string
    productoId: string
    producto: {
      nombre: string
      descripcion: string | null
      precioBase: number
    }
    cantidad: number
    precioUnitario: number
    descuento: number
    iva: number
    total: number
    partidaId?: string | null
    partida?: {
      id: string
      nombre: string
    } | null
  }[]
}

// Componente SortableItem para hacer que las filas sean arrastrables
interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 0,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? 'bg-muted shadow-lg' : ''}`}
      {...attributes}
    >
      {/* Control para arrastrar */}
      <td className="w-0 p-0">
        <div 
          className="w-8 h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          {...listeners}
        >
          <div className="w-4 h-10 flex flex-col items-center justify-center">
            <div className="w-4 h-0.5 bg-gray-400 my-0.5"></div>
            <div className="w-4 h-0.5 bg-gray-400 my-0.5"></div>
            <div className="w-4 h-0.5 bg-gray-400 my-0.5"></div>
          </div>
        </div>
      </td>
      {/* Contenido de la fila */}
      {children}
    </tr>
  );
}

export default function EditarPresupuestoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [presupuestoId, setPresupuestoId] = useState<string | null>(null)
  
  // Configuración de sensores para el arrastre (movido al nivel principal)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Reducir la distancia para activar
        tolerance: 5, // Tolerancia para el movimiento
        delay: 150, // Pequeño retraso para evitar activaciones accidentales
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // Estados para datos de referencia
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [partidas, setPartidas] = useState<Partida[]>([])
  const [configuracion, setConfiguracion] = useState<Configuracion | null>(null)
  
  // Estado del formulario principal
  const [numeroPresupuesto, setNumeroPresupuesto] = useState("")
  const [nombre, setNombre] = useState("")
  const [referencia, setReferencia] = useState("")
  const [clienteId, setClienteId] = useState("")
  const [fechaPresupuesto, setFechaPresupuesto] = useState("")
  const [fechaValidez, setFechaValidez] = useState("")
  const [fechaMontaje, setFechaMontaje] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [observaciones, setObservaciones] = useState("")
  const [estado, setEstado] = useState<"PENDIENTE" | "APROBADO" | "RECHAZADO" | "FACTURADO">("PENDIENTE")
  
  // Estado para nueva partida
  const [showNuevaPartida, setShowNuevaPartida] = useState(false)
  const [nuevaPartidaNombre, setNuevaPartidaNombre] = useState("")
  const [nuevaPartidaDescripcion, setNuevaPartidaDescripcion] = useState("")
  
  // Estado para partidas y líneas del presupuesto
  const [partidasPresupuesto, setPartidasPresupuesto] = useState<PartidaLocalState[]>([])
  
  // Estados de carga
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSavingPartida, setIsSavingPartida] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [changesNotSaved, setChangesNotSaved] = useState(false)

  // Extraer el ID del presupuesto de forma segura
  useEffect(() => {
    const extractParams = async () => {
      try {
        const resolvedParams = await params
        setPresupuestoId(resolvedParams.id)
      } catch (err) {
        console.error('Error al resolver parámetros:', err)
        setError('Error al cargar los parámetros de la página.')
      }
    }
    
    extractParams()
  }, [params])

  // Cargar datos iniciales cuando tenemos el ID
  useEffect(() => {
    if (!presupuestoId) return
    
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Cargar datos del presupuesto
        const presupuestoResponse = await fetch(`/api/presupuestos/${presupuestoId}`)
        if (!presupuestoResponse.ok) {
          throw new Error('Error al cargar el presupuesto')
        }
        const presupuestoData: Presupuesto = await presupuestoResponse.json()
        
        // Establecer los datos del presupuesto en el formulario
        setNumeroPresupuesto(presupuestoData.numero)
        setNombre(presupuestoData.nombre || "")
        setReferencia(presupuestoData.referencia || "")
        setClienteId(presupuestoData.clienteId || "")
        setFechaPresupuesto(new Date(presupuestoData.fecha).toISOString().split("T")[0])
        setFechaValidez(new Date(presupuestoData.fechaValidez).toISOString().split("T")[0])
        
        if (presupuestoData.fechaMontaje) {
          setFechaMontaje(new Date(presupuestoData.fechaMontaje).toISOString().split("T")[0])
        }
        
        if (presupuestoData.fechaInicio) {
          setFechaInicio(new Date(presupuestoData.fechaInicio).toISOString().split("T")[0])
        }
        
        if (presupuestoData.fechaFin) {
          setFechaFin(new Date(presupuestoData.fechaFin).toISOString().split("T")[0])
        }
        
        setObservaciones(presupuestoData.observaciones || "")
        setEstado(presupuestoData.estado)
        
        // Transformar los items del presupuesto al formato de PartidaLocalState
        if (presupuestoData.items && presupuestoData.items.length > 0) {
          // Agrupar items por partida
          const itemsByPartidaId: Record<string, any[]> = {}
          
          // Items sin partida
          const itemsSinPartida: any[] = []
          
          // Agrupar los items
          presupuestoData.items.forEach(item => {
            if (item.partidaId && item.partida) {
              if (!itemsByPartidaId[item.partidaId]) {
                itemsByPartidaId[item.partidaId] = []
              }
              itemsByPartidaId[item.partidaId].push(item)
            } else {
              itemsSinPartida.push(item)
            }
          })
          
          // Crear las partidas locales con sus items
          const partidasLocal: PartidaLocalState[] = []
          
          // Procesar items con partidas
          Object.entries(itemsByPartidaId).forEach(([partidaId, items]) => {
            if (items.length > 0 && items[0].partida) {
              partidasLocal.push({
                id: partidaId,
                nombre: items[0].partida.nombre,
                items: items.map(item => ({
                  id: item.id,
                  productoId: item.productoId,
                  tipo: item.tipo, // Asegurarnos de preservar el tipo
                  nombre: item.nombre || item.producto.nombre, // Preservar el nombre original para categorías
                  descripcion: item.descripcion || item.producto.descripcion,
                  cantidad: item.cantidad,
                  precioUnitario: item.precioUnitario,
                  descuento: item.descuento,
                  iva: item.iva,
                  subtotal: item.cantidad * item.precioUnitario * (1 - item.descuento / 100),
                  total: item.total,
                  dias: item.dias || 1, // Asegurarnos de tener un valor para días
                  datosExtra: {},
                  partidaId: partidaId // Asegurar que guardamos el ID de la partida con cada item
                }))
              })
            }
          })
          
          // Procesar items sin partida si existen
          if (itemsSinPartida.length > 0) {
            partidasLocal.push({
              id: null,
              nombre: "Otros elementos",
              items: itemsSinPartida.map(item => ({
                id: item.id,
                productoId: item.productoId,
                tipo: item.tipo, // Asegurarnos de preservar el tipo
                nombre: item.nombre || item.producto.nombre, // Preservar el nombre original para categorías
                descripcion: item.descripcion || item.producto.descripcion,
                cantidad: item.cantidad,
                precioUnitario: item.precioUnitario,
                descuento: item.descuento,
                iva: item.iva,
                subtotal: item.cantidad * item.precioUnitario * (1 - item.descuento / 100),
                total: item.total,
                dias: item.dias || 1, // Asegurarnos de tener un valor para días
                datosExtra: {},
                partidaId: null // No hay partida asociada
              }))
            })
          }
          
          setPartidasPresupuesto(partidasLocal)
        }
        
        // Cargar clientes
        const clientesResponse = await fetch('/api/clientes')
        if (!clientesResponse.ok) {
          throw new Error('Error al cargar los clientes')
        }
        const clientesData = await clientesResponse.json()
        setClientes(clientesData)
        
        // Cargar partidas predefinidas
        const partidasResponse = await fetch('/api/partidas')
        if (!partidasResponse.ok) {
          throw new Error('Error al cargar las partidas')
        }
        const partidasData = await partidasResponse.json()
        setPartidas(partidasData)
        
        // Cargar configuración para prefijos de numeración
        const configResponse = await fetch('/api/configuracion')
        if (!configResponse.ok) {
          throw new Error('Error al cargar la configuración')
        }
        const configData = await configResponse.json()
        setConfiguracion(configData)
        
      } catch (err) {
        console.error('Error al cargar datos:', err)
        setError('Error al cargar los datos necesarios')
        toast.error('Error al cargar datos')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [presupuestoId])

  // Crear una nueva partida
  const handleCrearPartida = async () => {
    if (!nuevaPartidaNombre.trim()) {
      toast.error('Debe ingresar un nombre para la partida')
      return
    }
    
    try {
      setIsSavingPartida(true)
      
      const response = await fetch('/api/partidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nuevaPartidaNombre,
          descripcion: nuevaPartidaDescripcion || null,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear la partida')
      }
      
      const nuevaPartida = await response.json()
      
      // Actualizar la lista de partidas
      setPartidas([...partidas, nuevaPartida])
      
      // Limpiar el formulario
      setNuevaPartidaNombre("")
      setNuevaPartidaDescripcion("")
      setShowNuevaPartida(false)
      
      toast.success('Partida creada correctamente')
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al crear la partida')
    } finally {
      setIsSavingPartida(false)
    }
  }

  // Verificar si todos los campos obligatorios están completos
  const isFormValid = (): boolean => {
    // Verificamos que haya una fecha y que el cliente sea válido
    if (!fechaPresupuesto || !fechaValidez) return false;
    
    // Verificamos que el cliente sea válido (no puede ser cadena vacía)
    if (!clienteId) return false;
    
    // No es necesario que haya partidas para guardar
    return true;
  }

  // Agregar función para agregar partida al presupuesto
  const handleAgregarPartidaAlPresupuesto = (partidaId: string) => {
    const partidaSeleccionada = partidas.find(p => p.id === partidaId)
    if (!partidaSeleccionada) return
    
    // Verificar si la partida ya está en el presupuesto
    if (partidasPresupuesto.some(p => p.id === partidaId)) {
      toast.error('Esta partida ya ha sido agregada al presupuesto')
      return
    }
    
    const nuevaPartidaPresupuesto: PartidaLocalState = {
      id: partidaId,
      nombre: partidaSeleccionada.nombre,
      items: []
    }
    
    setPartidasPresupuesto([...partidasPresupuesto, nuevaPartidaPresupuesto])
    toast.success(`Partida "${partidaSeleccionada.nombre}" agregada al presupuesto`)
  }

  // Agregar función para eliminar partida del presupuesto
  const handleEliminarPartidaPresupuesto = (index: number) => {
    const nuevasPartidas = [...partidasPresupuesto]
    nuevasPartidas.splice(index, 1)
    setPartidasPresupuesto(nuevasPartidas)
  }

  // Agregar un nuevo elemento a una partida
  const handleAgregarElemento = (partidaIndex: number, nuevoItem: ItemPartidaLocalState) => {
    // Verificar que el elemento tiene productoId, especialmente para categorías y separadores
    if ((nuevoItem.tipo === "CATEGORIA" || nuevoItem.tipo === "SEPARADOR") && !nuevoItem.productoId) {
      console.error("Error: Intentando agregar un elemento de tipo", nuevoItem.tipo, "sin productoId");
      toast.error(`Error al agregar elemento: falta el ID de producto para ${nuevoItem.tipo}`);
      return;
    }
    
    console.log("Agregando elemento con datos:", nuevoItem);
    
    const nuevasPartidas = [...partidasPresupuesto];
    
    // Asignar el partidaId del item según la partida donde se está agregando
    nuevoItem.partidaId = nuevasPartidas[partidaIndex].id;
    
    nuevasPartidas[partidaIndex].items.push(nuevoItem);
    setPartidasPresupuesto(nuevasPartidas);
    toast.success(`Elemento agregado a ${nuevasPartidas[partidaIndex].nombre}`);
  }

  // Eliminar un elemento de una partida
  const handleEliminarElemento = (partidaIndex: number, itemIndex: number) => {
    const nuevasPartidas = [...partidasPresupuesto];
    nuevasPartidas[partidaIndex].items.splice(itemIndex, 1);
    setPartidasPresupuesto(nuevasPartidas);
    setChangesNotSaved(true);
  }

  // Función para manejar el reordenamiento cuando un elemento es arrastrado
  const handleDragEnd = (event: DragEndEvent, partidaIndex: number) => {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
      const nuevasPartidas = [...partidasPresupuesto];
      const partida = nuevasPartidas[partidaIndex];
      
      // Encontrar los índices de los elementos que están siendo reordenados
      const activeIndex = partida.items.findIndex(item => item.id === active.id);
      const overIndex = partida.items.findIndex(item => item.id === over.id);
      
      // Reordenar los elementos
      nuevasPartidas[partidaIndex].items = arrayMove(
        partida.items,
        activeIndex,
        overIndex
      );
      
      setPartidasPresupuesto(nuevasPartidas);
      setChangesNotSaved(true);
    }
  };

  // Función para guardar cambios cuando se modifican campos
  const handleFieldChange = useCallback((field: string, value: any) => {
    // Actualizar el campo correspondiente
    switch (field) {
      case 'nombre':
        setNombre(value);
        break;
      case 'referencia':
        setReferencia(value);
        break;
      case 'clienteId':
        setClienteId(value);
        break;
      case 'fechaPresupuesto':
        setFechaPresupuesto(value);
        break;
      case 'fechaValidez':
        setFechaValidez(value);
        break;
      case 'fechaMontaje':
        setFechaMontaje(value);
        break;
      case 'fechaInicio':
        setFechaInicio(value);
        break;
      case 'fechaFin':
        setFechaFin(value);
        break;
      case 'observaciones':
        setObservaciones(value);
        break;
      case 'estado':
        setEstado(value);
        break;
    }
    
    // Marcar que hay cambios no guardados
    setChangesNotSaved(true)
    
    // Configurar un temporizador para guardar automáticamente después de 2 segundos de inactividad
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }
    
    const timer = setTimeout(() => {
      handleGuardarPresupuesto(true)
    }, 2000)
    
    setAutoSaveTimer(timer)
  }, [autoSaveTimer])

  // Guardar el presupuesto
  const handleGuardarPresupuesto = async (isAutoSave = false) => {
    if (!isFormValid()) {
      if (!isAutoSave) {
        // Mensaje de error específico
        if (!clienteId) {
          toast.error('Debe seleccionar un cliente para el presupuesto')
        } else {
          toast.error('Debe completar todos los campos obligatorios')
        }
      }
      return
    }
    
    try {
      setIsSaving(true)
      
      // SOLUCIÓN DIRECTA: Construir manualmente el array de items
      let itemsArray: any[] = [];
      
      // Extraer todos los items de todas las partidas
      partidasPresupuesto.forEach(partida => {
        partida.items.forEach(item => {
          // Solo incluimos los campos necesarios para el backend
          const itemData: any = {
            productoId: item.productoId,
            tipo: item.tipo, // Aseguramos enviar el tipo
            nombre: item.nombre, // Para categorías necesitamos el nombre
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            descuento: item.descuento,
            iva: item.iva,
            dias: item.dias
          };
          
          // Agregamos partidaId solo si existe
          if (partida.id) {
            itemData.partidaId = partida.id;
          }
          
          itemsArray.push(itemData);
        });
      });
      
      // Crear un objeto JSON plano para enviar
      const dataToSend = {
        numero: numeroPresupuesto,
        nombre: nombre || null,
        referencia: referencia || null,
        fecha: new Date(fechaPresupuesto).toISOString(),
        fechaValidez: new Date(fechaValidez).toISOString(),
        fechaMontaje: fechaMontaje ? new Date(fechaMontaje).toISOString() : null,
        fechaInicio: fechaInicio ? new Date(fechaInicio).toISOString() : null,
        fechaFin: fechaFin ? new Date(fechaFin).toISOString() : null,
        clienteId: clienteId || undefined, // Si es cadena vacía, enviar undefined para que Prisma no lo actualice
        observaciones,
        estado: estado || "PENDIENTE",
        items: itemsArray
      };
      
      // Enviar los datos al servidor
      const response = await fetch(`/api/presupuestos/${presupuestoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al actualizar el presupuesto')
      }
      
      // Actualizar la fecha de último guardado
      setLastSaved(new Date())
      // No hay cambios pendientes
      setChangesNotSaved(false)
      
      if (!isAutoSave) {
        toast.success('Presupuesto actualizado correctamente')
      }
      
    } catch (error) {
      console.error("Error:", error)
      if (!isAutoSave) {
        toast.error(error instanceof Error ? error.message : 'Error al actualizar el presupuesto')
      }
    } finally {
      setIsSaving(false)
    }
  }
  
  // Limpiar el temporizador al desmontar el componente
  useEffect(() => {
    return () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
      }
    }
  }, [autoSaveTimer])

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Cargando presupuesto...</p>
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
            <Link href="/presupuestos">Volver a presupuestos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-8">
        <Button asChild variant="outline" className="mr-4">
          <Link href="/presupuestos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold flex-grow">Editar Presupuesto</h1>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <span className="text-sm text-muted-foreground flex items-center">
              {changesNotSaved ? (
                <>Editando...</>
              ) : (
                <>
                  <Check className="mr-1 h-3 w-3 text-green-500" />
                  Guardado: {lastSaved.toLocaleTimeString()}
                </>
              )}
            </span>
          )}
          <Button 
            onClick={() => handleGuardarPresupuesto(false)} 
            disabled={isSaving || !isFormValid()}
            className="gap-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="numero" className="block mb-2">Número de Presupuesto*</Label>
              <Input 
                id="numero" 
                value={numeroPresupuesto} 
                onChange={(e) => handleFieldChange('numeroPresupuesto', e.target.value)}
                disabled={true} // No permitimos cambiar el número
                className="bg-gray-100" 
                required 
              />
              <p className="text-xs text-gray-500 mt-1">El número se genera automáticamente</p>
            </div>
            
            <div>
              <Label htmlFor="cliente" className="block mb-2">Cliente*</Label>
              <select 
                id="cliente" 
                value={clienteId} 
                onChange={(e) => handleFieldChange('clienteId', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="">Seleccione un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="nombre">Nombre del Presupuesto</Label>
              <Input 
                id="nombre" 
                value={nombre} 
                onChange={(e) => handleFieldChange('nombre', e.target.value)}
                placeholder="Nombre descriptivo del presupuesto (opcional)" 
              />
            </div>
            
            <div>
              <Label htmlFor="referencia">Referencia</Label>
              <Input 
                id="referencia" 
                value={referencia} 
                onChange={(e) => handleFieldChange('referencia', e.target.value)}
                placeholder="Referencia externa (opcional)" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="fechaPresupuesto">Fecha Presupuesto*</Label>
              <Input 
                id="fechaPresupuesto" 
                type="date" 
                value={fechaPresupuesto} 
                onChange={(e) => {
                  const newValue = e.target.value;
                  handleFieldChange('fechaPresupuesto', newValue);
                  // Actualizar fecha de validez automáticamente
                  if (newValue) {
                    const newDate = new Date(newValue);
                    newDate.setDate(newDate.getDate() + 15);
                    handleFieldChange('fechaValidez', newDate.toISOString().split("T")[0]);
                  }
                }}
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="fechaValidez">Válido hasta*</Label>
              <Input 
                id="fechaValidez" 
                type="date" 
                value={fechaValidez} 
                onChange={(e) => handleFieldChange('fechaValidez', e.target.value)}
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="fechaMontaje">Fecha de Montaje</Label>
              <Input 
                id="fechaMontaje" 
                type="date" 
                value={fechaMontaje} 
                onChange={(e) => handleFieldChange('fechaMontaje', e.target.value)} 
              />
            </div>
            
            <div>
              <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
              <Input 
                id="fechaInicio" 
                type="date" 
                value={fechaInicio} 
                onChange={(e) => handleFieldChange('fechaInicio', e.target.value)} 
              />
            </div>
            
            <div>
              <Label htmlFor="fechaFin">Fecha de Fin</Label>
              <Input 
                id="fechaFin" 
                type="date" 
                value={fechaFin} 
                onChange={(e) => handleFieldChange('fechaFin', e.target.value)} 
              />
            </div>
            
            <div>
              <Label htmlFor="estado">Estado</Label>
              <select 
                id="estado" 
                value={estado} 
                onChange={(e) => handleFieldChange('estado', e.target.value as "PENDIENTE" | "APROBADO" | "RECHAZADO" | "FACTURADO")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="APROBADO">Aprobado</option>
                <option value="RECHAZADO">Rechazado</option>
                <option value="FACTURADO">Facturado</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="observaciones">Observaciones</Label>
            <textarea
              id="observaciones"
              className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Observaciones o notas adicionales para el presupuesto"
              value={observaciones}
              onChange={(e) => handleFieldChange('observaciones', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Sección de partidas y elementos */}
      <h2 className="text-xl font-bold mb-4">Servicios Presupuestados</h2>
      
      <div className="flex space-x-4 mb-6">
        <div className="flex-grow">
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              if (e.target.value) {
                handleAgregarPartidaAlPresupuesto(e.target.value);
                e.target.value = ""; // Reset select after selection
              }
            }}
          >
            <option value="">Seleccionar partida</option>
            {partidas.map((partida) => (
              <option key={partida.id} value={partida.id}>
                {partida.nombre}
              </option>
            ))}
          </select>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setShowNuevaPartida(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Crear Partida
        </Button>
      </div>
      
      {/* Formulario para crear nueva partida */}
      {showNuevaPartida && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Nueva Partida</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombrePartida">Nombre*</Label>
                <Input 
                  id="nombrePartida" 
                  value={nuevaPartidaNombre} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNuevaPartidaNombre(e.target.value)} 
                  placeholder="Ej: Equipamiento, Personal, Transporte"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="descripcionPartida">Descripción</Label>
                <Input 
                  id="descripcionPartida" 
                  value={nuevaPartidaDescripcion} 
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNuevaPartidaDescripcion(e.target.value)} 
                  placeholder="Descripción opcional"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowNuevaPartida(false);
                  setNuevaPartidaNombre("");
                  setNuevaPartidaDescripcion("");
                }}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleCrearPartida}
                disabled={isSavingPartida || !nuevaPartidaNombre.trim()}
              >
                {isSavingPartida ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Guardar Partida'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Partidas agregadas al presupuesto */}
      {partidasPresupuesto.length > 0 ? (
        <div className="space-y-6">
          {partidasPresupuesto.map((partida, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="bg-muted p-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">{partida.nombre}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEliminarPartidaPresupuesto(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                {partida.items.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No hay elementos en esta partida.</p>
                    <AgregarElementoDialog
                      partidaId={partida.id}
                      partidaNombre={partida.nombre}
                      onElementoAgregado={(nuevoItem) => handleAgregarElemento(index, nuevoItem)}
                      trigger={
                        <Button className="mt-2" variant="outline" size="sm">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Agregar Elemento
                        </Button>
                      }
                    />
                  </div>
                ) : (
                  <div>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(event) => handleDragEnd(event, index)}
                    >
                      <div className="relative pl-8"> {/* Añadir padding left para dejar espacio para los controles de arrastrar */}
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-0 p-0"></TableHead>
                              <TableHead>Descripción</TableHead>
                              <TableHead>Días</TableHead>
                              <TableHead>Cantidad</TableHead>
                              <TableHead>Precio</TableHead>
                              <TableHead>Descuento</TableHead>
                              <TableHead>Subtotal</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <SortableContext
                              items={partida.items.map((item) => item.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              {partida.items.map((item, itemIndex) => (
                                item.tipo === "CATEGORIA" ? (
                                  // Categoría como subcabecera
                                  <SortableItem key={item.id} id={item.id}>
                                    <TableCell colSpan={6} className="font-semibold">
                                      {item.nombre}
                                    </TableCell>
                                    <TableCell>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleEliminarElemento(index, itemIndex)}
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </TableCell>
                                  </SortableItem>
                                ) : item.tipo === "SEPARADOR" ? (
                                  // Separador igual que categoría pero con texto centrado
                                  <SortableItem key={item.id} id={item.id}>
                                    <TableCell colSpan={6} className="py-2 text-center">
                                      <div className="text-sm">
                                        {item.nombre}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleEliminarElemento(index, itemIndex)}
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </TableCell>
                                  </SortableItem>
                                ) : item.tipo === "PERSONALIZADO" ? (
                                  // Elemento personalizado - completamente editable
                                  <SortableItem key={item.id} id={item.id}>
                                    <TableCell className="w-1/3">
                                      <Input
                                        className="w-full h-8"
                                        value={item.nombre}
                                        onChange={(e) => {
                                          const nuevasPartidas = [...partidasPresupuesto];
                                          nuevasPartidas[index].items[itemIndex].nombre = e.target.value;
                                          setPartidasPresupuesto(nuevasPartidas);
                                          setChangesNotSaved(true);
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        min="0"
                                        className="w-16 h-8"
                                        value={item.dias}
                                        onChange={(e) => {
                                          const nuevasPartidas = [...partidasPresupuesto];
                                          nuevasPartidas[index].items[itemIndex].dias = parseInt(e.target.value) || 0;
                                          
                                          // Recalcular subtotal
                                          const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                          const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                          const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                          const dias = nuevasPartidas[index].items[itemIndex].dias;
                                          
                                          nuevasPartidas[index].items[itemIndex].subtotal = 
                                            cantidad * precio * dias * (1 - descuento / 100);
                                          
                                          const iva = nuevasPartidas[index].items[itemIndex].iva;
                                          nuevasPartidas[index].items[itemIndex].total = 
                                            nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                          
                                          setPartidasPresupuesto(nuevasPartidas);
                                          setChangesNotSaved(true);
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        min="0"
                                        className="w-16 h-8"
                                        value={item.cantidad}
                                        onChange={(e) => {
                                          const nuevasPartidas = [...partidasPresupuesto];
                                          nuevasPartidas[index].items[itemIndex].cantidad = parseInt(e.target.value) || 0;
                                          
                                          // Recalcular subtotal
                                          const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                          const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                          const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                          const dias = nuevasPartidas[index].items[itemIndex].dias;
                                          
                                          nuevasPartidas[index].items[itemIndex].subtotal = 
                                            cantidad * precio * dias * (1 - descuento / 100);
                                          
                                          const iva = nuevasPartidas[index].items[itemIndex].iva;
                                          nuevasPartidas[index].items[itemIndex].total = 
                                            nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                          
                                          setPartidasPresupuesto(nuevasPartidas);
                                          setChangesNotSaved(true);
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center">
                                        <Input
                                          type="number"
                                          min="0"
                                          step="0.01"
                                          className="w-20 h-8"
                                          value={item.precioUnitario}
                                          onChange={(e) => {
                                            const nuevasPartidas = [...partidasPresupuesto];
                                            nuevasPartidas[index].items[itemIndex].precioUnitario = parseFloat(e.target.value) || 0;
                                            
                                            // Recalcular subtotal
                                            const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                            const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                            const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                            const dias = nuevasPartidas[index].items[itemIndex].dias;
                                            
                                            nuevasPartidas[index].items[itemIndex].subtotal = 
                                              cantidad * precio * dias * (1 - descuento / 100);
                                            
                                            const iva = nuevasPartidas[index].items[itemIndex].iva;
                                            nuevasPartidas[index].items[itemIndex].total = 
                                              nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                            
                                            setPartidasPresupuesto(nuevasPartidas);
                                            setChangesNotSaved(true);
                                          }}
                                        />
                                        <span className="ml-1">€</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center">
                                        <Input
                                          type="number"
                                          min="0"
                                          max="100"
                                          className="w-16 h-8"
                                          value={item.descuento}
                                          onChange={(e) => {
                                            const nuevasPartidas = [...partidasPresupuesto];
                                            nuevasPartidas[index].items[itemIndex].descuento = parseFloat(e.target.value) || 0;
                                            
                                            // Recalcular subtotal
                                            const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                            const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                            const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                            const dias = nuevasPartidas[index].items[itemIndex].dias;
                                            
                                            nuevasPartidas[index].items[itemIndex].subtotal = 
                                              cantidad * precio * dias * (1 - descuento / 100);
                                            
                                            const iva = nuevasPartidas[index].items[itemIndex].iva;
                                            nuevasPartidas[index].items[itemIndex].total = 
                                              nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                            
                                            setPartidasPresupuesto(nuevasPartidas);
                                            setChangesNotSaved(true);
                                          }}
                                        />
                                        <span className="ml-1">%</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                      {`${item.subtotal.toFixed(2)}€`}
                                    </TableCell>
                                    <TableCell>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleEliminarElemento(index, itemIndex)}
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </TableCell>
                                  </SortableItem>
                                ) : (
                                  // Resto de elementos (Equipo, Personal, etc.)
                                  <SortableItem key={item.id} id={item.id}>
                                    <TableCell className="font-medium w-1/3">
                                      {item.nombre}
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        min="0"
                                        className="w-16 h-8"
                                        value={item.dias}
                                        onChange={(e) => {
                                          const nuevasPartidas = [...partidasPresupuesto];
                                          nuevasPartidas[index].items[itemIndex].dias = parseInt(e.target.value) || 0;
                                          
                                          // Recalcular subtotal
                                          const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                          const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                          const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                          const dias = nuevasPartidas[index].items[itemIndex].dias;
                                          
                                          nuevasPartidas[index].items[itemIndex].subtotal = 
                                            cantidad * precio * dias * (1 - descuento / 100);
                                          
                                          const iva = nuevasPartidas[index].items[itemIndex].iva;
                                          nuevasPartidas[index].items[itemIndex].total = 
                                            nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                          
                                          setPartidasPresupuesto(nuevasPartidas);
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Input
                                        type="number"
                                        min="0"
                                        className="w-16 h-8"
                                        value={item.cantidad}
                                        onChange={(e) => {
                                          const nuevasPartidas = [...partidasPresupuesto];
                                          nuevasPartidas[index].items[itemIndex].cantidad = parseInt(e.target.value) || 0;
                                          
                                          // Recalcular subtotal
                                          const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                          const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                          const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                          const dias = nuevasPartidas[index].items[itemIndex].dias;
                                          
                                          nuevasPartidas[index].items[itemIndex].subtotal = 
                                            cantidad * precio * dias * (1 - descuento / 100);
                                          
                                          const iva = nuevasPartidas[index].items[itemIndex].iva;
                                          nuevasPartidas[index].items[itemIndex].total = 
                                            nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                          
                                          setPartidasPresupuesto(nuevasPartidas);
                                        }}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center">
                                        <Input
                                          type="number"
                                          min="0"
                                          step="0.01"
                                          className="w-20 h-8"
                                          value={item.precioUnitario}
                                          onChange={(e) => {
                                            const nuevasPartidas = [...partidasPresupuesto];
                                            nuevasPartidas[index].items[itemIndex].precioUnitario = parseFloat(e.target.value) || 0;
                                            
                                            // Recalcular subtotal
                                            const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                            const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                            const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                            const dias = nuevasPartidas[index].items[itemIndex].dias;
                                            
                                            nuevasPartidas[index].items[itemIndex].subtotal = 
                                              cantidad * precio * dias * (1 - descuento / 100);
                                            
                                            const iva = nuevasPartidas[index].items[itemIndex].iva;
                                            nuevasPartidas[index].items[itemIndex].total = 
                                              nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                            
                                            setPartidasPresupuesto(nuevasPartidas);
                                          }}
                                        />
                                        <span className="ml-1">€</span>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex items-center">
                                        <Input
                                          type="number"
                                          min="0"
                                          max="100"
                                          className="w-16 h-8"
                                          value={item.descuento}
                                          onChange={(e) => {
                                            const nuevasPartidas = [...partidasPresupuesto];
                                            nuevasPartidas[index].items[itemIndex].descuento = parseFloat(e.target.value) || 0;
                                            
                                            // Recalcular subtotal
                                            const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                            const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                            const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                            const dias = nuevasPartidas[index].items[itemIndex].dias;
                                            
                                            nuevasPartidas[index].items[itemIndex].subtotal = 
                                              cantidad * precio * dias * (1 - descuento / 100);
                                            
                                            const iva = nuevasPartidas[index].items[itemIndex].iva;
                                            nuevasPartidas[index].items[itemIndex].total = 
                                              nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                            
                                            setPartidasPresupuesto(nuevasPartidas);
                                          }}
                                        />
                                        <span className="ml-1">%</span>
                                      </div>
                                    </TableCell>
                                    <TableCell className="font-medium ">
                                      {`${item.subtotal.toFixed(2)}€`}
                                    </TableCell>
                                    <TableCell>
                                      <Button 
                                        variant="ghost" 
                                        size="sm"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleEliminarElemento(index, itemIndex)}
                                      >
                                        <Trash className="h-4 w-4" />
                                      </Button>
                                    </TableCell>
                                  </SortableItem>
                                )
                              ))}
                            </SortableContext>
                          </TableBody>
                        </Table>
                      </div>
                    </DndContext>
                    <div className="mt-4 flex justify-end">
                      <AgregarElementoDialog
                        partidaId={partida.id}
                        partidaNombre={partida.nombre}
                        onElementoAgregado={(nuevoItem) => handleAgregarElemento(index, nuevoItem)}
                        trigger={
                          <Button variant="outline" size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Agregar Elemento
                          </Button>
                        }
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-4">No hay partidas agregadas al presupuesto.</p>
              <p>Use las opciones de arriba para agregar o crear partidas.</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Resumen de totales y botón de guardar adicional */}
      {partidasPresupuesto.length > 0 && (
        <>
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center font-medium">
                  <span>Subtotal (sin IVA):</span>
                  <span>
                    {partidasPresupuesto.reduce((acc, partida) => {
                      // Sumar todos los subtotales de items que no son CATEGORIA ni SEPARADOR
                      const partidaSubtotal = partida.items.reduce((itemAcc, item) => {
                        if (item.tipo === "CATEGORIA" || item.tipo === "SEPARADOR") {
                          return itemAcc;
                        }
                        return itemAcc + item.subtotal;
                      }, 0);
                      return acc + partidaSubtotal;
                    }, 0).toFixed(2)}€
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>IVA:</span>
                  <span>
                    {partidasPresupuesto.reduce((acc, partida) => {
                      // Calcular el IVA de todos los items que no son CATEGORIA ni SEPARADOR
                      const partidaIVA = partida.items.reduce((itemAcc, item) => {
                        if (item.tipo === "CATEGORIA" || item.tipo === "SEPARADOR") {
                          return itemAcc;
                        }
                        // IVA = subtotal * (iva/100)
                        return itemAcc + (item.subtotal * (item.iva/100));
                      }, 0);
                      return acc + partidaIVA;
                    }, 0).toFixed(2)}€
                  </span>
                </div>
                
                <Separator className="my-2" />
                
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>TOTAL:</span>
                  <span>
                    {partidasPresupuesto.reduce((acc, partida) => {
                      // Sumar todos los totales de items que no son CATEGORIA ni SEPARADOR
                      const partidaTotal = partida.items.reduce((itemAcc, item) => {
                        if (item.tipo === "CATEGORIA" || item.tipo === "SEPARADOR") {
                          return itemAcc;
                        }
                        return itemAcc + item.total;
                      }, 0);
                      return acc + partidaTotal;
                    }, 0).toFixed(2)}€
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end mt-6">
            <Button 
              onClick={() => handleGuardarPresupuesto(false)} 
              disabled={isSaving || !isFormValid()}
              className="gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Guardar Presupuesto
                </>
              )}
            </Button>
          </div>
        </>
      )}
      
      <Toaster />
    </div>
  )
} 