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
import { useProveedores } from "@/hooks/use-proveedores"
import { Partida } from "@/hooks/use-partidas"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"

// Proveedores especiales fijos
const PROVEEDORES_ESPECIALES = [
  { id: "gastos-generales", nombre: "GASTOS GENERALES" },
  { id: "freelance", nombre: "FREELANCE" },
  { id: "dietas", nombre: "DIETAS" }
];

// Partidas especiales que se deben crear o buscar
const PARTIDA_GASTOS_GENERALES = "GASTOS GENERALES";
const PARTIDA_PERSONAL = "PERSONAL";

export interface FacturaProveedorDialogProps {
  trigger: ReactNode
  facturaId: string
  facturaProveedorId?: string
  proveedorIdInicial?: string
  partidaIdInicial?: string
  montoInicial?: number
  notasIniciales?: string
  archivoUrlInicial?: string
  documentoNombreInicial?: string
  documentoFechaInicial?: string
  onSuccess?: () => void
}

export function FacturaProveedorDialog({
  trigger,
  facturaId,
  facturaProveedorId,
  proveedorIdInicial,
  partidaIdInicial,
  montoInicial = 0,
  notasIniciales = "",
  archivoUrlInicial = "",
  documentoNombreInicial = "",
  documentoFechaInicial = "",
  onSuccess
}: FacturaProveedorDialogProps) {
  const { proveedores, loading: loadingProveedores } = useProveedores()
  const [partidasFactura, setPartidasFactura] = useState<Partida[]>([])
  const [loadingPartidas, setLoadingPartidas] = useState(true)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [proveedorId, setProveedorId] = useState(proveedorIdInicial || "")
  const [partidaId, setPartidaId] = useState(partidaIdInicial || "sin-partida")
  const [monto, setMonto] = useState(montoInicial)
  const [notas, setNotas] = useState(notasIniciales)
  const [precioConIVA, setPrecioConIVA] = useState(false)
  
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

  const modoEdicion = !!facturaProveedorId

  // Resetear valores cuando se abre el diálogo (solo en modo creación)
  useEffect(() => {
    if (open && !modoEdicion) {
      // Resetear a valores iniciales o vacíos
      setProveedorId(proveedorIdInicial || "");
      setPartidaId(partidaIdInicial || "sin-partida");
      setMonto(montoInicial);
      setNotas(notasIniciales);
      setPrecioConIVA(false);
      setArchivoUrl("");
      setFileName("");
      setDocumentoNombre("");
      setDocumentoFecha(format(new Date(), "yyyy-MM-dd"));
      
      // También limpiar el input de archivo si existe
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [open, modoEdicion, proveedorIdInicial, partidaIdInicial, montoInicial, notasIniciales]);

  // Cargar las partidas utilizadas en esta factura específica
  useEffect(() => {
    if (!facturaId || !open) return

    const fetchPartidasFactura = async () => {
      setLoadingPartidas(true)
      try {
        const response = await fetch(`/api/facturas/${facturaId}/partidas`)
        if (!response.ok) {
          throw new Error('Error al cargar partidas de la factura')
        }
        const data = await response.json()
        setPartidasFactura(data)
        
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
        toast.error('Error al cargar las partidas de la factura')
      } finally {
        setLoadingPartidas(false)
      }
    }

    fetchPartidasFactura()
  }, [facturaId, open])

  // Cargar datos de factura proveedor si estamos en modo edición
  useEffect(() => {
    if (!facturaProveedorId || !open) return

    const fetchFacturaProveedor = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/facturas/proveedores/${facturaProveedorId}`)
        if (!response.ok) {
          throw new Error('Error al cargar datos de la factura de proveedor')
        }
        const data = await response.json()
        console.log("Datos cargados:", data)
        
        // Si tiene tipoEspecial, usamos ese valor como proveedorId
        if (data.tipoEspecial) {
          setProveedorId(data.tipoEspecial)
        } else {
          setProveedorId(data.proveedorId || "")
        }
        
        setMonto(data.precio || 0)
        setNotas(data.descripcion || "")
        setPrecioConIVA(data.precioConIVA || false)
        
        // Campos del documento
        setArchivoUrl(data.archivoUrl || "")
        setDocumentoNombre(data.documentoNombre || "")
        setDocumentoFecha(data.documentoFecha ? format(new Date(data.documentoFecha), "yyyy-MM-dd") : "")
        
        if (data.archivoUrl) {
          // Extraer el nombre del archivo de la URL
          const fileNameFromUrl = data.archivoUrl.split('/').pop() || "";
          setFileName(fileNameFromUrl);
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
        toast.error('Error al cargar los datos de la factura de proveedor')
      } finally {
        setLoading(false)
      }
    }

    fetchFacturaProveedor()
  }, [facturaProveedorId, open])

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
        throw new Error('Error al crear partida')
      }
      
      const nuevaPartida = await createResponse.json()
      return nuevaPartida.id
    } catch (error) {
      console.error('Error al crear partida:', error)
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
      setArchivoUrl(data.fileUrl)
      
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
    } finally {
      setUploadingFile(false)
    }
  }

  // Eliminar archivo
  const handleRemoveFile = async () => {
    if (archivoUrl) {
      try {
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
          console.error('Error al eliminar archivo:', error);
          // Continuamos con el proceso incluso si falla la eliminación del servidor
        }
      } catch (error) {
        console.error('Error al eliminar archivo:', error);
        // No bloqueamos el proceso si falla la eliminación
      }
    }

    // Limpiar el estado local
    setArchivoUrl('');
    setFileName('');
    setDocumentoNombre('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
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
      // Manejar la creación de partidas especiales si es necesario
      let partidaFinalId = partidaId
      
      if (proveedorId === "gastos-generales") {
        // Para gastos generales, creamos la partida si no existe
        const idPartidaGastos = await crearPartidaSiNoExiste(PARTIDA_GASTOS_GENERALES)
        partidaFinalId = idPartidaGastos || "sin-partida"
      } else if (proveedorId === "freelance" && partidaId === "sin-partida") {
        // Para freelance sin partida asignada, usamos PERSONAL
        const idPartidaPersonal = await crearPartidaSiNoExiste(PARTIDA_PERSONAL)
        partidaFinalId = idPartidaPersonal || "sin-partida"
      }
      // Para dietas, usamos la partida seleccionada por el usuario
      
      // Obtener el nombre del proveedor seleccionado
      let nombreProveedor = "";
      
      // Buscar primero en los proveedores especiales
      const proveedorEspecial = PROVEEDORES_ESPECIALES.find(p => p.id === proveedorId);
      if (proveedorEspecial) {
        nombreProveedor = proveedorEspecial.nombre;
      } else {
        // Si no es especial, buscar en los proveedores normales
        const proveedorNormal = proveedores.find(p => p.id === proveedorId);
        nombreProveedor = proveedorNormal?.nombre || 'proveedor';
      }
      
      const endpoint = modoEdicion 
        ? `/api/facturas/proveedores/${facturaProveedorId}`
        : `/api/facturas/proveedores`
      
      const method = modoEdicion ? "PUT" : "POST"
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facturaId,
          proveedorId: (proveedorId === "gastos-generales" || proveedorId === "freelance" || proveedorId === "dietas") ? null : proveedorId,
          partidaId: partidaFinalId === "sin-partida" ? null : partidaFinalId,
          nombre: `Factura de ${nombreProveedor}`,
          precio: monto,
          precioConIVA,
          descripcion: notas || null,
          // Agregar bandera para proveedores especiales
          tipoEspecial: (proveedorId === "gastos-generales" || proveedorId === "freelance" || proveedorId === "dietas") ? proveedorId : null,
          // Campos del documento
          archivoUrl: archivoUrl || null,
          documentoNombre: documentoNombre || null,
          documentoFecha: documentoFecha || null
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error al guardar la factura de proveedor")
      }

      toast.success(modoEdicion ? "Factura de proveedor actualizada" : "Factura de proveedor añadida")
      setOpen(false)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error(error)
      toast.error((error as Error).message || "Error al guardar la factura de proveedor")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!facturaProveedorId) return
    
    if (!confirm("¿Estás seguro de que deseas eliminar esta factura de proveedor?")) {
      return
    }

    setLoading(true)

    try {
      // Si hay un archivo adjunto, lo eliminamos primero
      if (archivoUrl) {
        try {
          const fileResponse = await fetch('/api/upload', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filePath: archivoUrl }),
          });

          if (!fileResponse.ok) {
            console.error('No se pudo eliminar el archivo, pero continuamos con la eliminación de la factura');
          }
        } catch (fileError) {
          console.error('Error al eliminar archivo:', fileError);
          // Continuamos con la eliminación de la factura aunque falle la eliminación del archivo
        }
      }

      // Eliminar la factura de proveedor
      const response = await fetch(`/api/facturas/proveedores/${facturaProveedorId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Error al eliminar la factura de proveedor")
      }

      toast.success("Factura de proveedor eliminada")
      setOpen(false)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error(error)
      toast.error((error as Error).message || "Error al eliminar la factura de proveedor")
    } finally {
      setLoading(false)
    }
  }

  // Determinar si mostrar el selector de partida
  const mostrarSelectorPartida = proveedorId !== "gastos-generales";

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Si se está cerrando el diálogo, no hacemos nada especial
      // El estado se limpiará la próxima vez que se abra (por el useEffect)
      setOpen(newOpen);
    }}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{modoEdicion ? "Editar" : "Añadir"} factura de proveedor</DialogTitle>
          <DialogDescription>
            {modoEdicion 
              ? "Modifica los detalles de la factura del proveedor" 
              : "Añade una nueva factura de proveedor para esta factura"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Fecha (Ahora en la parte superior) */}
            <div className="grid gap-2">
              <Label htmlFor="documentoFecha">Fecha*</Label>
              <Input
                id="documentoFecha"
                type="date"
                value={documentoFecha}
                onChange={(e) => setDocumentoFecha(e.target.value)}
                disabled={loading}
              />
            </div>
            
            {/* Primera sección: Datos básicos */}
            <div className="grid gap-2">
              <Label htmlFor="proveedor">Proveedor*</Label>
              <Select 
                value={proveedorId} 
                onValueChange={setProveedorId}
                disabled={loading || loadingProveedores}
              >
                <SelectTrigger id="proveedor">
                  <SelectValue placeholder="Seleccionar proveedor" />
                </SelectTrigger>
                <SelectContent>
                  {/* Proveedores especiales fijos */}
                  <SelectItem value="gastos-generales" className="font-semibold">GASTOS GENERALES</SelectItem>
                  <SelectItem value="freelance" className="font-semibold">FREELANCE</SelectItem>
                  <SelectItem value="dietas" className="font-semibold">DIETAS</SelectItem>
                  
                  {/* Separador visual */}
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
            
            {/* Selector de partida - sólo visible si NO es GASTOS GENERALES */}
            {mostrarSelectorPartida && (
              <div className="grid gap-2">
                <Label htmlFor="partida">Partida {proveedorId === "freelance" ? "(preseleccionada PERSONAL)" : "(opcional)"}</Label>
                <Select 
                  value={partidaId} 
                  onValueChange={setPartidaId}
                  disabled={loading || loadingPartidas}
                >
                  <SelectTrigger id="partida">
                    <SelectValue placeholder="Seleccionar partida" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sin-partida">Sin partida</SelectItem>
                    {loadingPartidas ? (
                      <div className="flex items-center justify-center py-2">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Cargando...
                      </div>
                    ) : (
                      partidasFactura.map((partida) => (
                        <SelectItem key={partida.id} value={partida.id}>
                          {partida.nombre}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="monto">Monto (€)*</Label>
              <Input
                id="monto"
                type="number"
                step="0.01"
                value={monto}
                onChange={(e) => setMonto(parseFloat(e.target.value) || 0)}
                disabled={loading}
              />
            </div>
            
            {/* Checkbox de Precio con IVA (solo para proveedores normales) */}
            {!["gastos-generales", "freelance", "dietas"].includes(proveedorId) && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="precioConIVA" 
                  checked={precioConIVA} 
                  onCheckedChange={(checked) => setPrecioConIVA(checked === true)}
                  disabled={loading}
                />
                <Label 
                  htmlFor="precioConIVA" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  El precio incluye IVA
                </Label>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="notas">Notas (opcional)</Label>
              <Textarea
                id="notas"
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Añade notas adicionales sobre esta factura"
                disabled={loading}
              />
            </div>
            
            {/* Segunda sección: Información del documento */}
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
              <Button type="submit" disabled={loading || uploadingFile}>
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