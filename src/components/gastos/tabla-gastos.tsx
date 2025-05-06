import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { obtenerGastos } from '@/lib/acciones/gastos'
import { formatCurrency } from '@/lib/utils'
import GastosAcciones from './gastos-acciones'
import NuevoGasto from './nuevo-gasto'
import { Gasto } from '@/lib/acciones/gastos'

function mapEstadoToColor(estado?: string) {
  switch (estado) {
    case 'PENDIENTE':
      return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
    case 'ENVIADA':
      return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
    case 'COBRADA':
      return 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
    case 'VENCIDA':
      return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
    case 'ANULADA':
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    default:
      return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
  }
}

export default async function TablaGastos() {
  const gastos = await obtenerGastos()

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Todos
          </Button>
          <Button variant="outline" size="sm" className="text-yellow-500">
            Pendientes
          </Button>
          <Button variant="outline" size="sm" className="text-green-500">
            Pagados
          </Button>
        </div>
        <NuevoGasto />
      </div>
      
      {gastos.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No hay gastos registrados</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              Comienza registrando una factura de proveedor. Puedes asociarla a un proyecto específico o dejarla como gasto general.
            </p>
            <NuevoGasto />
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Factura</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Concepto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead className="text-right">Importe</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="w-[100px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gastos.map((gasto) => (
                <TableRow key={gasto.id}>
                  <TableCell className="font-medium">
                    {gasto.documentoNombre || 'Sin documento'}
                  </TableCell>
                  <TableCell>
                    {gasto.proveedor?.nombre || 'Sin proveedor'}
                  </TableCell>
                  <TableCell>{gasto.nombre}</TableCell>
                  <TableCell>
                    {gasto.documentoFecha 
                      ? format(new Date(gasto.documentoFecha), 'dd MMM yyyy', { locale: es })
                      : format(new Date(gasto.createdAt), 'dd MMM yyyy', { locale: es })}
                  </TableCell>
                  <TableCell>
                    {gasto.partida?.nombre 
                      ? gasto.partida.nombre 
                      : gasto.tipoEspecial === 'gastos-generales'
                        ? 'Gastos generales'
                        : 'Sin asignar'}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(gasto.precio)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={mapEstadoToColor(gasto.factura?.estado)}
                    >
                      {gasto.factura?.estado === 'COBRADA' ? 'PAGADA' : (gasto.factura?.estado || 'PENDIENTE')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <GastosAcciones gasto={gasto as Gasto} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
} 