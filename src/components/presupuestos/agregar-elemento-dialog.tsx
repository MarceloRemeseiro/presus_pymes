import { useState, useEffect } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2, PlusCircle, BookmarkPlus, UserPlus, SplitSquareHorizontal, Calculator } from "lucide-react"
import { v4 as uuidv4 } from 'uuid'

interface Categoria {
  id: string
  nombre: string
}

interface Producto {
  id: string
  codigo?: string
  nombre: string
  descripcion?: string | null
  categoriaId: string
  categoria: {
    id: string
    nombre: string
  }
  precio: number
  precioAlquiler: number | null
  stock: number
  _count?: {
    equipoItems: number
  }
}

interface EquipoItem {
  id: string
  numeroSerie?: string | null
  estado: "DISPONIBLE" | "EN_USO" | "EN_REPARACION" | "BAJA"
  productoId: string
  producto: Producto
}

interface Personal {
  id: string
  nombre: string
  rol: string
  tarifaDiaria?: number | null
  tarifaHora?: number | null
}

interface ItemPresupuesto {
  id: string  // ID local temporal
  tipo: "CATEGORIA" | "EQUIPO" | "PERSONAL" | "SEPARADOR"
  nombre: string
  descripcion?: string | null
  cantidad: number
  precioUnitario: number
  descuento: number
  iva: number
  subtotal: number
  total: number
  dias: number  // Nuevo campo para días
  productoId?: string
  equipoItemId?: string
  personalId?: string
  // Campos adicionales según el tipo
  datosExtra?: any
}

interface AgregarElementoDialogProps {
  partidaId: string | null
  partidaNombre: string
  trigger: React.ReactNode
  onElementoAgregado: (item: ItemPresupuesto) => void
}

