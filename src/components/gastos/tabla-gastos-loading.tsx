import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function TablaGastosLoading() {
  return (
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
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell><Skeleton className="h-5 w-[140px]" /></TableCell>
              <TableCell><Skeleton className="h-5 w-[160px]" /></TableCell>
              <TableCell><Skeleton className="h-5 w-[180px]" /></TableCell>
              <TableCell><Skeleton className="h-5 w-[90px]" /></TableCell>
              <TableCell><Skeleton className="h-5 w-[140px]" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-5 w-[80px] ml-auto" /></TableCell>
              <TableCell className="text-center"><Skeleton className="h-5 w-[80px] mx-auto" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-8 w-[90px] ml-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 