"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast, Toaster } from "sonner"
import { PlusCircle, Trash, ArrowLeft, Save, Loader2 } from "lucide-react"
import { AgregarElementoDialog } from "@/components/presupuestos/agregar-elemento-dialog"

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
  id: string                                           // ID local temporal para manejo en UI
  tipo?: "CATEGORIA" | "EQUIPO" | "PERSONAL" | "SEPARADOR" // Tipo de elemento
  productoId?: string                                  // ID del producto (obligatorio para EQUIPO)
  nombre: string                                       // Nombre del elemento
  descripcion?: string | null                          // Descripción opcional
  cantidad: number                                     // Cantidad
  precioUnitario: number                              // Precio unitario
  descuento: number                                   // Descuento (%)
  iva: number                                         // IVA (%)
  subtotal: number                                    // Subtotal (sin IVA)
  total: number                                       // Total (con IVA)
  datosExtra?: any                                     // Campos adicionales según el tipo
}

export default function NuevoPresupuestoPage() {
  const router = useRouter()
  
  // Estados para datos de referencia
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [partidas, setPartidas] = useState<Partida[]>([])
  const [configuracion, setConfiguracion] = useState<Configuracion | null>(null)
  
  // Estado del formulario principal
  const [numeroPresupuesto, setNumeroPresupuesto] = useState("")
  const [nombre, setNombre] = useState("")
  const [referencia, setReferencia] = useState("")
  const [clienteId, setClienteId] = useState("")
  const [fechaPresupuesto, setFechaPresupuesto] = useState(new Date().toISOString().split("T")[0])
  const [fechaValidez, setFechaValidez] = useState("")
  const [fechaMontaje, setFechaMontaje] = useState("")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [observaciones, setObservaciones] = useState("")
  
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

  // Cargar datos iniciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
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
        
        // Generar número de presupuesto con prefijo y fecha
        const today = new Date()
        const year = today.getFullYear().toString().slice(2)
        const month = (today.getMonth() + 1).toString().padStart(2, '0')
        const sequence = '0001' // Aquí deberíamos tener una secuencia real
        
        setNumeroPresupuesto(`${configData.prefijoPresupuesto}${year}${month}-${sequence}`)
        
        // Calcular fecha de validez (15 días después)
        const validityDate = new Date(today)
        validityDate.setDate(validityDate.getDate() + 15)
        setFechaValidez(validityDate.toISOString().split("T")[0])
        
      } catch (err) {
        console.error('Error al cargar datos:', err)
        setError('Error al cargar los datos necesarios')
        toast.error('Error al cargar datos')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

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

  // Agregar una partida al presupuesto
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
  }

  // Eliminar una partida del presupuesto
  const handleEliminarPartidaPresupuesto = (index: number) => {
    const nuevasPartidas = [...partidasPresupuesto]
    nuevasPartidas.splice(index, 1)
    setPartidasPresupuesto(nuevasPartidas)
  }

  // Agregar un nuevo elemento a una partida
  const handleAgregarElemento = (partidaIndex: number, nuevoItem: ItemPartidaLocalState) => {
    console.log(`Añadiendo elemento a partida ${partidaIndex}:`, nuevoItem);
    
    if (partidaIndex < 0 || partidaIndex >= partidasPresupuesto.length) {
      console.error(`Índice de partida inválido: ${partidaIndex}`);
      toast.error('Error al agregar elemento: índice de partida inválido');
      return;
    }
    
    const nuevasPartidas = [...partidasPresupuesto];
    
    // Añadir el elemento a la partida correspondiente
    nuevasPartidas[partidaIndex].items.push(nuevoItem);
    
    // Actualizar el estado con las partidas actualizadas
    setPartidasPresupuesto(nuevasPartidas);
    
    console.log('Partidas actualizadas:', nuevasPartidas);
    console.log(`Total elementos en partida ${partidaIndex} después de agregar:`, 
      nuevasPartidas[partidaIndex].items.length);
    
    toast.success(`Elemento agregado a ${nuevasPartidas[partidaIndex].nombre}`);
  }

  // Eliminar un elemento de una partida
  const handleEliminarElemento = (partidaIndex: number, itemIndex: number) => {
    const nuevasPartidas = [...partidasPresupuesto]
    nuevasPartidas[partidaIndex].items.splice(itemIndex, 1)
    setPartidasPresupuesto(nuevasPartidas)
    toast.success('Elemento eliminado correctamente')
  }

  // Verificar si todos los campos obligatorios están completos
  const isFormValid = (): boolean => {
    if (!clienteId) return false
    if (!fechaPresupuesto || !fechaValidez) return false
    
    // No es necesario que haya partidas para guardar un borrador
    return true
  }

  // Guardar el presupuesto
  const handleGuardarPresupuesto = async () => {
    if (!isFormValid()) {
      toast.error('Debe completar todos los campos obligatorios')
      return
    }
    
    try {
      setIsSaving(true)
      
      // Revisar si hay items en las partidas
      const totalItems = partidasPresupuesto.reduce(
        (acc, partida) => acc + partida.items.length, 
        0
      );
      
      console.log(`Total de items en partidas: ${totalItems}`);
      
      if (totalItems === 0) {
        console.warn('No hay items en ninguna partida');
      } else {
        console.log('Desglose de items por partida:');
        partidasPresupuesto.forEach((partida, idx) => {
          console.log(`Partida ${idx + 1} - ${partida.nombre} (ID: ${partida.id}): ${partida.items.length} items`);
          partida.items.forEach((item, itemIdx) => {
            console.log(`  Item ${itemIdx + 1}: ${item.nombre}, tipo: ${item.tipo}, productoId: ${item.productoId || 'N/A'}`);
          });
        });
      }
      
      // SOLUCIÓN DIRECTA: Construir manualmente el array de items
      let itemsArray: any[] = [];
      
      // Extraer todos los items de todas las partidas
      partidasPresupuesto.forEach(partida => {
        partida.items.forEach(item => {
          // Solo incluimos los campos necesarios para el backend
          const itemData: any = {
            productoId: item.productoId,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            descuento: item.descuento,
            iva: item.iva
          };
          
          // Agregamos partidaId solo si existe
          if (partida.id) {
            itemData.partidaId = partida.id;
          }
          
          itemsArray.push(itemData);
        });
      });
      
      console.log(`Items para enviar al servidor: ${itemsArray.length}`);
      console.log('Datos de items:', JSON.stringify(itemsArray, null, 2));
      
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
        clienteId,
        observaciones,
        estado: "PENDIENTE",
        items: itemsArray
      };
      
      console.log('Datos a enviar:', JSON.stringify(dataToSend, null, 2));
      
      // Convertir a string JSON y luego volver a convertir para asegurar que es JSON válido
      const jsonStr = JSON.stringify(dataToSend);
      const parsedObj = JSON.parse(jsonStr);
      
      console.log('¿El objeto es válido para JSON?', Boolean(jsonStr));
      console.log('¿Hay items después de la serialización?', parsedObj.items.length);
      
      console.log('Enviando petición al servidor...');
      
      // Enviar los datos al servidor
      const response = await fetch('/api/presupuestos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonStr,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear el presupuesto')
      }
      
      const presupuestoCreado = await response.json()
      console.log('Presupuesto creado:', presupuestoCreado)
      
      toast.success('Presupuesto creado correctamente')
      
      // Redirigir a la página del presupuesto creado
      router.push(`/presupuestos/${presupuestoCreado.id}`)
      
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : 'Error al crear el presupuesto')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Cargando datos...</p>
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
      <div className="flex items-center mb-8">
        <Button asChild variant="outline" className="mr-4">
          <Link href="/presupuestos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
        <h1 className="text-3xl font-bold flex-grow">Nuevo Presupuesto</h1>
        <Button 
          onClick={handleGuardarPresupuesto} 
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
      
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="numero" className="block mb-2">Número de Presupuesto*</Label>
              <Input 
                id="numero" 
                value={numeroPresupuesto} 
                onChange={(e) => setNumeroPresupuesto(e.target.value)}
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
                onChange={(e) => setClienteId(e.target.value)}
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
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre descriptivo del presupuesto (opcional)" 
              />
            </div>
            
            <div>
              <Label htmlFor="referencia">Referencia</Label>
              <Input 
                id="referencia" 
                value={referencia} 
                onChange={(e) => setReferencia(e.target.value)}
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
                  setFechaPresupuesto(e.target.value);
                  // Actualizar fecha de validez automáticamente
                  if (e.target.value) {
                    const newDate = new Date(e.target.value);
                    newDate.setDate(newDate.getDate() + 15);
                    setFechaValidez(newDate.toISOString().split("T")[0]);
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
                onChange={(e) => setFechaValidez(e.target.value)}
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="fechaMontaje">Fecha de Montaje</Label>
              <Input 
                id="fechaMontaje" 
                type="date" 
                value={fechaMontaje} 
                onChange={(e) => setFechaMontaje(e.target.value)} 
              />
            </div>
            
            <div>
              <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
              <Input 
                id="fechaInicio" 
                type="date" 
                value={fechaInicio} 
                onChange={(e) => setFechaInicio(e.target.value)} 
              />
            </div>
            
            <div>
              <Label htmlFor="fechaFin">Fecha de Fin</Label>
              <Input 
                id="fechaFin" 
                type="date" 
                value={fechaFin} 
                onChange={(e) => setFechaFin(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="observaciones">Observaciones</Label>
            <textarea
              id="observaciones"
              className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Observaciones o notas adicionales para el presupuesto"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <h2 className="text-xl font-bold mb-4">Servicios Presupuestados</h2>
      
      <div className="flex space-x-4 mb-6">
        <div className="flex-grow">
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value=""
            onChange={(e) => {
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
                  onChange={(e) => setNuevaPartidaNombre(e.target.value)} 
                  placeholder="Ej: Equipamiento, Personal, Transporte"
                  required 
                />
              </div>
              <div>
                <Label htmlFor="descripcionPartida">Descripción</Label>
                <Input 
                  id="descripcionPartida" 
                  value={nuevaPartidaDescripcion} 
                  onChange={(e) => setNuevaPartidaDescripcion(e.target.value)} 
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
        <div className="space-y-4">
          {partidasPresupuesto.map((partida, index) => (
            <Card key={index} className="overflow-hidden">
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
              <CardContent className="p-4">
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
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">Tipo</th>
                          <th className="text-left py-2 px-2">Nombre</th>
                          <th className="text-left py-2 px-2">Descripción</th>
                          <th className="text-right py-2 px-2">Cantidad</th>
                          <th className="text-right py-2 px-2">Precio</th>
                          <th className="text-right py-2 px-2">Descuento</th>
                          <th className="text-right py-2 px-2">Subtotal</th>
                          <th className="py-2 px-2 w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {partida.items.map((item, itemIndex) => (
                          <tr key={item.id} className={`border-b ${item.tipo === "SEPARADOR" ? "bg-muted/40" : ""}`}>
                            <td className="py-2 px-2 text-sm">
                              {item.tipo === "CATEGORIA" && "Categoría"}
                              {item.tipo === "EQUIPO" && "Equipo"}
                              {item.tipo === "PERSONAL" && "Personal"}
                              {item.tipo === "SEPARADOR" && "Separador"}
                              {!item.tipo && "Producto"}
                            </td>
                            <td className={`py-2 px-2 text-sm ${item.tipo === "SEPARADOR" ? "font-semibold" : ""}`}>
                              {item.nombre}
                            </td>
                            <td className="py-2 px-2 text-sm">{item.descripcion || '-'}</td>
                            <td className="py-2 px-2 text-right text-sm">
                              {item.tipo === "SEPARADOR" ? "-" : item.cantidad}
                            </td>
                            <td className="py-2 px-2 text-right text-sm">
                              {item.tipo === "SEPARADOR" ? "-" : `${item.precioUnitario.toFixed(2)}€`}
                            </td>
                            <td className="py-2 px-2 text-right text-sm">
                              {item.tipo === "SEPARADOR" ? "-" : (item.descuento > 0 ? `${item.descuento}%` : '-')}
                            </td>
                            <td className="py-2 px-2 text-right text-sm font-medium">
                              {item.tipo === "SEPARADOR" ? "-" : `${item.subtotal.toFixed(2)}€`}
                            </td>
                            <td className="py-2 px-2 text-center">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleEliminarElemento(index, itemIndex)}
                              >
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Eliminar</span>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
        <div className="text-center py-10 bg-muted/20 rounded-lg border border-dashed">
          <p className="text-muted-foreground">No hay partidas agregadas al presupuesto.</p>
          <p className="text-muted-foreground text-sm">Selecciona o crea partidas para comenzar.</p>
        </div>
      )}
      
      <Toaster />
    </div>
  )
} 