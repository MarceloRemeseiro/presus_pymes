"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast, Toaster } from "sonner"
import { Loader2, Upload, Image as ImageIcon, X } from "lucide-react"
import Image from "next/image"

interface Empresa {
  id: string
  nombre: string
  cif: string
  direccion: string
  email: string
  telefono: string
  logoUrl: string | null
}

interface Configuracion {
  id: string
  ivaPorDefecto: number
  moneda: string
  prefijoFactura: string
  prefijoPresupuesto: string
}

export default function ConfiguracionPage() {
  // Estados para la empresa
  const [empresa, setEmpresa] = useState<Empresa | null>(null)
  const [nombreEmpresa, setNombreEmpresa] = useState("")
  const [cif, setCif] = useState("")
  const [direccion, setDireccion] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [guardandoEmpresa, setGuardandoEmpresa] = useState(false)
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Estados para la configuración
  const [configuracion, setConfiguracion] = useState<Configuracion | null>(null)
  const [iva, setIva] = useState("")
  const [moneda, setMoneda] = useState("EUR")
  const [prefijoFactura, setPrefijoFactura] = useState("")
  const [prefijoPresupuesto, setPrefijoPresupuesto] = useState("")
  const [guardandoConfig, setGuardandoConfig] = useState(false)
  
  // Estado general de carga
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar datos al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Cargar datos de la empresa
        const empresaResponse = await fetch('/api/empresa')
        if (!empresaResponse.ok) {
          throw new Error('Error al cargar información de la empresa')
        }
        const empresaData = await empresaResponse.json()
        setEmpresa(empresaData)
        setNombreEmpresa(empresaData.nombre)
        setCif(empresaData.cif)
        setDireccion(empresaData.direccion)
        setEmail(empresaData.email)
        setTelefono(empresaData.telefono)
        setLogoUrl(empresaData.logoUrl)
        
        // Cargar datos de configuración
        const configResponse = await fetch('/api/configuracion')
        if (!configResponse.ok) {
          throw new Error('Error al cargar configuración del sistema')
        }
        const configData = await configResponse.json()
        setConfiguracion(configData)
        setIva(configData.ivaPorDefecto.toString())
        setMoneda(configData.moneda)
        setPrefijoFactura(configData.prefijoFactura)
        setPrefijoPresupuesto(configData.prefijoPresupuesto)
      } catch (err) {
        console.error('Error al cargar configuración:', err)
        setError('Error al cargar la configuración del sistema')
        toast.error('Error al cargar configuración')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])

  // Efecto para crear URL de preview cuando se selecciona un archivo
  useEffect(() => {
    if (!logoFile) {
      if (!logoUrl) {
        setPreviewUrl(null);
      }
      return;
    }
    
    const objectUrl = URL.createObjectURL(logoFile);
    setPreviewUrl(objectUrl);
    
    // Liberar la URL cuando el componente se desmonte
    return () => URL.revokeObjectURL(objectUrl);
  }, [logoFile, logoUrl]);

  // Manejador para la selección de archivos
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setLogoFile(null);
      return;
    }
    
    const file = e.target.files[0];
    
    // Verificar que sea un archivo de imagen válido
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor, selecciona un archivo de imagen válido');
      return;
    }
    
    // Verificar el tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('La imagen es demasiado grande. Máximo 2MB');
      return;
    }
    
    setLogoFile(file);
  };

  // Limpiar la selección de logo
  const handleClearLogo = () => {
    setLogoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Guardar información de la empresa
  const handleGuardarEmpresa = async () => {
    try {
      setGuardandoEmpresa(true)
      
      // Primero subimos el logo si hay uno nuevo
      let logoUrlToSave = logoUrl;
      
      if (logoFile) {
        const formData = new FormData();
        formData.append('logo', logoFile);
        
        const uploadResponse = await fetch('/api/empresa/logo', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || 'Error al subir el logo de la empresa');
        }
        
        const uploadResult = await uploadResponse.json();
        logoUrlToSave = uploadResult.logoUrl;
      }
      
      // Luego actualizamos los datos de la empresa
      const response = await fetch('/api/empresa', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombreEmpresa,
          cif,
          direccion,
          email,
          telefono,
          logoUrl: logoUrlToSave,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al guardar información de la empresa')
      }
      
      const updatedEmpresa = await response.json()
      setEmpresa(updatedEmpresa)
      setLogoUrl(updatedEmpresa.logoUrl)
      setLogoFile(null)
      
      toast.success('Información de la empresa guardada correctamente')
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Error al guardar información de la empresa')
    } finally {
      setGuardandoEmpresa(false)
    }
  }
  
  // Guardar configuración del sistema
  const handleGuardarConfig = async () => {
    try {
      setGuardandoConfig(true)
      
      const response = await fetch('/api/configuracion', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ivaPorDefecto: iva,
          moneda,
          prefijoFactura,
          prefijoPresupuesto,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al guardar configuración del sistema')
      }
      
      const updatedConfig = await response.json()
      setConfiguracion(updatedConfig)
      
      toast.success('Configuración del sistema guardada correctamente')
    } catch (error) {
      console.error('Error:', error)
      toast.error(error instanceof Error ? error.message : 'Error al guardar configuración del sistema')
    } finally {
      setGuardandoConfig(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="py-10 flex justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2">Cargando configuración...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-10">
        <div className="p-4 mb-4 text-red-800 rounded-lg bg-red-50">
          <p>{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Intentar de nuevo
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-8">Configuración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Información de la Empresa</CardTitle>
            <CardDescription>
              Configura los datos básicos de tu empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="nombre" className="text-sm font-medium">Nombre de la Empresa</label>
              <Input 
                id="nombre" 
                placeholder="Nombre de la empresa" 
                value={nombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
              />
            </div>
            
            {/* Sección de Logo */}
            <div className="space-y-2">
              <label htmlFor="logo" className="text-sm font-medium">Logo de la Empresa</label>
              <div className="flex flex-col gap-4">
                {/* Previsualización de imagen */}
                {(previewUrl || logoUrl) && (
                  <div className="relative w-fit">
                    <div className="border rounded-md overflow-hidden" style={{ maxWidth: '200px', maxHeight: '100px' }}>
                      <Image 
                        src={previewUrl || logoUrl || ''} 
                        alt="Logo de la empresa" 
                        width={200} 
                        height={100} 
                        className="object-contain" 
                        style={{ maxHeight: '100px' }}
                      />
                    </div>
                    <button 
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 rounded-full p-1 text-white" 
                      onClick={handleClearLogo}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                
                {/* Input para subir logo */}
                <div className="flex items-center gap-2">
                  <Input 
                    id="logo"
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Subir Logo
                  </Button>
                  <span className="text-xs text-gray-500">
                    Formato PNG o JPG, máx. 2MB
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cif" className="text-sm font-medium">CIF/NIF</label>
              <Input 
                id="cif" 
                placeholder="CIF/NIF" 
                value={cif}
                onChange={(e) => setCif(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="direccion" className="text-sm font-medium">Dirección</label>
              <Input 
                id="direccion" 
                placeholder="Dirección" 
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="telefono" className="text-sm font-medium">Teléfono</label>
              <Input 
                id="telefono" 
                placeholder="Teléfono" 
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGuardarEmpresa} disabled={guardandoEmpresa}>
              {guardandoEmpresa ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Preferencias del Sistema</CardTitle>
            <CardDescription>
              Personaliza la configuración del sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Impuestos</h3>
              <div className="flex items-center gap-2">
                <Input 
                  id="iva" 
                  placeholder="IVA (%)" 
                  value={iva}
                  onChange={(e) => setIva(e.target.value)}
                  className="w-24" 
                />
                <span>% IVA por defecto</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Moneda</h3>
              <div className="flex items-center gap-2">
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={moneda}
                  onChange={(e) => setMoneda(e.target.value)}
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dólar ($)</option>
                  <option value="GBP">Libra (£)</option>
                </select>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Numeración</h3>
              <div className="flex items-center gap-2">
                <Input 
                  id="prefijo_factura" 
                  placeholder="Prefijo factura" 
                  value={prefijoFactura}
                  onChange={(e) => setPrefijoFactura(e.target.value)}
                  className="w-32" 
                />
                <span>Prefijo factura</span>
              </div>
              <div className="flex items-center gap-2">
                <Input 
                  id="prefijo_presupuesto" 
                  placeholder="Prefijo presupuesto" 
                  value={prefijoPresupuesto}
                  onChange={(e) => setPrefijoPresupuesto(e.target.value)}
                  className="w-32" 
                />
                <span>Prefijo presupuesto</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGuardarConfig} disabled={guardandoConfig}>
              {guardandoConfig ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar Preferencias'
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <Toaster />
    </div>
  );
} 