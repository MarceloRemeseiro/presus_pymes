import React from "react"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, XCircle, Clock, CreditCard } from "lucide-react"

type EstadoGasto = 'PENDIENTE' | 'PAGADO' | 'VENCIDO' | 'ANULADO'

interface EstadoBadgeProps {
  estado: EstadoGasto
  showIcon?: boolean
  className?: string
}

export function EstadoBadge({ estado, showIcon = true, className = "" }: EstadoBadgeProps) {
  const getEstadoConfig = (estado: EstadoGasto) => {
    switch (estado) {
      case "PENDIENTE":
        return {
          variant: "warning" as const,
          icon: <AlertCircle className="h-3 w-3 mr-1" />,
          label: "Pendiente"
        }
      case "PAGADO":
        return {
          variant: "success" as const,
          icon: <CheckCircle className="h-3 w-3 mr-1" />,
          label: "Pagado"
        }
      case "VENCIDO":
        return {
          variant: "danger" as const,
          icon: <Clock className="h-3 w-3 mr-1" />,
          label: "Vencido"
        }
      case "ANULADO":
        return {
          variant: "default" as const,
          icon: <XCircle className="h-3 w-3 mr-1" />,
          label: "Anulado"
        }
      default:
        return {
          variant: "default" as const,
          icon: <CreditCard className="h-3 w-3 mr-1" />,
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