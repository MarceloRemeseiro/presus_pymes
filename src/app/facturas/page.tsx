import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const facturasData = [
  {
    id: "FAC001",
    cliente: "María González",
    fecha: "05/05/2023",
    vencimiento: "05/06/2023",
    total: 1250.75,
    estado: "Pagada",
  },
  {
    id: "FAC002",
    cliente: "Electrónica Martínez S.L.",
    fecha: "18/05/2023",
    vencimiento: "18/06/2023",
    total: 3450.00,
    estado: "Pendiente",
  },
  {
    id: "FAC003",
    cliente: "Juan Pérez",
    fecha: "25/05/2023",
    vencimiento: "25/06/2023",
    total: 876.25,
    estado: "Pagada",
  },
  {
    id: "FAC004",
    cliente: "Distribuciones López S.A.",
    fecha: "12/06/2023",
    vencimiento: "12/07/2023",
    total: 2180.50,
    estado: "Pendiente",
  },
  {
    id: "FAC005",
    cliente: "Ana Ramírez",
    fecha: "20/06/2023",
    vencimiento: "20/07/2023",
    total: 1650.00,
    estado: "Vencida",
  },
];

export default function FacturasPage() {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Facturas</h1>
        <Button>Nueva Factura</Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableCaption>Lista de facturas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Vencimiento</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facturasData.map((factura) => (
              <TableRow key={factura.id}>
                <TableCell className="font-medium">{factura.id}</TableCell>
                <TableCell>{factura.cliente}</TableCell>
                <TableCell>{factura.fecha}</TableCell>
                <TableCell>{factura.vencimiento}</TableCell>
                <TableCell className="text-right">${factura.total.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    factura.estado === "Pagada" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                      : factura.estado === "Vencida"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}>
                    {factura.estado}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm">Ver</Button>
                    <Button variant="outline" size="sm">Imprimir</Button>
                    <Button variant="destructive" size="sm">Eliminar</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 