import { useState } from "react"
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
import { toast } from "sonner"
import { 
  Loader2, 
  CheckCircle, 
  XCircle,
  ClipboardList,
  ClipboardCheck,
} from "lucide-react"
import { EstadoBadge } from "./estado-badge"

type EstadoPresupuesto = "PENDIENTE" | "APROBADO" | "RECHAZADO" | "FACTURADO"

interface CambiarEstadoDialogProps {
  presupuestoId: string
  estadoActual: EstadoPresupuesto
  trigger: React.ReactNode
  onEstadoCambiado?: (nuevoEstado: EstadoPresupuesto) => void
}

export function CambiarEstadoDialog({ 
  presupuestoId, 
  estadoActual, 
  trigger, 
  onEstadoCambiado 
}: CambiarEstadoDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const cambiarEstado = async (nuevoEstado: EstadoPresupuesto) => {
    if (nuevoEstado === estadoActual) {
      setIsOpen(false)
      return
    }
    
    try {
      setIsLoading(true)
      
      const response = await fetch(`/api/presupuestos/${presupuestoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: nuevoEstado
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error al cambiar el estado del presupuesto`)
      }
      
      const presupuestoActualizado = await response.json()
      
      toast.success(`Estado cambiado a ${getNombreEstado(nuevoEstado)}`)
      
      if (onEstadoCambiado) {
        onEstadoCambiado(nuevoEstado)
      }
      
      setIsOpen(false)
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "Error al cambiar el estado del presupuesto")
    } finally {
      setIsLoading(false)
    }
  }
  
  const getNombreEstado = (estado: EstadoPresupuesto): string => {
    switch (estado) {
      case "PENDIENTE": return "Pendiente"
      case "APROBADO": return "Aprobado"
      case "RECHAZADO": return "Rechazado"
      case "FACTURADO": return "Facturado"
      default: return estado
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cambiar estado del presupuesto</DialogTitle>
          <DialogDescription>
            Estado actual: <EstadoBadge estado={estadoActual} className="ml-2" />
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 my-4">
          <Button
            variant="outline"
            className="justify-start gap-2"
            onClick={() => cambiarEstado("PENDIENTE")}
            disabled={isLoading || estadoActual === "PENDIENTE"}
          >
            <EstadoBadge estado="PENDIENTE" />
            <span className="ml-2">Marcar como pendiente</span>
          </Button>
          
          <Button
            variant="outline"
            className="justify-start gap-2"
            onClick={() => cambiarEstado("APROBADO")}
            disabled={isLoading || estadoActual === "APROBADO"}
          >
            <EstadoBadge estado="APROBADO" />
            <span className="ml-2">Aprobar presupuesto</span>
          </Button>
          
          <Button
            variant="outline"
            className="justify-start gap-2"
            onClick={() => cambiarEstado("RECHAZADO")}
            disabled={isLoading || estadoActual === "RECHAZADO"}
          >
            <EstadoBadge estado="RECHAZADO" />
            <span className="ml-2">Rechazar presupuesto</span>
          </Button>
          
          <Button
            variant="outline"
            className="justify-start gap-2"
            onClick={() => cambiarEstado("FACTURADO")}
            disabled={isLoading || estadoActual === "FACTURADO"}
          >
            <EstadoBadge estado="FACTURADO" />
            <span className="ml-2">Marcar como facturado</span>
          </Button>
        </div>
        
        <DialogFooter className="justify-between sm:justify-between">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          {isLoading && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Actualizando...</span>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 