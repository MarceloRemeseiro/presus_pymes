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

const presupuestosData = [
  {
    id: "PRES001",
    cliente: "María González",
    fecha: "01/05/2023",
    total: 1250.75,
    estado: "Pendiente",
  },
  {
    id: "PRES002",
    cliente: "Electrónica Martínez S.L.",
    fecha: "15/05/2023",
    total: 3450.00,
    estado: "Aprobado",
  },
  {
    id: "PRES003",
    cliente: "Juan Pérez",
    fecha: "22/05/2023",
    total: 876.25,
    estado: "Rechazado",
  },
  {
    id: "PRES004",
    cliente: "Distribuciones López S.A.",
    fecha: "10/06/2023",
    total: 2180.50,
    estado: "Pendiente",
  },
  {
    id: "PRES005",
    cliente: "Ana Ramírez",
    fecha: "18/06/2023",
    total: 1650.00,
    estado: "Aprobado",
  },
];

export default function PresupuestosPage() {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Presupuestos</h1>
        <Button>Nuevo Presupuesto</Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableCaption>Lista de presupuestos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {presupuestosData.map((presupuesto) => (
              <TableRow key={presupuesto.id}>
                <TableCell className="font-medium">{presupuesto.id}</TableCell>
                <TableCell>{presupuesto.cliente}</TableCell>
                <TableCell>{presupuesto.fecha}</TableCell>
                <TableCell className="text-right">${presupuesto.total.toFixed(2)}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    presupuesto.estado === "Aprobado" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                      : presupuesto.estado === "Rechazado"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}>
                    {presupuesto.estado}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm">Ver</Button>
                    <Button variant="outline" size="sm">Editar</Button>
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