export function AgregarElementoDialog({
  partidaId,
  partidaNombre,
  trigger,
  onElementoAgregado
}: AgregarElementoDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("categoria")
  
  // Estados para búsqueda y filtros
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [productos, setProductos] = useState<Producto[]>([])
  const [equipoItems, setEquipoItems] = useState<EquipoItem[]>([])
  const [personal, setPersonal] = useState<Personal[]>([])
  const [categoriasLoading, setCategoriasLoading] = useState(false)
  const [productosLoading, setProductosLoading] = useState(false)
  const [equiposLoading, setEquiposLoading] = useState(false)
  const [personalLoading, setPersonalLoading] = useState(false)
  
  // Estados para filtros
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("all")
  const [productoSeleccionado, setProductoSeleccionado] = useState<string>("")
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([])
  const [equiposFiltrados, setEquiposFiltrados] = useState<EquipoItem[]>([])
  
  // Estados para nuevos elementos
  const [nombreCategoria, setNombreCategoria] = useState("")
  const [nombreSeparador, setNombreSeparador] = useState("")
  
  // Campos comunes para todos los tipos
  const [cantidad, setCantidad] = useState(1)
  const [precioUnitario, setPrecioUnitario] = useState(0)
  const [descuento, setDescuento] = useState(0)
  const [iva, setIva] = useState(21) // Valor por defecto
  const [dias, setDias] = useState(1) // Valor por defecto para días
  
  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        setCategoriasLoading(true)
        const response = await fetch('/api/categorias')
        if (!response.ok) throw new Error('Error al cargar categorías')
        const data = await response.json()
        setCategorias(data)
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar categorías')
      } finally {
        setCategoriasLoading(false)
      }
    }
    
    fetchCategorias()
  }, [])
  
  // Cargar productos cuando cambia la categoría seleccionada
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setProductosLoading(true)
        const response = await fetch('/api/productos?includeEquipoItems=true')
        if (!response.ok) throw new Error('Error al cargar productos')
        const data = await response.json()
        setProductos(data)
        
        if (categoriaSeleccionada && categoriaSeleccionada !== "all") {
          setProductosFiltrados(data.filter((p: Producto) => p.categoriaId === categoriaSeleccionada))
        } else {
          setProductosFiltrados(data)
        }
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar productos')
      } finally {
        setProductosLoading(false)
      }
    }
    
    fetchProductos()
  }, [categoriaSeleccionada])
  
  // Filtrar productos cuando cambia la categoría
  useEffect(() => {
    if (categoriaSeleccionada && categoriaSeleccionada !== "all") {
      setProductosFiltrados(productos.filter(p => p.categoriaId === categoriaSeleccionada))
    } else {
      setProductosFiltrados(productos)
    }
    // Resetear producto seleccionado
    setProductoSeleccionado("")
  }, [categoriaSeleccionada, productos])
  
  // Cargar elementos de equipo cuando se selecciona un producto
  useEffect(() => {
    if (!productoSeleccionado) {
      setEquiposFiltrados([])
      return
    }
    
    const fetchEquipoItems = async () => {
      try {
        setEquiposLoading(true)
        const response = await fetch(`/api/equipo-items?productoId=${productoSeleccionado}`)
        if (!response.ok) throw new Error('Error al cargar elementos de equipo')
        const data = await response.json()
        setEquipoItems(data)
        setEquiposFiltrados(data.filter((item: EquipoItem) => item.estado === "DISPONIBLE"))
        
        // Si hay un producto seleccionado, establecer el precio unitario predeterminado
        const productoSeleccionadoObj = productos.find(p => p.id === productoSeleccionado)
        if (productoSeleccionadoObj) {
          setPrecioUnitario(productoSeleccionadoObj.precioAlquiler || productoSeleccionadoObj.precio || 0)
        }
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar elementos de equipo')
      } finally {
        setEquiposLoading(false)
      }
    }
    
    fetchEquipoItems()
  }, [productoSeleccionado, productos])
  
  // Cargar personal
  useEffect(() => {
    const fetchPersonal = async () => {
      try {
        setPersonalLoading(true)
        // Implementar cuando tengamos el endpoint de personal
        // const response = await fetch('/api/personal')
        // if (!response.ok) throw new Error('Error al cargar personal')
        // const data = await response.json()
        // setPersonal(data)
        
        // Por ahora usamos datos de ejemplo
        setPersonal([
          { id: '1', nombre: 'Técnico de Sonido', rol: 'Técnico', tarifaDiaria: 150, tarifaHora: 25 },
          { id: '2', nombre: 'Técnico de Iluminación', rol: 'Técnico', tarifaDiaria: 150, tarifaHora: 25 },
          { id: '3', nombre: 'Auxiliar', rol: 'Ayudante', tarifaDiaria: 100, tarifaHora: 15 },
        ])
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar personal')
      } finally {
        setPersonalLoading(false)
      }
    }
    
    fetchPersonal()
  }, [])
  
  // Función para calcular el subtotal y total
  const calcularTotal = (cantidad: number, precio: number, descuento: number, iva: number, dias: number) => {
    const subtotal = cantidad * precio * dias * (1 - descuento / 100)
    const total = subtotal * (1 + iva / 100)
    return { subtotal, total }
  }
  
  // Función para agregar una categoría
  const agregarCategoria = async () => {
    setIsLoading(true)
    
    if (!nombreCategoria) {
      toast.error("Por favor, ingrese un nombre para la categoría")
      setIsLoading(false)
      return
    }
    
    try {
      // Crear un objeto para la categoría (sin campos adicionales)
      const newItem: ItemPresupuesto = {
        id: uuidv4(),
        tipo: "CATEGORIA",
        nombre: nombreCategoria,
        descripcion: null,
        cantidad: 0,
        precioUnitario: 0,
        descuento: 0,
        iva: 0,
        subtotal: 0,
        total: 0,
        dias: 0,
        productoId: "categoria", // Valor temporal, se asignará correctamente en backend
        datosExtra: { partidaId }
      }
      
      console.log("Nueva categoría:", newItem)
      
      // Notificar al componente padre
      onElementoAgregado(newItem)
      
      // Limpiar el formulario
      setNombreCategoria("")
      
      // Cerrar el diálogo
      setIsOpen(false)
      
      toast.success("Categoría agregada correctamente")
    } catch (error) {
      console.error("Error al agregar categoría:", error)
      toast.error("Error al agregar la categoría")
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para agregar un equipo
  const agregarEquipo = () => {
    if (!productoSeleccionado) {
      toast.error('Debe seleccionar un producto')
      return
    }
    
    try {
      setIsLoading(true)
      
      const producto = productos.find(p => p.id === productoSeleccionado)
      if (!producto) {
        toast.error('Producto no encontrado')
        return
      }
      
      const { subtotal, total } = calcularTotal(cantidad, precioUnitario, descuento, iva, dias)
      
      // Debug - log del producto seleccionado
      console.log('Producto seleccionado:', producto);
      
      const nuevoItem: ItemPresupuesto = {
        id: uuidv4(),
        tipo: "EQUIPO",
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        cantidad,
        precioUnitario,
        descuento,
        iva,
        subtotal,
        total,
        dias,
        productoId: producto.id, // Asegurarnos de que se asigna el ID del producto
        datosExtra: {
          categoria: producto.categoria.nombre,
          stock: producto.stock
        }
      }
      
      console.log('Agregando equipo:', nuevoItem);
      console.log('ID del producto asignado:', producto.id);
      
      onElementoAgregado(nuevoItem)
      toast.success('Equipo agregado correctamente')
      
      // Limpiar formulario y cerrar diálogo
      setProductoSeleccionado('')
      setCantidad(1)
      setPrecioUnitario(0)
      setDescuento(0)
      setIva(21)
      setDias(1)
      setIsOpen(false)
      
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar equipo')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para agregar personal
  const agregarPersonal = (personalId: string) => {
    if (!personalId) {
      toast.error('Debe seleccionar un personal')
      return
    }
    
    try {
      setIsLoading(true)
      
      const personalSeleccionado = personal.find(p => p.id === personalId)
      if (!personalSeleccionado) {
        toast.error('Personal no encontrado')
        return
      }
      
      // Usar tarifa diaria por defecto
      const precioDefault = personalSeleccionado.tarifaDiaria || 0
      const precioFinal = precioUnitario > 0 ? precioUnitario : precioDefault
      
      const { subtotal, total } = calcularTotal(cantidad, precioFinal, descuento, iva, dias)
      
      const nuevoItem: ItemPresupuesto = {
        id: uuidv4(),
        tipo: "PERSONAL",
        nombre: personalSeleccionado.nombre,
        descripcion: personalSeleccionado.rol,
        cantidad,
        precioUnitario: precioFinal,
        descuento,
        iva,
        subtotal,
        total,
        dias,
        personalId: personalSeleccionado.id,
        datosExtra: {
          tarifaDiaria: personalSeleccionado.tarifaDiaria,
          tarifaHora: personalSeleccionado.tarifaHora
        }
      }
      
      console.log('Agregando personal:', nuevoItem);
      onElementoAgregado(nuevoItem)
      toast.success('Personal agregado correctamente')
      
      // Limpiar formulario y cerrar diálogo
      setCantidad(1)
      setPrecioUnitario(0)
      setDescuento(0)
      setIva(21)
      setDias(1)
      setIsOpen(false)
      
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar personal')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para agregar un separador
  const agregarSeparador = async () => {
    setIsLoading(true)
    
    if (!nombreSeparador) {
      toast.error("Por favor, ingrese un texto para el separador")
      setIsLoading(false)
      return
    }
    
    try {
      // Primero obtenemos el productoId para separador del sistema
      const response = await fetch('/api/presupuestos/items-especiales?tipo=SEPARADOR')
      if (!response.ok) {
        throw new Error('Error al obtener ID de producto para separador')
      }
      const data = await response.json()
      const productoId = data.productoId
      
      if (!productoId) {
        throw new Error('No se pudo obtener el ID de producto para separador')
      }
      
      // Crear un objeto para el separador (sin campos adicionales)
      const nuevoItem: ItemPresupuesto = {
        id: uuidv4(),
        tipo: "SEPARADOR",
        nombre: nombreSeparador,
        descripcion: null,
        cantidad: 0,
        precioUnitario: 0,
        descuento: 0,
        iva: 0,
        subtotal: 0,
        total: 0,
        dias: 0,
        productoId, // Asignamos el productoId del sistema
        datosExtra: {}
      }
      
      console.log("Nuevo separador:", nuevoItem)
      
      // Notificar al componente padre
      onElementoAgregado(nuevoItem)
      
      // Limpiar el formulario
      setNombreSeparador("")
      
      // Cerrar el diálogo
      setIsOpen(false)
      
      toast.success("Separador agregado correctamente")
    } catch (error) {
      console.error("Error al agregar separador:", error)
      toast.error("Error al agregar el separador")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Agregar elemento a {partidaNombre}</DialogTitle>
          <DialogDescription>
            Seleccione el tipo de elemento que desea agregar a esta partida.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="categoria" className="flex items-center gap-1">
              <BookmarkPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Categoría</span>
            </TabsTrigger>
            <TabsTrigger value="equipo" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Equipo</span>
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-1">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="separador" className="flex items-center gap-1">
              <SplitSquareHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Separador</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Contenido para Categoría */}
          <TabsContent value="categoria" className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre de la Categoría</label>
              <Input 
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}
                placeholder="Ej: Cámaras, Iluminación, etc."
              />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground italic">
                Las categorías funcionan como subtítulos para agrupar elementos en el presupuesto.
                No requieren valores adicionales como cantidad, precio o descuento.
                Se mostrarán como encabezados en la tabla de elementos.
              </p>
            </div>
            
            <div className="pt-3">
              <Button 
                onClick={agregarCategoria} 
                disabled={isLoading || !nombreCategoria.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Agregando...
                  </>
                ) : (
                  'Agregar Categoría'
                )}
              </Button>
            </div>
          </TabsContent>
          
          {/* Contenido para Equipo */}
          <TabsContent value="equipo" className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <Select 
                value={categoriaSeleccionada} 
                onValueChange={setCategoriaSeleccionada}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categorias.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Producto</label>
              <Select 
                value={productoSeleccionado} 
                onValueChange={setProductoSeleccionado}
                disabled={productosLoading || productosFiltrados.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder={
                    productosLoading 
                      ? "Cargando productos..." 
                      : productosFiltrados.length === 0 
                      ? "No hay productos disponibles" 
                      : "Seleccionar producto"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {productosFiltrados.map((producto) => (
                    <SelectItem key={producto.id} value={producto.id}>
                      {producto.nombre} ({producto.stock} disponibles)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Cantidad</label>
                <Input 
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value, 10) || 1)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Días</label>
                <Input 
                  type="number"
                  min="1"
                  value={dias}
                  onChange={(e) => setDias(parseInt(e.target.value, 10) || 1)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Precio Unitario</label>
                <Input 
                  type="number"
                  min="0"
                  step="0.01"
                  value={precioUnitario}
                  onChange={(e) => setPrecioUnitario(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descuento (%)</label>
                <Input 
                  type="number"
                  min="0"
                  max="100"
                  value={descuento}
                  onChange={(e) => setDescuento(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">IVA (%)</label>
                <Input 
                  type="number"
                  min="0"
                  value={iva}
                  onChange={(e) => setIva(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <div className="pt-3">
              <Button 
                onClick={agregarEquipo} 
                disabled={isLoading || !productoSeleccionado}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Agregando...
                  </>
                ) : (
                  'Agregar Equipo'
                )}
              </Button>
            </div>
          </TabsContent>
          
          {/* Contenido para Personal */}
          <TabsContent value="personal" className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Personal</label>
              <Select 
                disabled={personalLoading || personal.length === 0}
                onValueChange={(personalId: string) => {
                  // Al seleccionar personal, actualizar precio unitario
                  const personalSeleccionado = personal.find(p => p.id === personalId)
                  if (personalSeleccionado) {
                    setPrecioUnitario(personalSeleccionado.tarifaDiaria || 0)
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={
                    personalLoading 
                      ? "Cargando personal..." 
                      : personal.length === 0 
                      ? "No hay personal disponible" 
                      : "Seleccionar personal"
                  } />
                </SelectTrigger>
                <SelectContent>
                  {personal.map((p) => (
                    <SelectItem 
                      key={p.id} 
                      value={p.id}
                    >
                      {p.nombre} - {p.rol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Cantidad (personas)</label>
                <Input 
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value, 10) || 1)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Días</label>
                <Input 
                  type="number"
                  min="1"
                  value={dias}
                  onChange={(e) => setDias(parseInt(e.target.value, 10) || 1)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Precio por día</label>
                <Input 
                  type="number"
                  min="0"
                  step="0.01"
                  value={precioUnitario}
                  onChange={(e) => setPrecioUnitario(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descuento (%)</label>
                <Input 
                  type="number"
                  min="0"
                  max="100"
                  value={descuento}
                  onChange={(e) => setDescuento(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">IVA (%)</label>
                <Input 
                  type="number"
                  min="0"
                  value={iva}
                  onChange={(e) => setIva(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <div className="pt-3">
              {personal.map((p) => (
                <Button 
                  key={p.id}
                  onClick={() => agregarPersonal(p.id)} 
                  disabled={isLoading}
                  className="w-full mb-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Agregando...
                    </>
                  ) : (
                    <>Agregar {p.nombre} ({p.rol})</>
                  )}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          {/* Contenido para Separador */}
          <TabsContent value="separador" className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Texto del Separador</label>
              <Input 
                value={nombreSeparador}
                onChange={(e) => setNombreSeparador(e.target.value)}
                placeholder="Ej: Día 1, Etapa 2, etc."
              />
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground italic">
                Los separadores sirven para organizar visualmente el presupuesto en secciones.
                No requieren valores adicionales como cantidad, precio o descuento.
              </p>
            </div>
            
            <div className="pt-3">
              <Button 
                onClick={agregarSeparador} 
                disabled={isLoading || !nombreSeparador.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Agregando...
                  </>
                ) : (
                  'Agregar Separador'
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 