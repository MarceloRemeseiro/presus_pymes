'use client'

import { useState } from 'react'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { eliminarGasto } from '@/lib/acciones/gastos'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Gasto } from '@/lib/acciones/gastos'
import EditarGasto from './editar-gasto'

export default function GastosAcciones({ gasto }: { gasto: Gasto }) {
  const router = useRouter()
  const [dialogAbierto, setDialogAbierto] = useState(false)
  const [editarAbierto, setEditarAbierto] = useState(false)

  const handleEliminar = async () => {
    try {
      await eliminarGasto(gasto.id)
      toast.success('Gasto eliminado correctamente')
      router.refresh()
    } catch (error) {
      toast.error('No se pudo eliminar el gasto')
    } finally {
      setDialogAbierto(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditarAbierto(true)}>
            <Edit className="mr-2 h-4 w-4" />
            <span>Editar</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogAbierto(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Eliminar</span>
          </DropdownMenuItem>
          {gasto.factura && (
            gasto.factura.estado !== 'COBRADA' ? (
              <DropdownMenuItem>
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>Marcar como pagado</span>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <XCircle className="mr-2 h-4 w-4" />
                <span>Marcar como pendiente</span>
              </DropdownMenuItem>
            )
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente este gasto del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleEliminar} className="bg-red-500 hover:bg-red-600">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {editarAbierto && (
        <EditarGasto 
          gasto={gasto} 
          abierto={editarAbierto} 
          setAbierto={setEditarAbierto} 
        />
      )}
    </>
  )
} 