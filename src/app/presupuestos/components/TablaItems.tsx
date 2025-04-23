import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Definimos la interfaz Item directamente aquí
interface Item {
  id: string;
  tipo: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  dias?: number;
  productoId?: string;
  partidaId?: string;
}

interface TablaItemsProps {
  items: Item[];
  isLoading?: boolean;
}

export const TablaItems = ({ items, isLoading = false }: TablaItemsProps) => {
  if (isLoading) {
    return <div className="flex justify-center py-4"><Loader2 className="h-6 w-6 animate-spin" /></div>;
  }

  if (items.length === 0) {
    return <p className="text-center py-4">No hay elementos en este presupuesto</p>;
  }

  const mapTipoText = (tipo: string) => {
    switch (tipo) {
      case 'CATEGORIA':
        return 'Categoría';
      case 'EQUIPO':
        return 'Equipo';
      case 'PERSONAL':
        return 'Personal';
      case 'SEPARADOR':
        return 'Separador';
      default:
        return tipo;
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producto/Elemento</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Días</TableHead>
            <TableHead>Precio Unit.</TableHead>
            <TableHead>Descuento</TableHead>
            <TableHead>Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            // Calcular el subtotal considerando días
            const subtotal = item.cantidad * item.precioUnitario * (item.dias || 1) * (1 - item.descuento / 100);
            
            // Renderizar categoría con estilo especial
            if (item.tipo === 'CATEGORIA') {
              return (
                <TableRow key={item.id} className="bg-muted/30">
                  <TableCell colSpan={6} className="py-2">
                    <div className="font-semibold">{item.nombre}</div>
                  </TableCell>
                </TableRow>
              );
            }
            
            // Renderizar separador igual que la categoría pero con texto centrado
            if (item.tipo === 'SEPARADOR') {
              return (
                <TableRow key={item.id} className="bg-muted/30">
                  <TableCell colSpan={6} className="py-2 text-center">
                    <div className="text-sm">{item.nombre}</div>
                  </TableCell>
                </TableRow>
              );
            }
            
            // Renderizar elementos normales
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.nombre}</TableCell>
                <TableCell>{item.cantidad}</TableCell>
                <TableCell>{item.dias || 1}</TableCell>
                <TableCell>{`${item.precioUnitario.toFixed(2)} €`}</TableCell>
                <TableCell>{`${item.descuento}%`}</TableCell>
                <TableCell className="font-medium">{`${subtotal.toFixed(2)} €`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}; 