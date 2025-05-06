'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { actualizarGasto, obtenerProveedores, obtenerPartidas, obtenerGasto, Gasto } from '@/lib/acciones/gastos'
import { formatCurrency } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  nombre: z.string().min(1, { message: 'El concepto es obligatorio' }),
  precio: z.coerce.number().min(0.01, { message: 'El precio debe ser mayor a 0' }),
  precioConIVA: z.boolean().default(true),
  proveedorId: z.string().optional(),
  facturaId: z.string().optional(),
  partidaId: z.string().optional(),
  tipoEspecial: z.string().optional(),
  descripcion: z.string().optional(),
  documentoNombre: z.string().optional(),
  documentoFecha: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface EditarGastoProps {
  gasto: Gasto
  abierto: boolean
  setAbierto: (abierto: boolean) => void
}

export default function EditarGasto({ gasto, abierto, setAbierto }: EditarGastoProps) {
  const router = useRouter()
  const [proveedores, setProveedores] = useState<{ id: string; nombre: string }[]>([])
  const [partidas, setPartidas] = useState<{ id: string; nombre: string }[]>([])
  const [cargando, setCargando] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: gasto.nombre,
      precio: gasto.precio,
      precioConIVA: true,
      proveedorId: gasto.proveedor?.id,
      partidaId: gasto.partida?.id,
      tipoEspecial: gasto.tipoEspecial || '',
      descripcion: '',
      documentoNombre: gasto.documentoNombre || '',
      documentoFecha: gasto.documentoFecha 
        ? new Date(gasto.documentoFecha).toISOString().split('T')[0]
        : undefined,
    },
  })

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [proveedoresData, partidasData] = await Promise.all([
          obtenerProveedores(),
          obtenerPartidas(),
        ])
        
        setProveedores(proveedoresData)
        setPartidas(partidasData)
      } catch (error) {
        console.error('Error al cargar datos:', error)
        toast.error('Error al cargar datos')
      }
    }

    if (abierto) {
      cargarDatos()
    }
  }, [abierto])

  const onSubmit = async (data: FormValues) => {
    setCargando(true)
    try {
      await actualizarGasto(gasto.id, {
        ...data,
        documentoFecha: data.documentoFecha ? new Date(data.documentoFecha) : null,
      })
      toast.success('Gasto actualizado correctamente')
      setAbierto(false)
      router.refresh()
    } catch (error) {
      console.error('Error al actualizar gasto:', error)
      toast.error('Error al actualizar el gasto')
    } finally {
      setCargando(false)
    }
  }

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar gasto</DialogTitle>
          <DialogDescription>
            Modifica los detalles del gasto
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Concepto*</FormLabel>
                    <FormControl>
                      <Input placeholder="Concepto del gasto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="precio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importe*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {field.value ? formatCurrency(field.value) : ''}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="proveedorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proveedor</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || ''} 
                      defaultValue={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar proveedor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {proveedores.map((proveedor) => (
                          <SelectItem key={proveedor.id} value={proveedor.id}>
                            {proveedor.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="partidaId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proyecto</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || ''} 
                      defaultValue={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar proyecto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="gastos-generales">Gastos generales</SelectItem>
                        {partidas.map((partida) => (
                          <SelectItem key={partida.id} value={partida.id}>
                            {partida.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="documentoNombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de factura</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: FAC-2023-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="documentoFecha"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de factura</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detalles adicionales del gasto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={cargando}
              >
                {cargando ? 'Guardando...' : 'Actualizar gasto'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 