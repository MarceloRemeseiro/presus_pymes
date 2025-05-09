"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, X, Plus } from "lucide-react"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Esquema de validación con Zod
const personalSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
  telefono: z.string().optional().nullable(),
  email: z.string().email({ message: "Introduzca un email válido" }).optional().nullable(),
  ciudad: z.string().optional().nullable(),
  notas: z.string().optional().nullable(),
  puestos: z.array(z.string()).optional(),
  idiomas: z.array(z.string()).optional(),
})

type PersonalFormValues = z.infer<typeof personalSchema>

interface Puesto {
  id: string
  nombre: string
  descripcion?: string | null
}

interface Idioma {
  id: string
  nombre: string
}

interface PersonalFormProps {
  initialData?: {
    id: string
    nombre: string
    telefono?: string | null
    email?: string | null
    ciudad?: string | null
    notas?: string | null
    puestos: { id: string; nombre: string }[]
    idiomas?: { id: string; nombre: string }[]
  } | null
  onSubmit: (data: PersonalFormValues) => void
  isSubmitting?: boolean
}

export function PersonalForm({ initialData, onSubmit, isSubmitting = false }: PersonalFormProps) {
  const [puestos, setPuestos] = useState<Puesto[]>([])
  const [selectedPuestos, setSelectedPuestos] = useState<string[]>([])
  const [isLoadingPuestos, setIsLoadingPuestos] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPuestoToAdd, setSelectedPuestoToAdd] = useState<string>("")
  
  // Idiomas
  const [idiomas, setIdiomas] = useState<Idioma[]>([])
  const [selectedIdiomas, setSelectedIdiomas] = useState<string[]>([])
  const [isLoadingIdiomas, setIsLoadingIdiomas] = useState(false)
  const [idiomaDialogOpen, setIdiomaDialogOpen] = useState(false)
  const [selectedIdiomaToAdd, setSelectedIdiomaToAdd] = useState<string>("")

  // Inicializar el formulario con react-hook-form y zod
  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      telefono: initialData?.telefono || "",
      email: initialData?.email || "",
      ciudad: initialData?.ciudad || "",
      notas: initialData?.notas || "",
      puestos: initialData?.puestos.map(p => p.id) || [],
      idiomas: initialData?.idiomas?.map(i => i.id) || [],
    }
  })

  // Cargar puestos disponibles
  useEffect(() => {
    const fetchPuestos = async () => {
      setIsLoadingPuestos(true)
      try {
        const response = await fetch("/api/puestos")
        if (!response.ok) {
          throw new Error("Error al cargar puestos")
        }
        const data = await response.json()
        setPuestos(data)
        
        // Si hay datos iniciales, establecer los puestos seleccionados
        if (initialData?.puestos) {
          setSelectedPuestos(initialData.puestos.map(p => p.id))
        }
      } catch (error) {
        console.error("Error:", error)
        toast.error("Error al cargar puestos")
      } finally {
        setIsLoadingPuestos(false)
      }
    }

    fetchPuestos()
  }, [initialData])

  // Cargar idiomas disponibles
  useEffect(() => {
    const fetchIdiomas = async () => {
      setIsLoadingIdiomas(true)
      try {
        const response = await fetch("/api/idiomas")
        if (!response.ok) {
          throw new Error("Error al cargar idiomas")
        }
        const data = await response.json()
        setIdiomas(data)
        
        // Si hay datos iniciales, establecer los idiomas seleccionados
        if (initialData?.idiomas) {
          setSelectedIdiomas(initialData.idiomas.map(i => i.id))
        }
      } catch (error) {
        console.error("Error:", error)
        toast.error("Error al cargar idiomas")
      } finally {
        setIsLoadingIdiomas(false)
      }
    }

    fetchIdiomas()
  }, [initialData])

  // Eliminar un puesto
  const handleRemovePuesto = (puestoId: string) => {
    setSelectedPuestos(prev => prev.filter(id => id !== puestoId))
  }

  // Agregar un puesto existente
  const handleAddPuesto = () => {
    if (selectedPuestoToAdd && !selectedPuestos.includes(selectedPuestoToAdd)) {
      setSelectedPuestos(prev => [...prev, selectedPuestoToAdd])
      setSelectedPuestoToAdd("")
      setDialogOpen(false)
    }
  }

  // Eliminar un idioma
  const handleRemoveIdioma = (idiomaId: string) => {
    setSelectedIdiomas(prev => prev.filter(id => id !== idiomaId))
  }

  // Agregar un idioma existente
  const handleAddIdioma = () => {
    if (selectedIdiomaToAdd && !selectedIdiomas.includes(selectedIdiomaToAdd)) {
      setSelectedIdiomas(prev => [...prev, selectedIdiomaToAdd])
      setSelectedIdiomaToAdd("")
      setIdiomaDialogOpen(false)
    }
  }

  // Manejar el envío del formulario
  const handleSubmit = (values: PersonalFormValues) => {
    // Asegurarse de que los puestos e idiomas seleccionados estén en los valores del formulario
    values.puestos = selectedPuestos
    values.idiomas = selectedIdiomas
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Nombre del personal */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nombre del personal" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Teléfono */}
        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Teléfono de contacto" value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Email de contacto" value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ciudad - Nuevo campo */}
        <FormField
          control={form.control}
          name="ciudad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ciudad donde reside" value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Puestos */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Puestos de trabajo</Label>
            <div className="flex gap-2">
              {/* Agregar nuevo puesto (diálogo) */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar puesto
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar puesto</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Select
                      value={selectedPuestoToAdd}
                      onValueChange={setSelectedPuestoToAdd}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar puesto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Puestos disponibles</SelectLabel>
                          {puestos
                            .filter(puesto => !selectedPuestos.includes(puesto.id))
                            .map(puesto => (
                              <SelectItem key={puesto.id} value={puesto.id}>
                                {puesto.nombre}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        type="button"
                        onClick={handleAddPuesto}
                        disabled={!selectedPuestoToAdd}
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Crear nuevo puesto */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const nombrePuesto = prompt("Nombre del nuevo puesto:");
                  if (nombrePuesto?.trim()) {
                    fetch("/api/puestos", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ nombre: nombrePuesto }),
                    })
                      .then((response) => {
                        if (!response.ok) {
                          throw new Error("Error al crear puesto");
                        }
                        return response.json();
                      })
                      .then((data) => {
                        setPuestos((prev) => [...prev, data]);
                        setSelectedPuestos((prev) => [...prev, data.id]);
                        toast.success("Puesto creado correctamente");
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        toast.error("Error al crear puesto");
                      });
                  }
                }}
              >
                Crear nuevo puesto
              </Button>
            </div>
          </div>
          
          {isLoadingPuestos ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span>Cargando puestos...</span>
            </div>
          ) : (
            <div className="border rounded-md p-4 min-h-[100px]">
              {selectedPuestos.length === 0 ? (
                <div className="text-sm text-muted-foreground py-2 text-center">
                  No hay puestos asignados
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedPuestos.map((puestoId) => {
                    const puesto = puestos.find(p => p.id === puestoId);
                    return puesto ? (
                      <Badge key={puestoId} variant="secondary" className="flex items-center gap-1 py-1 px-2">
                        {puesto.nombre}
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleRemovePuesto(puestoId)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Idiomas - Nuevo campo */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Idiomas</Label>
            <div className="flex gap-2">
              {/* Agregar nuevo idioma (diálogo) */}
              <Dialog open={idiomaDialogOpen} onOpenChange={setIdiomaDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar idioma
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar idioma</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <Select
                      value={selectedIdiomaToAdd}
                      onValueChange={setSelectedIdiomaToAdd}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Idiomas disponibles</SelectLabel>
                          {idiomas
                            .filter(idioma => !selectedIdiomas.includes(idioma.id))
                            .map(idioma => (
                              <SelectItem key={idioma.id} value={idioma.id}>
                                {idioma.nombre}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div className="mt-4 flex justify-end">
                      <Button 
                        type="button"
                        onClick={handleAddIdioma}
                        disabled={!selectedIdiomaToAdd}
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Crear nuevo idioma */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const nombreIdioma = prompt("Nombre del nuevo idioma:");
                  if (nombreIdioma?.trim()) {
                    fetch("/api/idiomas", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ nombre: nombreIdioma }),
                    })
                      .then((response) => {
                        if (!response.ok) {
                          throw new Error("Error al crear idioma");
                        }
                        return response.json();
                      })
                      .then((data) => {
                        setIdiomas((prev) => [...prev, data]);
                        setSelectedIdiomas((prev) => [...prev, data.id]);
                        toast.success("Idioma creado correctamente");
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        toast.error("Error al crear idioma");
                      });
                  }
                }}
              >
                Crear nuevo idioma
              </Button>
            </div>
          </div>
          
          {isLoadingIdiomas ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span>Cargando idiomas...</span>
            </div>
          ) : (
            <div className="border rounded-md p-4 min-h-[100px]">
              {selectedIdiomas.length === 0 ? (
                <div className="text-sm text-muted-foreground py-2 text-center">
                  No hay idiomas asignados
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedIdiomas.map((idiomaId) => {
                    const idioma = idiomas.find(i => i.id === idiomaId);
                    return idioma ? (
                      <Badge key={idiomaId} variant="secondary" className="flex items-center gap-1 py-1 px-2">
                        {idioma.nombre}
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleRemoveIdioma(idiomaId)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Notas */}
        <FormField
          control={form.control}
          name="notas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Notas o información adicional" 
                  value={field.value || ""}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón de enviar */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Actualizar personal" : "Crear personal"}
        </Button>
      </form>
    </Form>
  )
} 