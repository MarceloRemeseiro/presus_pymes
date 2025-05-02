"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { format, parse } from "date-fns"
import { es } from "date-fns/locale"
import { toast, Toaster } from "sonner"
import { 
  ArrowLeft, 
  Save, 
  Trash, 
  Loader2,
  PlusCircle,
  Check,
  DollarSign
} from "lucide-react"
import { use } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EstadoBadge } from "@/components/facturas/estado-badge"
import { AgregarElementoDialog } from "@/components/facturas/agregar-elemento-dialog"

// Interfaces para datos
interface Cliente {
  id: string
  nombre: string
  nif?: string | null
}

interface Producto {
  id: string
  nombre: string
  precio: number
  descripcion?: string | null
}

interface Partida {
  id: string
  nombre: string
  descripcion?: string | null
}

interface ItemFacturaLocalState {
  id: string // ID local temporal para manejo en UI
  tipo?: "CATEGORIA" | "EQUIPO" | "PERSONAL" | "SEPARADOR" | "PERSONALIZADO"
  productoId?: string
  nombre: string
  descripcion?: string | null
  cantidad: number
  precioUnitario: number
  descuento: number
  iva: number
  subtotal: number
  total: number
  dias: number // Campo para días
  partidaId?: string | null // ID de la partida a la que pertenece
  datosExtra?: any // Campos adicionales según el tipo
}

interface PartidaLocalState {
  id: string | null // null si es nueva
  nombre: string
  items: ItemFacturaLocalState[]
}

interface Presupuesto {
  id: string
  numero: string
}

interface Factura {
  id: string
  numero: string
  numeroPedido?: string | null
  fecha: string
  fechaVencimiento: string
  clienteId: string | null
  cliente: Cliente | null
  estado: "PENDIENTE" | "ENVIADA" | "PAGADA" | "VENCIDA" | "ANULADA"
  observaciones?: string | null
  subtotal: number
  iva: number
  total: number
  items: {
    id: string
    productoId?: string
    producto?: Producto
    tipo?: string
    nombre?: string
    cantidad: number
    precioUnitario: number
    descuento: number
    iva: number
    dias?: number
    partidaId?: string | null
    partida?: {
      id: string
      nombre: string
    } | null
  }[]
  presupuestos: Presupuesto[]
}

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

