'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { formatCurrency } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
  nombre: z.string().min(1, { message: 'El concepto es obligatorio' }),
  precio: z.coerce.number().min(0.01, { message: 'El precio debe ser mayor a 0' }),
  precioConIVA: z.boolean(),
  esFactura: z.boolean(),
  proveedorId: z.string().optional(),
  facturaId: z.string().optional(),
  partidaId: z.string().optional(),
  tipoEspecial: z.string().optional(),
  descripcion: z.string().optional(),
  documentoNombre: z.string().optional(),
  documentoFecha: z.string().optional(),
})

export default function NuevoGasto() {
  const router = useRouter()
  const [abierto, setAbierto] = useState(false)
  const [proveedores, setProveedores] = useState<{ id: string; nombre: string }[]>([])
  const [partidas, setPartidas] = useState<{ id: string; nombre: string }[]>([])
  const [facturas, setFacturas] = useState<any[]>([])
  const [cargando, setCargando] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: '',
      precio: 0,
      precioConIVA: true,
      esFactura: true,
      descripcion: '',
      proveedorId: undefined,
      facturaId: undefined,
      partidaId: undefined,
      tipoEspecial: 'gastos-generales',
      documentoNombre: '',
      documentoFecha: undefined,
    },
  })

  const handleOpenChange = async (open: boolean) => {
    setAbierto(open)
    
    if (open && proveedores.length === 0) {
      try {
        // Cargar datos desde API routes
        const [proveedoresResponse, partidasResponse, facturasResponse] = await Promise.all([
          fetch('/api/proveedores'),
          fetch('/api/partidas'),
          fetch('/api/facturas'),
        ])
        
        if (!proveedoresResponse.ok || !partidasResponse.ok || !facturasResponse.ok) {
          throw new Error('Error al cargar datos')
        }
        
        const proveedoresData = await proveedoresResponse.json()
        const partidasData = await partidasResponse.json()
        const facturasData = await facturasResponse.json()
        
        setProveedores(proveedoresData)
        setPartidas(partidasData)
        setFacturas(facturasData)
      } catch (error) {
        console.error('Error al cargar datos:', error)
        toast.error('Error al cargar datos')
      }
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setCargando(true)
    try {
      // Crear gasto usando API route
      const response = await fetch('/api/gastos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          documentoFecha: data.documentoFecha ? new Date(data.documentoFecha) : null,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Error al crear el gasto')
      }
      
      toast.success('Gasto creado correctamente')
      form.reset()
      setAbierto(false)
      router.refresh()
    } catch (error) {
      console.error('Error al crear gasto:', error)
      toast.error('Error al crear el gasto')
    } finally {
      setCargando(false)
    }
  }

  return (
    <Dialog open={abierto} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuevo Gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Añadir nuevo gasto</DialogTitle>
          <DialogDescription>
            Registra una factura de proveedor o gasto general
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
                      value={field.value} 
                      defaultValue={field.value}
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
                      value={field.value} 
                      defaultValue={field.value}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="precioConIVA"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm col-span-1 md:col-span-2">
                    <div className="space-y-0.5">
                      <FormLabel>¿El precio incluye IVA?</FormLabel>
                      <FormDescription>
                        Marca esta casilla si el importe introducido ya tiene el IVA incluido.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="esFactura"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm col-span-1 md:col-span-2">
                    <div className="space-y-0.5">
                      <FormLabel>¿Es una factura?</FormLabel>
                      <FormDescription>
                        Marca esta casilla si el gasto es una factura (IVA deducible).
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={cargando}
              >
                {cargando ? 'Guardando...' : 'Guardar gasto'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 