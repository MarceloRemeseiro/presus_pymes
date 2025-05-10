"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  TooltipProps
} from 'recharts'

interface GraficoEvolucionProps {
  filtros: {
    periodo: string;
    año: number;
    trimestre?: number;
    mes?: number;
  }
}

interface DatosMensuales {
  mes: string;
  ingresos: number;
  gastos: number;
  beneficio: number;
  mesNumero?: string; // Añadimos campo para el número de mes
}

// Mapa para convertir nombres de meses a números
const mesANumero: Record<string, string> = {
  'enero': 'ENE',
  'febrero': 'FEB',
  'marzo': 'MAR',
  'abril': 'ABR',
  'mayo': 'MAY',
  'junio': 'JUN',
  'julio': 'JUL',
  'agosto': 'AGO',
  'septiembre': 'SEP',
  'octubre': 'OCT',
  'noviembre': 'NOV',
  'diciembre': 'DIC'
};

// Componente personalizado para el tooltip
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const nombreMes = payload[0]?.payload?.mes || label;
    
    return (
      <div className="bg-background border rounded-md shadow-md p-3 text-sm">
        <p className="font-medium mb-1">{nombreMes}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name === 'Gastos' ? 'Coste Gastos' : entry.name}: {formatearMoneda(entry.value as number)}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

// Formatear moneda para tooltips y etiquetas
const formatearMoneda = (valor: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(valor);
};

// Formatear valores de eje Y
const formatearEjeY = (valor: number) => {
  if (valor >= 1000000) {
    return `${(valor / 1000000).toFixed(1)}M €`;
  } else if (valor >= 1000) {
    return `${(valor / 1000).toFixed(0)}k €`;
  }
  return `${valor} €`;
};

// Colores para las barras
const colores = {
  ingresos: "#ffffff", // Blanco
  gastos: "#ef4444",   // Rojo
  beneficio: "#22c55e" // Verde
};

export function GraficoEvolucion({ filtros }: GraficoEvolucionProps) {
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [datos, setDatos] = useState<DatosMensuales[]>([])

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
        
        const respuesta = await fetch(`/api/estadisticas/financieras?${params.toString()}`)
        
        if (!respuesta.ok) {
          throw new Error('Error al obtener datos de evolución')
        }
        
        const data = await respuesta.json()
        
        if (data.financieras && data.financieras.evolucionMensual && 
            Array.isArray(data.financieras.evolucionMensual) && 
            data.financieras.evolucionMensual.length > 0) {
          // Añadir números de mes a los datos
          const datosConNumeros = data.financieras.evolucionMensual.map((dato: DatosMensuales) => ({
            ...dato,
            mesNumero: mesANumero[dato.mes.toLowerCase()] || 
                       // Si no está en el mapa, intentamos extraer el mes del nombre
                       dato.mes.match(/\d+/)?.[0]?.padStart(2, '0') || 
                       dato.mes
          }));
          
          setDatos(datosConNumeros)
          console.log("Datos evolución recibidos:", datosConNumeros)
        } else {
          console.log("No hay datos de evolución disponibles", data)
          setDatos([])
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setError('No se pudieron cargar los datos de evolución')
      } finally {
        setCargando(false)
      }
    }
    
    obtenerDatos()
  }, [filtros])

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolución</CardTitle>
          <CardDescription>Error al cargar datos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-destructive">{error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span>Evolución Temporal</span>
        </CardTitle>
        <CardDescription>
          Comparativa de ingresos vs gastos {filtros.periodo === 'anual' 
            ? `del año ${filtros.año}` 
            : filtros.periodo === 'trimestral' 
              ? `del ${filtros.trimestre}º trimestre de ${filtros.año}`
              : `de ${new Date(filtros.año, (filtros.mes ? filtros.mes -1 : 0)).toLocaleString('es-ES', { month: 'long' })} de ${filtros.año}`
          }. Ingresos (sin IVA) y Coste Total de Gastos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {cargando ? (
          <div className="h-[300px] w-full">
            <Skeleton className="h-full w-full" />
          </div>
        ) : datos.length > 0 ? (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={datos}
                margin={{
                  top: 5,
                  right: 20,
                  left: 10,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis 
                  dataKey="mesNumero" 
                  tick={{ fontSize: 12 }} 
                  axisLine={{ strokeWidth: 1 }}
                  tickLine={false}
                  className="text-muted-foreground"
                />
                <YAxis 
                  tickFormatter={formatearEjeY} 
                  tick={{ fontSize: 12 }} 
                  axisLine={{ strokeWidth: 0 }}
                  tickLine={false}
                  className="text-muted-foreground"
                  width={70}
                />
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} 
                />
                <Legend 
                  align="center" 
                  verticalAlign="top" 
                  iconType="circle" 
                  iconSize={8} 
                  wrapperStyle={{ paddingBottom: '15px' }}
                />
                <Bar 
                  name="Ingresos" 
                  dataKey="ingresos" 
                  fill={colores.ingresos}
                  stroke="#d4d4d8" 
                  strokeWidth={1}
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={40}
                />
                <Bar 
                  name="Gastos" 
                  dataKey="gastos" 
                  fill={colores.gastos}
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={40}
                />
                <Bar 
                  name="Beneficio" 
                  dataKey="beneficio" 
                  fill={colores.beneficio}
                  radius={[4, 4, 0, 0]} 
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">No hay datos disponibles para este período</p>
              <p className="text-xs text-muted-foreground mt-2">
                Intenta seleccionar un período diferente o verifica que haya facturas registradas
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 