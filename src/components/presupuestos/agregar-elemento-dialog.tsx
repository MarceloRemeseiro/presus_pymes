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
import { Loader2, PlusCircle, BookmarkPlus, UserPlus, SplitSquareHorizontal, Calculator, Edit } from "lucide-react"
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
  email?: string | null
  telefono?: string | null
  notas?: string | null
  puestos: {
    id: string
    nombre: string
    asignadoEn: Date
  }[]
}

interface Puesto {
  id: string
  nombre: string
  descripcion?: string | null
}

interface ItemPresupuesto {
  id: string  // ID local temporal
  tipo: "CATEGORIA" | "EQUIPO" | "PERSONAL" | "SEPARADOR" | "PERSONALIZADO"
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
  partidaId?: string | null  // ID de la partida a la que pertenece
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
  const [puestos, setPuestos] = useState<Puesto[]>([])
  const [categoriasLoading, setCategoriasLoading] = useState(false)
  const [productosLoading, setProductosLoading] = useState(false)
  const [equiposLoading, setEquiposLoading] = useState(false)
  const [puestosLoading, setPuestosLoading] = useState(false)
  
  // Estados para filtros
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("all")
  const [productoSeleccionado, setProductoSeleccionado] = useState<string>("")
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([])
  const [equiposFiltrados, setEquiposFiltrados] = useState<EquipoItem[]>([])
  
  // Estados para nuevos elementos
  const [nombreCategoria, setNombreCategoria] = useState("")
  const [nombreSeparador, setNombreSeparador] = useState("")
  
  // Estados para puestos
  const [puestoSeleccionado, setPuestoSeleccionado] = useState<string>("")
  const [nombrePuesto, setNombrePuesto] = useState("")
  const [descripcionPuesto, setDescripcionPuesto] = useState("")
  const [mostrarFormPuesto, setMostrarFormPuesto] = useState(false)
  
  // Campos comunes para todos los tipos
  const [cantidad, setCantidad] = useState(1)
  const [precioUnitario, setPrecioUnitario] = useState(0)
  const [descuento, setDescuento] = useState(0)
  const [iva, setIva] = useState(21) // Valor por defecto
  const [dias, setDias] = useState(1) // Valor por defecto para días
  
  // Estados para elemento personalizado
  const [nombrePersonalizado, setNombrePersonalizado] = useState("")
  const [descripcionPersonalizada, setDescripcionPersonalizada] = useState("")
  
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
  
