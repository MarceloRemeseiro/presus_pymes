"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormEvent, ReactNode, useState, useEffect, useRef } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, FileText, X, FileDown } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { useProveedores } from "@/hooks/use-proveedores"
import { Partida } from "@/hooks/use-partidas"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

// Proveedores especiales fijos
const PROVEEDORES_ESPECIALES = [
  { id: "gastos-generales", nombre: "GASTOS GENERALES" },
  { id: "freelance", nombre: "FREELANCE" },
  { id: "dietas", nombre: "DIETAS" }
];

// Partidas especiales que se deben crear o buscar
const PARTIDA_GASTOS_GENERALES = "GASTOS GENERALES";
const PARTIDA_PERSONAL = "PERSONAL";

export interface GastoDialogProps {
  trigger: ReactNode
  gastoId?: string
  proveedorIdInicial?: string
  partidaIdInicial?: string
  montoInicial?: number
  nombreInicial?: string
  precioConIVAInicial?: boolean
  descripcionInicial?: string
  documentoNombreInicial?: string
  documentoFechaInicial?: string
  facturaIdInicial?: string
  tipoEspecialInicial?: string
  archivoUrlInicial?: string
  onSuccess?: () => void
}

export function GastoDialog({
  trigger,
  gastoId,
  proveedorIdInicial,
  partidaIdInicial,
  montoInicial = 0,
  nombreInicial = "",
  precioConIVAInicial = true,
  descripcionInicial = "",
  documentoNombreInicial = "",
  documentoFechaInicial = "",
  facturaIdInicial,
  tipoEspecialInicial = "",
  archivoUrlInicial = "",
  onSuccess
}: GastoDialogProps) {
  const { proveedores, loading: loadingProveedores } = useProveedores()
  const [partidas, setPartidas] = useState<Partida[]>([])
  const [loadingPartidas, setLoadingPartidas] = useState(true)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  
  // Campos del formulario
  const [proveedorId, setProveedorId] = useState(proveedorIdInicial || "")
  const [partidaId, setPartidaId] = useState(partidaIdInicial || "sin-partida")
  const [monto, setMonto] = useState(montoInicial)
  const [nombre, setNombre] = useState(nombreInicial)
  const [descripcion, setDescripcion] = useState(descripcionInicial)
  const [precioConIVA, setPrecioConIVA] = useState(precioConIVAInicial)
  const [tipoEspecial, setTipoEspecial] = useState(tipoEspecialInicial)
  
  // Campos para el documento
  const [archivoUrl, setArchivoUrl] = useState(archivoUrlInicial)
  const [documentoNombre, setDocumentoNombre] = useState(documentoNombreInicial)
  const [documentoFecha, setDocumentoFecha] = useState(documentoFechaInicial || format(new Date(), "yyyy-MM-dd"))
  const [fileName, setFileName] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Partida especial para gastos generales
  const [partidaGastosGeneralesId, setPartidaGastosGeneralesId] = useState<string | null>(null)
  // Partida especial para personal
  const [partidaPersonalId, setPartidaPersonalId] = useState<string | null>(null)

  const modoEdicion = !!gastoId

  const router = useRouter()

  // Resetear valores cuando se abre el diálogo (solo en modo creación)
  useEffect(() => {
    if (open && !modoEdicion) {
      // Resetear a valores iniciales o vacíos
      setProveedorId(proveedorIdInicial || "")
      setPartidaId(partidaIdInicial || "sin-partida")
      setMonto(montoInicial)
      setNombre(nombreInicial)
      setDescripcion(descripcionInicial)
      setPrecioConIVA(precioConIVAInicial)
      setTipoEspecial(tipoEspecialInicial)
      setArchivoUrl("")
      setFileName("")
      setDocumentoNombre("")
      setDocumentoFecha(format(new Date(), "yyyy-MM-dd"))
      
      // También limpiar el input de archivo si existe
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } else if (open && modoEdicion && archivoUrlInicial) {
      // En modo edición, asegurar que se muestra la vista previa si hay archivo
      setArchivoUrl(archivoUrlInicial)
      // Extraer nombre de archivo de la URL
      const fileNameFromUrl = archivoUrlInicial.split('/').pop() || documentoNombreInicial || "";
      setFileName(fileNameFromUrl)
    }
  }, [open, modoEdicion, proveedorIdInicial, partidaIdInicial, montoInicial, nombreInicial, descripcionInicial, precioConIVAInicial, tipoEspecialInicial, archivoUrlInicial, documentoNombreInicial])

  // Cargar partidas cuando se abre el diálogo
  useEffect(() => {
    if (!open) return

    const fetchPartidas = async () => {
      setLoadingPartidas(true)
      try {
        const response = await fetch('/api/partidas')
        if (!response.ok) {
          throw new Error('Error al cargar partidas')
        }
        const data = await response.json()
        setPartidas(data)
        
        // Buscar las partidas especiales
        const gastosGeneralesPartida = data.find((p: Partida) => 
          p.nombre.toUpperCase() === PARTIDA_GASTOS_GENERALES
        );
        if (gastosGeneralesPartida) {
          setPartidaGastosGeneralesId(gastosGeneralesPartida.id);
        }
        
        const personalPartida = data.find((p: Partida) => 
          p.nombre.toUpperCase() === PARTIDA_PERSONAL
        );
        if (personalPartida) {
          setPartidaPersonalId(personalPartida.id);
        }
      } catch (err) {
        console.error('Error:', err)
        toast.error('Error al cargar partidas')
      } finally {
        setLoadingPartidas(false)
      }
    }

    fetchPartidas()
  }, [open])

  // Cargar datos del gasto si estamos en modo edición
  useEffect(() => {
    if (!gastoId || !open) return

    const fetchGasto = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/gastos/${gastoId}`)
        if (!response.ok) {
          throw new Error('Error al cargar datos del gasto')
        }
        const data = await response.json()
        
        // Si tiene tipoEspecial, usamos ese valor como proveedorId
        if (data.tipoEspecial) {
          setProveedorId(data.tipoEspecial)
        } else {
          setProveedorId(data.proveedorId || "")
        }
        
        setMonto(data.precio || 0)
        setNombre(data.nombre || "")
        setDescripcion(data.descripcion || "")
        setPrecioConIVA(data.precioConIVA || false)
        setTipoEspecial(data.tipoEspecial || "")
        
        // Campos del documento
        setArchivoUrl(data.archivoUrl || "")
        setDocumentoNombre(data.documentoNombre || "")
        setDocumentoFecha(data.documentoFecha ? format(new Date(data.documentoFecha), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"))
        
        // Extraer y establecer nombre de archivo si existe un archivoUrl
        if (data.archivoUrl) {
          // Extraer el nombre del archivo de la URL
          const fileNameFromUrl = data.archivoUrl.split('/').pop() || data.documentoNombre || ""
          setFileName(fileNameFromUrl)
          console.log("Inicializando archivo:", fileNameFromUrl, data.archivoUrl)
        }
        
        // Intentar establecer la partida si existe
        if (data.partidaId) {
          setPartidaId(data.partidaId)
        } else {
          // Resetear a sin-partida si no hay partidaId
          setPartidaId("sin-partida")
        }
      } catch (err) {
        console.error('Error:', err)
        toast.error('Error al cargar los datos del gasto')
      } finally {
        setLoading(false)
      }
    }

    fetchGasto()
  }, [gastoId, open])

  // Actualizar la partida cuando cambia el proveedor
  useEffect(() => {
    if (proveedorId === "gastos-generales") {
      // Para gastos generales, usamos la partida de gastos generales si existe
      if (partidaGastosGeneralesId) {
        setPartidaId(partidaGastosGeneralesId);
      } else {
        // Si no existe, dejamos 'sin-partida' y crearemos la partida al guardar
        setPartidaId("crear-gastos-generales");
      }
    } else if (proveedorId === "freelance" && partidaPersonalId) {
      // Para freelance, preseleccionamos la partida de personal si existe
      setPartidaId(partidaPersonalId);
    }
    // Para dietas, no preseleccionamos partida específica - el usuario puede elegir cualquiera
  }, [proveedorId, partidaGastosGeneralesId, partidaPersonalId]);

  // Función para crear una partida si no existe
  const crearPartidaSiNoExiste = async (nombrePartida: string): Promise<string | null> => {
    try {
      // Primero, intentamos buscar la partida en todas las partidas disponibles
      const response = await fetch('/api/partidas')
      if (!response.ok) {
        throw new Error('Error al cargar partidas')
      }
      
      const todasPartidas = await response.json()
      const partidaExistente = todasPartidas.find((p: Partida) => 
        p.nombre.toUpperCase() === nombrePartida.toUpperCase()
      )
      
      if (partidaExistente) {
        return partidaExistente.id
      }
      
      // Si no existe, creamos la partida
      const createResponse = await fetch('/api/partidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombrePartida,
          descripcion: `Partida para ${nombrePartida}`,
        }),
      })
      
      if (!createResponse.ok) {
        throw new Error('Error al crear la partida')
      }
      
      const nuevaPartida = await createResponse.json()
      return nuevaPartida.id
    } catch (err) {
      console.error('Error:', err)
      toast.error('Error al crear la partida')
      return null
    }
  }

  // Manejar la subida de archivos
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setUploadingFile(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Error al subir el archivo')
      }

      const data = await response.json()
      console.log("Respuesta de subida:", data); // Log para depuración
      
      // Usar fileUrl como en factura-proveedor-dialog
      setArchivoUrl(data.fileUrl || data.url)
      
      // Usar el nombre original que ahora nos devuelve la API
      if (data.originalName) {
        setFileName(data.originalName)
      }
      
      // Si no hay nombre de documento, usar el nombre del archivo
      if (!documentoNombre) {
        const nombreSinExtension = file.name.split('.').slice(0, -1).join('.')
        setDocumentoNombre(nombreSinExtension)
      }
      
      toast.success('Archivo subido correctamente')
    } catch (error) {
      console.error('Error al subir archivo:', error)
      toast.error('Error al subir el archivo')
      // Limpiar en caso de error
      setFileName("")
      setArchivoUrl("")
    } finally {
      setUploadingFile(false)
    }
  }

  // Eliminar archivo
  const handleRemoveFile = async () => {
    if (archivoUrl) {
      try {
        console.log("Intentando eliminar archivo:", archivoUrl);
        
        // Eliminar el archivo del servidor
        const response = await fetch('/api/upload', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ filePath: archivoUrl }),
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Error al eliminar archivo del servidor:', error);
          toast.error('Error al eliminar el archivo del servidor, pero continuamos con la operación');
          // Continuamos con el proceso incluso si falla la eliminación del servidor
        } else {
          console.log("Archivo eliminado correctamente del servidor");
        }
      } catch (error) {
        console.error('Error en la solicitud para eliminar archivo:', error);
        toast.error('Error al intentar eliminar el archivo, pero continuamos con la operación');
        // No bloqueamos el proceso si falla la eliminación
      }
    }

    // Limpiar el estado local (siempre hacemos esto, incluso si falló la eliminación del servidor)
    setArchivoUrl('');
    setFileName('');
    setDocumentoNombre('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast.success('Archivo eliminado de este gasto');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Validaciones previas
    if (!nombre.trim()) {
      toast.error("Debes ingresar un concepto para el gasto")
      return
    }
    
    // Validación de proveedor - mostrar mensaje claro
    if (!proveedorId) {
      toast.error("Debes seleccionar un proveedor")
      return
    }
    
    if (monto <= 0) {
      toast.error("El monto debe ser mayor a 0")
      return
    }
    
    setLoading(true)
    
    try {
      // Verificar si necesitamos crear una partida especial
      let partidaIdFinal = partidaId
      
      if (partidaId === "crear-gastos-generales") {
        const nuevaPartidaId = await crearPartidaSiNoExiste(PARTIDA_GASTOS_GENERALES)
        if (nuevaPartidaId) {
          partidaIdFinal = nuevaPartidaId
          setPartidaGastosGeneralesId(nuevaPartidaId)
        } else {
          partidaIdFinal = "sin-partida"
        }
      }
      
      // Datos a enviar al endpoint
      const gastoData = {
        facturaId: facturaIdInicial,
        proveedorId: (proveedorId === "gastos-generales" || proveedorId === "freelance" || proveedorId === "dietas") ? null : proveedorId,
        partidaId: partidaIdFinal === "sin-partida" ? null : partidaIdFinal,
        precio: monto,
        nombre,
        precioConIVA,
        descripcion: descripcion || null,
        // Agregar bandera para proveedores especiales
        tipoEspecial: (proveedorId === "gastos-generales" || proveedorId === "freelance" || proveedorId === "dietas") ? proveedorId : tipoEspecial,
        // Campos del documento
        archivoUrl: archivoUrl || null,
        documentoNombre: documentoNombre || null,
        documentoFecha: documentoFecha || null
      }
      
      console.log("Enviando datos de gasto:", gastoData) // Log para depuración
      
      let response
      
      if (modoEdicion) {
        // Actualizar gasto existente
        response = await fetch(`/api/gastos/${gastoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gastoData),
        })
      } else {
        // Crear nuevo gasto
        response = await fetch('/api/gastos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gastoData),
        })
      }
      
      if (!response.ok) {
        throw new Error(`Error al ${modoEdicion ? 'actualizar' : 'crear'} el gasto`)
      }
      
      toast.success(`Gasto ${modoEdicion ? 'actualizado' : 'creado'} correctamente`)
      setOpen(false)
      
      // Llamar al callback de éxito si existe
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error(`Error al ${modoEdicion ? 'actualizar' : 'crear'} gasto:`, error)
      toast.error(`Error al ${modoEdicion ? 'actualizar' : 'crear'} el gasto`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!gastoId) return
    
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este gasto?')
    if (!confirmDelete) return
    
    setLoading(true)
    
    try {
      const response = await fetch(`/api/gastos/${gastoId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Error al eliminar el gasto')
      }
      
      toast.success('Gasto eliminado correctamente')
      
      // Primero cerramos el diálogo 
      setOpen(false)
      
      // Usamos setTimeout para asegurar que el diálogo se cierre antes de redirigir
      setTimeout(() => {
        // Redirigir a la página de gastos después de eliminar
        router.push('/gastos')
        
        // Llamar al callback de éxito si existe
        if (onSuccess) {
          onSuccess()
        }
      }, 100)
    } catch (error) {
      console.error('Error al eliminar gasto:', error)
      toast.error('Error al eliminar el gasto')
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{modoEdicion ? 'Editar gasto' : 'Añadir nuevo gasto'}</DialogTitle>
          <DialogDescription>
            {modoEdicion ? 'Modifica los detalles del gasto' : 'Registra un nuevo gasto o factura de proveedor'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Fecha */}
            <div className="grid gap-2">
              <Label htmlFor="documentoFecha">Fecha*</Label>
              <Input
                id="documentoFecha"
                type="date"
                value={documentoFecha}
                onChange={(e) => setDocumentoFecha(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {/* Proveedor */}
            <div className="grid gap-2">
              <Label htmlFor="proveedorId">
                Proveedor<span className="text-red-500">*</span>
              </Label>
              <Select 
                value={proveedorId} 
                onValueChange={setProveedorId} 
                disabled={loading || loadingProveedores}
                required
              >
                <SelectTrigger id="proveedorId" className={proveedorId ? "" : "border-red-200 focus:ring-red-500"}>
                  <SelectValue placeholder="Seleccionar proveedor (obligatorio)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gastos-generales" className="font-semibold">GASTOS GENERALES</SelectItem>
                  <SelectItem value="freelance" className="font-semibold">FREELANCE</SelectItem>
                  <SelectItem value="dietas" className="font-semibold">DIETAS</SelectItem>
                  <div className="h-px bg-gray-200 my-2"></div>
                  {loadingProveedores ? (
                    <div className="flex items-center justify-center py-2">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Cargando...
                    </div>
                  ) : (
                    proveedores.map((proveedor) => (
                      <SelectItem key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            {/* Partida */}
            <div className="grid gap-2">
              <Label htmlFor="partidaId">Partida {proveedorId === "freelance" ? "(preseleccionada PERSONAL)" : "(opcional)"}</Label>
              <Select value={partidaId} onValueChange={setPartidaId} disabled={loading || loadingPartidas}>
                <SelectTrigger id="partidaId">
                  <SelectValue placeholder="Seleccionar proyecto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sin-partida">Sin proyecto</SelectItem>
                  {loadingPartidas ? (
                    <div className="flex items-center justify-center py-2">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Cargando...
                    </div>
                  ) : (
                    partidas.map((partida) => (
                      <SelectItem key={partida.id} value={partida.id}>
                        {partida.nombre}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            {/* Concepto */}
            <div className="grid gap-2">
              <Label htmlFor="nombre">Concepto*</Label>
              <Input
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Concepto del gasto"
                required
                disabled={loading}
              />
            </div>
            {/* Monto */}
            <div className="grid gap-2">
              <Label htmlFor="monto">Monto (€)*</Label>
              <Input
                id="monto"
                type="number"
                step="0.01"
                min="0"
                value={monto}
                onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
                disabled={loading}
              />
            </div>
            {/* Checkbox IVA */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="precioConIVA"
                checked={precioConIVA}
                onCheckedChange={(checked) => setPrecioConIVA(checked === true)}
                disabled={loading}
              />
              <Label htmlFor="precioConIVA" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                El precio incluye IVA
              </Label>
            </div>
            {/* Notas */}
            <div className="grid gap-2">
              <Label htmlFor="descripcion">Notas (opcional)</Label>
              <Textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Añade notas adicionales sobre esta factura"
                rows={3}
                disabled={loading}
              />
            </div>
            {/* Documento adjunto */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="font-semibold mb-4">Documento adjunto</h3>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="documento" className="mb-2 block">Archivo PDF</Label>
                  {archivoUrl ? (
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm truncate max-w-[200px]">{fileName}</span>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={archivoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                        >
                          <FileText className="h-4 w-4 mr-1 inline" />
                          Ver
                        </a>
                        <a
                          href={archivoUrl}
                          download={documentoNombre || fileName}
                          className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100"
                        >
                          <FileDown className="h-4 w-4 mr-1 inline" />
                          Descargar
                        </a>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-500"
                          onClick={handleRemoveFile}
                          disabled={loading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <Input
                        id="documento"
                        type="file"
                        accept=".pdf"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        disabled={loading || uploadingFile}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading || uploadingFile}
                        className="w-full"
                      >
                        {uploadingFile ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Subiendo...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Seleccionar archivo
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Solo se permiten archivos PDF.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <div>
              {modoEdicion && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Eliminando...
                    </>
                  ) : (
                    "Eliminar"
                  )}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={loading || uploadingFile}
                onClick={(e) => {
                  if (!proveedorId) {
                    e.preventDefault();
                    toast.error("Debes seleccionar un proveedor");
                    document.getElementById("proveedorId")?.focus();
                  }
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {modoEdicion ? "Actualizando..." : "Guardando..."}
                  </>
                ) : (
                  modoEdicion ? "Actualizar" : "Guardar"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 