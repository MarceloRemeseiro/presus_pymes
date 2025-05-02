"use client"

import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { FormEvent, ReactNode, useState, useEffect } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useProveedores } from "@/hooks/use-proveedores"
import { Partida } from "@/hooks/use-partidas"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

// Proveedores especiales fijos
const PROVEEDORES_ESPECIALES = [
  { id: "gastos-generales", nombre: "GASTOS GENERALES" },
  { id: "freelance", nombre: "FREELANCE" },
  { id: "dietas", nombre: "DIETAS" }
];

// Partidas especiales que se deben crear o buscar
const PARTIDA_GASTOS_GENERALES = "GASTOS GENERALES";
const PARTIDA_PERSONAL = "PERSONAL";

export interface PresupuestoProveedorDialogProps {
  trigger: ReactNode
  presupuestoId: string
  presupuestoProveedorId?: string
  proveedorIdInicial?: string
  partidaIdInicial?: string
  montoInicial?: number
  notasIniciales?: string
  onSuccess?: () => void
}

export function PresupuestoProveedorDialog({
  trigger,
  presupuestoId,
  presupuestoProveedorId,
  proveedorIdInicial,
  partidaIdInicial,
  montoInicial = 0,
  notasIniciales = "",
  onSuccess
}: PresupuestoProveedorDialogProps) {
  const { proveedores, loading: loadingProveedores } = useProveedores()
  const [partidasPresupuesto, setPartidasPresupuesto] = useState<Partida[]>([])
  const [loadingPartidas, setLoadingPartidas] = useState(true)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [proveedorId, setProveedorId] = useState(proveedorIdInicial || "")
  const [partidaId, setPartidaId] = useState(partidaIdInicial || "sin-partida")
  const [monto, setMonto] = useState(montoInicial)
  const [notas, setNotas] = useState(notasIniciales)
  const [precioConIVA, setPrecioConIVA] = useState(false)

  // Partida especial para gastos generales
  const [partidaGastosGeneralesId, setPartidaGastosGeneralesId] = useState<string | null>(null)
  // Partida especial para personal
  const [partidaPersonalId, setPartidaPersonalId] = useState<string | null>(null)

  const modoEdicion = !!presupuestoProveedorId

  // Cargar las partidas utilizadas en este presupuesto específico
  useEffect(() => {
    if (!presupuestoId || !open) return

    const fetchPartidasPresupuesto = async () => {
      setLoadingPartidas(true)
      try {
        const response = await fetch(`/api/presupuestos/${presupuestoId}/partidas`)
        if (!response.ok) {
          throw new Error('Error al cargar partidas del presupuesto')
        }
        const data = await response.json()
        setPartidasPresupuesto(data)
        
        // Buscar las partidas especiales
        const gastosGeneralesPartida = data.find((p: Partida) => 
          p.nombre.toUpperCase() === PARTIDA_GASTOS_GENERALES
        );
        if (gastosGeneralesPartida) {
          setPartidaGastosGeneralesId(gastosGeneralesPartida.id);
        }
        
        const personalPartida = data.find((p: Partida) => 
          p.nombre.toUpperCase() === PARTIDA_PERSONAL
        );
        if (personalPartida) {
          setPartidaPersonalId(personalPartida.id);
        }
      } catch (err) {
        console.error('Error:', err)
        toast.error('Error al cargar las partidas del presupuesto')
      } finally {
        setLoadingPartidas(false)
      }
    }

    fetchPartidasPresupuesto()
  }, [presupuestoId, open])

  // Cargar datos de presupuesto proveedor si estamos en modo edición
  useEffect(() => {
    if (!presupuestoProveedorId || !open) return

    const fetchPresupuestoProveedor = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/presupuestos/proveedores/${presupuestoProveedorId}`)
        if (!response.ok) {
          throw new Error('Error al cargar datos del presupuesto proveedor')
        }
        const data = await response.json()
        console.log("Datos cargados:", data)
        
        // Si tiene tipoEspecial, usamos ese valor como proveedorId
        if (data.tipoEspecial) {
          setProveedorId(data.tipoEspecial)
        } else {
          setProveedorId(data.proveedorId || "")
        }
        
        setMonto(data.precio || 0)
        setNotas(data.descripcion || "")
        setPrecioConIVA(data.precioConIVA || false)
        
        // Intentar establecer la partida si existe
        if (data.partidaId) {
          setPartidaId(data.partidaId)
        } else {
          // Resetear a sin-partida si no hay partidaId
          setPartidaId("sin-partida")
        }
      } catch (err) {
        console.error('Error:', err)
        toast.error('Error al cargar los datos del presupuesto proveedor')
      } finally {
        setLoading(false)
      }
    }

    fetchPresupuestoProveedor()
  }, [presupuestoProveedorId, open])

  // Actualizar la partida cuando cambia el proveedor
  useEffect(() => {
    if (proveedorId === "gastos-generales") {
      // Para gastos generales, usamos la partida de gastos generales si existe
      if (partidaGastosGeneralesId) {
        setPartidaId(partidaGastosGeneralesId);
      } else {
        // Si no existe, dejamos 'sin-partida' y crearemos la partida al guardar
        setPartidaId("crear-gastos-generales");
      }
    } else if (proveedorId === "freelance" && partidaPersonalId) {
      // Para freelance, preseleccionamos la partida de personal si existe
      setPartidaId(partidaPersonalId);
    }
    // Para dietas, no preseleccionamos partida específica - el usuario puede elegir cualquiera
  }, [proveedorId, partidaGastosGeneralesId, partidaPersonalId]);

  // Función para crear una partida si no existe
  const crearPartidaSiNoExiste = async (nombrePartida: string): Promise<string | null> => {
    try {
      // Primero, intentamos buscar la partida en todas las partidas disponibles
      const response = await fetch('/api/partidas')
      if (!response.ok) {
        throw new Error('Error al cargar partidas')
      }
      
      const todasPartidas = await response.json()
      const partidaExistente = todasPartidas.find((p: Partida) => 
        p.nombre.toUpperCase() === nombrePartida.toUpperCase()
      )
      
      if (partidaExistente) {
        return partidaExistente.id
      }
      
      // Si no existe, creamos la partida
      const createResponse = await fetch('/api/partidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombrePartida,
          descripcion: `Partida para ${nombrePartida}`,
        }),
      })
      
      if (!createResponse.ok) {
        throw new Error('Error al crear partida')
      }
      
      const nuevaPartida = await createResponse.json()
      return nuevaPartida.id
    } catch (error) {
      console.error('Error al crear partida:', error)
      return null
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!proveedorId) {
      toast.error("Debes seleccionar un proveedor")
      return
    }

    if (monto <= 0) {
      toast.error("El monto debe ser mayor a 0")
      return
    }

    setLoading(true)

    try {
      // Manejar la creación de partidas especiales si es necesario
      let partidaFinalId = partidaId
      
      if (proveedorId === "gastos-generales") {
        // Para gastos generales, creamos la partida si no existe
        const idPartidaGastos = await crearPartidaSiNoExiste(PARTIDA_GASTOS_GENERALES)
        partidaFinalId = idPartidaGastos || "sin-partida"
      } else if (proveedorId === "freelance" && partidaId === "sin-partida") {
        // Para freelance sin partida asignada, usamos PERSONAL
        const idPartidaPersonal = await crearPartidaSiNoExiste(PARTIDA_PERSONAL)
        partidaFinalId = idPartidaPersonal || "sin-partida"
      }
      // Para dietas, usamos la partida seleccionada por el usuario
      
      // Obtener el nombre del proveedor seleccionado
      let nombreProveedor = "";
      
      // Buscar primero en los proveedores especiales
      const proveedorEspecial = PROVEEDORES_ESPECIALES.find(p => p.id === proveedorId);
      if (proveedorEspecial) {
        nombreProveedor = proveedorEspecial.nombre;
      } else {
        // Si no es especial, buscar en los proveedores normales
        const proveedorNormal = proveedores.find(p => p.id === proveedorId);
        nombreProveedor = proveedorNormal?.nombre || 'proveedor';
      }
      
      const endpoint = modoEdicion 
        ? `/api/presupuestos/proveedores/${presupuestoProveedorId}`
        : `/api/presupuestos/proveedores`
      
      const method = modoEdicion ? "PUT" : "POST"
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          presupuestoId,
          proveedorId: (proveedorId === "gastos-generales" || proveedorId === "freelance" || proveedorId === "dietas") ? null : proveedorId,
          partidaId: partidaFinalId === "sin-partida" ? null : partidaFinalId,
          nombre: `Presupuesto de ${nombreProveedor}`,
          precio: monto,
          precioConIVA,
          descripcion: notas || null,
          // Agregar bandera para proveedores especiales
          tipoEspecial: (proveedorId === "gastos-generales" || proveedorId === "freelance" || proveedorId === "dietas") ? proveedorId : null
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error al guardar el presupuesto de proveedor")
      }

      toast.success(modoEdicion ? "Presupuesto de proveedor actualizado" : "Presupuesto de proveedor añadido")
      setOpen(false)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error(error)
      toast.error((error as Error).message || "Error al guardar el presupuesto de proveedor")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!presupuestoProveedorId) return
    
    if (!confirm("¿Estás seguro de que deseas eliminar este presupuesto de proveedor?")) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/presupuestos/proveedores/${presupuestoProveedorId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error al eliminar el presupuesto de proveedor")
      }

      toast.success("Presupuesto de proveedor eliminado")
      setOpen(false)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error(error)
      toast.error((error as Error).message || "Error al eliminar el presupuesto de proveedor")
    } finally {
      setLoading(false)
    }
  }

  // Determinar si mostrar el selector de partida
  const mostrarSelectorPartida = proveedorId !== "gastos-generales";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{modoEdicion ? "Editar" : "Añadir"} presupuesto de proveedor</DialogTitle>
          <DialogDescription>
            {modoEdicion 
              ? "Modifica los detalles del presupuesto del proveedor" 
              : "Añade un nuevo presupuesto de proveedor para este proyecto"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="proveedor">Proveedor</Label>
              <Select 
                value={proveedorId} 
                onValueChange={setProveedorId}
                disabled={loading || loadingProveedores}
              >
                <SelectTrigger id="proveedor">
                  <SelectValue placeholder="Seleccionar proveedor" />
                </SelectTrigger>
                <SelectContent>
                  {/* Proveedores especiales fijos */}
                  <SelectItem value="gastos-generales" className="font-semibold">GASTOS GENERALES</SelectItem>
                  <SelectItem value="freelance" className="font-semibold">FREELANCE</SelectItem>
                  <SelectItem value="dietas" className="font-semibold">DIETAS</SelectItem>
                  
                  {/* Separador visual */}
                  <div className="h-px bg-gray-200 my-2"></div>
                  
                  {loadingProveedores ? (
                    <div className="flex items-center justify-center py-2">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Cargando...
                    </div>
                  ) : (
                    proveedores.map((proveedor) => (
                      <SelectItem key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            {/* Selector de partida - sólo visible si NO es GASTOS GENERALES */}
            {mostrarSelectorPartida && (
              <div className="grid gap-2">
                <Label htmlFor="partida">Partida {proveedorId === "freelance" ? "(preseleccionada PERSONAL)" : "(opcional)"}</Label>
                <Select 
                  value={partidaId} 
                  onValueChange={setPartidaId}
                  disabled={loading || loadingPartidas}
                >
                  <SelectTrigger id="partida">
                    <SelectValue placeholder="Seleccionar partida" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sin-partida">Sin partida</SelectItem>
                    {loadingPartidas ? (
                      <div className="flex items-center justify-center py-2">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Cargando...
                      </div>
                    ) : (
                      partidasPresupuesto.map((partida) => (
                        <SelectItem key={partida.id} value={partida.id}>
                          {partida.nombre}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="monto">Monto (€)</Label>
              <Input
                id="monto"
                type="number"
                step="0.01"
                value={monto}
                onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                disabled={loading}
              />
            </div>
            
            {/* Checkbox de Precio con IVA (solo para proveedores normales) */}
            {!["gastos-generales", "freelance", "dietas"].includes(proveedorId) && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="precioConIVA" 
                  checked={precioConIVA} 
                  onCheckedChange={(checked) => setPrecioConIVA(checked === true)}
                  disabled={loading}
                />
                <Label 
                  htmlFor="precioConIVA" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  El precio incluye IVA
                </Label>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="notas">Notas (opcional)</Label>
              <Textarea
                id="notas"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Añade notas adicionales sobre este presupuesto"
                disabled={loading}
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <div>
              {modoEdicion && (
                <Button 
                  type="button" 
                  variant="destructive" 
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    "Eliminar"
                  )}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {modoEdicion ? "Actualizando..." : "Guardando..."}
                  </>
                ) : (
                  modoEdicion ? "Actualizar" : "Guardar"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 