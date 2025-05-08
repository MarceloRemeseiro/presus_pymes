'use client'

import { useState, useRef, ChangeEvent } from 'react'
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
import { toast } from "sonner"
import { Upload, Download, Loader2, FileCode } from 'lucide-react'

interface ImportExportDialogInventarioProps {
  trigger: React.ReactNode
  onImportSuccess?: () => void
}

export function ImportExportDialogInventario({
  trigger,
  onImportSuccess,
}: ImportExportDialogInventarioProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    } else {
      setSelectedFile(null)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error("Por favor, selecciona un archivo CSV para importar.")
      return
    }

    setIsImporting(true)
    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await fetch("/api/inventario/import", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.summary && result.summary.errores && result.summary.errores.length > 0) {
          const erroresString = result.summary.errores.join('\n')
          toast.error(
            <div>
              <p className="font-semibold">{result.message || "Error al importar el inventario."}</p>
              <pre className="mt-2 whitespace-pre-wrap text-xs bg-red-50 p-2 rounded-md max-h-40 overflow-y-auto">
                {erroresString}
              </pre>
            </div>, 
            { duration: 10000 }
          )
        } else {
          throw new Error(result.message || "Error al importar el inventario.")
        }
      } else {
        let toastMessage = result.message || "Inventario importado."
        if (response.status === 207 && result.summary && result.summary.errores && result.summary.errores.length > 0) {
          const erroresString = result.summary.errores.join('\n')
          toast.warning(
            <div>
              <p className="font-semibold">{toastMessage}</p>
              <p className="text-sm">Resumen: {result.summary.productosCreados || 0} prod. creados, {result.summary.productosActualizados || 0} prod. actualizados, {result.summary.itemsCreados || 0} items creados.</p>
              <p className="text-sm mt-1">Se encontraron {result.summary.errores.length} errores:</p>
              <pre className="mt-2 whitespace-pre-wrap text-xs bg-yellow-50 p-2 rounded-md max-h-40 overflow-y-auto">
                {erroresString}
              </pre>
            </div>, 
            { duration: 15000 }
          )
        } else {
          toast.success(
            <div>
              <p className="font-semibold">{toastMessage}</p>
              {result.summary && (
                <p className="text-sm">Resumen: {result.summary.productosCreados || 0} prod. creados, {result.summary.productosActualizados || 0} prod. actualizados, {result.summary.itemsCreados || 0} items creados.</p>
              )}
            </div>
          )
        }
        onImportSuccess?.()
      }
      
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error("Error al importar inventario:", error)
      toast.error(error instanceof Error ? error.message : "Error desconocido al importar inventario.")
    } finally {
      setIsImporting(false)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const response = await fetch("/api/inventario/export")
      if (!response.ok) {
        if (response.headers.get("content-type")?.includes("application/json")) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Error al generar el archivo de exportación.")
        }
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("text/csv")) {
        const jsonData = await response.json()
        toast.info(jsonData.message || "No hay datos para exportar.")
        setIsExporting(false)
        return
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "inventario_completo.csv"
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
      toast.success("Inventario exportado correctamente.")
    } catch (error) {
      console.error("Error al exportar inventario:", error)
      toast.error(error instanceof Error ? error.message : "Error desconocido al exportar inventario.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileCode className="mr-2 h-5 w-5" />
            Importar / Exportar Inventario
          </DialogTitle>
          <DialogDescription>
            Importa productos y sus equipos desde un archivo CSV o exporta el inventario actual.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Exportar Inventario</h4>
            <p className="text-xs text-muted-foreground">
              Descarga todos los productos y sus items de equipo en un archivo CSV.
            </p>
            <Button onClick={handleExport} disabled={isExporting} className="w-full">
              {isExporting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Exportar Inventario a CSV
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Importar Inventario</h4>
            <p className="text-xs text-muted-foreground">
              Sube un archivo CSV para agregar o actualizar productos y sus items de equipo.
              Asegúrate de que el archivo CSV siga el formato requerido.
            </p>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="csv-file-inventario" className="sr-only">Archivo CSV</Label>
              <Input 
                id="csv-file-inventario" 
                type="file" 
                accept=".csv, text/csv"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
              />
            </div>
            {selectedFile && (
              <p className="text-sm text-muted-foreground mt-2">
                Archivo seleccionado: {selectedFile.name}
              </p>
            )}
            <Button onClick={handleImport} disabled={isImporting || !selectedFile} className="w-full mt-2">
              {isImporting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Upload className="mr-2 h-4 w-4" />
              )}
              Importar de CSV
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 