"use client"

import { Button } from "@/components/ui/button"
import { FileText, X } from "lucide-react"
import { useState } from "react"

interface ArchivoItemProps {
  fileName: string
  fileUrl: string
  onRemove: () => void
  onView?: () => void
  downloadName?: string
}

export function ArchivoItem({
  fileName,
  fileUrl,
  onRemove,
  onView,
  downloadName
}: ArchivoItemProps) {
  const [loading, setLoading] = useState(false)

  const handleRemove = async () => {
    setLoading(true)
    try {
      await onRemove()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div data-testid="archivo-item" className="flex items-center justify-between p-3 border rounded-md">
      <div className="flex items-center">
        <FileText className="h-4 w-4 mr-2 text-blue-500" />
        <span data-testid="archivo-nombre" className="text-sm truncate max-w-[200px]">{fileName}</span>
      </div>
      <div className="flex gap-2">
        <a 
          href={fileUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
          download={downloadName || fileName}
          data-testid="archivo-descargar"
          onClick={onView}
        >
          Ver
        </a>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0 text-red-500"
          onClick={handleRemove}
          disabled={loading}
          data-testid="archivo-eliminar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 