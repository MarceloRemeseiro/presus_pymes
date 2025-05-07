"use client"

import { useState } from "react";
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
import { Loader2, Download, Upload } from "lucide-react";

interface ImportExportDialogProps {
  trigger: React.ReactNode; // El botón que abre el diálogo
  onImportSuccess: () => void; // Función para refrescar la lista de clientes
}

export function ImportExportDialog({ trigger, onImportSuccess }: ImportExportDialogProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el diálogo está abierto

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
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

  const handleImportCSV = async () => {
    if (!selectedFile) {
      toast.error("Por favor, selecciona un archivo CSV para importar.");
      return;
    }

    setIsImporting(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/clientes/importar", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        let errorMessage = result.error || "Error al importar el archivo.";
        if (result.errores && result.errores.length > 0) {
          toast.error(result.message || "Importación completada con errores.", { 
            description: result.errores.slice(0, 5).join("\n") + (result.errores.length > 5 ? "\n..." : ""),
            duration: 10000 
          });
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.success(result.message || `Importación exitosa. Clientes creados: ${result.clientesCreados}`);
        onImportSuccess(); // Llama a la función para refrescar la lista
        setIsOpen(false); // Cierra el diálogo en caso de éxito
      }
      
    } catch (error) {
      console.error("Error en la importación:", error);
      toast.error("Ocurrió un error inesperado durante la importación.");
    } finally {
      setIsImporting(false);
      setSelectedFile(null);
      // No necesitamos limpiar el input aquí si el diálogo se cierra
    }
  };

  const handleExportClick = () => {
    window.location.href = '/api/clientes/exportar';
    // Opcionalmente, podríamos cerrar el diálogo después de iniciar la descarga
    // setIsOpen(false);
  };
  
  // Función para resetear estado al cerrar/abrir
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Resetear estado cuando se cierra
      setSelectedFile(null);
      setIsImporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Importar / Exportar Clientes</DialogTitle>
          <DialogDescription>
            Exporta tus clientes a un archivo CSV o importa nuevos clientes desde un CSV.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Sección Exportar */}
          <div>
            <h4 className="text-sm font-medium mb-2">Exportar a CSV</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Descarga un archivo CSV con todos tus clientes.
            </p>
            <Button 
              variant="outline" 
              onClick={handleExportClick}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar CSV de Clientes
            </Button>
          </div>

          <Separator />

          {/* Sección Importar */}
          <div>
            <h4 className="text-sm font-medium mb-2">Importar desde CSV</h4>
            <div className="flex items-center gap-2 mb-2">
              <Input
                id="csv-file-input-modal"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="flex-grow"
                disabled={isImporting}
              />
              <Button
                onClick={handleImportCSV}
                disabled={!selectedFile || isImporting}
                className="shrink-0"
              >
                {isImporting ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Importando...</>
                ) : (
                  <><Upload className="mr-2 h-4 w-4" /> Importar</>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Columnas requeridas: nombre, tipo (PARTICULAR/EMPRESA), nif, direccion, ciudad, email, telefono.
              Clientes con NIF duplicado serán omitidos.
            </p>
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