  // Cargar puestos
  useEffect(() => {
    const fetchPuestos = async () => {
      try {
        setPuestosLoading(true)
        const response = await fetch('/api/puestos')
        if (!response.ok) throw new Error('Error al cargar puestos')
        const data = await response.json()
        setPuestos(data)
      } catch (error) {
        console.error(error)
        toast.error('Error al cargar puestos')
      } finally {
        setPuestosLoading(false)
      }
    }
    
    fetchPuestos()
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
        partidaId,
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
        partidaId,
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
  
  // Función para crear un nuevo puesto
  const crearPuesto = async () => {
    if (!nombrePuesto.trim()) {
      toast.error('El nombre del puesto es obligatorio')
      return
    }
    
    try {
      setIsLoading(true)
      
      const response = await fetch('/api/puestos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombrePuesto,
          descripcion: descripcionPuesto || null,
        }),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error al crear puesto')
      }
      
      const nuevoPuesto = await response.json()
      
      // Actualizar la lista de puestos
      setPuestos([...puestos, nuevoPuesto])
      
      // Limpiar el formulario
      setNombrePuesto('')
      setDescripcionPuesto('')
      setMostrarFormPuesto(false)
      
      toast.success('Puesto creado correctamente')
    } catch (error: any) {
      console.error('Error al crear puesto:', error)
      toast.error(error.message || 'Error al crear puesto')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Función para agregar puesto
  const agregarPuesto = async () => {
    if (!puestoSeleccionado) {
      toast.error('Debe seleccionar un puesto')
      return
    }
    
    try {
      setIsLoading(true)
      
      const puestoSeleccionadoObj = puestos.find(p => p.id === puestoSeleccionado)
      if (!puestoSeleccionadoObj) {
        toast.error('Puesto no encontrado')
        return
      }
      
      // Primero obtenemos el productoId para personal del sistema
      const response = await fetch('/api/presupuestos/items-especiales?tipo=PERSONAL')
      if (!response.ok) {
        throw new Error('Error al obtener ID de producto para personal')
      }
      const data = await response.json()
      const productoId = data.productoId
      
      if (!productoId) {
        throw new Error('No se pudo obtener el ID de producto para personal')
      }
      
      // Usar precio ingresado o valor por defecto
      const precioFinal = precioUnitario > 0 ? precioUnitario : 150 // Valor por defecto
      
      const { subtotal, total } = calcularTotal(cantidad, precioFinal, descuento, iva, dias)
      
      const nuevoItem: ItemPresupuesto = {
        id: uuidv4(),
        tipo: "PERSONAL",
        nombre: puestoSeleccionadoObj.nombre,
        descripcion: puestoSeleccionadoObj.descripcion || 'Puesto de trabajo',
        cantidad,
        precioUnitario: precioFinal,
        descuento,
        iva,
        subtotal,
        total,
        dias,
        // Usamos el ID del producto del sistema para personal
        productoId,
        partidaId,
        // El ID del puesto lo guardamos en datosExtra
        datosExtra: {
          puestoId: puestoSeleccionadoObj.id
        }
      }
      
      console.log('Agregando puesto:', nuevoItem);
      onElementoAgregado(nuevoItem)
      toast.success('Puesto agregado correctamente')
      
      // Limpiar formulario y cerrar diálogo
      setPuestoSeleccionado('')
      setCantidad(1)
      setPrecioUnitario(0)
      setDescuento(0)
      setIva(21)
      setDias(1)
      setIsOpen(false)
      
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar puesto')
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
        partidaId,
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
  
  // Función para agregar un elemento personalizado
  const agregarElementoPersonalizado = async () => {
    try {
      setIsLoading(true)
      
      // Primero obtenemos el productoId para elementos personalizados del sistema
      const response = await fetch('/api/presupuestos/items-especiales?tipo=PERSONALIZADO')
      if (!response.ok) {
        throw new Error('Error al obtener ID de producto para elemento personalizado')
      }
      const data = await response.json()
      const productoId = data.productoId
      
      if (!productoId) {
        throw new Error('No se pudo obtener el ID de producto para elemento personalizado')
      }
      
      // Usamos valores por defecto o los introducidos por el usuario
      const precioFinal = precioUnitario || 0
      const { subtotal, total } = calcularTotal(cantidad, precioFinal, descuento, iva, dias)
      
      const nuevoItem: ItemPresupuesto = {
        id: uuidv4(),
        tipo: "PERSONALIZADO",
        nombre: nombrePersonalizado || "Elemento personalizado",
        descripcion: descripcionPersonalizada || null,
        cantidad,
        precioUnitario: precioFinal,
        descuento,
        iva,
        subtotal,
        total,
        dias,
        productoId, // Asignamos el productoId del sistema
        partidaId,
        datosExtra: {
          editable: true
        }
      }
      
      console.log('Agregando elemento personalizado:', nuevoItem);
      onElementoAgregado(nuevoItem)
      toast.success('Elemento personalizado agregado correctamente')
      
      // Limpiar formulario y cerrar diálogo
      setNombrePersonalizado('')
      setDescripcionPersonalizada('')
      setCantidad(1)
      setPrecioUnitario(0)
      setDescuento(0)
      setIva(21)
      setDias(1)
      setIsOpen(false)
      
    } catch (error) {
      console.error(error)
      toast.error('Error al agregar elemento personalizado')
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
          <TabsList className="grid grid-cols-5">
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
            <TabsTrigger value="personalizado" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              <span className="hidden sm:inline">Personalizado</span>
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
                  {categorias
                    .filter((cat) => cat.nombre !== "__SISTEMA__")
                    .map((cat) => (
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
            {!mostrarFormPuesto ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Puesto</label>
                  <Select 
                    value={puestoSeleccionado}
                    onValueChange={setPuestoSeleccionado}
                    disabled={puestosLoading || puestos.length === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        puestosLoading 
                          ? "Cargando puestos..." 
                          : puestos.length === 0 
                          ? "No hay puestos disponibles" 
                          : "Seleccionar puesto"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {puestos.map((p) => (
                        <SelectItem 
                          key={p.id} 
                          value={p.id}
                        >
                          {p.nombre} {p.descripcion ? `- ${p.descripcion}` : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setMostrarFormPuesto(true)}
                    size="sm"
                  >
                    Crear nuevo puesto
                  </Button>
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
                
                <div className="pt-3">
                  <Button 
                    onClick={agregarPuesto} 
                    disabled={isLoading || !puestoSeleccionado}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Agregando...
                      </>
                    ) : (
                      'Agregar Puesto'
                    )}
                  </Button>
                </div>
              </>
            ) : (
              // Formulario para crear nuevo puesto
              <>
                <h3 className="text-lg font-medium">Crear nuevo puesto</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre del puesto *</label>
                  <Input 
                    value={nombrePuesto}
                    onChange={(e) => setNombrePuesto(e.target.value)}
                    placeholder="Ej: Técnico de Iluminación"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descripción</label>
                  <Input 
                    value={descripcionPuesto}
                    onChange={(e) => setDescripcionPuesto(e.target.value)}
                    placeholder="Breve descripción del puesto"
                  />
                </div>
                <div className="pt-3 flex justify-between space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setMostrarFormPuesto(false)}
                    className="w-1/2"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    onClick={crearPuesto} 
                    disabled={isLoading || !nombrePuesto.trim()}
                    className="w-1/2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando...
                      </>
                    ) : (
                      'Crear Puesto'
                    )}
                  </Button>
                </div>
              </>
            )}
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
          
          {/* Contenido para Elemento Personalizado */}
          <TabsContent value="personalizado" className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre (opcional)</label>
              <Input 
                value={nombrePersonalizado}
                onChange={(e) => setNombrePersonalizado(e.target.value)}
                placeholder="Nombre del elemento (podrá editarse después)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Descripción (opcional)</label>
              <Input 
                value={descripcionPersonalizada}
                onChange={(e) => setDescripcionPersonalizada(e.target.value)}
                placeholder="Descripción del elemento (podrá editarse después)"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Cantidad</label>
                <Input 
                  type="number"
                  min="0"
                  value={cantidad}
                  onChange={(e) => setCantidad(parseInt(e.target.value, 10) || 0)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Días</label>
                <Input 
                  type="number"
                  min="0"
                  value={dias}
                  onChange={(e) => setDias(parseInt(e.target.value, 10) || 0)}
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
            
            <div>
              <p className="text-sm text-muted-foreground italic">
                Este elemento podrá editarse completamente desde la tabla del presupuesto.
                Podrá modificar el nombre, descripción, cantidad y otros valores directamente.
              </p>
            </div>
            
            <div className="pt-3">
              <Button 
                onClick={agregarElementoPersonalizado} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Agregando...
                  </>
                ) : (
                  'Agregar Elemento Personalizado'
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