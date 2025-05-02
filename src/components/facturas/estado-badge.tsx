import React from "react"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, XCircle, SendHorizonal, Clock } from "lucide-react"

type EstadoFactura = 'PENDIENTE' | 'ENVIADA' | 'PAGADA' | 'VENCIDA' | 'ANULADA'

interface EstadoBadgeProps {
  estado: EstadoFactura
  showIcon?: boolean
  className?: string
}

export function EstadoBadge({ estado, showIcon = true, className = "" }: EstadoBadgeProps) {
  const getEstadoConfig = (estado: EstadoFactura) => {
    switch (estado) {
      case "PENDIENTE":
        return {
          variant: "warning" as const,
          icon: <AlertCircle className="h-3 w-3 mr-1" />,
          label: "Pendiente"
        }
      case "ENVIADA":
        return {
          variant: "info" as const,
          icon: <SendHorizonal className="h-3 w-3 mr-1" />,
          label: "Enviada"
        }
      case "PAGADA":
        return {
          variant: "success" as const,
          icon: <CheckCircle className="h-3 w-3 mr-1" />,
          label: "Pagada"
        }
      case "VENCIDA":
        return {
          variant: "danger" as const,
          icon: <Clock className="h-3 w-3 mr-1" />,
          label: "Vencida"
        }
      case "ANULADA":
        return {
          variant: "default" as const,
          icon: <XCircle className="h-3 w-3 mr-1" />,
          label: "Anulada"
        }
      default:
        return {
          variant: "default" as const,
          icon: <AlertCircle className="h-3 w-3 mr-1" />,
          label: estado
        }
    }
  }

  const config = getEstadoConfig(estado)

  return (
    <Badge 
      variant={config.variant} 
      className={`flex items-center px-2 py-0.5 text-xs ${className}`}
    >
      {showIcon && config.icon}
      {config.label}
    </Badge>
  )
} 