"use client"

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, Download, Upload, FileCode } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ImportExportDialogProps {
  trigger: React.ReactNode;
  onImportSuccess: () => void; // Función para refrescar la lista de personal
}

export function ImportExportDialog({ trigger, onImportSuccess }: ImportExportDialogProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === "text/csv") {
        setSelectedFile(file);
      } else {
        toast.error("Por favor, selecciona un archivo CSV.");
        setSelectedFile(null);
        event.target.value = "";
      }
    } else {
      setSelectedFile(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error("Por favor, selecciona un archivo CSV para importar.");
      return;
    }

    setIsImporting(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/personal/importar", { // Endpoint para importar personal
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        // Si hay un objeto summary con errores detallados, los mostramos
        if (result.summary && result.summary.detallesErrores && result.summary.detallesErrores.length > 0) {
          const erroresString = result.summary.detallesErrores
            .map((err: { fila: number; mensaje: string; datos: any }) => `Fila ${err.fila}: ${err.mensaje} (Datos: ${JSON.stringify(err.datos)})`)
            .join('\n');
          toast.error(
            <div>
              <p className="font-semibold">{result.message || "Error al importar el personal."}</p>
              <pre className="mt-2 whitespace-pre-wrap text-xs bg-red-50 p-2 rounded-md max-h-60 overflow-y-auto">
                {erroresString}
              </pre>
            </div>, 
            { duration: 15000 } // Duración más larga para errores detallados
          );
        } else {
          throw new Error(result.message || result.error || "Error al importar el personal.");
        }
      } else {
        // Éxito (201 o 207)
        let toastMessage = result.message || "Personal importado.";
        if (response.status === 207 && result.summary && result.summary.detallesErrores && result.summary.detallesErrores.length > 0) {
          // Éxito parcial con errores
          const erroresString = result.summary.detallesErrores
            .map((err: { fila: number; mensaje: string; }) => `Fila ${err.fila}: ${err.mensaje}`)
            .join('\n');
          toast.warning(
            <div>
              <p className="font-semibold">{toastMessage}</p>
              <p className="text-sm">Resumen: {result.summary.personalCreado || 0} personal creado, {result.summary.puestosAsignados || 0} puestos asignados.</p>
              <p className="text-sm mt-1">Se encontraron {result.summary.errores} errores:</p>
              <pre className="mt-2 whitespace-pre-wrap text-xs bg-yellow-50 p-2 rounded-md max-h-60 overflow-y-auto">
                {erroresString}
              </pre>
            </div>, 
            { duration: 20000 } // Duración más larga para errores detallados
          );
        } else {
          // Éxito total
          toast.success(
            <div>
              <p className="font-semibold">{toastMessage}</p>
              {result.summary && (
                <p className="text-sm">Resumen: {result.summary.personalCreado || 0} personal creado, {result.summary.puestosAsignados || 0} puestos asignados.</p>
              )}
            </div>
          );
        }
        onImportSuccess?.(); // Actualizar la lista en la página principal
      }
      
      setSelectedFile(null); // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error("Error al importar personal:", error);
      toast.error(error instanceof Error ? error.message : "Error desconocido al importar personal.");
    } finally {
      setIsImporting(false);
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/personal/exportar"); // Endpoint de exportación de personal
      if (!response.ok) {
        if (response.headers.get("content-type")?.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al generar el archivo de exportación de personal.");
        }
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("text/csv")) {
        const jsonData = await response.json(); 
        toast.info(jsonData.message || "No hay personal para exportar.");
        setIsExporting(false);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "personal_exportado.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Personal exportado correctamente.");
    } catch (error) {
      console.error("Error al exportar personal:", error);
      toast.error(error instanceof Error ? error.message : "Error desconocido al exportar personal.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSelectedFile(null);
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileCode className="mr-2 h-5 w-5" />
            Importar / Exportar Personal
          </DialogTitle>
          <DialogDescription>
            Importa personal desde un archivo CSV o exporta la lista actual.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Exportar Personal</h4>
            <p className="text-xs text-muted-foreground">
              Descarga toda la lista de personal y sus puestos en un archivo CSV.
            </p>
            <Button onClick={handleExport} disabled={isExporting} className="w-full">
              {isExporting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Exportar Personal a CSV
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
            <h4 className="font-medium text-sm">Importar Personal</h4>
            <p className="text-xs text-muted-foreground">
              Sube un archivo CSV para agregar personal. Asegúrate de que el CSV siga el formato requerido (incluyendo una columna 'puestos' con nombres separados por comas).
            </p>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="csv-file-personal" className="sr-only">Archivo CSV</Label>
              <Input 
                id="csv-file-personal" 
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
              Importar Personal de CSV
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
             <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 