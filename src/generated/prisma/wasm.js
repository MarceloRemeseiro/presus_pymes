
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.EmpresaScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  cif: 'cif',
  direccion: 'direccion',
  email: 'email',
  telefono: 'telefono',
  logoUrl: 'logoUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoriaScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MarcaScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  marcaId: 'marcaId',
  modelo: 'modelo',
  descripcion: 'descripcion',
  stock: 'stock',
  precio: 'precio',
  precioCompra: 'precioCompra',
  precioAlquiler: 'precioAlquiler',
  categoriaId: 'categoriaId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EquipoItemScalarFieldEnum = {
  id: 'id',
  productoId: 'productoId',
  numeroSerie: 'numeroSerie',
  notasInternas: 'notasInternas',
  estado: 'estado',
  fechaCompra: 'fechaCompra',
  precioCompra: 'precioCompra',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ClienteScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  tipo: 'tipo',
  nif: 'nif',
  direccion: 'direccion',
  email: 'email',
  telefono: 'telefono',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PresupuestoScalarFieldEnum = {
  id: 'id',
  numero: 'numero',
  fecha: 'fecha',
  fechaValidez: 'fechaValidez',
  clienteId: 'clienteId',
  estado: 'estado',
  observaciones: 'observaciones',
  subtotal: 'subtotal',
  iva: 'iva',
  total: 'total',
  facturaId: 'facturaId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ItemPresupuestoScalarFieldEnum = {
  id: 'id',
  presupuestoId: 'presupuestoId',
  productoId: 'productoId',
  cantidad: 'cantidad',
  precioUnitario: 'precioUnitario',
  descuento: 'descuento',
  iva: 'iva',
  total: 'total',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FacturaScalarFieldEnum = {
  id: 'id',
  numero: 'numero',
  fecha: 'fecha',
  fechaVencimiento: 'fechaVencimiento',
  clienteId: 'clienteId',
  estado: 'estado',
  observaciones: 'observaciones',
  subtotal: 'subtotal',
  iva: 'iva',
  total: 'total',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ItemFacturaScalarFieldEnum = {
  id: 'id',
  facturaId: 'facturaId',
  productoId: 'productoId',
  cantidad: 'cantidad',
  precioUnitario: 'precioUnitario',
  descuento: 'descuento',
  iva: 'iva',
  total: 'total',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ConfiguracionScalarFieldEnum = {
  id: 'id',
  ivaPorDefecto: 'ivaPorDefecto',
  moneda: 'moneda',
  prefijoFactura: 'prefijoFactura',
  prefijoPresupuesto: 'prefijoPresupuesto'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.EstadoEquipo = exports.$Enums.EstadoEquipo = {
  DISPONIBLE: 'DISPONIBLE',
  EN_USO: 'EN_USO',
  EN_REPARACION: 'EN_REPARACION',
  BAJA: 'BAJA'
};

exports.TipoCliente = exports.$Enums.TipoCliente = {
  PARTICULAR: 'PARTICULAR',
  EMPRESA: 'EMPRESA'
};

exports.EstadoPresupuesto = exports.$Enums.EstadoPresupuesto = {
  PENDIENTE: 'PENDIENTE',
  APROBADO: 'APROBADO',
  RECHAZADO: 'RECHAZADO',
  FACTURADO: 'FACTURADO'
};

exports.EstadoFactura = exports.$Enums.EstadoFactura = {
  PENDIENTE: 'PENDIENTE',
  PAGADA: 'PAGADA',
  VENCIDA: 'VENCIDA',
  ANULADA: 'ANULADA'
};

exports.Prisma.ModelName = {
  Empresa: 'Empresa',
  Categoria: 'Categoria',
  Marca: 'Marca',
  Producto: 'Producto',
  EquipoItem: 'EquipoItem',
  Cliente: 'Cliente',
  Presupuesto: 'Presupuesto',
  ItemPresupuesto: 'ItemPresupuesto',
  Factura: 'Factura',
  ItemFactura: 'ItemFactura',
  Configuracion: 'Configuracion'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
