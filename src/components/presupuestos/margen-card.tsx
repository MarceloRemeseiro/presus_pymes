"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

// Constantes para tipos de proveedores especiales
const TIPO_GASTOS_GENERALES = "gastos-generales";
const TIPO_FREELANCE = "freelance";
const TIPO_DIETAS = "dietas";
const NOMBRE_GASTOS_GENERALES = "GASTOS GENERALES";

interface MargenCardProps {
  subtotalPresupuesto: number
  ivaPresupuesto: number
  totalPresupuesto: number
  presupuestosProveedores: Array<{
    id: string
    nombre: string
    precio: number
    precioConIVA: boolean
    proveedorId?: string | null
    proveedor?: {
      id: string
      nombre: string
    } | null
    partidaId?: string | null
    partida?: {
      id: string
      nombre: string
    } | null
    descripcion?: string | null
    tipoEspecial?: string | null  // Campo para identificar tipos especiales
  }>
  // Incluir items agrupados por partida
  itemsAgrupados?: Array<{
    partidaId: string | null
    partidaNombre: string
    items: any[]
    subtotal: number
  }>
}

export function MargenCard({ 
  subtotalPresupuesto, 
  presupuestosProveedores,
  itemsAgrupados = []
}: MargenCardProps) {

  // Extraer el IVA (asumiendo un IVA del 21%)
  const extraerSubtotalSinIVA = (precio: number, precioConIVA: boolean) => {
    if (precioConIVA) {
      return precio / 1.21;
    } else {
      return precio;
    }
  };

  // Agrupar los gastos de proveedores por partida
  const gastosPorPartida = presupuestosProveedores.reduce((acc, proveedor) => {
    const subtotal = extraerSubtotalSinIVA(proveedor.precio, proveedor.precioConIVA);
    
    // Determinar el ID y nombre de la partida
    let partidaId = proveedor.partidaId || 'sin-partida';
    let partidaNombre = proveedor.partida?.nombre || 'Sin partida asignada';
    
    // Si es un gasto general, usar "GASTOS GENERALES" como partida
    if (proveedor.tipoEspecial === TIPO_GASTOS_GENERALES ||
        (proveedor.nombre && proveedor.nombre.includes(NOMBRE_GASTOS_GENERALES))) {
      partidaNombre = NOMBRE_GASTOS_GENERALES;
      // Si no tiene partidaId pero es GASTOS GENERALES, usamos un ID especial
      if (partidaId === 'sin-partida') {
        partidaId = 'gastos-generales-virtual';
      }
    }
    
    const notasProveedor = proveedor.descripcion || '';
    
    if (!acc[partidaId]) {
      acc[partidaId] = {
        id: partidaId,
        nombre: partidaNombre,
        subtotal: 0,
        notas: []
      };
    }
    
    acc[partidaId].subtotal += subtotal;
    // Agregar notas del proveedor si existen
    if (notasProveedor) {
      // Determinar el nombre del proveedor a mostrar
      let nombreProveedor = proveedor.proveedor?.nombre || 'Proveedor';
      
      // Para proveedores especiales, usar sus tipos
      if (proveedor.tipoEspecial === TIPO_GASTOS_GENERALES || 
          (proveedor.nombre && proveedor.nombre.includes(NOMBRE_GASTOS_GENERALES))) {
        nombreProveedor = NOMBRE_GASTOS_GENERALES;
      } else if (proveedor.tipoEspecial === TIPO_FREELANCE ||
                (proveedor.nombre && proveedor.nombre.includes(TIPO_FREELANCE.toUpperCase()))) {
        nombreProveedor = 'FREELANCE';
      } else if (proveedor.tipoEspecial === TIPO_DIETAS ||
                (proveedor.nombre && proveedor.nombre.includes(TIPO_DIETAS.toUpperCase()))) {
        nombreProveedor = 'DIETAS';
      }
      
      acc[partidaId].notas.push(`${nombreProveedor}: ${notasProveedor}`);
    }
    
    return acc;
  }, {} as Record<string, { id: string, nombre: string, subtotal: number, notas: string[] }>);

  // Calcular el total de gastos de proveedores
  const subtotalProveedores = Object.values(gastosPorPartida).reduce(
    (total, partida) => total + partida.subtotal, 0
  );

  // Calcular el margen total
  const margenTotal = subtotalPresupuesto - subtotalProveedores;
  const porcentajeMargenTotal = subtotalPresupuesto > 0 
    ? (margenTotal / subtotalPresupuesto) * 100 
    : 0;

  // Determinar el color del margen basado en el porcentaje
  const getMargenColor = (porcentaje: number) => {
    if (porcentaje < 10) return "text-red-600 dark:text-red-400";
    if (porcentaje < 20) return "text-amber-600 dark:text-amber-400";
    return "text-emerald-600 dark:text-emerald-400";
  };

  // Crear análisis de margen por partida
  const analisisPartidas = itemsAgrupados.map(partidaCliente => {
    const partidaId = partidaCliente.partidaId || 'sin-partida';
    const presupuestado = partidaCliente.subtotal || 0;
    const gastos = gastosPorPartida[partidaId]?.subtotal || 0;
    const margen = presupuestado - gastos;
    const porcentajeMargen = presupuestado > 0 ? (margen / presupuestado) * 100 : 0;
    const notasPartida = gastosPorPartida[partidaId]?.notas || [];
    
    return {
      id: partidaId,
      nombre: partidaCliente.partidaNombre,
      presupuestado,
      gastos,
      margen,
      porcentajeMargen,
      notas: notasPartida
    };
  });

  // Añadir partidas que solo están en gastos de proveedores pero no en el presupuesto
  Object.values(gastosPorPartida).forEach(gastoPartida => {
    if (!analisisPartidas.some(p => p.id === gastoPartida.id)) {
      analisisPartidas.push({
        id: gastoPartida.id,
        nombre: gastoPartida.nombre,
        presupuestado: 0,
        gastos: gastoPartida.subtotal,
        margen: -gastoPartida.subtotal,
        porcentajeMargen: -100,
        notas: gastoPartida.notas
      });
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Análisis de Margen (Sin IVA)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Márgenes por partida */}
        {analisisPartidas.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Desglose por partidas:</h3>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium">Partida</TableHead>
                    <TableHead className="font-medium">Notas</TableHead>
                    <TableHead className="text-right font-medium text-gray-500">Presupuestado</TableHead>
                    <TableHead className="text-right font-medium text-red-500">Gasto</TableHead>
                    <TableHead className="text-right font-medium text-emerald-500">Margen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analisisPartidas.map((partida) => (
                    <TableRow key={partida.id}>
                      <TableCell className="font-medium">{partida.nombre}</TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">
                        {partida.notas.length > 0 ? (
                          <div className="max-h-20 overflow-y-auto">
                            {partida.notas.map((nota, index) => (
                              <div key={index} className="mb-1">{nota}</div>
                            ))}
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell className="text-right text-gray-500">
                        {formatCurrency(partida.presupuestado)}
                      </TableCell>
                      <TableCell className="text-right text-red-500">
                        {formatCurrency(partida.gastos)}
                      </TableCell>
                      <TableCell className={`text-right font-medium ${getMargenColor(partida.porcentajeMargen)}`}>
                        {formatCurrency(partida.margen)} 
                        {partida.presupuestado > 0 && (
                          <span className="text-xs ml-1">
                            ({partida.porcentajeMargen.toFixed(1)}%)
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t-2 font-medium">
                    <TableCell className="font-bold">TOTAL</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right text-gray-500 font-bold">
                      {formatCurrency(subtotalPresupuesto)}
                    </TableCell>
                    <TableCell className="text-right text-red-500 font-bold">
                      {formatCurrency(subtotalProveedores)}
                    </TableCell>
                    <TableCell className={`text-right font-bold ${getMargenColor(porcentajeMargenTotal)}`}>
                      {formatCurrency(margenTotal)} 
                      <span className="text-xs ml-1">
                        ({porcentajeMargenTotal.toFixed(1)}%)
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 