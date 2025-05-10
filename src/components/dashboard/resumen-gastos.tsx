"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import {
  Receipt,
  BanknoteIcon,
  BarChart3,
  Clock
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface ResumenGastosProps {
  filtros: {
    periodo: string;
    año: number;
    trimestre?: number;
    mes?: number;
  }
}

interface DatosGastos {
  totalGastosConIVA: number;
  totalGastosSinIVA_Deducibles: number;
  totalIVASoportado_Deducible: number;
  totalPagado: number;
  totalPendiente: number;
  numeroGastos: number;
  promedioGasto: number;
  porCategoria: Array<{
    tipo: string;
    total: number;
  }>;
}

export function ResumenGastos({ filtros }: ResumenGastosProps) {
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [datos, setDatos] = useState<DatosGastos | null>(null)

  useEffect(() => {
    const obtenerDatos = async () => {
      setCargando(true)
      setError(null)
      
      try {
        // Construir parámetros de consulta
        const params = new URLSearchParams()
        params.append('periodo', filtros.periodo)
        params.append('año', filtros.año.toString())
        
        if (filtros.periodo === 'trimestral' && filtros.trimestre) {
          params.append('trimestre', filtros.trimestre.toString())
        }
        
        if (filtros.periodo === 'mensual' && filtros.mes) {
          params.append('mes', filtros.mes.toString())
        }
        
        const respuesta = await fetch(`/api/estadisticas/gastos?${params.toString()}`)
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener datos de gastos')
        }
        
        const data = await respuesta.json()
        setDatos(data.gastos)
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setError('No se pudieron cargar los datos de gastos')
      } finally {
        setCargando(false)
      }
    }
    
    obtenerDatos()
  }, [filtros])

  // Función para formatear moneda
  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(valor)
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gastos</CardTitle>
          <CardDescription>Error al cargar datos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-destructive">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-destructive" />
          <span>Gastos</span>
        </CardTitle>
        <CardDescription>
          Resumen de gastos {filtros.periodo === 'anual' 
            ? `del año ${filtros.año}` 
            : filtros.periodo === 'trimestral' 
              ? `del ${filtros.trimestre}º trimestre de ${filtros.año}`
              : `de ${new Date(filtros.año, (filtros.mes ? filtros.mes -1 : 0)).toLocaleString('es-ES', { month: 'long' })} de ${filtros.año}`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Total Gastos (con IVA)</h3>
            {cargando ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <p className="text-2xl font-bold text-destructive">{formatearMoneda(datos?.totalGastosConIVA || 0)}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Gastos Deducibles (sin IVA)</h3>
            {cargando ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <p className="text-2xl font-bold">{formatearMoneda(datos?.totalGastosSinIVA_Deducibles || 0)}</p>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Pendiente de pago (con IVA)</h3>
            {cargando ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <p className="text-xl font-semibold text-amber-600">{formatearMoneda(datos?.totalPendiente || 0)}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <BanknoteIcon className="h-4 w-4" />
              <span>Pagado (con IVA)</span>
            </h3>
            {cargando ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <p className="text-xl font-semibold">{formatearMoneda(datos?.totalPagado || 0)}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 pt-4 border-t">
           <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span>Promedio por Gasto (con IVA)</span>
            </h3>
            {cargando ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <p className="text-xl font-semibold">{formatearMoneda(datos?.promedioGasto || 0)}</p>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">IVA Soportado (Deducible)</h3>
            {cargando ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <p className="text-xl font-semibold">{formatearMoneda(datos?.totalIVASoportado_Deducible || 0)}</p>
            )}
          </div>
        </div>
        
        {/* Categorías de gastos */}
        <div className="mt-4 pt-4 border-t">
          <h3 className="text-sm font-medium mb-2">Gastos por categoría</h3>
          {cargando ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : datos?.porCategoria && datos.porCategoria.length > 0 ? (
            <div className="space-y-2">
              {datos.porCategoria.map((categoria, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{categoria.tipo}</span>
                  <span className="font-medium">{formatearMoneda(categoria.total)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No hay datos de categorías disponibles</p>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total registros</span>
            {cargando ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <span className="font-medium">{datos?.numeroGastos || 0}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 