// Función para generar un ID único
function generateUniqueId(): string {
  return `temp_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export default function EditarFacturaPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const facturaId = resolvedParams.id
  
  // Configuración de DnD
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

  // Estado principal
  const [factura, setFactura] = useState<Factura | null>(null)
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [productos, setProductos] = useState<Producto[]>([])
  const [partidas, setPartidas] = useState<Partida[]>([])
  
  // Estados del formulario
  const [numero, setNumero] = useState("")
  const [numeroPedido, setNumeroPedido] = useState("")
  const [fecha, setFecha] = useState("")
  const [fechaVencimiento, setFechaVencimiento] = useState("")
  const [clienteId, setClienteId] = useState<string>("")
  const [estado, setEstado] = useState<string>("PENDIENTE")
  const [observaciones, setObservaciones] = useState("")
  
  // Estado para partidas e items
  const [partidasFactura, setPartidasFactura] = useState<PartidaLocalState[]>([])
  const [showNuevaPartida, setShowNuevaPartida] = useState(false)
  const [nuevaPartidaNombre, setNuevaPartidaNombre] = useState("")
  const [nuevaPartidaDescripcion, setNuevaPartidaDescripcion] = useState("")
  
  // Estados de cálculos
  const [subtotal, setSubtotal] = useState(0)
  const [ivaTotal, setIvaTotal] = useState(0)
  const [total, setTotal] = useState(0)
  
  // Estados de UI
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isSavingPartida, setIsSavingPartida] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [changesNotSaved, setChangesNotSaved] = useState(false)
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)
  
  // Extraer la función fetchData fuera del useEffect
  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Cargar factura
      const facturaResponse = await fetch(`/api/facturas/${facturaId}`)
      if (!facturaResponse.ok) {
        throw new Error("Error al cargar la factura")
      }
      const facturaData = await facturaResponse.json()
      setFactura(facturaData)
      
      // Cargar clientes
      const clientesResponse = await fetch("/api/clientes")
      if (!clientesResponse.ok) {
        throw new Error("Error al cargar clientes")
      }
      const clientesData = await clientesResponse.json()
      setClientes(clientesData)
      
      // Cargar productos
      const productosResponse = await fetch("/api/productos")
      if (!productosResponse.ok) {
        throw new Error("Error al cargar productos")
      }
      const productosData = await productosResponse.json()
      setProductos(productosData)

      // Cargar partidas
      const partidasResponse = await fetch("/api/partidas")
      if (!partidasResponse.ok) {
        throw new Error("Error al cargar partidas")
      }
      const partidasData = await partidasResponse.json()
      setPartidas(partidasData)
      
      // Inicializar formulario con datos de la factura
      setNumero(facturaData.numero)
      setNumeroPedido(facturaData.numeroPedido || "")
      setFecha(format(new Date(facturaData.fecha), "yyyy-MM-dd"))
      setFechaVencimiento(format(new Date(facturaData.fechaVencimiento), "yyyy-MM-dd"))
      setClienteId(facturaData.clienteId || "")
      setEstado(facturaData.estado)
      setObservaciones(facturaData.observaciones || "")
      
      // Organizar items por partidas
      const partidasArray: PartidaLocalState[] = []
      const sinPartida: ItemFacturaLocalState[] = []
      const partidasVistas = new Set<string>() // Para rastrear qué partidas ya hemos procesado
      
      // Inicializar array de partidas manteniendo el orden original
      facturaData.items.forEach((item: any) => {
        // Si tiene partida, agrégala en el orden en que aparece por primera vez
        if (item.partidaId && item.partida && !partidasVistas.has(item.partidaId)) {
          partidasVistas.add(item.partidaId)
          partidasArray.push({
            id: item.partidaId,
            nombre: item.partida.nombre,
            items: []
          })
        }
      })
      
      // Agregar items a sus partidas con IDs únicos
      facturaData.items.forEach((item: any) => {
        // Usar directamente el ID original como identificador único
        const uniqueId = item.id;
        
        // Crear el estado local del item
        const itemLocalState: ItemFacturaLocalState = {
          id: uniqueId,
          tipo: item.tipo || "EQUIPO",
          nombre: item.nombre || (item.producto ? item.producto.nombre : "Sin nombre"),
          descripcion: item.descripcion || (item.producto ? item.producto.descripcion : null),
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          descuento: item.descuento,
          iva: item.iva,
          dias: item.dias || 1,
          subtotal: item.cantidad * item.precioUnitario * (1 - item.descuento / 100) * (item.dias || 1),
          total: item.cantidad * item.precioUnitario * (1 - item.descuento / 100) * (item.dias || 1) * (1 + item.iva / 100),
          productoId: item.productoId,
          partidaId: item.partidaId
        }
        
        // Agregar a la partida o al array de sin partida
        if (item.partidaId) {
          // Buscar el índice de la partida
          const partidaIndex = partidasArray.findIndex(p => p.id === item.partidaId)
          if (partidaIndex >= 0) {
            partidasArray[partidaIndex].items.push(itemLocalState)
          } else {
            // Esto no debería ocurrir si inicializamos correctamente las partidas
            sinPartida.push(itemLocalState)
          }
        } else {
          sinPartida.push(itemLocalState)
        }
      });
      
      // Si hay items sin partida, crear una partida "General"
      if (sinPartida.length > 0) {
        partidasArray.push({
          id: null,
          nombre: "General",
          items: sinPartida
        })
      }
      
      setPartidasFactura(partidasArray)
      
      // Calcular totales
      calcularTotales()
      
      // Establecer hora de último guardado
      setLastSaved(new Date())
      setChangesNotSaved(false)
    } catch (error) {
      console.error("Error al cargar datos:", error)
      setError("Error al cargar los datos de la factura")
    } finally {
      setIsLoading(false)
    }
  }

  // Cargar datos iniciales
  useEffect(() => {
    fetchData()
  }, [facturaId])
  
  // Calcular totales cuando cambian las partidas
  useEffect(() => {
    calcularTotales()
  }, [partidasFactura])
  
  const calcularTotales = () => {
    let nuevoSubtotal = 0
    let nuevoIvaTotal = 0
    
    partidasFactura.forEach(partida => {
      partida.items.forEach(item => {
        if (item.tipo !== "CATEGORIA" && item.tipo !== "SEPARADOR") {
          nuevoSubtotal += item.subtotal
          nuevoIvaTotal += item.total - item.subtotal
        }
      })
    })
    
    setSubtotal(nuevoSubtotal)
    setIvaTotal(nuevoIvaTotal)
    setTotal(nuevoSubtotal + nuevoIvaTotal)
  }
  
  // Crear una nueva partida
  const handleCrearPartida = async () => {
    try {
      if (!nuevaPartidaNombre.trim()) {
        toast.error("Debe ingresar un nombre para la partida")
        return
      }
      
      setIsSavingPartida(true)
      
      // Crear la partida en el backend
      const response = await fetch("/api/partidas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nuevaPartidaNombre,
          descripcion: nuevaPartidaDescripcion || null
        }),
      })
      
      if (!response.ok) {
        throw new Error("Error al crear la partida")
      }
      
      const nuevaPartida = await response.json()
      
      // Agregar la partida a la lista completa
      setPartidas(prev => [...prev, nuevaPartida])
      
      // Agregar la partida al presupuesto
      handleAgregarPartidaAFactura(nuevaPartida.id)
      
      // Limpiar el formulario
      setNuevaPartidaNombre("")
      setNuevaPartidaDescripcion("")
      setShowNuevaPartida(false)
      
      toast.success("Partida creada y agregada correctamente")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error al crear la partida")
    } finally {
      setIsSavingPartida(false)
    }
  }
  
  // Validar formulario
  const isFormValid = (): boolean => {
    return (
      !!fecha &&
      !!fechaVencimiento &&
      !!clienteId
    )
  }
  
  // Agregar una partida existente a la factura
  const handleAgregarPartidaAFactura = (partidaId: string) => {
    const partidaExistente = partidas.find(p => p.id === partidaId)
    
    if (!partidaExistente) {
      toast.error("Partida no encontrada")
      return
    }
    
    // Verificar que la partida no esté ya en el presupuesto
    if (partidasFactura.some(p => p.id === partidaId)) {
      toast.error("Esta partida ya está en la factura")
      return
    }
    
    // Agregar la partida al presupuesto (sin elementos)
    setPartidasFactura(prev => [...prev, {
      id: partidaId,
      nombre: partidaExistente.nombre,
      items: []
    }])
    
    setChangesNotSaved(true)
  }
  
  // Eliminar una partida de la factura
  const handleEliminarPartidaFactura = (index: number) => {
    setPartidasFactura(prev => prev.filter((_, i) => i !== index))
    setChangesNotSaved(true)
  }
  
  // Agregar un elemento a una partida
  const handleAgregarElemento = (partidaIndex: number, nuevoItem: ItemFacturaLocalState) => {
    console.log(`Agregando elemento con datos:`, nuevoItem);
    
    // Asegurarse de que el nuevo elemento tenga un ID único
    if (!nuevoItem.id) {
      nuevoItem.id = generateUniqueId();
    }
    
    // Crear una copia de las partidas actuales
    const nuevasPartidas = [...partidasFactura];
    
    // Asignar el partidaId del item según la partida donde se está agregando
    nuevoItem.partidaId = nuevasPartidas[partidaIndex].id;
    
    // Agregar el elemento directamente a la partida correspondiente
    nuevasPartidas[partidaIndex].items.push(nuevoItem);
    
    // Actualizar el estado con las nuevas partidas
    setPartidasFactura(nuevasPartidas);
    
    // Marcar que hay cambios sin guardar
    setChangesNotSaved(true);
    
    // Notificar al usuario
    toast.success(`Elemento agregado a ${nuevasPartidas[partidaIndex].nombre}`);
  };
  
  // Eliminar un elemento de una partida
  const handleEliminarElemento = (partidaIndex: number, itemIndex: number) => {
    setPartidasFactura(prev => {
      const nuevasPartidas = [...prev]
      nuevasPartidas[partidaIndex].items.splice(itemIndex, 1)
      return nuevasPartidas
    })
    
    setChangesNotSaved(true)
  }
  
  // Manejar el ordenamiento con drag and drop
  const handleDragEnd = (event: DragEndEvent, partidaIndex: number) => {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
      const nuevasPartidas = [...partidasFactura];
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
      
      setPartidasFactura(nuevasPartidas);
      setChangesNotSaved(true);
    }
  };
  
  // Manejar cambios en campos de formulario con auto-guardado
  const handleFieldChange = (field: string, value: any) => {
    switch (field) {
      case 'fecha':
        setFecha(value)
        break
      case 'fechaVencimiento':
        setFechaVencimiento(value)
        break
      case 'clienteId':
        setClienteId(value)
        break
      case 'observaciones':
        setObservaciones(value)
        break
      case 'estado':
        setEstado(value)
        break
      case 'numeroPedido':
        setNumeroPedido(value)
        break
    }
    
    // Marcar que hay cambios no guardados
    setChangesNotSaved(true)
    
    // Configurar un temporizador para guardar automáticamente después de 2 segundos de inactividad
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }
    
    const timer = setTimeout(() => {
      handleGuardarFactura(true)
    }, 2000)
    
    setAutoSaveTimer(timer)
  }
  
  // Guardar la factura
  const handleGuardarFactura = async (isAutoSave = false) => {
    if (!isFormValid()) {
      if (!isAutoSave) {
        // Mensaje de error específico
        if (!clienteId) {
          toast.error('Debe seleccionar un cliente para la factura')
        } else {
          toast.error('Debe completar todos los campos obligatorios')
        }
      }
      return
    }
    
    try {
      setIsSaving(true)
      console.log("==== FRONTEND: GUARDANDO FACTURA ====");
      
      // Construir array de items sin duplicados
      let itemsArray: any[] = [];
      const itemsVistos = new Set();
      
      // Extraer todos los items de todas las partidas
      partidasFactura.forEach((partida, pIndex) => {
        console.log(`Procesando partida ${pIndex}: ${partida.nombre} (${partida.items.length} items)`);
        
        partida.items.forEach((item, iIndex) => {
          // Clave única para detectar duplicados - usar el ID local para PERSONALIZADO
          let itemKey;
          if (item.tipo === "PERSONALIZADO") {
            // Para items personalizados usamos su ID local para evitar que se consideren duplicados
            itemKey = `${item.id}`;
          } else {
            itemKey = `${item.nombre}_${item.tipo}_${item.productoId || 'null'}`;
          }
          
          // Evitar duplicados
          if (itemsVistos.has(itemKey)) {
            console.log(`Item duplicado omitido: ${item.nombre}`);
            return;
          }
          itemsVistos.add(itemKey);
          
          // Crear un objeto con todos los campos necesarios
          const itemData: any = {
            productoId: item.productoId,
            tipo: item.tipo || "EQUIPO",
            nombre: item.nombre || "Sin nombre",
            descripcion: item.descripcion || null,
            cantidad: item.cantidad || 0,
            precioUnitario: item.precioUnitario || 0,
            descuento: item.descuento || 0,
            iva: item.iva || 0,
            dias: item.dias || 1,
            total: item.total || 0
          };
          
          // Agregar partidaId si existe
          if (partida.id) {
            itemData.partidaId = partida.id;
          }
          
          // Agregar datos extras
          if (item.datosExtra) {
            itemData.datosExtra = item.datosExtra;
          }
          
          itemsArray.push(itemData);
          console.log(`Item ${iIndex} procesado: ${item.nombre} (${item.tipo})`);
        });
      });
      
      console.log(`Total de items a enviar: ${itemsArray.length}`);
      
      // Crear un objeto JSON para enviar al backend
      const dataToSend = {
        fecha: new Date(fecha).toISOString(),
        fechaVencimiento: new Date(fechaVencimiento).toISOString(),
        clienteId: clienteId || undefined, // Si es cadena vacía, enviar undefined
        observaciones,
        estado: estado || "PENDIENTE",
        numeroPedido: numeroPedido || undefined,
        items: itemsArray
      }
      
      // Enviar los datos al servidor
      console.log("Enviando datos al servidor...");
      const response = await fetch(`/api/facturas/${facturaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
      
      // Verificar la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar la factura')
      }
      
      // Obtener la respuesta actualizada
      const facturaActualizada = await response.json();
      console.log("Respuesta del servidor OK. Items:", facturaActualizada.items?.length || 0);
      
      // Actualizar el estado local
      if (!isAutoSave) {
        // Recargar los datos solo si no es autoguardado
        console.log("Recargando datos desde el servidor");
        await fetchData();
        toast.success('Factura actualizada correctamente')
      } else {
        // Para autoguardado, solo actualizamos la fecha de guardado
        setLastSaved(new Date());
        setChangesNotSaved(false);
      }
      
      console.log("==== FIN GUARDADO FACTURA ====");
    } catch (error) {
      console.error("Error:", error)
      if (!isAutoSave) {
        toast.error(error instanceof Error ? error.message : 'Error al actualizar la factura')
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
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Cargando factura...</p>
        </div>
      </div>
    )
  }
  
  if (error || !factura) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error || "No se pudo cargar la factura"}</p>
          <Button asChild className="mt-4">
            <Link href="/facturas">Volver a facturas</Link>
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-8">
        <Button asChild variant="outline" className="mr-4">
          <Link href="/facturas">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold flex-grow">Editar Factura</h1>
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
            onClick={() => handleGuardarFactura(false)} 
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
              <Label htmlFor="numero" className="block mb-2">Número de Factura*</Label>
              <Input 
                id="numero" 
                value={numero} 
                disabled={true} // No permitimos cambiar el número
                className="bg-gray-100" 
                required 
              />
              <p className="text-xs text-gray-500 mt-1">El número se genera automáticamente</p>
            </div>
            
            <div>
              <Label htmlFor="numeroPedido" className="block mb-2">Número de Pedido (PO)</Label>
              <Input 
                id="numeroPedido" 
                value={numeroPedido} 
                onChange={(e) => handleFieldChange('numeroPedido', e.target.value)}
                placeholder="Número de pedido o PO (opcional)" 
              />
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

            <div>
              <Label htmlFor="estado">Estado</Label>
              <select 
                id="estado" 
                value={estado} 
                onChange={(e) => handleFieldChange('estado', e.target.value as "PENDIENTE" | "ENVIADA" | "PAGADA" | "VENCIDA" | "ANULADA")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="ENVIADA">Enviada</option>
                <option value="PAGADA">Pagada</option>
                <option value="VENCIDA">Vencida</option>
                <option value="ANULADA">Anulada</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fecha">Fecha Factura*</Label>
              <Input 
                id="fecha" 
                type="date" 
                value={fecha} 
                onChange={(e) => handleFieldChange('fecha', e.target.value)}
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="fechaVencimiento">Fecha Vencimiento*</Label>
              <Input 
                id="fechaVencimiento" 
                type="date" 
                value={fechaVencimiento} 
                onChange={(e) => handleFieldChange('fechaVencimiento', e.target.value)}
                required 
              />
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="observaciones">Observaciones</Label>
            <textarea
              id="observaciones"
              className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Observaciones o notas adicionales para la factura"
              value={observaciones}
              onChange={(e) => handleFieldChange('observaciones', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Sección de partidas y elementos */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Servicios Facturados</h2>
        <div className="flex space-x-2">
          <select
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value=""
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              if (e.target.value) {
                handleAgregarPartidaAFactura(e.target.value);
                e.target.value = ""; // Reset select after selection
              }
            }}
          >
            <option value="">Seleccionar partida existente</option>
            {partidas.map((partida) => (
              <option key={partida.id} value={partida.id}>
                {partida.nombre}
              </option>
            ))}
          </select>
          <Button 
            variant="outline" 
            onClick={() => setShowNuevaPartida(true)}
            className="flex items-center"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Partida
          </Button>
        </div>
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
      
      {/* Partidas agregadas a la factura */}
      {partidasFactura.length > 0 ? (
        <div className="space-y-6">
          {partidasFactura.map((partida, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="bg-muted p-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">{partida.nombre}</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEliminarPartidaFactura(index)}
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
                      <div className="relative pl-8">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-0 p-0"></TableHead>
                              <TableHead>Descripción</TableHead>
                              <TableHead>Días</TableHead>
                              <TableHead>Cantidad</TableHead>
                              <TableHead>Precio</TableHead>
                              <TableHead>Descuento</TableHead>
                              <TableHead className="text-right">Subtotal</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <SortableContext
                              items={partida.items.map(item => item.id)}
                              strategy={verticalListSortingStrategy}
                            >
                              {partida.items.map((item, itemIndex) => {
                                return (
                                  // Renderizar según el tipo
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
                                    // Separador (línea divisoria con estilo diferente)
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
                                  ) : (
                                    // Elemento normal (producto, personal, etc.)
                                    <SortableItem key={item.id} id={item.id}>
                                      <TableCell>{item.nombre}</TableCell>
                                      <TableCell>
                                        <Input 
                                          type="number"
                                          min="1"
                                          className="w-16 h-8"
                                          value={item.dias}
                                          onChange={(e) => {
                                            const nuevasPartidas = [...partidasFactura];
                                            nuevasPartidas[index].items[itemIndex].dias = parseInt(e.target.value, 10) || 1;
                                            
                                            // Recalcular subtotal y total
                                            const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                            const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                            const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                            const dias = nuevasPartidas[index].items[itemIndex].dias;
                                            
                                            nuevasPartidas[index].items[itemIndex].subtotal = 
                                              cantidad * precio * dias * (1 - descuento / 100);
                                            
                                            const iva = nuevasPartidas[index].items[itemIndex].iva;
                                            nuevasPartidas[index].items[itemIndex].total = 
                                              nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                            
                                            setPartidasFactura(nuevasPartidas);
                                            setChangesNotSaved(true);
                                          }}
                                        />
                                      </TableCell>
                                      <TableCell>
                                        <Input 
                                          type="number"
                                          min="1"
                                          className="w-16 h-8"
                                          value={item.cantidad}
                                          onChange={(e) => {
                                            const nuevasPartidas = [...partidasFactura];
                                            nuevasPartidas[index].items[itemIndex].cantidad = parseInt(e.target.value, 10) || 1;
                                            
                                            // Recalcular subtotal y total
                                            const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                            const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                            const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                            const dias = nuevasPartidas[index].items[itemIndex].dias;
                                            
                                            nuevasPartidas[index].items[itemIndex].subtotal = 
                                              cantidad * precio * dias * (1 - descuento / 100);
                                            
                                            const iva = nuevasPartidas[index].items[itemIndex].iva;
                                            nuevasPartidas[index].items[itemIndex].total = 
                                              nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                            
                                            setPartidasFactura(nuevasPartidas);
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
                                              const nuevasPartidas = [...partidasFactura];
                                              nuevasPartidas[index].items[itemIndex].precioUnitario = parseFloat(e.target.value) || 0;
                                              
                                              // Recalcular subtotal y total
                                              const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                              const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                              const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                              const dias = nuevasPartidas[index].items[itemIndex].dias;
                                              
                                              nuevasPartidas[index].items[itemIndex].subtotal = 
                                                cantidad * precio * dias * (1 - descuento / 100);
                                              
                                              const iva = nuevasPartidas[index].items[itemIndex].iva;
                                              nuevasPartidas[index].items[itemIndex].total = 
                                                nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                              
                                              setPartidasFactura(nuevasPartidas);
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
                                              const nuevasPartidas = [...partidasFactura];
                                              nuevasPartidas[index].items[itemIndex].descuento = parseFloat(e.target.value) || 0;
                                              
                                              // Recalcular subtotal y total
                                              const cantidad = nuevasPartidas[index].items[itemIndex].cantidad;
                                              const precio = nuevasPartidas[index].items[itemIndex].precioUnitario;
                                              const descuento = nuevasPartidas[index].items[itemIndex].descuento;
                                              const dias = nuevasPartidas[index].items[itemIndex].dias;
                                              
                                              nuevasPartidas[index].items[itemIndex].subtotal = 
                                                cantidad * precio * dias * (1 - descuento / 100);
                                              
                                              const iva = nuevasPartidas[index].items[itemIndex].iva;
                                              nuevasPartidas[index].items[itemIndex].total = 
                                                nuevasPartidas[index].items[itemIndex].subtotal * (1 + iva / 100);
                                              
                                              setPartidasFactura(nuevasPartidas);
                                              setChangesNotSaved(true);
                                            }}
                                          />
                                          <span className="ml-1">%</span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-right font-medium">
                                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.subtotal)}
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
                                );
                              })}
                            </SortableContext>
                          </TableBody>
                        </Table>
                      </div>
                    </DndContext>
                    
                    <div className="mt-4 flex justify-between items-center">
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
                      
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          Subtotal de partida: <span className="font-medium">
                            {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(
                              partida.items.reduce((sum, item) => 
                                item.tipo !== "CATEGORIA" && item.tipo !== "SEPARADOR" ? sum + item.subtotal : sum, 0)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="py-10">
          <div className="text-center text-muted-foreground">
            <p>No hay partidas en esta factura.</p>
            <p className="mt-2">Seleccione una partida existente o cree una nueva partida para comenzar.</p>
          </div>
        </Card>
      )}
      
      {/* Totales finales */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(subtotal)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">IVA:</span>
              <span className="font-medium">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(ivaTotal)}
              </span>
            </div>
            <div className="border-t my-2 pt-2 flex justify-between items-center">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-lg font-bold">
                {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(total)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Toaster />
    </div>
  )
} 