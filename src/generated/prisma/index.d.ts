
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Empresa
 * 
 */
export type Empresa = $Result.DefaultSelection<Prisma.$EmpresaPayload>
/**
 * Model Categoria
 * 
 */
export type Categoria = $Result.DefaultSelection<Prisma.$CategoriaPayload>
/**
 * Model Marca
 * 
 */
export type Marca = $Result.DefaultSelection<Prisma.$MarcaPayload>
/**
 * Model Producto
 * 
 */
export type Producto = $Result.DefaultSelection<Prisma.$ProductoPayload>
/**
 * Model EquipoItem
 * 
 */
export type EquipoItem = $Result.DefaultSelection<Prisma.$EquipoItemPayload>
/**
 * Model Cliente
 * 
 */
export type Cliente = $Result.DefaultSelection<Prisma.$ClientePayload>
/**
 * Model Presupuesto
 * 
 */
export type Presupuesto = $Result.DefaultSelection<Prisma.$PresupuestoPayload>
/**
 * Model ItemPresupuesto
 * 
 */
export type ItemPresupuesto = $Result.DefaultSelection<Prisma.$ItemPresupuestoPayload>
/**
 * Model Factura
 * 
 */
export type Factura = $Result.DefaultSelection<Prisma.$FacturaPayload>
/**
 * Model ItemFactura
 * 
 */
export type ItemFactura = $Result.DefaultSelection<Prisma.$ItemFacturaPayload>
/**
 * Model Configuracion
 * 
 */
export type Configuracion = $Result.DefaultSelection<Prisma.$ConfiguracionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TipoCliente: {
  PARTICULAR: 'PARTICULAR',
  EMPRESA: 'EMPRESA'
};

export type TipoCliente = (typeof TipoCliente)[keyof typeof TipoCliente]


export const EstadoPresupuesto: {
  PENDIENTE: 'PENDIENTE',
  APROBADO: 'APROBADO',
  RECHAZADO: 'RECHAZADO',
  FACTURADO: 'FACTURADO'
};

export type EstadoPresupuesto = (typeof EstadoPresupuesto)[keyof typeof EstadoPresupuesto]


export const EstadoFactura: {
  PENDIENTE: 'PENDIENTE',
  PAGADA: 'PAGADA',
  VENCIDA: 'VENCIDA',
  ANULADA: 'ANULADA'
};

export type EstadoFactura = (typeof EstadoFactura)[keyof typeof EstadoFactura]


export const EstadoEquipo: {
  DISPONIBLE: 'DISPONIBLE',
  EN_USO: 'EN_USO',
  EN_REPARACION: 'EN_REPARACION',
  BAJA: 'BAJA'
};

export type EstadoEquipo = (typeof EstadoEquipo)[keyof typeof EstadoEquipo]

}

export type TipoCliente = $Enums.TipoCliente

export const TipoCliente: typeof $Enums.TipoCliente

export type EstadoPresupuesto = $Enums.EstadoPresupuesto

export const EstadoPresupuesto: typeof $Enums.EstadoPresupuesto

export type EstadoFactura = $Enums.EstadoFactura

export const EstadoFactura: typeof $Enums.EstadoFactura

export type EstadoEquipo = $Enums.EstadoEquipo

export const EstadoEquipo: typeof $Enums.EstadoEquipo

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Empresas
 * const empresas = await prisma.empresa.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Empresas
   * const empresas = await prisma.empresa.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.empresa`: Exposes CRUD operations for the **Empresa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Empresas
    * const empresas = await prisma.empresa.findMany()
    * ```
    */
  get empresa(): Prisma.EmpresaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoria`: Exposes CRUD operations for the **Categoria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categorias
    * const categorias = await prisma.categoria.findMany()
    * ```
    */
  get categoria(): Prisma.CategoriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.marca`: Exposes CRUD operations for the **Marca** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Marcas
    * const marcas = await prisma.marca.findMany()
    * ```
    */
  get marca(): Prisma.MarcaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.producto`: Exposes CRUD operations for the **Producto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Productos
    * const productos = await prisma.producto.findMany()
    * ```
    */
  get producto(): Prisma.ProductoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.equipoItem`: Exposes CRUD operations for the **EquipoItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EquipoItems
    * const equipoItems = await prisma.equipoItem.findMany()
    * ```
    */
  get equipoItem(): Prisma.EquipoItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cliente`: Exposes CRUD operations for the **Cliente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.cliente.findMany()
    * ```
    */
  get cliente(): Prisma.ClienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.presupuesto`: Exposes CRUD operations for the **Presupuesto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Presupuestos
    * const presupuestos = await prisma.presupuesto.findMany()
    * ```
    */
  get presupuesto(): Prisma.PresupuestoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemPresupuesto`: Exposes CRUD operations for the **ItemPresupuesto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemPresupuestos
    * const itemPresupuestos = await prisma.itemPresupuesto.findMany()
    * ```
    */
  get itemPresupuesto(): Prisma.ItemPresupuestoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.factura`: Exposes CRUD operations for the **Factura** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Facturas
    * const facturas = await prisma.factura.findMany()
    * ```
    */
  get factura(): Prisma.FacturaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.itemFactura`: Exposes CRUD operations for the **ItemFactura** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ItemFacturas
    * const itemFacturas = await prisma.itemFactura.findMany()
    * ```
    */
  get itemFactura(): Prisma.ItemFacturaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.configuracion`: Exposes CRUD operations for the **Configuracion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Configuracions
    * const configuracions = await prisma.configuracion.findMany()
    * ```
    */
  get configuracion(): Prisma.ConfiguracionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "empresa" | "categoria" | "marca" | "producto" | "equipoItem" | "cliente" | "presupuesto" | "itemPresupuesto" | "factura" | "itemFactura" | "configuracion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Empresa: {
        payload: Prisma.$EmpresaPayload<ExtArgs>
        fields: Prisma.EmpresaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmpresaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmpresaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          findFirst: {
            args: Prisma.EmpresaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmpresaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          findMany: {
            args: Prisma.EmpresaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          create: {
            args: Prisma.EmpresaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          createMany: {
            args: Prisma.EmpresaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EmpresaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          delete: {
            args: Prisma.EmpresaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          update: {
            args: Prisma.EmpresaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          deleteMany: {
            args: Prisma.EmpresaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EmpresaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EmpresaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>[]
          }
          upsert: {
            args: Prisma.EmpresaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EmpresaPayload>
          }
          aggregate: {
            args: Prisma.EmpresaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEmpresa>
          }
          groupBy: {
            args: Prisma.EmpresaGroupByArgs<ExtArgs>
            result: $Utils.Optional<EmpresaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmpresaCountArgs<ExtArgs>
            result: $Utils.Optional<EmpresaCountAggregateOutputType> | number
          }
        }
      }
      Categoria: {
        payload: Prisma.$CategoriaPayload<ExtArgs>
        fields: Prisma.CategoriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findFirst: {
            args: Prisma.CategoriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          findMany: {
            args: Prisma.CategoriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          create: {
            args: Prisma.CategoriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          createMany: {
            args: Prisma.CategoriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoriaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          delete: {
            args: Prisma.CategoriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          update: {
            args: Prisma.CategoriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          deleteMany: {
            args: Prisma.CategoriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoriaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>[]
          }
          upsert: {
            args: Prisma.CategoriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriaPayload>
          }
          aggregate: {
            args: Prisma.CategoriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria>
          }
          groupBy: {
            args: Prisma.CategoriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoriaCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriaCountAggregateOutputType> | number
          }
        }
      }
      Marca: {
        payload: Prisma.$MarcaPayload<ExtArgs>
        fields: Prisma.MarcaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarcaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarcaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload>
          }
          findFirst: {
            args: Prisma.MarcaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarcaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload>
          }
          findMany: {
            args: Prisma.MarcaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload>[]
          }
          create: {
            args: Prisma.MarcaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload>
          }
          createMany: {
            args: Prisma.MarcaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarcaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload>[]
          }
          delete: {
            args: Prisma.MarcaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload>
          }
          update: {
            args: Prisma.MarcaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload>
          }
          deleteMany: {
            args: Prisma.MarcaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarcaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarcaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload>[]
          }
          upsert: {
            args: Prisma.MarcaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarcaPayload>
          }
          aggregate: {
            args: Prisma.MarcaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarca>
          }
          groupBy: {
            args: Prisma.MarcaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarcaGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarcaCountArgs<ExtArgs>
            result: $Utils.Optional<MarcaCountAggregateOutputType> | number
          }
        }
      }
      Producto: {
        payload: Prisma.$ProductoPayload<ExtArgs>
        fields: Prisma.ProductoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          findFirst: {
            args: Prisma.ProductoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          findMany: {
            args: Prisma.ProductoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          create: {
            args: Prisma.ProductoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          createMany: {
            args: Prisma.ProductoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          delete: {
            args: Prisma.ProductoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          update: {
            args: Prisma.ProductoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          deleteMany: {
            args: Prisma.ProductoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>[]
          }
          upsert: {
            args: Prisma.ProductoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductoPayload>
          }
          aggregate: {
            args: Prisma.ProductoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducto>
          }
          groupBy: {
            args: Prisma.ProductoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductoCountArgs<ExtArgs>
            result: $Utils.Optional<ProductoCountAggregateOutputType> | number
          }
        }
      }
      EquipoItem: {
        payload: Prisma.$EquipoItemPayload<ExtArgs>
        fields: Prisma.EquipoItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EquipoItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EquipoItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload>
          }
          findFirst: {
            args: Prisma.EquipoItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EquipoItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload>
          }
          findMany: {
            args: Prisma.EquipoItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload>[]
          }
          create: {
            args: Prisma.EquipoItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload>
          }
          createMany: {
            args: Prisma.EquipoItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EquipoItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload>[]
          }
          delete: {
            args: Prisma.EquipoItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload>
          }
          update: {
            args: Prisma.EquipoItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload>
          }
          deleteMany: {
            args: Prisma.EquipoItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EquipoItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EquipoItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload>[]
          }
          upsert: {
            args: Prisma.EquipoItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoItemPayload>
          }
          aggregate: {
            args: Prisma.EquipoItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEquipoItem>
          }
          groupBy: {
            args: Prisma.EquipoItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<EquipoItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.EquipoItemCountArgs<ExtArgs>
            result: $Utils.Optional<EquipoItemCountAggregateOutputType> | number
          }
        }
      }
      Cliente: {
        payload: Prisma.$ClientePayload<ExtArgs>
        fields: Prisma.ClienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findFirst: {
            args: Prisma.ClienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findMany: {
            args: Prisma.ClienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          create: {
            args: Prisma.ClienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          createMany: {
            args: Prisma.ClienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClienteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          delete: {
            args: Prisma.ClienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          update: {
            args: Prisma.ClienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          deleteMany: {
            args: Prisma.ClienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClienteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          upsert: {
            args: Prisma.ClienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          aggregate: {
            args: Prisma.ClienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCliente>
          }
          groupBy: {
            args: Prisma.ClienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClienteCountArgs<ExtArgs>
            result: $Utils.Optional<ClienteCountAggregateOutputType> | number
          }
        }
      }
      Presupuesto: {
        payload: Prisma.$PresupuestoPayload<ExtArgs>
        fields: Prisma.PresupuestoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PresupuestoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PresupuestoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload>
          }
          findFirst: {
            args: Prisma.PresupuestoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PresupuestoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload>
          }
          findMany: {
            args: Prisma.PresupuestoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload>[]
          }
          create: {
            args: Prisma.PresupuestoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload>
          }
          createMany: {
            args: Prisma.PresupuestoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PresupuestoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload>[]
          }
          delete: {
            args: Prisma.PresupuestoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload>
          }
          update: {
            args: Prisma.PresupuestoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload>
          }
          deleteMany: {
            args: Prisma.PresupuestoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PresupuestoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PresupuestoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload>[]
          }
          upsert: {
            args: Prisma.PresupuestoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PresupuestoPayload>
          }
          aggregate: {
            args: Prisma.PresupuestoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePresupuesto>
          }
          groupBy: {
            args: Prisma.PresupuestoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PresupuestoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PresupuestoCountArgs<ExtArgs>
            result: $Utils.Optional<PresupuestoCountAggregateOutputType> | number
          }
        }
      }
      ItemPresupuesto: {
        payload: Prisma.$ItemPresupuestoPayload<ExtArgs>
        fields: Prisma.ItemPresupuestoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemPresupuestoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemPresupuestoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload>
          }
          findFirst: {
            args: Prisma.ItemPresupuestoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemPresupuestoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload>
          }
          findMany: {
            args: Prisma.ItemPresupuestoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload>[]
          }
          create: {
            args: Prisma.ItemPresupuestoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload>
          }
          createMany: {
            args: Prisma.ItemPresupuestoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemPresupuestoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload>[]
          }
          delete: {
            args: Prisma.ItemPresupuestoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload>
          }
          update: {
            args: Prisma.ItemPresupuestoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload>
          }
          deleteMany: {
            args: Prisma.ItemPresupuestoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemPresupuestoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemPresupuestoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload>[]
          }
          upsert: {
            args: Prisma.ItemPresupuestoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPresupuestoPayload>
          }
          aggregate: {
            args: Prisma.ItemPresupuestoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemPresupuesto>
          }
          groupBy: {
            args: Prisma.ItemPresupuestoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemPresupuestoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemPresupuestoCountArgs<ExtArgs>
            result: $Utils.Optional<ItemPresupuestoCountAggregateOutputType> | number
          }
        }
      }
      Factura: {
        payload: Prisma.$FacturaPayload<ExtArgs>
        fields: Prisma.FacturaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FacturaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FacturaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          findFirst: {
            args: Prisma.FacturaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FacturaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          findMany: {
            args: Prisma.FacturaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>[]
          }
          create: {
            args: Prisma.FacturaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          createMany: {
            args: Prisma.FacturaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FacturaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>[]
          }
          delete: {
            args: Prisma.FacturaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          update: {
            args: Prisma.FacturaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          deleteMany: {
            args: Prisma.FacturaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FacturaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FacturaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>[]
          }
          upsert: {
            args: Prisma.FacturaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacturaPayload>
          }
          aggregate: {
            args: Prisma.FacturaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFactura>
          }
          groupBy: {
            args: Prisma.FacturaGroupByArgs<ExtArgs>
            result: $Utils.Optional<FacturaGroupByOutputType>[]
          }
          count: {
            args: Prisma.FacturaCountArgs<ExtArgs>
            result: $Utils.Optional<FacturaCountAggregateOutputType> | number
          }
        }
      }
      ItemFactura: {
        payload: Prisma.$ItemFacturaPayload<ExtArgs>
        fields: Prisma.ItemFacturaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFacturaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFacturaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload>
          }
          findFirst: {
            args: Prisma.ItemFacturaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFacturaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload>
          }
          findMany: {
            args: Prisma.ItemFacturaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload>[]
          }
          create: {
            args: Prisma.ItemFacturaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload>
          }
          createMany: {
            args: Prisma.ItemFacturaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemFacturaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload>[]
          }
          delete: {
            args: Prisma.ItemFacturaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload>
          }
          update: {
            args: Prisma.ItemFacturaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload>
          }
          deleteMany: {
            args: Prisma.ItemFacturaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemFacturaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemFacturaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload>[]
          }
          upsert: {
            args: Prisma.ItemFacturaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemFacturaPayload>
          }
          aggregate: {
            args: Prisma.ItemFacturaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItemFactura>
          }
          groupBy: {
            args: Prisma.ItemFacturaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemFacturaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemFacturaCountArgs<ExtArgs>
            result: $Utils.Optional<ItemFacturaCountAggregateOutputType> | number
          }
        }
      }
      Configuracion: {
        payload: Prisma.$ConfiguracionPayload<ExtArgs>
        fields: Prisma.ConfiguracionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConfiguracionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConfiguracionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload>
          }
          findFirst: {
            args: Prisma.ConfiguracionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConfiguracionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload>
          }
          findMany: {
            args: Prisma.ConfiguracionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload>[]
          }
          create: {
            args: Prisma.ConfiguracionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload>
          }
          createMany: {
            args: Prisma.ConfiguracionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConfiguracionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload>[]
          }
          delete: {
            args: Prisma.ConfiguracionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload>
          }
          update: {
            args: Prisma.ConfiguracionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload>
          }
          deleteMany: {
            args: Prisma.ConfiguracionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConfiguracionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConfiguracionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload>[]
          }
          upsert: {
            args: Prisma.ConfiguracionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConfiguracionPayload>
          }
          aggregate: {
            args: Prisma.ConfiguracionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfiguracion>
          }
          groupBy: {
            args: Prisma.ConfiguracionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConfiguracionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConfiguracionCountArgs<ExtArgs>
            result: $Utils.Optional<ConfiguracionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    empresa?: EmpresaOmit
    categoria?: CategoriaOmit
    marca?: MarcaOmit
    producto?: ProductoOmit
    equipoItem?: EquipoItemOmit
    cliente?: ClienteOmit
    presupuesto?: PresupuestoOmit
    itemPresupuesto?: ItemPresupuestoOmit
    factura?: FacturaOmit
    itemFactura?: ItemFacturaOmit
    configuracion?: ConfiguracionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CategoriaCountOutputType
   */

  export type CategoriaCountOutputType = {
    productos: number
  }

  export type CategoriaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | CategoriaCountOutputTypeCountProductosArgs
  }

  // Custom InputTypes
  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriaCountOutputType
     */
    select?: CategoriaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoriaCountOutputType without action
   */
  export type CategoriaCountOutputTypeCountProductosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
  }


  /**
   * Count Type MarcaCountOutputType
   */

  export type MarcaCountOutputType = {
    productos: number
  }

  export type MarcaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | MarcaCountOutputTypeCountProductosArgs
  }

  // Custom InputTypes
  /**
   * MarcaCountOutputType without action
   */
  export type MarcaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarcaCountOutputType
     */
    select?: MarcaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MarcaCountOutputType without action
   */
  export type MarcaCountOutputTypeCountProductosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
  }


  /**
   * Count Type ProductoCountOutputType
   */

  export type ProductoCountOutputType = {
    itemsPresupuesto: number
    itemsFactura: number
    equipoItems: number
  }

  export type ProductoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    itemsPresupuesto?: boolean | ProductoCountOutputTypeCountItemsPresupuestoArgs
    itemsFactura?: boolean | ProductoCountOutputTypeCountItemsFacturaArgs
    equipoItems?: boolean | ProductoCountOutputTypeCountEquipoItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductoCountOutputType
     */
    select?: ProductoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountItemsPresupuestoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemPresupuestoWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountItemsFacturaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFacturaWhereInput
  }

  /**
   * ProductoCountOutputType without action
   */
  export type ProductoCountOutputTypeCountEquipoItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EquipoItemWhereInput
  }


  /**
   * Count Type ClienteCountOutputType
   */

  export type ClienteCountOutputType = {
    presupuestos: number
    facturas: number
  }

  export type ClienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presupuestos?: boolean | ClienteCountOutputTypeCountPresupuestosArgs
    facturas?: boolean | ClienteCountOutputTypeCountFacturasArgs
  }

  // Custom InputTypes
  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClienteCountOutputType
     */
    select?: ClienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountPresupuestosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PresupuestoWhereInput
  }

  /**
   * ClienteCountOutputType without action
   */
  export type ClienteCountOutputTypeCountFacturasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FacturaWhereInput
  }


  /**
   * Count Type PresupuestoCountOutputType
   */

  export type PresupuestoCountOutputType = {
    items: number
  }

  export type PresupuestoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | PresupuestoCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * PresupuestoCountOutputType without action
   */
  export type PresupuestoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PresupuestoCountOutputType
     */
    select?: PresupuestoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PresupuestoCountOutputType without action
   */
  export type PresupuestoCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemPresupuestoWhereInput
  }


  /**
   * Count Type FacturaCountOutputType
   */

  export type FacturaCountOutputType = {
    items: number
    presupuestos: number
  }

  export type FacturaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | FacturaCountOutputTypeCountItemsArgs
    presupuestos?: boolean | FacturaCountOutputTypeCountPresupuestosArgs
  }

  // Custom InputTypes
  /**
   * FacturaCountOutputType without action
   */
  export type FacturaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacturaCountOutputType
     */
    select?: FacturaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FacturaCountOutputType without action
   */
  export type FacturaCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFacturaWhereInput
  }

  /**
   * FacturaCountOutputType without action
   */
  export type FacturaCountOutputTypeCountPresupuestosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PresupuestoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Empresa
   */

  export type AggregateEmpresa = {
    _count: EmpresaCountAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  export type EmpresaMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    cif: string | null
    direccion: string | null
    email: string | null
    telefono: string | null
    logoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmpresaMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    cif: string | null
    direccion: string | null
    email: string | null
    telefono: string | null
    logoUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EmpresaCountAggregateOutputType = {
    id: number
    nombre: number
    cif: number
    direccion: number
    email: number
    telefono: number
    logoUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EmpresaMinAggregateInputType = {
    id?: true
    nombre?: true
    cif?: true
    direccion?: true
    email?: true
    telefono?: true
    logoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmpresaMaxAggregateInputType = {
    id?: true
    nombre?: true
    cif?: true
    direccion?: true
    email?: true
    telefono?: true
    logoUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EmpresaCountAggregateInputType = {
    id?: true
    nombre?: true
    cif?: true
    direccion?: true
    email?: true
    telefono?: true
    logoUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EmpresaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresa to aggregate.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Empresas
    **/
    _count?: true | EmpresaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmpresaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmpresaMaxAggregateInputType
  }

  export type GetEmpresaAggregateType<T extends EmpresaAggregateArgs> = {
        [P in keyof T & keyof AggregateEmpresa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmpresa[P]>
      : GetScalarType<T[P], AggregateEmpresa[P]>
  }




  export type EmpresaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmpresaWhereInput
    orderBy?: EmpresaOrderByWithAggregationInput | EmpresaOrderByWithAggregationInput[]
    by: EmpresaScalarFieldEnum[] | EmpresaScalarFieldEnum
    having?: EmpresaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmpresaCountAggregateInputType | true
    _min?: EmpresaMinAggregateInputType
    _max?: EmpresaMaxAggregateInputType
  }

  export type EmpresaGroupByOutputType = {
    id: string
    nombre: string
    cif: string
    direccion: string
    email: string
    telefono: string
    logoUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: EmpresaCountAggregateOutputType | null
    _min: EmpresaMinAggregateOutputType | null
    _max: EmpresaMaxAggregateOutputType | null
  }

  type GetEmpresaGroupByPayload<T extends EmpresaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmpresaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmpresaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
            : GetScalarType<T[P], EmpresaGroupByOutputType[P]>
        }
      >
    >


  export type EmpresaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    cif?: boolean
    direccion?: boolean
    email?: boolean
    telefono?: boolean
    logoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    cif?: boolean
    direccion?: boolean
    email?: boolean
    telefono?: boolean
    logoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    cif?: boolean
    direccion?: boolean
    email?: boolean
    telefono?: boolean
    logoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["empresa"]>

  export type EmpresaSelectScalar = {
    id?: boolean
    nombre?: boolean
    cif?: boolean
    direccion?: boolean
    email?: boolean
    telefono?: boolean
    logoUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EmpresaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "cif" | "direccion" | "email" | "telefono" | "logoUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["empresa"]>

  export type $EmpresaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Empresa"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      cif: string
      direccion: string
      email: string
      telefono: string
      logoUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["empresa"]>
    composites: {}
  }

  type EmpresaGetPayload<S extends boolean | null | undefined | EmpresaDefaultArgs> = $Result.GetResult<Prisma.$EmpresaPayload, S>

  type EmpresaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EmpresaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EmpresaCountAggregateInputType | true
    }

  export interface EmpresaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Empresa'], meta: { name: 'Empresa' } }
    /**
     * Find zero or one Empresa that matches the filter.
     * @param {EmpresaFindUniqueArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EmpresaFindUniqueArgs>(args: SelectSubset<T, EmpresaFindUniqueArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Empresa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EmpresaFindUniqueOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EmpresaFindUniqueOrThrowArgs>(args: SelectSubset<T, EmpresaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Empresa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EmpresaFindFirstArgs>(args?: SelectSubset<T, EmpresaFindFirstArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Empresa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindFirstOrThrowArgs} args - Arguments to find a Empresa
     * @example
     * // Get one Empresa
     * const empresa = await prisma.empresa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EmpresaFindFirstOrThrowArgs>(args?: SelectSubset<T, EmpresaFindFirstOrThrowArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Empresas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Empresas
     * const empresas = await prisma.empresa.findMany()
     * 
     * // Get first 10 Empresas
     * const empresas = await prisma.empresa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const empresaWithIdOnly = await prisma.empresa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EmpresaFindManyArgs>(args?: SelectSubset<T, EmpresaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Empresa.
     * @param {EmpresaCreateArgs} args - Arguments to create a Empresa.
     * @example
     * // Create one Empresa
     * const Empresa = await prisma.empresa.create({
     *   data: {
     *     // ... data to create a Empresa
     *   }
     * })
     * 
     */
    create<T extends EmpresaCreateArgs>(args: SelectSubset<T, EmpresaCreateArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Empresas.
     * @param {EmpresaCreateManyArgs} args - Arguments to create many Empresas.
     * @example
     * // Create many Empresas
     * const empresa = await prisma.empresa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EmpresaCreateManyArgs>(args?: SelectSubset<T, EmpresaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Empresas and returns the data saved in the database.
     * @param {EmpresaCreateManyAndReturnArgs} args - Arguments to create many Empresas.
     * @example
     * // Create many Empresas
     * const empresa = await prisma.empresa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Empresas and only return the `id`
     * const empresaWithIdOnly = await prisma.empresa.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EmpresaCreateManyAndReturnArgs>(args?: SelectSubset<T, EmpresaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Empresa.
     * @param {EmpresaDeleteArgs} args - Arguments to delete one Empresa.
     * @example
     * // Delete one Empresa
     * const Empresa = await prisma.empresa.delete({
     *   where: {
     *     // ... filter to delete one Empresa
     *   }
     * })
     * 
     */
    delete<T extends EmpresaDeleteArgs>(args: SelectSubset<T, EmpresaDeleteArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Empresa.
     * @param {EmpresaUpdateArgs} args - Arguments to update one Empresa.
     * @example
     * // Update one Empresa
     * const empresa = await prisma.empresa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EmpresaUpdateArgs>(args: SelectSubset<T, EmpresaUpdateArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Empresas.
     * @param {EmpresaDeleteManyArgs} args - Arguments to filter Empresas to delete.
     * @example
     * // Delete a few Empresas
     * const { count } = await prisma.empresa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EmpresaDeleteManyArgs>(args?: SelectSubset<T, EmpresaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Empresas
     * const empresa = await prisma.empresa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EmpresaUpdateManyArgs>(args: SelectSubset<T, EmpresaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Empresas and returns the data updated in the database.
     * @param {EmpresaUpdateManyAndReturnArgs} args - Arguments to update many Empresas.
     * @example
     * // Update many Empresas
     * const empresa = await prisma.empresa.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Empresas and only return the `id`
     * const empresaWithIdOnly = await prisma.empresa.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EmpresaUpdateManyAndReturnArgs>(args: SelectSubset<T, EmpresaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Empresa.
     * @param {EmpresaUpsertArgs} args - Arguments to update or create a Empresa.
     * @example
     * // Update or create a Empresa
     * const empresa = await prisma.empresa.upsert({
     *   create: {
     *     // ... data to create a Empresa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Empresa we want to update
     *   }
     * })
     */
    upsert<T extends EmpresaUpsertArgs>(args: SelectSubset<T, EmpresaUpsertArgs<ExtArgs>>): Prisma__EmpresaClient<$Result.GetResult<Prisma.$EmpresaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Empresas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaCountArgs} args - Arguments to filter Empresas to count.
     * @example
     * // Count the number of Empresas
     * const count = await prisma.empresa.count({
     *   where: {
     *     // ... the filter for the Empresas we want to count
     *   }
     * })
    **/
    count<T extends EmpresaCountArgs>(
      args?: Subset<T, EmpresaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmpresaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EmpresaAggregateArgs>(args: Subset<T, EmpresaAggregateArgs>): Prisma.PrismaPromise<GetEmpresaAggregateType<T>>

    /**
     * Group by Empresa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmpresaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EmpresaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmpresaGroupByArgs['orderBy'] }
        : { orderBy?: EmpresaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EmpresaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmpresaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Empresa model
   */
  readonly fields: EmpresaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Empresa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmpresaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Empresa model
   */
  interface EmpresaFieldRefs {
    readonly id: FieldRef<"Empresa", 'String'>
    readonly nombre: FieldRef<"Empresa", 'String'>
    readonly cif: FieldRef<"Empresa", 'String'>
    readonly direccion: FieldRef<"Empresa", 'String'>
    readonly email: FieldRef<"Empresa", 'String'>
    readonly telefono: FieldRef<"Empresa", 'String'>
    readonly logoUrl: FieldRef<"Empresa", 'String'>
    readonly createdAt: FieldRef<"Empresa", 'DateTime'>
    readonly updatedAt: FieldRef<"Empresa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Empresa findUnique
   */
  export type EmpresaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa findUniqueOrThrow
   */
  export type EmpresaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa findFirst
   */
  export type EmpresaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa findFirstOrThrow
   */
  export type EmpresaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Filter, which Empresa to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Empresas.
     */
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa findMany
   */
  export type EmpresaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Filter, which Empresas to fetch.
     */
    where?: EmpresaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Empresas to fetch.
     */
    orderBy?: EmpresaOrderByWithRelationInput | EmpresaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Empresas.
     */
    cursor?: EmpresaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Empresas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Empresas.
     */
    skip?: number
    distinct?: EmpresaScalarFieldEnum | EmpresaScalarFieldEnum[]
  }

  /**
   * Empresa create
   */
  export type EmpresaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The data needed to create a Empresa.
     */
    data: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
  }

  /**
   * Empresa createMany
   */
  export type EmpresaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Empresas.
     */
    data: EmpresaCreateManyInput | EmpresaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Empresa createManyAndReturn
   */
  export type EmpresaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The data used to create many Empresas.
     */
    data: EmpresaCreateManyInput | EmpresaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Empresa update
   */
  export type EmpresaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The data needed to update a Empresa.
     */
    data: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
    /**
     * Choose, which Empresa to update.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa updateMany
   */
  export type EmpresaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Empresas.
     */
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyInput>
    /**
     * Filter which Empresas to update
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to update.
     */
    limit?: number
  }

  /**
   * Empresa updateManyAndReturn
   */
  export type EmpresaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The data used to update Empresas.
     */
    data: XOR<EmpresaUpdateManyMutationInput, EmpresaUncheckedUpdateManyInput>
    /**
     * Filter which Empresas to update
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to update.
     */
    limit?: number
  }

  /**
   * Empresa upsert
   */
  export type EmpresaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * The filter to search for the Empresa to update in case it exists.
     */
    where: EmpresaWhereUniqueInput
    /**
     * In case the Empresa found by the `where` argument doesn't exist, create a new Empresa with this data.
     */
    create: XOR<EmpresaCreateInput, EmpresaUncheckedCreateInput>
    /**
     * In case the Empresa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmpresaUpdateInput, EmpresaUncheckedUpdateInput>
  }

  /**
   * Empresa delete
   */
  export type EmpresaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
    /**
     * Filter which Empresa to delete.
     */
    where: EmpresaWhereUniqueInput
  }

  /**
   * Empresa deleteMany
   */
  export type EmpresaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Empresas to delete
     */
    where?: EmpresaWhereInput
    /**
     * Limit how many Empresas to delete.
     */
    limit?: number
  }

  /**
   * Empresa without action
   */
  export type EmpresaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Empresa
     */
    select?: EmpresaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Empresa
     */
    omit?: EmpresaOmit<ExtArgs> | null
  }


  /**
   * Model Categoria
   */

  export type AggregateCategoria = {
    _count: CategoriaCountAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  export type CategoriaMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoriaMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoriaCountAggregateOutputType = {
    id: number
    nombre: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoriaMinAggregateInputType = {
    id?: true
    nombre?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoriaMaxAggregateInputType = {
    id?: true
    nombre?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoriaCountAggregateInputType = {
    id?: true
    nombre?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categoria to aggregate.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categorias
    **/
    _count?: true | CategoriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriaMaxAggregateInputType
  }

  export type GetCategoriaAggregateType<T extends CategoriaAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria[P]>
      : GetScalarType<T[P], AggregateCategoria[P]>
  }




  export type CategoriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriaWhereInput
    orderBy?: CategoriaOrderByWithAggregationInput | CategoriaOrderByWithAggregationInput[]
    by: CategoriaScalarFieldEnum[] | CategoriaScalarFieldEnum
    having?: CategoriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriaCountAggregateInputType | true
    _min?: CategoriaMinAggregateInputType
    _max?: CategoriaMaxAggregateInputType
  }

  export type CategoriaGroupByOutputType = {
    id: string
    nombre: string
    createdAt: Date
    updatedAt: Date
    _count: CategoriaCountAggregateOutputType | null
    _min: CategoriaMinAggregateOutputType | null
    _max: CategoriaMaxAggregateOutputType | null
  }

  type GetCategoriaGroupByPayload<T extends CategoriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriaGroupByOutputType[P]>
        }
      >
    >


  export type CategoriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productos?: boolean | Categoria$productosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["categoria"]>

  export type CategoriaSelectScalar = {
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "createdAt" | "updatedAt", ExtArgs["result"]["categoria"]>
  export type CategoriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | Categoria$productosArgs<ExtArgs>
    _count?: boolean | CategoriaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoriaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CategoriaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Categoria"
    objects: {
      productos: Prisma.$ProductoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["categoria"]>
    composites: {}
  }

  type CategoriaGetPayload<S extends boolean | null | undefined | CategoriaDefaultArgs> = $Result.GetResult<Prisma.$CategoriaPayload, S>

  type CategoriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoriaCountAggregateInputType | true
    }

  export interface CategoriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Categoria'], meta: { name: 'Categoria' } }
    /**
     * Find zero or one Categoria that matches the filter.
     * @param {CategoriaFindUniqueArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriaFindUniqueArgs>(args: SelectSubset<T, CategoriaFindUniqueArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categoria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoriaFindUniqueOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriaFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriaFindFirstArgs>(args?: SelectSubset<T, CategoriaFindFirstArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindFirstOrThrowArgs} args - Arguments to find a Categoria
     * @example
     * // Get one Categoria
     * const categoria = await prisma.categoria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriaFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categorias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categorias
     * const categorias = await prisma.categoria.findMany()
     * 
     * // Get first 10 Categorias
     * const categorias = await prisma.categoria.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriaWithIdOnly = await prisma.categoria.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriaFindManyArgs>(args?: SelectSubset<T, CategoriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categoria.
     * @param {CategoriaCreateArgs} args - Arguments to create a Categoria.
     * @example
     * // Create one Categoria
     * const Categoria = await prisma.categoria.create({
     *   data: {
     *     // ... data to create a Categoria
     *   }
     * })
     * 
     */
    create<T extends CategoriaCreateArgs>(args: SelectSubset<T, CategoriaCreateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categorias.
     * @param {CategoriaCreateManyArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriaCreateManyArgs>(args?: SelectSubset<T, CategoriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categorias and returns the data saved in the database.
     * @param {CategoriaCreateManyAndReturnArgs} args - Arguments to create many Categorias.
     * @example
     * // Create many Categorias
     * const categoria = await prisma.categoria.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoriaCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoriaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categoria.
     * @param {CategoriaDeleteArgs} args - Arguments to delete one Categoria.
     * @example
     * // Delete one Categoria
     * const Categoria = await prisma.categoria.delete({
     *   where: {
     *     // ... filter to delete one Categoria
     *   }
     * })
     * 
     */
    delete<T extends CategoriaDeleteArgs>(args: SelectSubset<T, CategoriaDeleteArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categoria.
     * @param {CategoriaUpdateArgs} args - Arguments to update one Categoria.
     * @example
     * // Update one Categoria
     * const categoria = await prisma.categoria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriaUpdateArgs>(args: SelectSubset<T, CategoriaUpdateArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categorias.
     * @param {CategoriaDeleteManyArgs} args - Arguments to filter Categorias to delete.
     * @example
     * // Delete a few Categorias
     * const { count } = await prisma.categoria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriaDeleteManyArgs>(args?: SelectSubset<T, CategoriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriaUpdateManyArgs>(args: SelectSubset<T, CategoriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categorias and returns the data updated in the database.
     * @param {CategoriaUpdateManyAndReturnArgs} args - Arguments to update many Categorias.
     * @example
     * // Update many Categorias
     * const categoria = await prisma.categoria.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categorias and only return the `id`
     * const categoriaWithIdOnly = await prisma.categoria.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoriaUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoriaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categoria.
     * @param {CategoriaUpsertArgs} args - Arguments to update or create a Categoria.
     * @example
     * // Update or create a Categoria
     * const categoria = await prisma.categoria.upsert({
     *   create: {
     *     // ... data to create a Categoria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria we want to update
     *   }
     * })
     */
    upsert<T extends CategoriaUpsertArgs>(args: SelectSubset<T, CategoriaUpsertArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categorias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaCountArgs} args - Arguments to filter Categorias to count.
     * @example
     * // Count the number of Categorias
     * const count = await prisma.categoria.count({
     *   where: {
     *     // ... the filter for the Categorias we want to count
     *   }
     * })
    **/
    count<T extends CategoriaCountArgs>(
      args?: Subset<T, CategoriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriaAggregateArgs>(args: Subset<T, CategoriaAggregateArgs>): Prisma.PrismaPromise<GetCategoriaAggregateType<T>>

    /**
     * Group by Categoria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriaGroupByArgs['orderBy'] }
        : { orderBy?: CategoriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Categoria model
   */
  readonly fields: CategoriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Categoria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    productos<T extends Categoria$productosArgs<ExtArgs> = {}>(args?: Subset<T, Categoria$productosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Categoria model
   */
  interface CategoriaFieldRefs {
    readonly id: FieldRef<"Categoria", 'String'>
    readonly nombre: FieldRef<"Categoria", 'String'>
    readonly createdAt: FieldRef<"Categoria", 'DateTime'>
    readonly updatedAt: FieldRef<"Categoria", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Categoria findUnique
   */
  export type CategoriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findUniqueOrThrow
   */
  export type CategoriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria findFirst
   */
  export type CategoriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findFirstOrThrow
   */
  export type CategoriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categoria to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categorias.
     */
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria findMany
   */
  export type CategoriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter, which Categorias to fetch.
     */
    where?: CategoriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categorias to fetch.
     */
    orderBy?: CategoriaOrderByWithRelationInput | CategoriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categorias.
     */
    cursor?: CategoriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categorias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categorias.
     */
    skip?: number
    distinct?: CategoriaScalarFieldEnum | CategoriaScalarFieldEnum[]
  }

  /**
   * Categoria create
   */
  export type CategoriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to create a Categoria.
     */
    data: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
  }

  /**
   * Categoria createMany
   */
  export type CategoriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria createManyAndReturn
   */
  export type CategoriaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to create many Categorias.
     */
    data: CategoriaCreateManyInput | CategoriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Categoria update
   */
  export type CategoriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The data needed to update a Categoria.
     */
    data: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
    /**
     * Choose, which Categoria to update.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria updateMany
   */
  export type CategoriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria updateManyAndReturn
   */
  export type CategoriaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * The data used to update Categorias.
     */
    data: XOR<CategoriaUpdateManyMutationInput, CategoriaUncheckedUpdateManyInput>
    /**
     * Filter which Categorias to update
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to update.
     */
    limit?: number
  }

  /**
   * Categoria upsert
   */
  export type CategoriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * The filter to search for the Categoria to update in case it exists.
     */
    where: CategoriaWhereUniqueInput
    /**
     * In case the Categoria found by the `where` argument doesn't exist, create a new Categoria with this data.
     */
    create: XOR<CategoriaCreateInput, CategoriaUncheckedCreateInput>
    /**
     * In case the Categoria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriaUpdateInput, CategoriaUncheckedUpdateInput>
  }

  /**
   * Categoria delete
   */
  export type CategoriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
    /**
     * Filter which Categoria to delete.
     */
    where: CategoriaWhereUniqueInput
  }

  /**
   * Categoria deleteMany
   */
  export type CategoriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categorias to delete
     */
    where?: CategoriaWhereInput
    /**
     * Limit how many Categorias to delete.
     */
    limit?: number
  }

  /**
   * Categoria.productos
   */
  export type Categoria$productosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    cursor?: ProductoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Categoria without action
   */
  export type CategoriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Categoria
     */
    select?: CategoriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Categoria
     */
    omit?: CategoriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriaInclude<ExtArgs> | null
  }


  /**
   * Model Marca
   */

  export type AggregateMarca = {
    _count: MarcaCountAggregateOutputType | null
    _min: MarcaMinAggregateOutputType | null
    _max: MarcaMaxAggregateOutputType | null
  }

  export type MarcaMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarcaMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarcaCountAggregateOutputType = {
    id: number
    nombre: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MarcaMinAggregateInputType = {
    id?: true
    nombre?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarcaMaxAggregateInputType = {
    id?: true
    nombre?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarcaCountAggregateInputType = {
    id?: true
    nombre?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MarcaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Marca to aggregate.
     */
    where?: MarcaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marcas to fetch.
     */
    orderBy?: MarcaOrderByWithRelationInput | MarcaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarcaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marcas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marcas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Marcas
    **/
    _count?: true | MarcaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarcaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarcaMaxAggregateInputType
  }

  export type GetMarcaAggregateType<T extends MarcaAggregateArgs> = {
        [P in keyof T & keyof AggregateMarca]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarca[P]>
      : GetScalarType<T[P], AggregateMarca[P]>
  }




  export type MarcaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarcaWhereInput
    orderBy?: MarcaOrderByWithAggregationInput | MarcaOrderByWithAggregationInput[]
    by: MarcaScalarFieldEnum[] | MarcaScalarFieldEnum
    having?: MarcaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarcaCountAggregateInputType | true
    _min?: MarcaMinAggregateInputType
    _max?: MarcaMaxAggregateInputType
  }

  export type MarcaGroupByOutputType = {
    id: string
    nombre: string
    createdAt: Date
    updatedAt: Date
    _count: MarcaCountAggregateOutputType | null
    _min: MarcaMinAggregateOutputType | null
    _max: MarcaMaxAggregateOutputType | null
  }

  type GetMarcaGroupByPayload<T extends MarcaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarcaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarcaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarcaGroupByOutputType[P]>
            : GetScalarType<T[P], MarcaGroupByOutputType[P]>
        }
      >
    >


  export type MarcaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    productos?: boolean | Marca$productosArgs<ExtArgs>
    _count?: boolean | MarcaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marca"]>

  export type MarcaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["marca"]>

  export type MarcaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["marca"]>

  export type MarcaSelectScalar = {
    id?: boolean
    nombre?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MarcaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "createdAt" | "updatedAt", ExtArgs["result"]["marca"]>
  export type MarcaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | Marca$productosArgs<ExtArgs>
    _count?: boolean | MarcaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MarcaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MarcaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MarcaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Marca"
    objects: {
      productos: Prisma.$ProductoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["marca"]>
    composites: {}
  }

  type MarcaGetPayload<S extends boolean | null | undefined | MarcaDefaultArgs> = $Result.GetResult<Prisma.$MarcaPayload, S>

  type MarcaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarcaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarcaCountAggregateInputType | true
    }

  export interface MarcaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Marca'], meta: { name: 'Marca' } }
    /**
     * Find zero or one Marca that matches the filter.
     * @param {MarcaFindUniqueArgs} args - Arguments to find a Marca
     * @example
     * // Get one Marca
     * const marca = await prisma.marca.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarcaFindUniqueArgs>(args: SelectSubset<T, MarcaFindUniqueArgs<ExtArgs>>): Prisma__MarcaClient<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Marca that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarcaFindUniqueOrThrowArgs} args - Arguments to find a Marca
     * @example
     * // Get one Marca
     * const marca = await prisma.marca.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarcaFindUniqueOrThrowArgs>(args: SelectSubset<T, MarcaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarcaClient<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Marca that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaFindFirstArgs} args - Arguments to find a Marca
     * @example
     * // Get one Marca
     * const marca = await prisma.marca.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarcaFindFirstArgs>(args?: SelectSubset<T, MarcaFindFirstArgs<ExtArgs>>): Prisma__MarcaClient<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Marca that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaFindFirstOrThrowArgs} args - Arguments to find a Marca
     * @example
     * // Get one Marca
     * const marca = await prisma.marca.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarcaFindFirstOrThrowArgs>(args?: SelectSubset<T, MarcaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarcaClient<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Marcas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Marcas
     * const marcas = await prisma.marca.findMany()
     * 
     * // Get first 10 Marcas
     * const marcas = await prisma.marca.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marcaWithIdOnly = await prisma.marca.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarcaFindManyArgs>(args?: SelectSubset<T, MarcaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Marca.
     * @param {MarcaCreateArgs} args - Arguments to create a Marca.
     * @example
     * // Create one Marca
     * const Marca = await prisma.marca.create({
     *   data: {
     *     // ... data to create a Marca
     *   }
     * })
     * 
     */
    create<T extends MarcaCreateArgs>(args: SelectSubset<T, MarcaCreateArgs<ExtArgs>>): Prisma__MarcaClient<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Marcas.
     * @param {MarcaCreateManyArgs} args - Arguments to create many Marcas.
     * @example
     * // Create many Marcas
     * const marca = await prisma.marca.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarcaCreateManyArgs>(args?: SelectSubset<T, MarcaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Marcas and returns the data saved in the database.
     * @param {MarcaCreateManyAndReturnArgs} args - Arguments to create many Marcas.
     * @example
     * // Create many Marcas
     * const marca = await prisma.marca.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Marcas and only return the `id`
     * const marcaWithIdOnly = await prisma.marca.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarcaCreateManyAndReturnArgs>(args?: SelectSubset<T, MarcaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Marca.
     * @param {MarcaDeleteArgs} args - Arguments to delete one Marca.
     * @example
     * // Delete one Marca
     * const Marca = await prisma.marca.delete({
     *   where: {
     *     // ... filter to delete one Marca
     *   }
     * })
     * 
     */
    delete<T extends MarcaDeleteArgs>(args: SelectSubset<T, MarcaDeleteArgs<ExtArgs>>): Prisma__MarcaClient<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Marca.
     * @param {MarcaUpdateArgs} args - Arguments to update one Marca.
     * @example
     * // Update one Marca
     * const marca = await prisma.marca.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarcaUpdateArgs>(args: SelectSubset<T, MarcaUpdateArgs<ExtArgs>>): Prisma__MarcaClient<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Marcas.
     * @param {MarcaDeleteManyArgs} args - Arguments to filter Marcas to delete.
     * @example
     * // Delete a few Marcas
     * const { count } = await prisma.marca.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarcaDeleteManyArgs>(args?: SelectSubset<T, MarcaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Marcas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Marcas
     * const marca = await prisma.marca.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarcaUpdateManyArgs>(args: SelectSubset<T, MarcaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Marcas and returns the data updated in the database.
     * @param {MarcaUpdateManyAndReturnArgs} args - Arguments to update many Marcas.
     * @example
     * // Update many Marcas
     * const marca = await prisma.marca.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Marcas and only return the `id`
     * const marcaWithIdOnly = await prisma.marca.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarcaUpdateManyAndReturnArgs>(args: SelectSubset<T, MarcaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Marca.
     * @param {MarcaUpsertArgs} args - Arguments to update or create a Marca.
     * @example
     * // Update or create a Marca
     * const marca = await prisma.marca.upsert({
     *   create: {
     *     // ... data to create a Marca
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Marca we want to update
     *   }
     * })
     */
    upsert<T extends MarcaUpsertArgs>(args: SelectSubset<T, MarcaUpsertArgs<ExtArgs>>): Prisma__MarcaClient<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Marcas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaCountArgs} args - Arguments to filter Marcas to count.
     * @example
     * // Count the number of Marcas
     * const count = await prisma.marca.count({
     *   where: {
     *     // ... the filter for the Marcas we want to count
     *   }
     * })
    **/
    count<T extends MarcaCountArgs>(
      args?: Subset<T, MarcaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarcaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Marca.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarcaAggregateArgs>(args: Subset<T, MarcaAggregateArgs>): Prisma.PrismaPromise<GetMarcaAggregateType<T>>

    /**
     * Group by Marca.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarcaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarcaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarcaGroupByArgs['orderBy'] }
        : { orderBy?: MarcaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarcaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarcaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Marca model
   */
  readonly fields: MarcaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Marca.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarcaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    productos<T extends Marca$productosArgs<ExtArgs> = {}>(args?: Subset<T, Marca$productosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Marca model
   */
  interface MarcaFieldRefs {
    readonly id: FieldRef<"Marca", 'String'>
    readonly nombre: FieldRef<"Marca", 'String'>
    readonly createdAt: FieldRef<"Marca", 'DateTime'>
    readonly updatedAt: FieldRef<"Marca", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Marca findUnique
   */
  export type MarcaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
    /**
     * Filter, which Marca to fetch.
     */
    where: MarcaWhereUniqueInput
  }

  /**
   * Marca findUniqueOrThrow
   */
  export type MarcaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
    /**
     * Filter, which Marca to fetch.
     */
    where: MarcaWhereUniqueInput
  }

  /**
   * Marca findFirst
   */
  export type MarcaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
    /**
     * Filter, which Marca to fetch.
     */
    where?: MarcaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marcas to fetch.
     */
    orderBy?: MarcaOrderByWithRelationInput | MarcaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Marcas.
     */
    cursor?: MarcaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marcas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marcas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Marcas.
     */
    distinct?: MarcaScalarFieldEnum | MarcaScalarFieldEnum[]
  }

  /**
   * Marca findFirstOrThrow
   */
  export type MarcaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
    /**
     * Filter, which Marca to fetch.
     */
    where?: MarcaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marcas to fetch.
     */
    orderBy?: MarcaOrderByWithRelationInput | MarcaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Marcas.
     */
    cursor?: MarcaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marcas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marcas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Marcas.
     */
    distinct?: MarcaScalarFieldEnum | MarcaScalarFieldEnum[]
  }

  /**
   * Marca findMany
   */
  export type MarcaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
    /**
     * Filter, which Marcas to fetch.
     */
    where?: MarcaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marcas to fetch.
     */
    orderBy?: MarcaOrderByWithRelationInput | MarcaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Marcas.
     */
    cursor?: MarcaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marcas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marcas.
     */
    skip?: number
    distinct?: MarcaScalarFieldEnum | MarcaScalarFieldEnum[]
  }

  /**
   * Marca create
   */
  export type MarcaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
    /**
     * The data needed to create a Marca.
     */
    data: XOR<MarcaCreateInput, MarcaUncheckedCreateInput>
  }

  /**
   * Marca createMany
   */
  export type MarcaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Marcas.
     */
    data: MarcaCreateManyInput | MarcaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Marca createManyAndReturn
   */
  export type MarcaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * The data used to create many Marcas.
     */
    data: MarcaCreateManyInput | MarcaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Marca update
   */
  export type MarcaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
    /**
     * The data needed to update a Marca.
     */
    data: XOR<MarcaUpdateInput, MarcaUncheckedUpdateInput>
    /**
     * Choose, which Marca to update.
     */
    where: MarcaWhereUniqueInput
  }

  /**
   * Marca updateMany
   */
  export type MarcaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Marcas.
     */
    data: XOR<MarcaUpdateManyMutationInput, MarcaUncheckedUpdateManyInput>
    /**
     * Filter which Marcas to update
     */
    where?: MarcaWhereInput
    /**
     * Limit how many Marcas to update.
     */
    limit?: number
  }

  /**
   * Marca updateManyAndReturn
   */
  export type MarcaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * The data used to update Marcas.
     */
    data: XOR<MarcaUpdateManyMutationInput, MarcaUncheckedUpdateManyInput>
    /**
     * Filter which Marcas to update
     */
    where?: MarcaWhereInput
    /**
     * Limit how many Marcas to update.
     */
    limit?: number
  }

  /**
   * Marca upsert
   */
  export type MarcaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
    /**
     * The filter to search for the Marca to update in case it exists.
     */
    where: MarcaWhereUniqueInput
    /**
     * In case the Marca found by the `where` argument doesn't exist, create a new Marca with this data.
     */
    create: XOR<MarcaCreateInput, MarcaUncheckedCreateInput>
    /**
     * In case the Marca was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarcaUpdateInput, MarcaUncheckedUpdateInput>
  }

  /**
   * Marca delete
   */
  export type MarcaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
    /**
     * Filter which Marca to delete.
     */
    where: MarcaWhereUniqueInput
  }

  /**
   * Marca deleteMany
   */
  export type MarcaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Marcas to delete
     */
    where?: MarcaWhereInput
    /**
     * Limit how many Marcas to delete.
     */
    limit?: number
  }

  /**
   * Marca.productos
   */
  export type Marca$productosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    cursor?: ProductoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Marca without action
   */
  export type MarcaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
  }


  /**
   * Model Producto
   */

  export type AggregateProducto = {
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  export type ProductoAvgAggregateOutputType = {
    stock: number | null
    precio: number | null
    precioCompra: number | null
    precioAlquiler: number | null
  }

  export type ProductoSumAggregateOutputType = {
    stock: number | null
    precio: number | null
    precioCompra: number | null
    precioAlquiler: number | null
  }

  export type ProductoMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    marcaId: string | null
    modelo: string | null
    descripcion: string | null
    stock: number | null
    precio: number | null
    precioCompra: number | null
    precioAlquiler: number | null
    categoriaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductoMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    marcaId: string | null
    modelo: string | null
    descripcion: string | null
    stock: number | null
    precio: number | null
    precioCompra: number | null
    precioAlquiler: number | null
    categoriaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductoCountAggregateOutputType = {
    id: number
    nombre: number
    marcaId: number
    modelo: number
    descripcion: number
    stock: number
    precio: number
    precioCompra: number
    precioAlquiler: number
    categoriaId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductoAvgAggregateInputType = {
    stock?: true
    precio?: true
    precioCompra?: true
    precioAlquiler?: true
  }

  export type ProductoSumAggregateInputType = {
    stock?: true
    precio?: true
    precioCompra?: true
    precioAlquiler?: true
  }

  export type ProductoMinAggregateInputType = {
    id?: true
    nombre?: true
    marcaId?: true
    modelo?: true
    descripcion?: true
    stock?: true
    precio?: true
    precioCompra?: true
    precioAlquiler?: true
    categoriaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductoMaxAggregateInputType = {
    id?: true
    nombre?: true
    marcaId?: true
    modelo?: true
    descripcion?: true
    stock?: true
    precio?: true
    precioCompra?: true
    precioAlquiler?: true
    categoriaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductoCountAggregateInputType = {
    id?: true
    nombre?: true
    marcaId?: true
    modelo?: true
    descripcion?: true
    stock?: true
    precio?: true
    precioCompra?: true
    precioAlquiler?: true
    categoriaId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Producto to aggregate.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Productos
    **/
    _count?: true | ProductoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductoMaxAggregateInputType
  }

  export type GetProductoAggregateType<T extends ProductoAggregateArgs> = {
        [P in keyof T & keyof AggregateProducto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducto[P]>
      : GetScalarType<T[P], AggregateProducto[P]>
  }




  export type ProductoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductoWhereInput
    orderBy?: ProductoOrderByWithAggregationInput | ProductoOrderByWithAggregationInput[]
    by: ProductoScalarFieldEnum[] | ProductoScalarFieldEnum
    having?: ProductoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductoCountAggregateInputType | true
    _avg?: ProductoAvgAggregateInputType
    _sum?: ProductoSumAggregateInputType
    _min?: ProductoMinAggregateInputType
    _max?: ProductoMaxAggregateInputType
  }

  export type ProductoGroupByOutputType = {
    id: string
    nombre: string
    marcaId: string | null
    modelo: string | null
    descripcion: string | null
    stock: number
    precio: number
    precioCompra: number | null
    precioAlquiler: number | null
    categoriaId: string
    createdAt: Date
    updatedAt: Date
    _count: ProductoCountAggregateOutputType | null
    _avg: ProductoAvgAggregateOutputType | null
    _sum: ProductoSumAggregateOutputType | null
    _min: ProductoMinAggregateOutputType | null
    _max: ProductoMaxAggregateOutputType | null
  }

  type GetProductoGroupByPayload<T extends ProductoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductoGroupByOutputType[P]>
            : GetScalarType<T[P], ProductoGroupByOutputType[P]>
        }
      >
    >


  export type ProductoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    marcaId?: boolean
    modelo?: boolean
    descripcion?: boolean
    stock?: boolean
    precio?: boolean
    precioCompra?: boolean
    precioAlquiler?: boolean
    categoriaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    marca?: boolean | Producto$marcaArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    itemsPresupuesto?: boolean | Producto$itemsPresupuestoArgs<ExtArgs>
    itemsFactura?: boolean | Producto$itemsFacturaArgs<ExtArgs>
    equipoItems?: boolean | Producto$equipoItemsArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    marcaId?: boolean
    modelo?: boolean
    descripcion?: boolean
    stock?: boolean
    precio?: boolean
    precioCompra?: boolean
    precioAlquiler?: boolean
    categoriaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    marca?: boolean | Producto$marcaArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    marcaId?: boolean
    modelo?: boolean
    descripcion?: boolean
    stock?: boolean
    precio?: boolean
    precioCompra?: boolean
    precioAlquiler?: boolean
    categoriaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    marca?: boolean | Producto$marcaArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto"]>

  export type ProductoSelectScalar = {
    id?: boolean
    nombre?: boolean
    marcaId?: boolean
    modelo?: boolean
    descripcion?: boolean
    stock?: boolean
    precio?: boolean
    precioCompra?: boolean
    precioAlquiler?: boolean
    categoriaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "marcaId" | "modelo" | "descripcion" | "stock" | "precio" | "precioCompra" | "precioAlquiler" | "categoriaId" | "createdAt" | "updatedAt", ExtArgs["result"]["producto"]>
  export type ProductoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    marca?: boolean | Producto$marcaArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
    itemsPresupuesto?: boolean | Producto$itemsPresupuestoArgs<ExtArgs>
    itemsFactura?: boolean | Producto$itemsFacturaArgs<ExtArgs>
    equipoItems?: boolean | Producto$equipoItemsArgs<ExtArgs>
    _count?: boolean | ProductoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    marca?: boolean | Producto$marcaArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }
  export type ProductoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    marca?: boolean | Producto$marcaArgs<ExtArgs>
    categoria?: boolean | CategoriaDefaultArgs<ExtArgs>
  }

  export type $ProductoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Producto"
    objects: {
      marca: Prisma.$MarcaPayload<ExtArgs> | null
      categoria: Prisma.$CategoriaPayload<ExtArgs>
      itemsPresupuesto: Prisma.$ItemPresupuestoPayload<ExtArgs>[]
      itemsFactura: Prisma.$ItemFacturaPayload<ExtArgs>[]
      equipoItems: Prisma.$EquipoItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      marcaId: string | null
      modelo: string | null
      descripcion: string | null
      stock: number
      precio: number
      precioCompra: number | null
      precioAlquiler: number | null
      categoriaId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["producto"]>
    composites: {}
  }

  type ProductoGetPayload<S extends boolean | null | undefined | ProductoDefaultArgs> = $Result.GetResult<Prisma.$ProductoPayload, S>

  type ProductoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductoCountAggregateInputType | true
    }

  export interface ProductoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Producto'], meta: { name: 'Producto' } }
    /**
     * Find zero or one Producto that matches the filter.
     * @param {ProductoFindUniqueArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductoFindUniqueArgs>(args: SelectSubset<T, ProductoFindUniqueArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Producto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductoFindUniqueOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductoFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindFirstArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductoFindFirstArgs>(args?: SelectSubset<T, ProductoFindFirstArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindFirstOrThrowArgs} args - Arguments to find a Producto
     * @example
     * // Get one Producto
     * const producto = await prisma.producto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductoFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Productos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Productos
     * const productos = await prisma.producto.findMany()
     * 
     * // Get first 10 Productos
     * const productos = await prisma.producto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productoWithIdOnly = await prisma.producto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductoFindManyArgs>(args?: SelectSubset<T, ProductoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Producto.
     * @param {ProductoCreateArgs} args - Arguments to create a Producto.
     * @example
     * // Create one Producto
     * const Producto = await prisma.producto.create({
     *   data: {
     *     // ... data to create a Producto
     *   }
     * })
     * 
     */
    create<T extends ProductoCreateArgs>(args: SelectSubset<T, ProductoCreateArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Productos.
     * @param {ProductoCreateManyArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductoCreateManyArgs>(args?: SelectSubset<T, ProductoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Productos and returns the data saved in the database.
     * @param {ProductoCreateManyAndReturnArgs} args - Arguments to create many Productos.
     * @example
     * // Create many Productos
     * const producto = await prisma.producto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Productos and only return the `id`
     * const productoWithIdOnly = await prisma.producto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductoCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Producto.
     * @param {ProductoDeleteArgs} args - Arguments to delete one Producto.
     * @example
     * // Delete one Producto
     * const Producto = await prisma.producto.delete({
     *   where: {
     *     // ... filter to delete one Producto
     *   }
     * })
     * 
     */
    delete<T extends ProductoDeleteArgs>(args: SelectSubset<T, ProductoDeleteArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Producto.
     * @param {ProductoUpdateArgs} args - Arguments to update one Producto.
     * @example
     * // Update one Producto
     * const producto = await prisma.producto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductoUpdateArgs>(args: SelectSubset<T, ProductoUpdateArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Productos.
     * @param {ProductoDeleteManyArgs} args - Arguments to filter Productos to delete.
     * @example
     * // Delete a few Productos
     * const { count } = await prisma.producto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductoDeleteManyArgs>(args?: SelectSubset<T, ProductoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Productos
     * const producto = await prisma.producto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductoUpdateManyArgs>(args: SelectSubset<T, ProductoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Productos and returns the data updated in the database.
     * @param {ProductoUpdateManyAndReturnArgs} args - Arguments to update many Productos.
     * @example
     * // Update many Productos
     * const producto = await prisma.producto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Productos and only return the `id`
     * const productoWithIdOnly = await prisma.producto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductoUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Producto.
     * @param {ProductoUpsertArgs} args - Arguments to update or create a Producto.
     * @example
     * // Update or create a Producto
     * const producto = await prisma.producto.upsert({
     *   create: {
     *     // ... data to create a Producto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Producto we want to update
     *   }
     * })
     */
    upsert<T extends ProductoUpsertArgs>(args: SelectSubset<T, ProductoUpsertArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Productos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoCountArgs} args - Arguments to filter Productos to count.
     * @example
     * // Count the number of Productos
     * const count = await prisma.producto.count({
     *   where: {
     *     // ... the filter for the Productos we want to count
     *   }
     * })
    **/
    count<T extends ProductoCountArgs>(
      args?: Subset<T, ProductoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductoAggregateArgs>(args: Subset<T, ProductoAggregateArgs>): Prisma.PrismaPromise<GetProductoAggregateType<T>>

    /**
     * Group by Producto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductoGroupByArgs['orderBy'] }
        : { orderBy?: ProductoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Producto model
   */
  readonly fields: ProductoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Producto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    marca<T extends Producto$marcaArgs<ExtArgs> = {}>(args?: Subset<T, Producto$marcaArgs<ExtArgs>>): Prisma__MarcaClient<$Result.GetResult<Prisma.$MarcaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    categoria<T extends CategoriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoriaDefaultArgs<ExtArgs>>): Prisma__CategoriaClient<$Result.GetResult<Prisma.$CategoriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    itemsPresupuesto<T extends Producto$itemsPresupuestoArgs<ExtArgs> = {}>(args?: Subset<T, Producto$itemsPresupuestoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    itemsFactura<T extends Producto$itemsFacturaArgs<ExtArgs> = {}>(args?: Subset<T, Producto$itemsFacturaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    equipoItems<T extends Producto$equipoItemsArgs<ExtArgs> = {}>(args?: Subset<T, Producto$equipoItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Producto model
   */
  interface ProductoFieldRefs {
    readonly id: FieldRef<"Producto", 'String'>
    readonly nombre: FieldRef<"Producto", 'String'>
    readonly marcaId: FieldRef<"Producto", 'String'>
    readonly modelo: FieldRef<"Producto", 'String'>
    readonly descripcion: FieldRef<"Producto", 'String'>
    readonly stock: FieldRef<"Producto", 'Int'>
    readonly precio: FieldRef<"Producto", 'Float'>
    readonly precioCompra: FieldRef<"Producto", 'Float'>
    readonly precioAlquiler: FieldRef<"Producto", 'Float'>
    readonly categoriaId: FieldRef<"Producto", 'String'>
    readonly createdAt: FieldRef<"Producto", 'DateTime'>
    readonly updatedAt: FieldRef<"Producto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Producto findUnique
   */
  export type ProductoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto findUniqueOrThrow
   */
  export type ProductoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto findFirst
   */
  export type ProductoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto findFirstOrThrow
   */
  export type ProductoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Producto to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Productos.
     */
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto findMany
   */
  export type ProductoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter, which Productos to fetch.
     */
    where?: ProductoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Productos to fetch.
     */
    orderBy?: ProductoOrderByWithRelationInput | ProductoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Productos.
     */
    cursor?: ProductoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Productos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Productos.
     */
    skip?: number
    distinct?: ProductoScalarFieldEnum | ProductoScalarFieldEnum[]
  }

  /**
   * Producto create
   */
  export type ProductoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The data needed to create a Producto.
     */
    data: XOR<ProductoCreateInput, ProductoUncheckedCreateInput>
  }

  /**
   * Producto createMany
   */
  export type ProductoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Productos.
     */
    data: ProductoCreateManyInput | ProductoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Producto createManyAndReturn
   */
  export type ProductoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * The data used to create many Productos.
     */
    data: ProductoCreateManyInput | ProductoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Producto update
   */
  export type ProductoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The data needed to update a Producto.
     */
    data: XOR<ProductoUpdateInput, ProductoUncheckedUpdateInput>
    /**
     * Choose, which Producto to update.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto updateMany
   */
  export type ProductoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Productos.
     */
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyInput>
    /**
     * Filter which Productos to update
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to update.
     */
    limit?: number
  }

  /**
   * Producto updateManyAndReturn
   */
  export type ProductoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * The data used to update Productos.
     */
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyInput>
    /**
     * Filter which Productos to update
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Producto upsert
   */
  export type ProductoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * The filter to search for the Producto to update in case it exists.
     */
    where: ProductoWhereUniqueInput
    /**
     * In case the Producto found by the `where` argument doesn't exist, create a new Producto with this data.
     */
    create: XOR<ProductoCreateInput, ProductoUncheckedCreateInput>
    /**
     * In case the Producto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductoUpdateInput, ProductoUncheckedUpdateInput>
  }

  /**
   * Producto delete
   */
  export type ProductoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
    /**
     * Filter which Producto to delete.
     */
    where: ProductoWhereUniqueInput
  }

  /**
   * Producto deleteMany
   */
  export type ProductoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Productos to delete
     */
    where?: ProductoWhereInput
    /**
     * Limit how many Productos to delete.
     */
    limit?: number
  }

  /**
   * Producto.marca
   */
  export type Producto$marcaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Marca
     */
    select?: MarcaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Marca
     */
    omit?: MarcaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarcaInclude<ExtArgs> | null
    where?: MarcaWhereInput
  }

  /**
   * Producto.itemsPresupuesto
   */
  export type Producto$itemsPresupuestoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    where?: ItemPresupuestoWhereInput
    orderBy?: ItemPresupuestoOrderByWithRelationInput | ItemPresupuestoOrderByWithRelationInput[]
    cursor?: ItemPresupuestoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemPresupuestoScalarFieldEnum | ItemPresupuestoScalarFieldEnum[]
  }

  /**
   * Producto.itemsFactura
   */
  export type Producto$itemsFacturaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    where?: ItemFacturaWhereInput
    orderBy?: ItemFacturaOrderByWithRelationInput | ItemFacturaOrderByWithRelationInput[]
    cursor?: ItemFacturaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemFacturaScalarFieldEnum | ItemFacturaScalarFieldEnum[]
  }

  /**
   * Producto.equipoItems
   */
  export type Producto$equipoItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
    where?: EquipoItemWhereInput
    orderBy?: EquipoItemOrderByWithRelationInput | EquipoItemOrderByWithRelationInput[]
    cursor?: EquipoItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EquipoItemScalarFieldEnum | EquipoItemScalarFieldEnum[]
  }

  /**
   * Producto without action
   */
  export type ProductoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto
     */
    select?: ProductoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Producto
     */
    omit?: ProductoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductoInclude<ExtArgs> | null
  }


  /**
   * Model EquipoItem
   */

  export type AggregateEquipoItem = {
    _count: EquipoItemCountAggregateOutputType | null
    _avg: EquipoItemAvgAggregateOutputType | null
    _sum: EquipoItemSumAggregateOutputType | null
    _min: EquipoItemMinAggregateOutputType | null
    _max: EquipoItemMaxAggregateOutputType | null
  }

  export type EquipoItemAvgAggregateOutputType = {
    precioCompra: number | null
  }

  export type EquipoItemSumAggregateOutputType = {
    precioCompra: number | null
  }

  export type EquipoItemMinAggregateOutputType = {
    id: string | null
    productoId: string | null
    numeroSerie: string | null
    notasInternas: string | null
    estado: $Enums.EstadoEquipo | null
    fechaCompra: Date | null
    precioCompra: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EquipoItemMaxAggregateOutputType = {
    id: string | null
    productoId: string | null
    numeroSerie: string | null
    notasInternas: string | null
    estado: $Enums.EstadoEquipo | null
    fechaCompra: Date | null
    precioCompra: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EquipoItemCountAggregateOutputType = {
    id: number
    productoId: number
    numeroSerie: number
    notasInternas: number
    estado: number
    fechaCompra: number
    precioCompra: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EquipoItemAvgAggregateInputType = {
    precioCompra?: true
  }

  export type EquipoItemSumAggregateInputType = {
    precioCompra?: true
  }

  export type EquipoItemMinAggregateInputType = {
    id?: true
    productoId?: true
    numeroSerie?: true
    notasInternas?: true
    estado?: true
    fechaCompra?: true
    precioCompra?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EquipoItemMaxAggregateInputType = {
    id?: true
    productoId?: true
    numeroSerie?: true
    notasInternas?: true
    estado?: true
    fechaCompra?: true
    precioCompra?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EquipoItemCountAggregateInputType = {
    id?: true
    productoId?: true
    numeroSerie?: true
    notasInternas?: true
    estado?: true
    fechaCompra?: true
    precioCompra?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EquipoItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EquipoItem to aggregate.
     */
    where?: EquipoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EquipoItems to fetch.
     */
    orderBy?: EquipoItemOrderByWithRelationInput | EquipoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EquipoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EquipoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EquipoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EquipoItems
    **/
    _count?: true | EquipoItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EquipoItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EquipoItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EquipoItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EquipoItemMaxAggregateInputType
  }

  export type GetEquipoItemAggregateType<T extends EquipoItemAggregateArgs> = {
        [P in keyof T & keyof AggregateEquipoItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEquipoItem[P]>
      : GetScalarType<T[P], AggregateEquipoItem[P]>
  }




  export type EquipoItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EquipoItemWhereInput
    orderBy?: EquipoItemOrderByWithAggregationInput | EquipoItemOrderByWithAggregationInput[]
    by: EquipoItemScalarFieldEnum[] | EquipoItemScalarFieldEnum
    having?: EquipoItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EquipoItemCountAggregateInputType | true
    _avg?: EquipoItemAvgAggregateInputType
    _sum?: EquipoItemSumAggregateInputType
    _min?: EquipoItemMinAggregateInputType
    _max?: EquipoItemMaxAggregateInputType
  }

  export type EquipoItemGroupByOutputType = {
    id: string
    productoId: string
    numeroSerie: string | null
    notasInternas: string | null
    estado: $Enums.EstadoEquipo
    fechaCompra: Date | null
    precioCompra: number | null
    createdAt: Date
    updatedAt: Date
    _count: EquipoItemCountAggregateOutputType | null
    _avg: EquipoItemAvgAggregateOutputType | null
    _sum: EquipoItemSumAggregateOutputType | null
    _min: EquipoItemMinAggregateOutputType | null
    _max: EquipoItemMaxAggregateOutputType | null
  }

  type GetEquipoItemGroupByPayload<T extends EquipoItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EquipoItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EquipoItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EquipoItemGroupByOutputType[P]>
            : GetScalarType<T[P], EquipoItemGroupByOutputType[P]>
        }
      >
    >


  export type EquipoItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    numeroSerie?: boolean
    notasInternas?: boolean
    estado?: boolean
    fechaCompra?: boolean
    precioCompra?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["equipoItem"]>

  export type EquipoItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    numeroSerie?: boolean
    notasInternas?: boolean
    estado?: boolean
    fechaCompra?: boolean
    precioCompra?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["equipoItem"]>

  export type EquipoItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productoId?: boolean
    numeroSerie?: boolean
    notasInternas?: boolean
    estado?: boolean
    fechaCompra?: boolean
    precioCompra?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["equipoItem"]>

  export type EquipoItemSelectScalar = {
    id?: boolean
    productoId?: boolean
    numeroSerie?: boolean
    notasInternas?: boolean
    estado?: boolean
    fechaCompra?: boolean
    precioCompra?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EquipoItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "productoId" | "numeroSerie" | "notasInternas" | "estado" | "fechaCompra" | "precioCompra" | "createdAt" | "updatedAt", ExtArgs["result"]["equipoItem"]>
  export type EquipoItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type EquipoItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type EquipoItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }

  export type $EquipoItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EquipoItem"
    objects: {
      producto: Prisma.$ProductoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productoId: string
      numeroSerie: string | null
      notasInternas: string | null
      estado: $Enums.EstadoEquipo
      fechaCompra: Date | null
      precioCompra: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["equipoItem"]>
    composites: {}
  }

  type EquipoItemGetPayload<S extends boolean | null | undefined | EquipoItemDefaultArgs> = $Result.GetResult<Prisma.$EquipoItemPayload, S>

  type EquipoItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EquipoItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EquipoItemCountAggregateInputType | true
    }

  export interface EquipoItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EquipoItem'], meta: { name: 'EquipoItem' } }
    /**
     * Find zero or one EquipoItem that matches the filter.
     * @param {EquipoItemFindUniqueArgs} args - Arguments to find a EquipoItem
     * @example
     * // Get one EquipoItem
     * const equipoItem = await prisma.equipoItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EquipoItemFindUniqueArgs>(args: SelectSubset<T, EquipoItemFindUniqueArgs<ExtArgs>>): Prisma__EquipoItemClient<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EquipoItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EquipoItemFindUniqueOrThrowArgs} args - Arguments to find a EquipoItem
     * @example
     * // Get one EquipoItem
     * const equipoItem = await prisma.equipoItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EquipoItemFindUniqueOrThrowArgs>(args: SelectSubset<T, EquipoItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EquipoItemClient<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EquipoItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoItemFindFirstArgs} args - Arguments to find a EquipoItem
     * @example
     * // Get one EquipoItem
     * const equipoItem = await prisma.equipoItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EquipoItemFindFirstArgs>(args?: SelectSubset<T, EquipoItemFindFirstArgs<ExtArgs>>): Prisma__EquipoItemClient<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EquipoItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoItemFindFirstOrThrowArgs} args - Arguments to find a EquipoItem
     * @example
     * // Get one EquipoItem
     * const equipoItem = await prisma.equipoItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EquipoItemFindFirstOrThrowArgs>(args?: SelectSubset<T, EquipoItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__EquipoItemClient<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EquipoItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EquipoItems
     * const equipoItems = await prisma.equipoItem.findMany()
     * 
     * // Get first 10 EquipoItems
     * const equipoItems = await prisma.equipoItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const equipoItemWithIdOnly = await prisma.equipoItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EquipoItemFindManyArgs>(args?: SelectSubset<T, EquipoItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EquipoItem.
     * @param {EquipoItemCreateArgs} args - Arguments to create a EquipoItem.
     * @example
     * // Create one EquipoItem
     * const EquipoItem = await prisma.equipoItem.create({
     *   data: {
     *     // ... data to create a EquipoItem
     *   }
     * })
     * 
     */
    create<T extends EquipoItemCreateArgs>(args: SelectSubset<T, EquipoItemCreateArgs<ExtArgs>>): Prisma__EquipoItemClient<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EquipoItems.
     * @param {EquipoItemCreateManyArgs} args - Arguments to create many EquipoItems.
     * @example
     * // Create many EquipoItems
     * const equipoItem = await prisma.equipoItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EquipoItemCreateManyArgs>(args?: SelectSubset<T, EquipoItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EquipoItems and returns the data saved in the database.
     * @param {EquipoItemCreateManyAndReturnArgs} args - Arguments to create many EquipoItems.
     * @example
     * // Create many EquipoItems
     * const equipoItem = await prisma.equipoItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EquipoItems and only return the `id`
     * const equipoItemWithIdOnly = await prisma.equipoItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EquipoItemCreateManyAndReturnArgs>(args?: SelectSubset<T, EquipoItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EquipoItem.
     * @param {EquipoItemDeleteArgs} args - Arguments to delete one EquipoItem.
     * @example
     * // Delete one EquipoItem
     * const EquipoItem = await prisma.equipoItem.delete({
     *   where: {
     *     // ... filter to delete one EquipoItem
     *   }
     * })
     * 
     */
    delete<T extends EquipoItemDeleteArgs>(args: SelectSubset<T, EquipoItemDeleteArgs<ExtArgs>>): Prisma__EquipoItemClient<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EquipoItem.
     * @param {EquipoItemUpdateArgs} args - Arguments to update one EquipoItem.
     * @example
     * // Update one EquipoItem
     * const equipoItem = await prisma.equipoItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EquipoItemUpdateArgs>(args: SelectSubset<T, EquipoItemUpdateArgs<ExtArgs>>): Prisma__EquipoItemClient<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EquipoItems.
     * @param {EquipoItemDeleteManyArgs} args - Arguments to filter EquipoItems to delete.
     * @example
     * // Delete a few EquipoItems
     * const { count } = await prisma.equipoItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EquipoItemDeleteManyArgs>(args?: SelectSubset<T, EquipoItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EquipoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EquipoItems
     * const equipoItem = await prisma.equipoItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EquipoItemUpdateManyArgs>(args: SelectSubset<T, EquipoItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EquipoItems and returns the data updated in the database.
     * @param {EquipoItemUpdateManyAndReturnArgs} args - Arguments to update many EquipoItems.
     * @example
     * // Update many EquipoItems
     * const equipoItem = await prisma.equipoItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EquipoItems and only return the `id`
     * const equipoItemWithIdOnly = await prisma.equipoItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EquipoItemUpdateManyAndReturnArgs>(args: SelectSubset<T, EquipoItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EquipoItem.
     * @param {EquipoItemUpsertArgs} args - Arguments to update or create a EquipoItem.
     * @example
     * // Update or create a EquipoItem
     * const equipoItem = await prisma.equipoItem.upsert({
     *   create: {
     *     // ... data to create a EquipoItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EquipoItem we want to update
     *   }
     * })
     */
    upsert<T extends EquipoItemUpsertArgs>(args: SelectSubset<T, EquipoItemUpsertArgs<ExtArgs>>): Prisma__EquipoItemClient<$Result.GetResult<Prisma.$EquipoItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EquipoItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoItemCountArgs} args - Arguments to filter EquipoItems to count.
     * @example
     * // Count the number of EquipoItems
     * const count = await prisma.equipoItem.count({
     *   where: {
     *     // ... the filter for the EquipoItems we want to count
     *   }
     * })
    **/
    count<T extends EquipoItemCountArgs>(
      args?: Subset<T, EquipoItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EquipoItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EquipoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EquipoItemAggregateArgs>(args: Subset<T, EquipoItemAggregateArgs>): Prisma.PrismaPromise<GetEquipoItemAggregateType<T>>

    /**
     * Group by EquipoItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EquipoItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EquipoItemGroupByArgs['orderBy'] }
        : { orderBy?: EquipoItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EquipoItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEquipoItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EquipoItem model
   */
  readonly fields: EquipoItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EquipoItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EquipoItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EquipoItem model
   */
  interface EquipoItemFieldRefs {
    readonly id: FieldRef<"EquipoItem", 'String'>
    readonly productoId: FieldRef<"EquipoItem", 'String'>
    readonly numeroSerie: FieldRef<"EquipoItem", 'String'>
    readonly notasInternas: FieldRef<"EquipoItem", 'String'>
    readonly estado: FieldRef<"EquipoItem", 'EstadoEquipo'>
    readonly fechaCompra: FieldRef<"EquipoItem", 'DateTime'>
    readonly precioCompra: FieldRef<"EquipoItem", 'Float'>
    readonly createdAt: FieldRef<"EquipoItem", 'DateTime'>
    readonly updatedAt: FieldRef<"EquipoItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EquipoItem findUnique
   */
  export type EquipoItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
    /**
     * Filter, which EquipoItem to fetch.
     */
    where: EquipoItemWhereUniqueInput
  }

  /**
   * EquipoItem findUniqueOrThrow
   */
  export type EquipoItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
    /**
     * Filter, which EquipoItem to fetch.
     */
    where: EquipoItemWhereUniqueInput
  }

  /**
   * EquipoItem findFirst
   */
  export type EquipoItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
    /**
     * Filter, which EquipoItem to fetch.
     */
    where?: EquipoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EquipoItems to fetch.
     */
    orderBy?: EquipoItemOrderByWithRelationInput | EquipoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EquipoItems.
     */
    cursor?: EquipoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EquipoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EquipoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EquipoItems.
     */
    distinct?: EquipoItemScalarFieldEnum | EquipoItemScalarFieldEnum[]
  }

  /**
   * EquipoItem findFirstOrThrow
   */
  export type EquipoItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
    /**
     * Filter, which EquipoItem to fetch.
     */
    where?: EquipoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EquipoItems to fetch.
     */
    orderBy?: EquipoItemOrderByWithRelationInput | EquipoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EquipoItems.
     */
    cursor?: EquipoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EquipoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EquipoItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EquipoItems.
     */
    distinct?: EquipoItemScalarFieldEnum | EquipoItemScalarFieldEnum[]
  }

  /**
   * EquipoItem findMany
   */
  export type EquipoItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
    /**
     * Filter, which EquipoItems to fetch.
     */
    where?: EquipoItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EquipoItems to fetch.
     */
    orderBy?: EquipoItemOrderByWithRelationInput | EquipoItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EquipoItems.
     */
    cursor?: EquipoItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EquipoItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EquipoItems.
     */
    skip?: number
    distinct?: EquipoItemScalarFieldEnum | EquipoItemScalarFieldEnum[]
  }

  /**
   * EquipoItem create
   */
  export type EquipoItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
    /**
     * The data needed to create a EquipoItem.
     */
    data: XOR<EquipoItemCreateInput, EquipoItemUncheckedCreateInput>
  }

  /**
   * EquipoItem createMany
   */
  export type EquipoItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EquipoItems.
     */
    data: EquipoItemCreateManyInput | EquipoItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EquipoItem createManyAndReturn
   */
  export type EquipoItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * The data used to create many EquipoItems.
     */
    data: EquipoItemCreateManyInput | EquipoItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EquipoItem update
   */
  export type EquipoItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
    /**
     * The data needed to update a EquipoItem.
     */
    data: XOR<EquipoItemUpdateInput, EquipoItemUncheckedUpdateInput>
    /**
     * Choose, which EquipoItem to update.
     */
    where: EquipoItemWhereUniqueInput
  }

  /**
   * EquipoItem updateMany
   */
  export type EquipoItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EquipoItems.
     */
    data: XOR<EquipoItemUpdateManyMutationInput, EquipoItemUncheckedUpdateManyInput>
    /**
     * Filter which EquipoItems to update
     */
    where?: EquipoItemWhereInput
    /**
     * Limit how many EquipoItems to update.
     */
    limit?: number
  }

  /**
   * EquipoItem updateManyAndReturn
   */
  export type EquipoItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * The data used to update EquipoItems.
     */
    data: XOR<EquipoItemUpdateManyMutationInput, EquipoItemUncheckedUpdateManyInput>
    /**
     * Filter which EquipoItems to update
     */
    where?: EquipoItemWhereInput
    /**
     * Limit how many EquipoItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EquipoItem upsert
   */
  export type EquipoItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
    /**
     * The filter to search for the EquipoItem to update in case it exists.
     */
    where: EquipoItemWhereUniqueInput
    /**
     * In case the EquipoItem found by the `where` argument doesn't exist, create a new EquipoItem with this data.
     */
    create: XOR<EquipoItemCreateInput, EquipoItemUncheckedCreateInput>
    /**
     * In case the EquipoItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EquipoItemUpdateInput, EquipoItemUncheckedUpdateInput>
  }

  /**
   * EquipoItem delete
   */
  export type EquipoItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
    /**
     * Filter which EquipoItem to delete.
     */
    where: EquipoItemWhereUniqueInput
  }

  /**
   * EquipoItem deleteMany
   */
  export type EquipoItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EquipoItems to delete
     */
    where?: EquipoItemWhereInput
    /**
     * Limit how many EquipoItems to delete.
     */
    limit?: number
  }

  /**
   * EquipoItem without action
   */
  export type EquipoItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoItem
     */
    select?: EquipoItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EquipoItem
     */
    omit?: EquipoItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoItemInclude<ExtArgs> | null
  }


  /**
   * Model Cliente
   */

  export type AggregateCliente = {
    _count: ClienteCountAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  export type ClienteMinAggregateOutputType = {
    id: string | null
    nombre: string | null
    tipo: $Enums.TipoCliente | null
    nif: string | null
    direccion: string | null
    email: string | null
    telefono: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClienteMaxAggregateOutputType = {
    id: string | null
    nombre: string | null
    tipo: $Enums.TipoCliente | null
    nif: string | null
    direccion: string | null
    email: string | null
    telefono: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClienteCountAggregateOutputType = {
    id: number
    nombre: number
    tipo: number
    nif: number
    direccion: number
    email: number
    telefono: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClienteMinAggregateInputType = {
    id?: true
    nombre?: true
    tipo?: true
    nif?: true
    direccion?: true
    email?: true
    telefono?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClienteMaxAggregateInputType = {
    id?: true
    nombre?: true
    tipo?: true
    nif?: true
    direccion?: true
    email?: true
    telefono?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClienteCountAggregateInputType = {
    id?: true
    nombre?: true
    tipo?: true
    nif?: true
    direccion?: true
    email?: true
    telefono?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cliente to aggregate.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clientes
    **/
    _count?: true | ClienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClienteMaxAggregateInputType
  }

  export type GetClienteAggregateType<T extends ClienteAggregateArgs> = {
        [P in keyof T & keyof AggregateCliente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCliente[P]>
      : GetScalarType<T[P], AggregateCliente[P]>
  }




  export type ClienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClienteWhereInput
    orderBy?: ClienteOrderByWithAggregationInput | ClienteOrderByWithAggregationInput[]
    by: ClienteScalarFieldEnum[] | ClienteScalarFieldEnum
    having?: ClienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClienteCountAggregateInputType | true
    _min?: ClienteMinAggregateInputType
    _max?: ClienteMaxAggregateInputType
  }

  export type ClienteGroupByOutputType = {
    id: string
    nombre: string
    tipo: $Enums.TipoCliente
    nif: string | null
    direccion: string | null
    email: string | null
    telefono: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClienteCountAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  type GetClienteGroupByPayload<T extends ClienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClienteGroupByOutputType[P]>
            : GetScalarType<T[P], ClienteGroupByOutputType[P]>
        }
      >
    >


  export type ClienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    nif?: boolean
    direccion?: boolean
    email?: boolean
    telefono?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presupuestos?: boolean | Cliente$presupuestosArgs<ExtArgs>
    facturas?: boolean | Cliente$facturasArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    nif?: boolean
    direccion?: boolean
    email?: boolean
    telefono?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    nif?: boolean
    direccion?: boolean
    email?: boolean
    telefono?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectScalar = {
    id?: boolean
    nombre?: boolean
    tipo?: boolean
    nif?: boolean
    direccion?: boolean
    email?: boolean
    telefono?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "tipo" | "nif" | "direccion" | "email" | "telefono" | "createdAt" | "updatedAt", ExtArgs["result"]["cliente"]>
  export type ClienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presupuestos?: boolean | Cliente$presupuestosArgs<ExtArgs>
    facturas?: boolean | Cliente$facturasArgs<ExtArgs>
    _count?: boolean | ClienteCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClienteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClienteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cliente"
    objects: {
      presupuestos: Prisma.$PresupuestoPayload<ExtArgs>[]
      facturas: Prisma.$FacturaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nombre: string
      tipo: $Enums.TipoCliente
      nif: string | null
      direccion: string | null
      email: string | null
      telefono: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cliente"]>
    composites: {}
  }

  type ClienteGetPayload<S extends boolean | null | undefined | ClienteDefaultArgs> = $Result.GetResult<Prisma.$ClientePayload, S>

  type ClienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClienteCountAggregateInputType | true
    }

  export interface ClienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cliente'], meta: { name: 'Cliente' } }
    /**
     * Find zero or one Cliente that matches the filter.
     * @param {ClienteFindUniqueArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClienteFindUniqueArgs>(args: SelectSubset<T, ClienteFindUniqueArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cliente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClienteFindUniqueOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClienteFindUniqueOrThrowArgs>(args: SelectSubset<T, ClienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClienteFindFirstArgs>(args?: SelectSubset<T, ClienteFindFirstArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClienteFindFirstOrThrowArgs>(args?: SelectSubset<T, ClienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.cliente.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.cliente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clienteWithIdOnly = await prisma.cliente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClienteFindManyArgs>(args?: SelectSubset<T, ClienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cliente.
     * @param {ClienteCreateArgs} args - Arguments to create a Cliente.
     * @example
     * // Create one Cliente
     * const Cliente = await prisma.cliente.create({
     *   data: {
     *     // ... data to create a Cliente
     *   }
     * })
     * 
     */
    create<T extends ClienteCreateArgs>(args: SelectSubset<T, ClienteCreateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clientes.
     * @param {ClienteCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClienteCreateManyArgs>(args?: SelectSubset<T, ClienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clientes and returns the data saved in the database.
     * @param {ClienteCreateManyAndReturnArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clientes and only return the `id`
     * const clienteWithIdOnly = await prisma.cliente.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClienteCreateManyAndReturnArgs>(args?: SelectSubset<T, ClienteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cliente.
     * @param {ClienteDeleteArgs} args - Arguments to delete one Cliente.
     * @example
     * // Delete one Cliente
     * const Cliente = await prisma.cliente.delete({
     *   where: {
     *     // ... filter to delete one Cliente
     *   }
     * })
     * 
     */
    delete<T extends ClienteDeleteArgs>(args: SelectSubset<T, ClienteDeleteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cliente.
     * @param {ClienteUpdateArgs} args - Arguments to update one Cliente.
     * @example
     * // Update one Cliente
     * const cliente = await prisma.cliente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClienteUpdateArgs>(args: SelectSubset<T, ClienteUpdateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clientes.
     * @param {ClienteDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.cliente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClienteDeleteManyArgs>(args?: SelectSubset<T, ClienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClienteUpdateManyArgs>(args: SelectSubset<T, ClienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes and returns the data updated in the database.
     * @param {ClienteUpdateManyAndReturnArgs} args - Arguments to update many Clientes.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clientes and only return the `id`
     * const clienteWithIdOnly = await prisma.cliente.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClienteUpdateManyAndReturnArgs>(args: SelectSubset<T, ClienteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cliente.
     * @param {ClienteUpsertArgs} args - Arguments to update or create a Cliente.
     * @example
     * // Update or create a Cliente
     * const cliente = await prisma.cliente.upsert({
     *   create: {
     *     // ... data to create a Cliente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cliente we want to update
     *   }
     * })
     */
    upsert<T extends ClienteUpsertArgs>(args: SelectSubset<T, ClienteUpsertArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.cliente.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends ClienteCountArgs>(
      args?: Subset<T, ClienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClienteAggregateArgs>(args: Subset<T, ClienteAggregateArgs>): Prisma.PrismaPromise<GetClienteAggregateType<T>>

    /**
     * Group by Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClienteGroupByArgs['orderBy'] }
        : { orderBy?: ClienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cliente model
   */
  readonly fields: ClienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cliente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    presupuestos<T extends Cliente$presupuestosArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$presupuestosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    facturas<T extends Cliente$facturasArgs<ExtArgs> = {}>(args?: Subset<T, Cliente$facturasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cliente model
   */
  interface ClienteFieldRefs {
    readonly id: FieldRef<"Cliente", 'String'>
    readonly nombre: FieldRef<"Cliente", 'String'>
    readonly tipo: FieldRef<"Cliente", 'TipoCliente'>
    readonly nif: FieldRef<"Cliente", 'String'>
    readonly direccion: FieldRef<"Cliente", 'String'>
    readonly email: FieldRef<"Cliente", 'String'>
    readonly telefono: FieldRef<"Cliente", 'String'>
    readonly createdAt: FieldRef<"Cliente", 'DateTime'>
    readonly updatedAt: FieldRef<"Cliente", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cliente findUnique
   */
  export type ClienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findUniqueOrThrow
   */
  export type ClienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findFirst
   */
  export type ClienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findFirstOrThrow
   */
  export type ClienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findMany
   */
  export type ClienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente create
   */
  export type ClienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to create a Cliente.
     */
    data: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
  }

  /**
   * Cliente createMany
   */
  export type ClienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cliente createManyAndReturn
   */
  export type ClienteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cliente update
   */
  export type ClienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The data needed to update a Cliente.
     */
    data: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
    /**
     * Choose, which Cliente to update.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente updateMany
   */
  export type ClienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente updateManyAndReturn
   */
  export type ClienteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente upsert
   */
  export type ClienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * The filter to search for the Cliente to update in case it exists.
     */
    where: ClienteWhereUniqueInput
    /**
     * In case the Cliente found by the `where` argument doesn't exist, create a new Cliente with this data.
     */
    create: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
    /**
     * In case the Cliente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
  }

  /**
   * Cliente delete
   */
  export type ClienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
    /**
     * Filter which Cliente to delete.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente deleteMany
   */
  export type ClienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to delete
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to delete.
     */
    limit?: number
  }

  /**
   * Cliente.presupuestos
   */
  export type Cliente$presupuestosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    where?: PresupuestoWhereInput
    orderBy?: PresupuestoOrderByWithRelationInput | PresupuestoOrderByWithRelationInput[]
    cursor?: PresupuestoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PresupuestoScalarFieldEnum | PresupuestoScalarFieldEnum[]
  }

  /**
   * Cliente.facturas
   */
  export type Cliente$facturasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    where?: FacturaWhereInput
    orderBy?: FacturaOrderByWithRelationInput | FacturaOrderByWithRelationInput[]
    cursor?: FacturaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FacturaScalarFieldEnum | FacturaScalarFieldEnum[]
  }

  /**
   * Cliente without action
   */
  export type ClienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClienteInclude<ExtArgs> | null
  }


  /**
   * Model Presupuesto
   */

  export type AggregatePresupuesto = {
    _count: PresupuestoCountAggregateOutputType | null
    _avg: PresupuestoAvgAggregateOutputType | null
    _sum: PresupuestoSumAggregateOutputType | null
    _min: PresupuestoMinAggregateOutputType | null
    _max: PresupuestoMaxAggregateOutputType | null
  }

  export type PresupuestoAvgAggregateOutputType = {
    subtotal: number | null
    iva: number | null
    total: number | null
  }

  export type PresupuestoSumAggregateOutputType = {
    subtotal: number | null
    iva: number | null
    total: number | null
  }

  export type PresupuestoMinAggregateOutputType = {
    id: string | null
    numero: string | null
    fecha: Date | null
    fechaValidez: Date | null
    clienteId: string | null
    estado: $Enums.EstadoPresupuesto | null
    observaciones: string | null
    subtotal: number | null
    iva: number | null
    total: number | null
    facturaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PresupuestoMaxAggregateOutputType = {
    id: string | null
    numero: string | null
    fecha: Date | null
    fechaValidez: Date | null
    clienteId: string | null
    estado: $Enums.EstadoPresupuesto | null
    observaciones: string | null
    subtotal: number | null
    iva: number | null
    total: number | null
    facturaId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PresupuestoCountAggregateOutputType = {
    id: number
    numero: number
    fecha: number
    fechaValidez: number
    clienteId: number
    estado: number
    observaciones: number
    subtotal: number
    iva: number
    total: number
    facturaId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PresupuestoAvgAggregateInputType = {
    subtotal?: true
    iva?: true
    total?: true
  }

  export type PresupuestoSumAggregateInputType = {
    subtotal?: true
    iva?: true
    total?: true
  }

  export type PresupuestoMinAggregateInputType = {
    id?: true
    numero?: true
    fecha?: true
    fechaValidez?: true
    clienteId?: true
    estado?: true
    observaciones?: true
    subtotal?: true
    iva?: true
    total?: true
    facturaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PresupuestoMaxAggregateInputType = {
    id?: true
    numero?: true
    fecha?: true
    fechaValidez?: true
    clienteId?: true
    estado?: true
    observaciones?: true
    subtotal?: true
    iva?: true
    total?: true
    facturaId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PresupuestoCountAggregateInputType = {
    id?: true
    numero?: true
    fecha?: true
    fechaValidez?: true
    clienteId?: true
    estado?: true
    observaciones?: true
    subtotal?: true
    iva?: true
    total?: true
    facturaId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PresupuestoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Presupuesto to aggregate.
     */
    where?: PresupuestoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presupuestos to fetch.
     */
    orderBy?: PresupuestoOrderByWithRelationInput | PresupuestoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PresupuestoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presupuestos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presupuestos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Presupuestos
    **/
    _count?: true | PresupuestoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PresupuestoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PresupuestoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PresupuestoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PresupuestoMaxAggregateInputType
  }

  export type GetPresupuestoAggregateType<T extends PresupuestoAggregateArgs> = {
        [P in keyof T & keyof AggregatePresupuesto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePresupuesto[P]>
      : GetScalarType<T[P], AggregatePresupuesto[P]>
  }




  export type PresupuestoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PresupuestoWhereInput
    orderBy?: PresupuestoOrderByWithAggregationInput | PresupuestoOrderByWithAggregationInput[]
    by: PresupuestoScalarFieldEnum[] | PresupuestoScalarFieldEnum
    having?: PresupuestoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PresupuestoCountAggregateInputType | true
    _avg?: PresupuestoAvgAggregateInputType
    _sum?: PresupuestoSumAggregateInputType
    _min?: PresupuestoMinAggregateInputType
    _max?: PresupuestoMaxAggregateInputType
  }

  export type PresupuestoGroupByOutputType = {
    id: string
    numero: string
    fecha: Date
    fechaValidez: Date
    clienteId: string
    estado: $Enums.EstadoPresupuesto
    observaciones: string | null
    subtotal: number
    iva: number
    total: number
    facturaId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PresupuestoCountAggregateOutputType | null
    _avg: PresupuestoAvgAggregateOutputType | null
    _sum: PresupuestoSumAggregateOutputType | null
    _min: PresupuestoMinAggregateOutputType | null
    _max: PresupuestoMaxAggregateOutputType | null
  }

  type GetPresupuestoGroupByPayload<T extends PresupuestoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PresupuestoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PresupuestoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PresupuestoGroupByOutputType[P]>
            : GetScalarType<T[P], PresupuestoGroupByOutputType[P]>
        }
      >
    >


  export type PresupuestoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    fecha?: boolean
    fechaValidez?: boolean
    clienteId?: boolean
    estado?: boolean
    observaciones?: boolean
    subtotal?: boolean
    iva?: boolean
    total?: boolean
    facturaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    items?: boolean | Presupuesto$itemsArgs<ExtArgs>
    factura?: boolean | Presupuesto$facturaArgs<ExtArgs>
    _count?: boolean | PresupuestoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["presupuesto"]>

  export type PresupuestoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    fecha?: boolean
    fechaValidez?: boolean
    clienteId?: boolean
    estado?: boolean
    observaciones?: boolean
    subtotal?: boolean
    iva?: boolean
    total?: boolean
    facturaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    factura?: boolean | Presupuesto$facturaArgs<ExtArgs>
  }, ExtArgs["result"]["presupuesto"]>

  export type PresupuestoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    fecha?: boolean
    fechaValidez?: boolean
    clienteId?: boolean
    estado?: boolean
    observaciones?: boolean
    subtotal?: boolean
    iva?: boolean
    total?: boolean
    facturaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    factura?: boolean | Presupuesto$facturaArgs<ExtArgs>
  }, ExtArgs["result"]["presupuesto"]>

  export type PresupuestoSelectScalar = {
    id?: boolean
    numero?: boolean
    fecha?: boolean
    fechaValidez?: boolean
    clienteId?: boolean
    estado?: boolean
    observaciones?: boolean
    subtotal?: boolean
    iva?: boolean
    total?: boolean
    facturaId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PresupuestoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "fecha" | "fechaValidez" | "clienteId" | "estado" | "observaciones" | "subtotal" | "iva" | "total" | "facturaId" | "createdAt" | "updatedAt", ExtArgs["result"]["presupuesto"]>
  export type PresupuestoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    items?: boolean | Presupuesto$itemsArgs<ExtArgs>
    factura?: boolean | Presupuesto$facturaArgs<ExtArgs>
    _count?: boolean | PresupuestoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PresupuestoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    factura?: boolean | Presupuesto$facturaArgs<ExtArgs>
  }
  export type PresupuestoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    factura?: boolean | Presupuesto$facturaArgs<ExtArgs>
  }

  export type $PresupuestoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Presupuesto"
    objects: {
      cliente: Prisma.$ClientePayload<ExtArgs>
      items: Prisma.$ItemPresupuestoPayload<ExtArgs>[]
      factura: Prisma.$FacturaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numero: string
      fecha: Date
      fechaValidez: Date
      clienteId: string
      estado: $Enums.EstadoPresupuesto
      observaciones: string | null
      subtotal: number
      iva: number
      total: number
      facturaId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["presupuesto"]>
    composites: {}
  }

  type PresupuestoGetPayload<S extends boolean | null | undefined | PresupuestoDefaultArgs> = $Result.GetResult<Prisma.$PresupuestoPayload, S>

  type PresupuestoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PresupuestoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PresupuestoCountAggregateInputType | true
    }

  export interface PresupuestoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Presupuesto'], meta: { name: 'Presupuesto' } }
    /**
     * Find zero or one Presupuesto that matches the filter.
     * @param {PresupuestoFindUniqueArgs} args - Arguments to find a Presupuesto
     * @example
     * // Get one Presupuesto
     * const presupuesto = await prisma.presupuesto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PresupuestoFindUniqueArgs>(args: SelectSubset<T, PresupuestoFindUniqueArgs<ExtArgs>>): Prisma__PresupuestoClient<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Presupuesto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PresupuestoFindUniqueOrThrowArgs} args - Arguments to find a Presupuesto
     * @example
     * // Get one Presupuesto
     * const presupuesto = await prisma.presupuesto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PresupuestoFindUniqueOrThrowArgs>(args: SelectSubset<T, PresupuestoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PresupuestoClient<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Presupuesto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresupuestoFindFirstArgs} args - Arguments to find a Presupuesto
     * @example
     * // Get one Presupuesto
     * const presupuesto = await prisma.presupuesto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PresupuestoFindFirstArgs>(args?: SelectSubset<T, PresupuestoFindFirstArgs<ExtArgs>>): Prisma__PresupuestoClient<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Presupuesto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresupuestoFindFirstOrThrowArgs} args - Arguments to find a Presupuesto
     * @example
     * // Get one Presupuesto
     * const presupuesto = await prisma.presupuesto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PresupuestoFindFirstOrThrowArgs>(args?: SelectSubset<T, PresupuestoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PresupuestoClient<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Presupuestos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresupuestoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Presupuestos
     * const presupuestos = await prisma.presupuesto.findMany()
     * 
     * // Get first 10 Presupuestos
     * const presupuestos = await prisma.presupuesto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const presupuestoWithIdOnly = await prisma.presupuesto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PresupuestoFindManyArgs>(args?: SelectSubset<T, PresupuestoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Presupuesto.
     * @param {PresupuestoCreateArgs} args - Arguments to create a Presupuesto.
     * @example
     * // Create one Presupuesto
     * const Presupuesto = await prisma.presupuesto.create({
     *   data: {
     *     // ... data to create a Presupuesto
     *   }
     * })
     * 
     */
    create<T extends PresupuestoCreateArgs>(args: SelectSubset<T, PresupuestoCreateArgs<ExtArgs>>): Prisma__PresupuestoClient<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Presupuestos.
     * @param {PresupuestoCreateManyArgs} args - Arguments to create many Presupuestos.
     * @example
     * // Create many Presupuestos
     * const presupuesto = await prisma.presupuesto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PresupuestoCreateManyArgs>(args?: SelectSubset<T, PresupuestoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Presupuestos and returns the data saved in the database.
     * @param {PresupuestoCreateManyAndReturnArgs} args - Arguments to create many Presupuestos.
     * @example
     * // Create many Presupuestos
     * const presupuesto = await prisma.presupuesto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Presupuestos and only return the `id`
     * const presupuestoWithIdOnly = await prisma.presupuesto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PresupuestoCreateManyAndReturnArgs>(args?: SelectSubset<T, PresupuestoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Presupuesto.
     * @param {PresupuestoDeleteArgs} args - Arguments to delete one Presupuesto.
     * @example
     * // Delete one Presupuesto
     * const Presupuesto = await prisma.presupuesto.delete({
     *   where: {
     *     // ... filter to delete one Presupuesto
     *   }
     * })
     * 
     */
    delete<T extends PresupuestoDeleteArgs>(args: SelectSubset<T, PresupuestoDeleteArgs<ExtArgs>>): Prisma__PresupuestoClient<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Presupuesto.
     * @param {PresupuestoUpdateArgs} args - Arguments to update one Presupuesto.
     * @example
     * // Update one Presupuesto
     * const presupuesto = await prisma.presupuesto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PresupuestoUpdateArgs>(args: SelectSubset<T, PresupuestoUpdateArgs<ExtArgs>>): Prisma__PresupuestoClient<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Presupuestos.
     * @param {PresupuestoDeleteManyArgs} args - Arguments to filter Presupuestos to delete.
     * @example
     * // Delete a few Presupuestos
     * const { count } = await prisma.presupuesto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PresupuestoDeleteManyArgs>(args?: SelectSubset<T, PresupuestoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Presupuestos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresupuestoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Presupuestos
     * const presupuesto = await prisma.presupuesto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PresupuestoUpdateManyArgs>(args: SelectSubset<T, PresupuestoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Presupuestos and returns the data updated in the database.
     * @param {PresupuestoUpdateManyAndReturnArgs} args - Arguments to update many Presupuestos.
     * @example
     * // Update many Presupuestos
     * const presupuesto = await prisma.presupuesto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Presupuestos and only return the `id`
     * const presupuestoWithIdOnly = await prisma.presupuesto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PresupuestoUpdateManyAndReturnArgs>(args: SelectSubset<T, PresupuestoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Presupuesto.
     * @param {PresupuestoUpsertArgs} args - Arguments to update or create a Presupuesto.
     * @example
     * // Update or create a Presupuesto
     * const presupuesto = await prisma.presupuesto.upsert({
     *   create: {
     *     // ... data to create a Presupuesto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Presupuesto we want to update
     *   }
     * })
     */
    upsert<T extends PresupuestoUpsertArgs>(args: SelectSubset<T, PresupuestoUpsertArgs<ExtArgs>>): Prisma__PresupuestoClient<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Presupuestos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresupuestoCountArgs} args - Arguments to filter Presupuestos to count.
     * @example
     * // Count the number of Presupuestos
     * const count = await prisma.presupuesto.count({
     *   where: {
     *     // ... the filter for the Presupuestos we want to count
     *   }
     * })
    **/
    count<T extends PresupuestoCountArgs>(
      args?: Subset<T, PresupuestoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PresupuestoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Presupuesto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresupuestoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PresupuestoAggregateArgs>(args: Subset<T, PresupuestoAggregateArgs>): Prisma.PrismaPromise<GetPresupuestoAggregateType<T>>

    /**
     * Group by Presupuesto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PresupuestoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PresupuestoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PresupuestoGroupByArgs['orderBy'] }
        : { orderBy?: PresupuestoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PresupuestoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPresupuestoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Presupuesto model
   */
  readonly fields: PresupuestoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Presupuesto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PresupuestoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends ClienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClienteDefaultArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Presupuesto$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Presupuesto$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    factura<T extends Presupuesto$facturaArgs<ExtArgs> = {}>(args?: Subset<T, Presupuesto$facturaArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Presupuesto model
   */
  interface PresupuestoFieldRefs {
    readonly id: FieldRef<"Presupuesto", 'String'>
    readonly numero: FieldRef<"Presupuesto", 'String'>
    readonly fecha: FieldRef<"Presupuesto", 'DateTime'>
    readonly fechaValidez: FieldRef<"Presupuesto", 'DateTime'>
    readonly clienteId: FieldRef<"Presupuesto", 'String'>
    readonly estado: FieldRef<"Presupuesto", 'EstadoPresupuesto'>
    readonly observaciones: FieldRef<"Presupuesto", 'String'>
    readonly subtotal: FieldRef<"Presupuesto", 'Float'>
    readonly iva: FieldRef<"Presupuesto", 'Float'>
    readonly total: FieldRef<"Presupuesto", 'Float'>
    readonly facturaId: FieldRef<"Presupuesto", 'String'>
    readonly createdAt: FieldRef<"Presupuesto", 'DateTime'>
    readonly updatedAt: FieldRef<"Presupuesto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Presupuesto findUnique
   */
  export type PresupuestoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    /**
     * Filter, which Presupuesto to fetch.
     */
    where: PresupuestoWhereUniqueInput
  }

  /**
   * Presupuesto findUniqueOrThrow
   */
  export type PresupuestoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    /**
     * Filter, which Presupuesto to fetch.
     */
    where: PresupuestoWhereUniqueInput
  }

  /**
   * Presupuesto findFirst
   */
  export type PresupuestoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    /**
     * Filter, which Presupuesto to fetch.
     */
    where?: PresupuestoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presupuestos to fetch.
     */
    orderBy?: PresupuestoOrderByWithRelationInput | PresupuestoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Presupuestos.
     */
    cursor?: PresupuestoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presupuestos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presupuestos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Presupuestos.
     */
    distinct?: PresupuestoScalarFieldEnum | PresupuestoScalarFieldEnum[]
  }

  /**
   * Presupuesto findFirstOrThrow
   */
  export type PresupuestoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    /**
     * Filter, which Presupuesto to fetch.
     */
    where?: PresupuestoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presupuestos to fetch.
     */
    orderBy?: PresupuestoOrderByWithRelationInput | PresupuestoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Presupuestos.
     */
    cursor?: PresupuestoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presupuestos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presupuestos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Presupuestos.
     */
    distinct?: PresupuestoScalarFieldEnum | PresupuestoScalarFieldEnum[]
  }

  /**
   * Presupuesto findMany
   */
  export type PresupuestoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    /**
     * Filter, which Presupuestos to fetch.
     */
    where?: PresupuestoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Presupuestos to fetch.
     */
    orderBy?: PresupuestoOrderByWithRelationInput | PresupuestoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Presupuestos.
     */
    cursor?: PresupuestoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Presupuestos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Presupuestos.
     */
    skip?: number
    distinct?: PresupuestoScalarFieldEnum | PresupuestoScalarFieldEnum[]
  }

  /**
   * Presupuesto create
   */
  export type PresupuestoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    /**
     * The data needed to create a Presupuesto.
     */
    data: XOR<PresupuestoCreateInput, PresupuestoUncheckedCreateInput>
  }

  /**
   * Presupuesto createMany
   */
  export type PresupuestoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Presupuestos.
     */
    data: PresupuestoCreateManyInput | PresupuestoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Presupuesto createManyAndReturn
   */
  export type PresupuestoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * The data used to create many Presupuestos.
     */
    data: PresupuestoCreateManyInput | PresupuestoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Presupuesto update
   */
  export type PresupuestoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    /**
     * The data needed to update a Presupuesto.
     */
    data: XOR<PresupuestoUpdateInput, PresupuestoUncheckedUpdateInput>
    /**
     * Choose, which Presupuesto to update.
     */
    where: PresupuestoWhereUniqueInput
  }

  /**
   * Presupuesto updateMany
   */
  export type PresupuestoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Presupuestos.
     */
    data: XOR<PresupuestoUpdateManyMutationInput, PresupuestoUncheckedUpdateManyInput>
    /**
     * Filter which Presupuestos to update
     */
    where?: PresupuestoWhereInput
    /**
     * Limit how many Presupuestos to update.
     */
    limit?: number
  }

  /**
   * Presupuesto updateManyAndReturn
   */
  export type PresupuestoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * The data used to update Presupuestos.
     */
    data: XOR<PresupuestoUpdateManyMutationInput, PresupuestoUncheckedUpdateManyInput>
    /**
     * Filter which Presupuestos to update
     */
    where?: PresupuestoWhereInput
    /**
     * Limit how many Presupuestos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Presupuesto upsert
   */
  export type PresupuestoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    /**
     * The filter to search for the Presupuesto to update in case it exists.
     */
    where: PresupuestoWhereUniqueInput
    /**
     * In case the Presupuesto found by the `where` argument doesn't exist, create a new Presupuesto with this data.
     */
    create: XOR<PresupuestoCreateInput, PresupuestoUncheckedCreateInput>
    /**
     * In case the Presupuesto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PresupuestoUpdateInput, PresupuestoUncheckedUpdateInput>
  }

  /**
   * Presupuesto delete
   */
  export type PresupuestoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    /**
     * Filter which Presupuesto to delete.
     */
    where: PresupuestoWhereUniqueInput
  }

  /**
   * Presupuesto deleteMany
   */
  export type PresupuestoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Presupuestos to delete
     */
    where?: PresupuestoWhereInput
    /**
     * Limit how many Presupuestos to delete.
     */
    limit?: number
  }

  /**
   * Presupuesto.items
   */
  export type Presupuesto$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    where?: ItemPresupuestoWhereInput
    orderBy?: ItemPresupuestoOrderByWithRelationInput | ItemPresupuestoOrderByWithRelationInput[]
    cursor?: ItemPresupuestoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemPresupuestoScalarFieldEnum | ItemPresupuestoScalarFieldEnum[]
  }

  /**
   * Presupuesto.factura
   */
  export type Presupuesto$facturaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    where?: FacturaWhereInput
  }

  /**
   * Presupuesto without action
   */
  export type PresupuestoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
  }


  /**
   * Model ItemPresupuesto
   */

  export type AggregateItemPresupuesto = {
    _count: ItemPresupuestoCountAggregateOutputType | null
    _avg: ItemPresupuestoAvgAggregateOutputType | null
    _sum: ItemPresupuestoSumAggregateOutputType | null
    _min: ItemPresupuestoMinAggregateOutputType | null
    _max: ItemPresupuestoMaxAggregateOutputType | null
  }

  export type ItemPresupuestoAvgAggregateOutputType = {
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    iva: number | null
    total: number | null
  }

  export type ItemPresupuestoSumAggregateOutputType = {
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    iva: number | null
    total: number | null
  }

  export type ItemPresupuestoMinAggregateOutputType = {
    id: string | null
    presupuestoId: string | null
    productoId: string | null
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    iva: number | null
    total: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemPresupuestoMaxAggregateOutputType = {
    id: string | null
    presupuestoId: string | null
    productoId: string | null
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    iva: number | null
    total: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemPresupuestoCountAggregateOutputType = {
    id: number
    presupuestoId: number
    productoId: number
    cantidad: number
    precioUnitario: number
    descuento: number
    iva: number
    total: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ItemPresupuestoAvgAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    iva?: true
    total?: true
  }

  export type ItemPresupuestoSumAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    iva?: true
    total?: true
  }

  export type ItemPresupuestoMinAggregateInputType = {
    id?: true
    presupuestoId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    iva?: true
    total?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemPresupuestoMaxAggregateInputType = {
    id?: true
    presupuestoId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    iva?: true
    total?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemPresupuestoCountAggregateInputType = {
    id?: true
    presupuestoId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    iva?: true
    total?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ItemPresupuestoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemPresupuesto to aggregate.
     */
    where?: ItemPresupuestoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPresupuestos to fetch.
     */
    orderBy?: ItemPresupuestoOrderByWithRelationInput | ItemPresupuestoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemPresupuestoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPresupuestos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPresupuestos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemPresupuestos
    **/
    _count?: true | ItemPresupuestoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemPresupuestoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemPresupuestoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemPresupuestoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemPresupuestoMaxAggregateInputType
  }

  export type GetItemPresupuestoAggregateType<T extends ItemPresupuestoAggregateArgs> = {
        [P in keyof T & keyof AggregateItemPresupuesto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemPresupuesto[P]>
      : GetScalarType<T[P], AggregateItemPresupuesto[P]>
  }




  export type ItemPresupuestoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemPresupuestoWhereInput
    orderBy?: ItemPresupuestoOrderByWithAggregationInput | ItemPresupuestoOrderByWithAggregationInput[]
    by: ItemPresupuestoScalarFieldEnum[] | ItemPresupuestoScalarFieldEnum
    having?: ItemPresupuestoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemPresupuestoCountAggregateInputType | true
    _avg?: ItemPresupuestoAvgAggregateInputType
    _sum?: ItemPresupuestoSumAggregateInputType
    _min?: ItemPresupuestoMinAggregateInputType
    _max?: ItemPresupuestoMaxAggregateInputType
  }

  export type ItemPresupuestoGroupByOutputType = {
    id: string
    presupuestoId: string
    productoId: string
    cantidad: number
    precioUnitario: number
    descuento: number
    iva: number
    total: number
    createdAt: Date
    updatedAt: Date
    _count: ItemPresupuestoCountAggregateOutputType | null
    _avg: ItemPresupuestoAvgAggregateOutputType | null
    _sum: ItemPresupuestoSumAggregateOutputType | null
    _min: ItemPresupuestoMinAggregateOutputType | null
    _max: ItemPresupuestoMaxAggregateOutputType | null
  }

  type GetItemPresupuestoGroupByPayload<T extends ItemPresupuestoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemPresupuestoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemPresupuestoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemPresupuestoGroupByOutputType[P]>
            : GetScalarType<T[P], ItemPresupuestoGroupByOutputType[P]>
        }
      >
    >


  export type ItemPresupuestoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presupuestoId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presupuesto?: boolean | PresupuestoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemPresupuesto"]>

  export type ItemPresupuestoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presupuestoId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presupuesto?: boolean | PresupuestoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemPresupuesto"]>

  export type ItemPresupuestoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    presupuestoId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    presupuesto?: boolean | PresupuestoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemPresupuesto"]>

  export type ItemPresupuestoSelectScalar = {
    id?: boolean
    presupuestoId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ItemPresupuestoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "presupuestoId" | "productoId" | "cantidad" | "precioUnitario" | "descuento" | "iva" | "total" | "createdAt" | "updatedAt", ExtArgs["result"]["itemPresupuesto"]>
  export type ItemPresupuestoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presupuesto?: boolean | PresupuestoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type ItemPresupuestoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presupuesto?: boolean | PresupuestoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type ItemPresupuestoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    presupuesto?: boolean | PresupuestoDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }

  export type $ItemPresupuestoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemPresupuesto"
    objects: {
      presupuesto: Prisma.$PresupuestoPayload<ExtArgs>
      producto: Prisma.$ProductoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      presupuestoId: string
      productoId: string
      cantidad: number
      precioUnitario: number
      descuento: number
      iva: number
      total: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["itemPresupuesto"]>
    composites: {}
  }

  type ItemPresupuestoGetPayload<S extends boolean | null | undefined | ItemPresupuestoDefaultArgs> = $Result.GetResult<Prisma.$ItemPresupuestoPayload, S>

  type ItemPresupuestoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemPresupuestoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemPresupuestoCountAggregateInputType | true
    }

  export interface ItemPresupuestoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemPresupuesto'], meta: { name: 'ItemPresupuesto' } }
    /**
     * Find zero or one ItemPresupuesto that matches the filter.
     * @param {ItemPresupuestoFindUniqueArgs} args - Arguments to find a ItemPresupuesto
     * @example
     * // Get one ItemPresupuesto
     * const itemPresupuesto = await prisma.itemPresupuesto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemPresupuestoFindUniqueArgs>(args: SelectSubset<T, ItemPresupuestoFindUniqueArgs<ExtArgs>>): Prisma__ItemPresupuestoClient<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemPresupuesto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemPresupuestoFindUniqueOrThrowArgs} args - Arguments to find a ItemPresupuesto
     * @example
     * // Get one ItemPresupuesto
     * const itemPresupuesto = await prisma.itemPresupuesto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemPresupuestoFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemPresupuestoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemPresupuestoClient<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemPresupuesto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresupuestoFindFirstArgs} args - Arguments to find a ItemPresupuesto
     * @example
     * // Get one ItemPresupuesto
     * const itemPresupuesto = await prisma.itemPresupuesto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemPresupuestoFindFirstArgs>(args?: SelectSubset<T, ItemPresupuestoFindFirstArgs<ExtArgs>>): Prisma__ItemPresupuestoClient<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemPresupuesto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresupuestoFindFirstOrThrowArgs} args - Arguments to find a ItemPresupuesto
     * @example
     * // Get one ItemPresupuesto
     * const itemPresupuesto = await prisma.itemPresupuesto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemPresupuestoFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemPresupuestoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemPresupuestoClient<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemPresupuestos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresupuestoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemPresupuestos
     * const itemPresupuestos = await prisma.itemPresupuesto.findMany()
     * 
     * // Get first 10 ItemPresupuestos
     * const itemPresupuestos = await prisma.itemPresupuesto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemPresupuestoWithIdOnly = await prisma.itemPresupuesto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemPresupuestoFindManyArgs>(args?: SelectSubset<T, ItemPresupuestoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemPresupuesto.
     * @param {ItemPresupuestoCreateArgs} args - Arguments to create a ItemPresupuesto.
     * @example
     * // Create one ItemPresupuesto
     * const ItemPresupuesto = await prisma.itemPresupuesto.create({
     *   data: {
     *     // ... data to create a ItemPresupuesto
     *   }
     * })
     * 
     */
    create<T extends ItemPresupuestoCreateArgs>(args: SelectSubset<T, ItemPresupuestoCreateArgs<ExtArgs>>): Prisma__ItemPresupuestoClient<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemPresupuestos.
     * @param {ItemPresupuestoCreateManyArgs} args - Arguments to create many ItemPresupuestos.
     * @example
     * // Create many ItemPresupuestos
     * const itemPresupuesto = await prisma.itemPresupuesto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemPresupuestoCreateManyArgs>(args?: SelectSubset<T, ItemPresupuestoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemPresupuestos and returns the data saved in the database.
     * @param {ItemPresupuestoCreateManyAndReturnArgs} args - Arguments to create many ItemPresupuestos.
     * @example
     * // Create many ItemPresupuestos
     * const itemPresupuesto = await prisma.itemPresupuesto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemPresupuestos and only return the `id`
     * const itemPresupuestoWithIdOnly = await prisma.itemPresupuesto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemPresupuestoCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemPresupuestoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemPresupuesto.
     * @param {ItemPresupuestoDeleteArgs} args - Arguments to delete one ItemPresupuesto.
     * @example
     * // Delete one ItemPresupuesto
     * const ItemPresupuesto = await prisma.itemPresupuesto.delete({
     *   where: {
     *     // ... filter to delete one ItemPresupuesto
     *   }
     * })
     * 
     */
    delete<T extends ItemPresupuestoDeleteArgs>(args: SelectSubset<T, ItemPresupuestoDeleteArgs<ExtArgs>>): Prisma__ItemPresupuestoClient<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemPresupuesto.
     * @param {ItemPresupuestoUpdateArgs} args - Arguments to update one ItemPresupuesto.
     * @example
     * // Update one ItemPresupuesto
     * const itemPresupuesto = await prisma.itemPresupuesto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemPresupuestoUpdateArgs>(args: SelectSubset<T, ItemPresupuestoUpdateArgs<ExtArgs>>): Prisma__ItemPresupuestoClient<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemPresupuestos.
     * @param {ItemPresupuestoDeleteManyArgs} args - Arguments to filter ItemPresupuestos to delete.
     * @example
     * // Delete a few ItemPresupuestos
     * const { count } = await prisma.itemPresupuesto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemPresupuestoDeleteManyArgs>(args?: SelectSubset<T, ItemPresupuestoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemPresupuestos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresupuestoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemPresupuestos
     * const itemPresupuesto = await prisma.itemPresupuesto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemPresupuestoUpdateManyArgs>(args: SelectSubset<T, ItemPresupuestoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemPresupuestos and returns the data updated in the database.
     * @param {ItemPresupuestoUpdateManyAndReturnArgs} args - Arguments to update many ItemPresupuestos.
     * @example
     * // Update many ItemPresupuestos
     * const itemPresupuesto = await prisma.itemPresupuesto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItemPresupuestos and only return the `id`
     * const itemPresupuestoWithIdOnly = await prisma.itemPresupuesto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemPresupuestoUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemPresupuestoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItemPresupuesto.
     * @param {ItemPresupuestoUpsertArgs} args - Arguments to update or create a ItemPresupuesto.
     * @example
     * // Update or create a ItemPresupuesto
     * const itemPresupuesto = await prisma.itemPresupuesto.upsert({
     *   create: {
     *     // ... data to create a ItemPresupuesto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemPresupuesto we want to update
     *   }
     * })
     */
    upsert<T extends ItemPresupuestoUpsertArgs>(args: SelectSubset<T, ItemPresupuestoUpsertArgs<ExtArgs>>): Prisma__ItemPresupuestoClient<$Result.GetResult<Prisma.$ItemPresupuestoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemPresupuestos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresupuestoCountArgs} args - Arguments to filter ItemPresupuestos to count.
     * @example
     * // Count the number of ItemPresupuestos
     * const count = await prisma.itemPresupuesto.count({
     *   where: {
     *     // ... the filter for the ItemPresupuestos we want to count
     *   }
     * })
    **/
    count<T extends ItemPresupuestoCountArgs>(
      args?: Subset<T, ItemPresupuestoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemPresupuestoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemPresupuesto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresupuestoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemPresupuestoAggregateArgs>(args: Subset<T, ItemPresupuestoAggregateArgs>): Prisma.PrismaPromise<GetItemPresupuestoAggregateType<T>>

    /**
     * Group by ItemPresupuesto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemPresupuestoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemPresupuestoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemPresupuestoGroupByArgs['orderBy'] }
        : { orderBy?: ItemPresupuestoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemPresupuestoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemPresupuestoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemPresupuesto model
   */
  readonly fields: ItemPresupuestoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemPresupuesto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemPresupuestoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    presupuesto<T extends PresupuestoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PresupuestoDefaultArgs<ExtArgs>>): Prisma__PresupuestoClient<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemPresupuesto model
   */
  interface ItemPresupuestoFieldRefs {
    readonly id: FieldRef<"ItemPresupuesto", 'String'>
    readonly presupuestoId: FieldRef<"ItemPresupuesto", 'String'>
    readonly productoId: FieldRef<"ItemPresupuesto", 'String'>
    readonly cantidad: FieldRef<"ItemPresupuesto", 'Int'>
    readonly precioUnitario: FieldRef<"ItemPresupuesto", 'Float'>
    readonly descuento: FieldRef<"ItemPresupuesto", 'Float'>
    readonly iva: FieldRef<"ItemPresupuesto", 'Float'>
    readonly total: FieldRef<"ItemPresupuesto", 'Float'>
    readonly createdAt: FieldRef<"ItemPresupuesto", 'DateTime'>
    readonly updatedAt: FieldRef<"ItemPresupuesto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemPresupuesto findUnique
   */
  export type ItemPresupuestoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    /**
     * Filter, which ItemPresupuesto to fetch.
     */
    where: ItemPresupuestoWhereUniqueInput
  }

  /**
   * ItemPresupuesto findUniqueOrThrow
   */
  export type ItemPresupuestoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    /**
     * Filter, which ItemPresupuesto to fetch.
     */
    where: ItemPresupuestoWhereUniqueInput
  }

  /**
   * ItemPresupuesto findFirst
   */
  export type ItemPresupuestoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    /**
     * Filter, which ItemPresupuesto to fetch.
     */
    where?: ItemPresupuestoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPresupuestos to fetch.
     */
    orderBy?: ItemPresupuestoOrderByWithRelationInput | ItemPresupuestoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemPresupuestos.
     */
    cursor?: ItemPresupuestoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPresupuestos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPresupuestos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemPresupuestos.
     */
    distinct?: ItemPresupuestoScalarFieldEnum | ItemPresupuestoScalarFieldEnum[]
  }

  /**
   * ItemPresupuesto findFirstOrThrow
   */
  export type ItemPresupuestoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    /**
     * Filter, which ItemPresupuesto to fetch.
     */
    where?: ItemPresupuestoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPresupuestos to fetch.
     */
    orderBy?: ItemPresupuestoOrderByWithRelationInput | ItemPresupuestoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemPresupuestos.
     */
    cursor?: ItemPresupuestoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPresupuestos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPresupuestos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemPresupuestos.
     */
    distinct?: ItemPresupuestoScalarFieldEnum | ItemPresupuestoScalarFieldEnum[]
  }

  /**
   * ItemPresupuesto findMany
   */
  export type ItemPresupuestoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    /**
     * Filter, which ItemPresupuestos to fetch.
     */
    where?: ItemPresupuestoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemPresupuestos to fetch.
     */
    orderBy?: ItemPresupuestoOrderByWithRelationInput | ItemPresupuestoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemPresupuestos.
     */
    cursor?: ItemPresupuestoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemPresupuestos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemPresupuestos.
     */
    skip?: number
    distinct?: ItemPresupuestoScalarFieldEnum | ItemPresupuestoScalarFieldEnum[]
  }

  /**
   * ItemPresupuesto create
   */
  export type ItemPresupuestoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemPresupuesto.
     */
    data: XOR<ItemPresupuestoCreateInput, ItemPresupuestoUncheckedCreateInput>
  }

  /**
   * ItemPresupuesto createMany
   */
  export type ItemPresupuestoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemPresupuestos.
     */
    data: ItemPresupuestoCreateManyInput | ItemPresupuestoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemPresupuesto createManyAndReturn
   */
  export type ItemPresupuestoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * The data used to create many ItemPresupuestos.
     */
    data: ItemPresupuestoCreateManyInput | ItemPresupuestoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemPresupuesto update
   */
  export type ItemPresupuestoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemPresupuesto.
     */
    data: XOR<ItemPresupuestoUpdateInput, ItemPresupuestoUncheckedUpdateInput>
    /**
     * Choose, which ItemPresupuesto to update.
     */
    where: ItemPresupuestoWhereUniqueInput
  }

  /**
   * ItemPresupuesto updateMany
   */
  export type ItemPresupuestoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemPresupuestos.
     */
    data: XOR<ItemPresupuestoUpdateManyMutationInput, ItemPresupuestoUncheckedUpdateManyInput>
    /**
     * Filter which ItemPresupuestos to update
     */
    where?: ItemPresupuestoWhereInput
    /**
     * Limit how many ItemPresupuestos to update.
     */
    limit?: number
  }

  /**
   * ItemPresupuesto updateManyAndReturn
   */
  export type ItemPresupuestoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * The data used to update ItemPresupuestos.
     */
    data: XOR<ItemPresupuestoUpdateManyMutationInput, ItemPresupuestoUncheckedUpdateManyInput>
    /**
     * Filter which ItemPresupuestos to update
     */
    where?: ItemPresupuestoWhereInput
    /**
     * Limit how many ItemPresupuestos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemPresupuesto upsert
   */
  export type ItemPresupuestoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemPresupuesto to update in case it exists.
     */
    where: ItemPresupuestoWhereUniqueInput
    /**
     * In case the ItemPresupuesto found by the `where` argument doesn't exist, create a new ItemPresupuesto with this data.
     */
    create: XOR<ItemPresupuestoCreateInput, ItemPresupuestoUncheckedCreateInput>
    /**
     * In case the ItemPresupuesto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemPresupuestoUpdateInput, ItemPresupuestoUncheckedUpdateInput>
  }

  /**
   * ItemPresupuesto delete
   */
  export type ItemPresupuestoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
    /**
     * Filter which ItemPresupuesto to delete.
     */
    where: ItemPresupuestoWhereUniqueInput
  }

  /**
   * ItemPresupuesto deleteMany
   */
  export type ItemPresupuestoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemPresupuestos to delete
     */
    where?: ItemPresupuestoWhereInput
    /**
     * Limit how many ItemPresupuestos to delete.
     */
    limit?: number
  }

  /**
   * ItemPresupuesto without action
   */
  export type ItemPresupuestoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemPresupuesto
     */
    select?: ItemPresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemPresupuesto
     */
    omit?: ItemPresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemPresupuestoInclude<ExtArgs> | null
  }


  /**
   * Model Factura
   */

  export type AggregateFactura = {
    _count: FacturaCountAggregateOutputType | null
    _avg: FacturaAvgAggregateOutputType | null
    _sum: FacturaSumAggregateOutputType | null
    _min: FacturaMinAggregateOutputType | null
    _max: FacturaMaxAggregateOutputType | null
  }

  export type FacturaAvgAggregateOutputType = {
    subtotal: number | null
    iva: number | null
    total: number | null
  }

  export type FacturaSumAggregateOutputType = {
    subtotal: number | null
    iva: number | null
    total: number | null
  }

  export type FacturaMinAggregateOutputType = {
    id: string | null
    numero: string | null
    fecha: Date | null
    fechaVencimiento: Date | null
    clienteId: string | null
    estado: $Enums.EstadoFactura | null
    observaciones: string | null
    subtotal: number | null
    iva: number | null
    total: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FacturaMaxAggregateOutputType = {
    id: string | null
    numero: string | null
    fecha: Date | null
    fechaVencimiento: Date | null
    clienteId: string | null
    estado: $Enums.EstadoFactura | null
    observaciones: string | null
    subtotal: number | null
    iva: number | null
    total: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FacturaCountAggregateOutputType = {
    id: number
    numero: number
    fecha: number
    fechaVencimiento: number
    clienteId: number
    estado: number
    observaciones: number
    subtotal: number
    iva: number
    total: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FacturaAvgAggregateInputType = {
    subtotal?: true
    iva?: true
    total?: true
  }

  export type FacturaSumAggregateInputType = {
    subtotal?: true
    iva?: true
    total?: true
  }

  export type FacturaMinAggregateInputType = {
    id?: true
    numero?: true
    fecha?: true
    fechaVencimiento?: true
    clienteId?: true
    estado?: true
    observaciones?: true
    subtotal?: true
    iva?: true
    total?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FacturaMaxAggregateInputType = {
    id?: true
    numero?: true
    fecha?: true
    fechaVencimiento?: true
    clienteId?: true
    estado?: true
    observaciones?: true
    subtotal?: true
    iva?: true
    total?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FacturaCountAggregateInputType = {
    id?: true
    numero?: true
    fecha?: true
    fechaVencimiento?: true
    clienteId?: true
    estado?: true
    observaciones?: true
    subtotal?: true
    iva?: true
    total?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FacturaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Factura to aggregate.
     */
    where?: FacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facturas to fetch.
     */
    orderBy?: FacturaOrderByWithRelationInput | FacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Facturas
    **/
    _count?: true | FacturaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FacturaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FacturaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FacturaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FacturaMaxAggregateInputType
  }

  export type GetFacturaAggregateType<T extends FacturaAggregateArgs> = {
        [P in keyof T & keyof AggregateFactura]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFactura[P]>
      : GetScalarType<T[P], AggregateFactura[P]>
  }




  export type FacturaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FacturaWhereInput
    orderBy?: FacturaOrderByWithAggregationInput | FacturaOrderByWithAggregationInput[]
    by: FacturaScalarFieldEnum[] | FacturaScalarFieldEnum
    having?: FacturaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FacturaCountAggregateInputType | true
    _avg?: FacturaAvgAggregateInputType
    _sum?: FacturaSumAggregateInputType
    _min?: FacturaMinAggregateInputType
    _max?: FacturaMaxAggregateInputType
  }

  export type FacturaGroupByOutputType = {
    id: string
    numero: string
    fecha: Date
    fechaVencimiento: Date
    clienteId: string
    estado: $Enums.EstadoFactura
    observaciones: string | null
    subtotal: number
    iva: number
    total: number
    createdAt: Date
    updatedAt: Date
    _count: FacturaCountAggregateOutputType | null
    _avg: FacturaAvgAggregateOutputType | null
    _sum: FacturaSumAggregateOutputType | null
    _min: FacturaMinAggregateOutputType | null
    _max: FacturaMaxAggregateOutputType | null
  }

  type GetFacturaGroupByPayload<T extends FacturaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FacturaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FacturaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FacturaGroupByOutputType[P]>
            : GetScalarType<T[P], FacturaGroupByOutputType[P]>
        }
      >
    >


  export type FacturaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    fecha?: boolean
    fechaVencimiento?: boolean
    clienteId?: boolean
    estado?: boolean
    observaciones?: boolean
    subtotal?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    items?: boolean | Factura$itemsArgs<ExtArgs>
    presupuestos?: boolean | Factura$presupuestosArgs<ExtArgs>
    _count?: boolean | FacturaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["factura"]>

  export type FacturaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    fecha?: boolean
    fechaVencimiento?: boolean
    clienteId?: boolean
    estado?: boolean
    observaciones?: boolean
    subtotal?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["factura"]>

  export type FacturaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    numero?: boolean
    fecha?: boolean
    fechaVencimiento?: boolean
    clienteId?: boolean
    estado?: boolean
    observaciones?: boolean
    subtotal?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["factura"]>

  export type FacturaSelectScalar = {
    id?: boolean
    numero?: boolean
    fecha?: boolean
    fechaVencimiento?: boolean
    clienteId?: boolean
    estado?: boolean
    observaciones?: boolean
    subtotal?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FacturaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "numero" | "fecha" | "fechaVencimiento" | "clienteId" | "estado" | "observaciones" | "subtotal" | "iva" | "total" | "createdAt" | "updatedAt", ExtArgs["result"]["factura"]>
  export type FacturaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
    items?: boolean | Factura$itemsArgs<ExtArgs>
    presupuestos?: boolean | Factura$presupuestosArgs<ExtArgs>
    _count?: boolean | FacturaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FacturaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }
  export type FacturaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cliente?: boolean | ClienteDefaultArgs<ExtArgs>
  }

  export type $FacturaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Factura"
    objects: {
      cliente: Prisma.$ClientePayload<ExtArgs>
      items: Prisma.$ItemFacturaPayload<ExtArgs>[]
      presupuestos: Prisma.$PresupuestoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      numero: string
      fecha: Date
      fechaVencimiento: Date
      clienteId: string
      estado: $Enums.EstadoFactura
      observaciones: string | null
      subtotal: number
      iva: number
      total: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["factura"]>
    composites: {}
  }

  type FacturaGetPayload<S extends boolean | null | undefined | FacturaDefaultArgs> = $Result.GetResult<Prisma.$FacturaPayload, S>

  type FacturaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FacturaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FacturaCountAggregateInputType | true
    }

  export interface FacturaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Factura'], meta: { name: 'Factura' } }
    /**
     * Find zero or one Factura that matches the filter.
     * @param {FacturaFindUniqueArgs} args - Arguments to find a Factura
     * @example
     * // Get one Factura
     * const factura = await prisma.factura.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FacturaFindUniqueArgs>(args: SelectSubset<T, FacturaFindUniqueArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Factura that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FacturaFindUniqueOrThrowArgs} args - Arguments to find a Factura
     * @example
     * // Get one Factura
     * const factura = await prisma.factura.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FacturaFindUniqueOrThrowArgs>(args: SelectSubset<T, FacturaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Factura that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaFindFirstArgs} args - Arguments to find a Factura
     * @example
     * // Get one Factura
     * const factura = await prisma.factura.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FacturaFindFirstArgs>(args?: SelectSubset<T, FacturaFindFirstArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Factura that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaFindFirstOrThrowArgs} args - Arguments to find a Factura
     * @example
     * // Get one Factura
     * const factura = await prisma.factura.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FacturaFindFirstOrThrowArgs>(args?: SelectSubset<T, FacturaFindFirstOrThrowArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Facturas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Facturas
     * const facturas = await prisma.factura.findMany()
     * 
     * // Get first 10 Facturas
     * const facturas = await prisma.factura.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const facturaWithIdOnly = await prisma.factura.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FacturaFindManyArgs>(args?: SelectSubset<T, FacturaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Factura.
     * @param {FacturaCreateArgs} args - Arguments to create a Factura.
     * @example
     * // Create one Factura
     * const Factura = await prisma.factura.create({
     *   data: {
     *     // ... data to create a Factura
     *   }
     * })
     * 
     */
    create<T extends FacturaCreateArgs>(args: SelectSubset<T, FacturaCreateArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Facturas.
     * @param {FacturaCreateManyArgs} args - Arguments to create many Facturas.
     * @example
     * // Create many Facturas
     * const factura = await prisma.factura.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FacturaCreateManyArgs>(args?: SelectSubset<T, FacturaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Facturas and returns the data saved in the database.
     * @param {FacturaCreateManyAndReturnArgs} args - Arguments to create many Facturas.
     * @example
     * // Create many Facturas
     * const factura = await prisma.factura.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Facturas and only return the `id`
     * const facturaWithIdOnly = await prisma.factura.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FacturaCreateManyAndReturnArgs>(args?: SelectSubset<T, FacturaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Factura.
     * @param {FacturaDeleteArgs} args - Arguments to delete one Factura.
     * @example
     * // Delete one Factura
     * const Factura = await prisma.factura.delete({
     *   where: {
     *     // ... filter to delete one Factura
     *   }
     * })
     * 
     */
    delete<T extends FacturaDeleteArgs>(args: SelectSubset<T, FacturaDeleteArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Factura.
     * @param {FacturaUpdateArgs} args - Arguments to update one Factura.
     * @example
     * // Update one Factura
     * const factura = await prisma.factura.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FacturaUpdateArgs>(args: SelectSubset<T, FacturaUpdateArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Facturas.
     * @param {FacturaDeleteManyArgs} args - Arguments to filter Facturas to delete.
     * @example
     * // Delete a few Facturas
     * const { count } = await prisma.factura.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FacturaDeleteManyArgs>(args?: SelectSubset<T, FacturaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Facturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Facturas
     * const factura = await prisma.factura.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FacturaUpdateManyArgs>(args: SelectSubset<T, FacturaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Facturas and returns the data updated in the database.
     * @param {FacturaUpdateManyAndReturnArgs} args - Arguments to update many Facturas.
     * @example
     * // Update many Facturas
     * const factura = await prisma.factura.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Facturas and only return the `id`
     * const facturaWithIdOnly = await prisma.factura.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FacturaUpdateManyAndReturnArgs>(args: SelectSubset<T, FacturaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Factura.
     * @param {FacturaUpsertArgs} args - Arguments to update or create a Factura.
     * @example
     * // Update or create a Factura
     * const factura = await prisma.factura.upsert({
     *   create: {
     *     // ... data to create a Factura
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Factura we want to update
     *   }
     * })
     */
    upsert<T extends FacturaUpsertArgs>(args: SelectSubset<T, FacturaUpsertArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Facturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaCountArgs} args - Arguments to filter Facturas to count.
     * @example
     * // Count the number of Facturas
     * const count = await prisma.factura.count({
     *   where: {
     *     // ... the filter for the Facturas we want to count
     *   }
     * })
    **/
    count<T extends FacturaCountArgs>(
      args?: Subset<T, FacturaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FacturaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Factura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FacturaAggregateArgs>(args: Subset<T, FacturaAggregateArgs>): Prisma.PrismaPromise<GetFacturaAggregateType<T>>

    /**
     * Group by Factura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacturaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FacturaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FacturaGroupByArgs['orderBy'] }
        : { orderBy?: FacturaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FacturaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacturaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Factura model
   */
  readonly fields: FacturaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Factura.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FacturaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cliente<T extends ClienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClienteDefaultArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Factura$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Factura$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    presupuestos<T extends Factura$presupuestosArgs<ExtArgs> = {}>(args?: Subset<T, Factura$presupuestosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PresupuestoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Factura model
   */
  interface FacturaFieldRefs {
    readonly id: FieldRef<"Factura", 'String'>
    readonly numero: FieldRef<"Factura", 'String'>
    readonly fecha: FieldRef<"Factura", 'DateTime'>
    readonly fechaVencimiento: FieldRef<"Factura", 'DateTime'>
    readonly clienteId: FieldRef<"Factura", 'String'>
    readonly estado: FieldRef<"Factura", 'EstadoFactura'>
    readonly observaciones: FieldRef<"Factura", 'String'>
    readonly subtotal: FieldRef<"Factura", 'Float'>
    readonly iva: FieldRef<"Factura", 'Float'>
    readonly total: FieldRef<"Factura", 'Float'>
    readonly createdAt: FieldRef<"Factura", 'DateTime'>
    readonly updatedAt: FieldRef<"Factura", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Factura findUnique
   */
  export type FacturaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    /**
     * Filter, which Factura to fetch.
     */
    where: FacturaWhereUniqueInput
  }

  /**
   * Factura findUniqueOrThrow
   */
  export type FacturaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    /**
     * Filter, which Factura to fetch.
     */
    where: FacturaWhereUniqueInput
  }

  /**
   * Factura findFirst
   */
  export type FacturaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    /**
     * Filter, which Factura to fetch.
     */
    where?: FacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facturas to fetch.
     */
    orderBy?: FacturaOrderByWithRelationInput | FacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Facturas.
     */
    cursor?: FacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Facturas.
     */
    distinct?: FacturaScalarFieldEnum | FacturaScalarFieldEnum[]
  }

  /**
   * Factura findFirstOrThrow
   */
  export type FacturaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    /**
     * Filter, which Factura to fetch.
     */
    where?: FacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facturas to fetch.
     */
    orderBy?: FacturaOrderByWithRelationInput | FacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Facturas.
     */
    cursor?: FacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Facturas.
     */
    distinct?: FacturaScalarFieldEnum | FacturaScalarFieldEnum[]
  }

  /**
   * Factura findMany
   */
  export type FacturaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    /**
     * Filter, which Facturas to fetch.
     */
    where?: FacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Facturas to fetch.
     */
    orderBy?: FacturaOrderByWithRelationInput | FacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Facturas.
     */
    cursor?: FacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Facturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Facturas.
     */
    skip?: number
    distinct?: FacturaScalarFieldEnum | FacturaScalarFieldEnum[]
  }

  /**
   * Factura create
   */
  export type FacturaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    /**
     * The data needed to create a Factura.
     */
    data: XOR<FacturaCreateInput, FacturaUncheckedCreateInput>
  }

  /**
   * Factura createMany
   */
  export type FacturaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Facturas.
     */
    data: FacturaCreateManyInput | FacturaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Factura createManyAndReturn
   */
  export type FacturaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * The data used to create many Facturas.
     */
    data: FacturaCreateManyInput | FacturaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Factura update
   */
  export type FacturaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    /**
     * The data needed to update a Factura.
     */
    data: XOR<FacturaUpdateInput, FacturaUncheckedUpdateInput>
    /**
     * Choose, which Factura to update.
     */
    where: FacturaWhereUniqueInput
  }

  /**
   * Factura updateMany
   */
  export type FacturaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Facturas.
     */
    data: XOR<FacturaUpdateManyMutationInput, FacturaUncheckedUpdateManyInput>
    /**
     * Filter which Facturas to update
     */
    where?: FacturaWhereInput
    /**
     * Limit how many Facturas to update.
     */
    limit?: number
  }

  /**
   * Factura updateManyAndReturn
   */
  export type FacturaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * The data used to update Facturas.
     */
    data: XOR<FacturaUpdateManyMutationInput, FacturaUncheckedUpdateManyInput>
    /**
     * Filter which Facturas to update
     */
    where?: FacturaWhereInput
    /**
     * Limit how many Facturas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Factura upsert
   */
  export type FacturaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    /**
     * The filter to search for the Factura to update in case it exists.
     */
    where: FacturaWhereUniqueInput
    /**
     * In case the Factura found by the `where` argument doesn't exist, create a new Factura with this data.
     */
    create: XOR<FacturaCreateInput, FacturaUncheckedCreateInput>
    /**
     * In case the Factura was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FacturaUpdateInput, FacturaUncheckedUpdateInput>
  }

  /**
   * Factura delete
   */
  export type FacturaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
    /**
     * Filter which Factura to delete.
     */
    where: FacturaWhereUniqueInput
  }

  /**
   * Factura deleteMany
   */
  export type FacturaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Facturas to delete
     */
    where?: FacturaWhereInput
    /**
     * Limit how many Facturas to delete.
     */
    limit?: number
  }

  /**
   * Factura.items
   */
  export type Factura$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    where?: ItemFacturaWhereInput
    orderBy?: ItemFacturaOrderByWithRelationInput | ItemFacturaOrderByWithRelationInput[]
    cursor?: ItemFacturaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemFacturaScalarFieldEnum | ItemFacturaScalarFieldEnum[]
  }

  /**
   * Factura.presupuestos
   */
  export type Factura$presupuestosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Presupuesto
     */
    select?: PresupuestoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Presupuesto
     */
    omit?: PresupuestoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PresupuestoInclude<ExtArgs> | null
    where?: PresupuestoWhereInput
    orderBy?: PresupuestoOrderByWithRelationInput | PresupuestoOrderByWithRelationInput[]
    cursor?: PresupuestoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PresupuestoScalarFieldEnum | PresupuestoScalarFieldEnum[]
  }

  /**
   * Factura without action
   */
  export type FacturaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Factura
     */
    select?: FacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Factura
     */
    omit?: FacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacturaInclude<ExtArgs> | null
  }


  /**
   * Model ItemFactura
   */

  export type AggregateItemFactura = {
    _count: ItemFacturaCountAggregateOutputType | null
    _avg: ItemFacturaAvgAggregateOutputType | null
    _sum: ItemFacturaSumAggregateOutputType | null
    _min: ItemFacturaMinAggregateOutputType | null
    _max: ItemFacturaMaxAggregateOutputType | null
  }

  export type ItemFacturaAvgAggregateOutputType = {
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    iva: number | null
    total: number | null
  }

  export type ItemFacturaSumAggregateOutputType = {
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    iva: number | null
    total: number | null
  }

  export type ItemFacturaMinAggregateOutputType = {
    id: string | null
    facturaId: string | null
    productoId: string | null
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    iva: number | null
    total: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemFacturaMaxAggregateOutputType = {
    id: string | null
    facturaId: string | null
    productoId: string | null
    cantidad: number | null
    precioUnitario: number | null
    descuento: number | null
    iva: number | null
    total: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemFacturaCountAggregateOutputType = {
    id: number
    facturaId: number
    productoId: number
    cantidad: number
    precioUnitario: number
    descuento: number
    iva: number
    total: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ItemFacturaAvgAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    iva?: true
    total?: true
  }

  export type ItemFacturaSumAggregateInputType = {
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    iva?: true
    total?: true
  }

  export type ItemFacturaMinAggregateInputType = {
    id?: true
    facturaId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    iva?: true
    total?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemFacturaMaxAggregateInputType = {
    id?: true
    facturaId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    iva?: true
    total?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemFacturaCountAggregateInputType = {
    id?: true
    facturaId?: true
    productoId?: true
    cantidad?: true
    precioUnitario?: true
    descuento?: true
    iva?: true
    total?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ItemFacturaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemFactura to aggregate.
     */
    where?: ItemFacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFacturas to fetch.
     */
    orderBy?: ItemFacturaOrderByWithRelationInput | ItemFacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemFacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFacturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFacturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ItemFacturas
    **/
    _count?: true | ItemFacturaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemFacturaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemFacturaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemFacturaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemFacturaMaxAggregateInputType
  }

  export type GetItemFacturaAggregateType<T extends ItemFacturaAggregateArgs> = {
        [P in keyof T & keyof AggregateItemFactura]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItemFactura[P]>
      : GetScalarType<T[P], AggregateItemFactura[P]>
  }




  export type ItemFacturaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemFacturaWhereInput
    orderBy?: ItemFacturaOrderByWithAggregationInput | ItemFacturaOrderByWithAggregationInput[]
    by: ItemFacturaScalarFieldEnum[] | ItemFacturaScalarFieldEnum
    having?: ItemFacturaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemFacturaCountAggregateInputType | true
    _avg?: ItemFacturaAvgAggregateInputType
    _sum?: ItemFacturaSumAggregateInputType
    _min?: ItemFacturaMinAggregateInputType
    _max?: ItemFacturaMaxAggregateInputType
  }

  export type ItemFacturaGroupByOutputType = {
    id: string
    facturaId: string
    productoId: string
    cantidad: number
    precioUnitario: number
    descuento: number
    iva: number
    total: number
    createdAt: Date
    updatedAt: Date
    _count: ItemFacturaCountAggregateOutputType | null
    _avg: ItemFacturaAvgAggregateOutputType | null
    _sum: ItemFacturaSumAggregateOutputType | null
    _min: ItemFacturaMinAggregateOutputType | null
    _max: ItemFacturaMaxAggregateOutputType | null
  }

  type GetItemFacturaGroupByPayload<T extends ItemFacturaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemFacturaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemFacturaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemFacturaGroupByOutputType[P]>
            : GetScalarType<T[P], ItemFacturaGroupByOutputType[P]>
        }
      >
    >


  export type ItemFacturaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    facturaId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    factura?: boolean | FacturaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFactura"]>

  export type ItemFacturaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    facturaId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    factura?: boolean | FacturaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFactura"]>

  export type ItemFacturaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    facturaId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    factura?: boolean | FacturaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["itemFactura"]>

  export type ItemFacturaSelectScalar = {
    id?: boolean
    facturaId?: boolean
    productoId?: boolean
    cantidad?: boolean
    precioUnitario?: boolean
    descuento?: boolean
    iva?: boolean
    total?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ItemFacturaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "facturaId" | "productoId" | "cantidad" | "precioUnitario" | "descuento" | "iva" | "total" | "createdAt" | "updatedAt", ExtArgs["result"]["itemFactura"]>
  export type ItemFacturaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    factura?: boolean | FacturaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type ItemFacturaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    factura?: boolean | FacturaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }
  export type ItemFacturaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    factura?: boolean | FacturaDefaultArgs<ExtArgs>
    producto?: boolean | ProductoDefaultArgs<ExtArgs>
  }

  export type $ItemFacturaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ItemFactura"
    objects: {
      factura: Prisma.$FacturaPayload<ExtArgs>
      producto: Prisma.$ProductoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      facturaId: string
      productoId: string
      cantidad: number
      precioUnitario: number
      descuento: number
      iva: number
      total: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["itemFactura"]>
    composites: {}
  }

  type ItemFacturaGetPayload<S extends boolean | null | undefined | ItemFacturaDefaultArgs> = $Result.GetResult<Prisma.$ItemFacturaPayload, S>

  type ItemFacturaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFacturaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemFacturaCountAggregateInputType | true
    }

  export interface ItemFacturaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ItemFactura'], meta: { name: 'ItemFactura' } }
    /**
     * Find zero or one ItemFactura that matches the filter.
     * @param {ItemFacturaFindUniqueArgs} args - Arguments to find a ItemFactura
     * @example
     * // Get one ItemFactura
     * const itemFactura = await prisma.itemFactura.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFacturaFindUniqueArgs>(args: SelectSubset<T, ItemFacturaFindUniqueArgs<ExtArgs>>): Prisma__ItemFacturaClient<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ItemFactura that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFacturaFindUniqueOrThrowArgs} args - Arguments to find a ItemFactura
     * @example
     * // Get one ItemFactura
     * const itemFactura = await prisma.itemFactura.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFacturaFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFacturaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemFacturaClient<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemFactura that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFacturaFindFirstArgs} args - Arguments to find a ItemFactura
     * @example
     * // Get one ItemFactura
     * const itemFactura = await prisma.itemFactura.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFacturaFindFirstArgs>(args?: SelectSubset<T, ItemFacturaFindFirstArgs<ExtArgs>>): Prisma__ItemFacturaClient<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ItemFactura that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFacturaFindFirstOrThrowArgs} args - Arguments to find a ItemFactura
     * @example
     * // Get one ItemFactura
     * const itemFactura = await prisma.itemFactura.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFacturaFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFacturaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemFacturaClient<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ItemFacturas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFacturaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ItemFacturas
     * const itemFacturas = await prisma.itemFactura.findMany()
     * 
     * // Get first 10 ItemFacturas
     * const itemFacturas = await prisma.itemFactura.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemFacturaWithIdOnly = await prisma.itemFactura.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFacturaFindManyArgs>(args?: SelectSubset<T, ItemFacturaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ItemFactura.
     * @param {ItemFacturaCreateArgs} args - Arguments to create a ItemFactura.
     * @example
     * // Create one ItemFactura
     * const ItemFactura = await prisma.itemFactura.create({
     *   data: {
     *     // ... data to create a ItemFactura
     *   }
     * })
     * 
     */
    create<T extends ItemFacturaCreateArgs>(args: SelectSubset<T, ItemFacturaCreateArgs<ExtArgs>>): Prisma__ItemFacturaClient<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ItemFacturas.
     * @param {ItemFacturaCreateManyArgs} args - Arguments to create many ItemFacturas.
     * @example
     * // Create many ItemFacturas
     * const itemFactura = await prisma.itemFactura.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemFacturaCreateManyArgs>(args?: SelectSubset<T, ItemFacturaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ItemFacturas and returns the data saved in the database.
     * @param {ItemFacturaCreateManyAndReturnArgs} args - Arguments to create many ItemFacturas.
     * @example
     * // Create many ItemFacturas
     * const itemFactura = await prisma.itemFactura.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ItemFacturas and only return the `id`
     * const itemFacturaWithIdOnly = await prisma.itemFactura.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemFacturaCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemFacturaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ItemFactura.
     * @param {ItemFacturaDeleteArgs} args - Arguments to delete one ItemFactura.
     * @example
     * // Delete one ItemFactura
     * const ItemFactura = await prisma.itemFactura.delete({
     *   where: {
     *     // ... filter to delete one ItemFactura
     *   }
     * })
     * 
     */
    delete<T extends ItemFacturaDeleteArgs>(args: SelectSubset<T, ItemFacturaDeleteArgs<ExtArgs>>): Prisma__ItemFacturaClient<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ItemFactura.
     * @param {ItemFacturaUpdateArgs} args - Arguments to update one ItemFactura.
     * @example
     * // Update one ItemFactura
     * const itemFactura = await prisma.itemFactura.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemFacturaUpdateArgs>(args: SelectSubset<T, ItemFacturaUpdateArgs<ExtArgs>>): Prisma__ItemFacturaClient<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ItemFacturas.
     * @param {ItemFacturaDeleteManyArgs} args - Arguments to filter ItemFacturas to delete.
     * @example
     * // Delete a few ItemFacturas
     * const { count } = await prisma.itemFactura.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemFacturaDeleteManyArgs>(args?: SelectSubset<T, ItemFacturaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemFacturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFacturaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ItemFacturas
     * const itemFactura = await prisma.itemFactura.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemFacturaUpdateManyArgs>(args: SelectSubset<T, ItemFacturaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ItemFacturas and returns the data updated in the database.
     * @param {ItemFacturaUpdateManyAndReturnArgs} args - Arguments to update many ItemFacturas.
     * @example
     * // Update many ItemFacturas
     * const itemFactura = await prisma.itemFactura.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ItemFacturas and only return the `id`
     * const itemFacturaWithIdOnly = await prisma.itemFactura.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemFacturaUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemFacturaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ItemFactura.
     * @param {ItemFacturaUpsertArgs} args - Arguments to update or create a ItemFactura.
     * @example
     * // Update or create a ItemFactura
     * const itemFactura = await prisma.itemFactura.upsert({
     *   create: {
     *     // ... data to create a ItemFactura
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ItemFactura we want to update
     *   }
     * })
     */
    upsert<T extends ItemFacturaUpsertArgs>(args: SelectSubset<T, ItemFacturaUpsertArgs<ExtArgs>>): Prisma__ItemFacturaClient<$Result.GetResult<Prisma.$ItemFacturaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ItemFacturas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFacturaCountArgs} args - Arguments to filter ItemFacturas to count.
     * @example
     * // Count the number of ItemFacturas
     * const count = await prisma.itemFactura.count({
     *   where: {
     *     // ... the filter for the ItemFacturas we want to count
     *   }
     * })
    **/
    count<T extends ItemFacturaCountArgs>(
      args?: Subset<T, ItemFacturaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemFacturaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ItemFactura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFacturaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemFacturaAggregateArgs>(args: Subset<T, ItemFacturaAggregateArgs>): Prisma.PrismaPromise<GetItemFacturaAggregateType<T>>

    /**
     * Group by ItemFactura.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFacturaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemFacturaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemFacturaGroupByArgs['orderBy'] }
        : { orderBy?: ItemFacturaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemFacturaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemFacturaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ItemFactura model
   */
  readonly fields: ItemFacturaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ItemFactura.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemFacturaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    factura<T extends FacturaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FacturaDefaultArgs<ExtArgs>>): Prisma__FacturaClient<$Result.GetResult<Prisma.$FacturaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    producto<T extends ProductoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductoDefaultArgs<ExtArgs>>): Prisma__ProductoClient<$Result.GetResult<Prisma.$ProductoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ItemFactura model
   */
  interface ItemFacturaFieldRefs {
    readonly id: FieldRef<"ItemFactura", 'String'>
    readonly facturaId: FieldRef<"ItemFactura", 'String'>
    readonly productoId: FieldRef<"ItemFactura", 'String'>
    readonly cantidad: FieldRef<"ItemFactura", 'Int'>
    readonly precioUnitario: FieldRef<"ItemFactura", 'Float'>
    readonly descuento: FieldRef<"ItemFactura", 'Float'>
    readonly iva: FieldRef<"ItemFactura", 'Float'>
    readonly total: FieldRef<"ItemFactura", 'Float'>
    readonly createdAt: FieldRef<"ItemFactura", 'DateTime'>
    readonly updatedAt: FieldRef<"ItemFactura", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ItemFactura findUnique
   */
  export type ItemFacturaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    /**
     * Filter, which ItemFactura to fetch.
     */
    where: ItemFacturaWhereUniqueInput
  }

  /**
   * ItemFactura findUniqueOrThrow
   */
  export type ItemFacturaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    /**
     * Filter, which ItemFactura to fetch.
     */
    where: ItemFacturaWhereUniqueInput
  }

  /**
   * ItemFactura findFirst
   */
  export type ItemFacturaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    /**
     * Filter, which ItemFactura to fetch.
     */
    where?: ItemFacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFacturas to fetch.
     */
    orderBy?: ItemFacturaOrderByWithRelationInput | ItemFacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemFacturas.
     */
    cursor?: ItemFacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFacturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFacturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemFacturas.
     */
    distinct?: ItemFacturaScalarFieldEnum | ItemFacturaScalarFieldEnum[]
  }

  /**
   * ItemFactura findFirstOrThrow
   */
  export type ItemFacturaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    /**
     * Filter, which ItemFactura to fetch.
     */
    where?: ItemFacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFacturas to fetch.
     */
    orderBy?: ItemFacturaOrderByWithRelationInput | ItemFacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ItemFacturas.
     */
    cursor?: ItemFacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFacturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFacturas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ItemFacturas.
     */
    distinct?: ItemFacturaScalarFieldEnum | ItemFacturaScalarFieldEnum[]
  }

  /**
   * ItemFactura findMany
   */
  export type ItemFacturaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    /**
     * Filter, which ItemFacturas to fetch.
     */
    where?: ItemFacturaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ItemFacturas to fetch.
     */
    orderBy?: ItemFacturaOrderByWithRelationInput | ItemFacturaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ItemFacturas.
     */
    cursor?: ItemFacturaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ItemFacturas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ItemFacturas.
     */
    skip?: number
    distinct?: ItemFacturaScalarFieldEnum | ItemFacturaScalarFieldEnum[]
  }

  /**
   * ItemFactura create
   */
  export type ItemFacturaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    /**
     * The data needed to create a ItemFactura.
     */
    data: XOR<ItemFacturaCreateInput, ItemFacturaUncheckedCreateInput>
  }

  /**
   * ItemFactura createMany
   */
  export type ItemFacturaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ItemFacturas.
     */
    data: ItemFacturaCreateManyInput | ItemFacturaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ItemFactura createManyAndReturn
   */
  export type ItemFacturaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * The data used to create many ItemFacturas.
     */
    data: ItemFacturaCreateManyInput | ItemFacturaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemFactura update
   */
  export type ItemFacturaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    /**
     * The data needed to update a ItemFactura.
     */
    data: XOR<ItemFacturaUpdateInput, ItemFacturaUncheckedUpdateInput>
    /**
     * Choose, which ItemFactura to update.
     */
    where: ItemFacturaWhereUniqueInput
  }

  /**
   * ItemFactura updateMany
   */
  export type ItemFacturaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ItemFacturas.
     */
    data: XOR<ItemFacturaUpdateManyMutationInput, ItemFacturaUncheckedUpdateManyInput>
    /**
     * Filter which ItemFacturas to update
     */
    where?: ItemFacturaWhereInput
    /**
     * Limit how many ItemFacturas to update.
     */
    limit?: number
  }

  /**
   * ItemFactura updateManyAndReturn
   */
  export type ItemFacturaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * The data used to update ItemFacturas.
     */
    data: XOR<ItemFacturaUpdateManyMutationInput, ItemFacturaUncheckedUpdateManyInput>
    /**
     * Filter which ItemFacturas to update
     */
    where?: ItemFacturaWhereInput
    /**
     * Limit how many ItemFacturas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ItemFactura upsert
   */
  export type ItemFacturaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    /**
     * The filter to search for the ItemFactura to update in case it exists.
     */
    where: ItemFacturaWhereUniqueInput
    /**
     * In case the ItemFactura found by the `where` argument doesn't exist, create a new ItemFactura with this data.
     */
    create: XOR<ItemFacturaCreateInput, ItemFacturaUncheckedCreateInput>
    /**
     * In case the ItemFactura was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemFacturaUpdateInput, ItemFacturaUncheckedUpdateInput>
  }

  /**
   * ItemFactura delete
   */
  export type ItemFacturaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
    /**
     * Filter which ItemFactura to delete.
     */
    where: ItemFacturaWhereUniqueInput
  }

  /**
   * ItemFactura deleteMany
   */
  export type ItemFacturaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ItemFacturas to delete
     */
    where?: ItemFacturaWhereInput
    /**
     * Limit how many ItemFacturas to delete.
     */
    limit?: number
  }

  /**
   * ItemFactura without action
   */
  export type ItemFacturaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemFactura
     */
    select?: ItemFacturaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ItemFactura
     */
    omit?: ItemFacturaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemFacturaInclude<ExtArgs> | null
  }


  /**
   * Model Configuracion
   */

  export type AggregateConfiguracion = {
    _count: ConfiguracionCountAggregateOutputType | null
    _avg: ConfiguracionAvgAggregateOutputType | null
    _sum: ConfiguracionSumAggregateOutputType | null
    _min: ConfiguracionMinAggregateOutputType | null
    _max: ConfiguracionMaxAggregateOutputType | null
  }

  export type ConfiguracionAvgAggregateOutputType = {
    ivaPorDefecto: number | null
  }

  export type ConfiguracionSumAggregateOutputType = {
    ivaPorDefecto: number | null
  }

  export type ConfiguracionMinAggregateOutputType = {
    id: string | null
    ivaPorDefecto: number | null
    moneda: string | null
    prefijoFactura: string | null
    prefijoPresupuesto: string | null
  }

  export type ConfiguracionMaxAggregateOutputType = {
    id: string | null
    ivaPorDefecto: number | null
    moneda: string | null
    prefijoFactura: string | null
    prefijoPresupuesto: string | null
  }

  export type ConfiguracionCountAggregateOutputType = {
    id: number
    ivaPorDefecto: number
    moneda: number
    prefijoFactura: number
    prefijoPresupuesto: number
    _all: number
  }


  export type ConfiguracionAvgAggregateInputType = {
    ivaPorDefecto?: true
  }

  export type ConfiguracionSumAggregateInputType = {
    ivaPorDefecto?: true
  }

  export type ConfiguracionMinAggregateInputType = {
    id?: true
    ivaPorDefecto?: true
    moneda?: true
    prefijoFactura?: true
    prefijoPresupuesto?: true
  }

  export type ConfiguracionMaxAggregateInputType = {
    id?: true
    ivaPorDefecto?: true
    moneda?: true
    prefijoFactura?: true
    prefijoPresupuesto?: true
  }

  export type ConfiguracionCountAggregateInputType = {
    id?: true
    ivaPorDefecto?: true
    moneda?: true
    prefijoFactura?: true
    prefijoPresupuesto?: true
    _all?: true
  }

  export type ConfiguracionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configuracion to aggregate.
     */
    where?: ConfiguracionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configuracions to fetch.
     */
    orderBy?: ConfiguracionOrderByWithRelationInput | ConfiguracionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConfiguracionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configuracions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configuracions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Configuracions
    **/
    _count?: true | ConfiguracionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConfiguracionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConfiguracionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConfiguracionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConfiguracionMaxAggregateInputType
  }

  export type GetConfiguracionAggregateType<T extends ConfiguracionAggregateArgs> = {
        [P in keyof T & keyof AggregateConfiguracion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfiguracion[P]>
      : GetScalarType<T[P], AggregateConfiguracion[P]>
  }




  export type ConfiguracionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConfiguracionWhereInput
    orderBy?: ConfiguracionOrderByWithAggregationInput | ConfiguracionOrderByWithAggregationInput[]
    by: ConfiguracionScalarFieldEnum[] | ConfiguracionScalarFieldEnum
    having?: ConfiguracionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConfiguracionCountAggregateInputType | true
    _avg?: ConfiguracionAvgAggregateInputType
    _sum?: ConfiguracionSumAggregateInputType
    _min?: ConfiguracionMinAggregateInputType
    _max?: ConfiguracionMaxAggregateInputType
  }

  export type ConfiguracionGroupByOutputType = {
    id: string
    ivaPorDefecto: number
    moneda: string
    prefijoFactura: string
    prefijoPresupuesto: string
    _count: ConfiguracionCountAggregateOutputType | null
    _avg: ConfiguracionAvgAggregateOutputType | null
    _sum: ConfiguracionSumAggregateOutputType | null
    _min: ConfiguracionMinAggregateOutputType | null
    _max: ConfiguracionMaxAggregateOutputType | null
  }

  type GetConfiguracionGroupByPayload<T extends ConfiguracionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConfiguracionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConfiguracionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConfiguracionGroupByOutputType[P]>
            : GetScalarType<T[P], ConfiguracionGroupByOutputType[P]>
        }
      >
    >


  export type ConfiguracionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ivaPorDefecto?: boolean
    moneda?: boolean
    prefijoFactura?: boolean
    prefijoPresupuesto?: boolean
  }, ExtArgs["result"]["configuracion"]>

  export type ConfiguracionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ivaPorDefecto?: boolean
    moneda?: boolean
    prefijoFactura?: boolean
    prefijoPresupuesto?: boolean
  }, ExtArgs["result"]["configuracion"]>

  export type ConfiguracionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ivaPorDefecto?: boolean
    moneda?: boolean
    prefijoFactura?: boolean
    prefijoPresupuesto?: boolean
  }, ExtArgs["result"]["configuracion"]>

  export type ConfiguracionSelectScalar = {
    id?: boolean
    ivaPorDefecto?: boolean
    moneda?: boolean
    prefijoFactura?: boolean
    prefijoPresupuesto?: boolean
  }

  export type ConfiguracionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ivaPorDefecto" | "moneda" | "prefijoFactura" | "prefijoPresupuesto", ExtArgs["result"]["configuracion"]>

  export type $ConfiguracionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Configuracion"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ivaPorDefecto: number
      moneda: string
      prefijoFactura: string
      prefijoPresupuesto: string
    }, ExtArgs["result"]["configuracion"]>
    composites: {}
  }

  type ConfiguracionGetPayload<S extends boolean | null | undefined | ConfiguracionDefaultArgs> = $Result.GetResult<Prisma.$ConfiguracionPayload, S>

  type ConfiguracionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConfiguracionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConfiguracionCountAggregateInputType | true
    }

  export interface ConfiguracionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Configuracion'], meta: { name: 'Configuracion' } }
    /**
     * Find zero or one Configuracion that matches the filter.
     * @param {ConfiguracionFindUniqueArgs} args - Arguments to find a Configuracion
     * @example
     * // Get one Configuracion
     * const configuracion = await prisma.configuracion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConfiguracionFindUniqueArgs>(args: SelectSubset<T, ConfiguracionFindUniqueArgs<ExtArgs>>): Prisma__ConfiguracionClient<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Configuracion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConfiguracionFindUniqueOrThrowArgs} args - Arguments to find a Configuracion
     * @example
     * // Get one Configuracion
     * const configuracion = await prisma.configuracion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConfiguracionFindUniqueOrThrowArgs>(args: SelectSubset<T, ConfiguracionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConfiguracionClient<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuracion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionFindFirstArgs} args - Arguments to find a Configuracion
     * @example
     * // Get one Configuracion
     * const configuracion = await prisma.configuracion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConfiguracionFindFirstArgs>(args?: SelectSubset<T, ConfiguracionFindFirstArgs<ExtArgs>>): Prisma__ConfiguracionClient<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuracion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionFindFirstOrThrowArgs} args - Arguments to find a Configuracion
     * @example
     * // Get one Configuracion
     * const configuracion = await prisma.configuracion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConfiguracionFindFirstOrThrowArgs>(args?: SelectSubset<T, ConfiguracionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConfiguracionClient<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Configuracions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Configuracions
     * const configuracions = await prisma.configuracion.findMany()
     * 
     * // Get first 10 Configuracions
     * const configuracions = await prisma.configuracion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const configuracionWithIdOnly = await prisma.configuracion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConfiguracionFindManyArgs>(args?: SelectSubset<T, ConfiguracionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Configuracion.
     * @param {ConfiguracionCreateArgs} args - Arguments to create a Configuracion.
     * @example
     * // Create one Configuracion
     * const Configuracion = await prisma.configuracion.create({
     *   data: {
     *     // ... data to create a Configuracion
     *   }
     * })
     * 
     */
    create<T extends ConfiguracionCreateArgs>(args: SelectSubset<T, ConfiguracionCreateArgs<ExtArgs>>): Prisma__ConfiguracionClient<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Configuracions.
     * @param {ConfiguracionCreateManyArgs} args - Arguments to create many Configuracions.
     * @example
     * // Create many Configuracions
     * const configuracion = await prisma.configuracion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConfiguracionCreateManyArgs>(args?: SelectSubset<T, ConfiguracionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Configuracions and returns the data saved in the database.
     * @param {ConfiguracionCreateManyAndReturnArgs} args - Arguments to create many Configuracions.
     * @example
     * // Create many Configuracions
     * const configuracion = await prisma.configuracion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Configuracions and only return the `id`
     * const configuracionWithIdOnly = await prisma.configuracion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConfiguracionCreateManyAndReturnArgs>(args?: SelectSubset<T, ConfiguracionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Configuracion.
     * @param {ConfiguracionDeleteArgs} args - Arguments to delete one Configuracion.
     * @example
     * // Delete one Configuracion
     * const Configuracion = await prisma.configuracion.delete({
     *   where: {
     *     // ... filter to delete one Configuracion
     *   }
     * })
     * 
     */
    delete<T extends ConfiguracionDeleteArgs>(args: SelectSubset<T, ConfiguracionDeleteArgs<ExtArgs>>): Prisma__ConfiguracionClient<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Configuracion.
     * @param {ConfiguracionUpdateArgs} args - Arguments to update one Configuracion.
     * @example
     * // Update one Configuracion
     * const configuracion = await prisma.configuracion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConfiguracionUpdateArgs>(args: SelectSubset<T, ConfiguracionUpdateArgs<ExtArgs>>): Prisma__ConfiguracionClient<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Configuracions.
     * @param {ConfiguracionDeleteManyArgs} args - Arguments to filter Configuracions to delete.
     * @example
     * // Delete a few Configuracions
     * const { count } = await prisma.configuracion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConfiguracionDeleteManyArgs>(args?: SelectSubset<T, ConfiguracionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configuracions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Configuracions
     * const configuracion = await prisma.configuracion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConfiguracionUpdateManyArgs>(args: SelectSubset<T, ConfiguracionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configuracions and returns the data updated in the database.
     * @param {ConfiguracionUpdateManyAndReturnArgs} args - Arguments to update many Configuracions.
     * @example
     * // Update many Configuracions
     * const configuracion = await prisma.configuracion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Configuracions and only return the `id`
     * const configuracionWithIdOnly = await prisma.configuracion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConfiguracionUpdateManyAndReturnArgs>(args: SelectSubset<T, ConfiguracionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Configuracion.
     * @param {ConfiguracionUpsertArgs} args - Arguments to update or create a Configuracion.
     * @example
     * // Update or create a Configuracion
     * const configuracion = await prisma.configuracion.upsert({
     *   create: {
     *     // ... data to create a Configuracion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Configuracion we want to update
     *   }
     * })
     */
    upsert<T extends ConfiguracionUpsertArgs>(args: SelectSubset<T, ConfiguracionUpsertArgs<ExtArgs>>): Prisma__ConfiguracionClient<$Result.GetResult<Prisma.$ConfiguracionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Configuracions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionCountArgs} args - Arguments to filter Configuracions to count.
     * @example
     * // Count the number of Configuracions
     * const count = await prisma.configuracion.count({
     *   where: {
     *     // ... the filter for the Configuracions we want to count
     *   }
     * })
    **/
    count<T extends ConfiguracionCountArgs>(
      args?: Subset<T, ConfiguracionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConfiguracionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Configuracion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConfiguracionAggregateArgs>(args: Subset<T, ConfiguracionAggregateArgs>): Prisma.PrismaPromise<GetConfiguracionAggregateType<T>>

    /**
     * Group by Configuracion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConfiguracionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConfiguracionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConfiguracionGroupByArgs['orderBy'] }
        : { orderBy?: ConfiguracionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConfiguracionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfiguracionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Configuracion model
   */
  readonly fields: ConfiguracionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Configuracion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConfiguracionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Configuracion model
   */
  interface ConfiguracionFieldRefs {
    readonly id: FieldRef<"Configuracion", 'String'>
    readonly ivaPorDefecto: FieldRef<"Configuracion", 'Float'>
    readonly moneda: FieldRef<"Configuracion", 'String'>
    readonly prefijoFactura: FieldRef<"Configuracion", 'String'>
    readonly prefijoPresupuesto: FieldRef<"Configuracion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Configuracion findUnique
   */
  export type ConfiguracionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * Filter, which Configuracion to fetch.
     */
    where: ConfiguracionWhereUniqueInput
  }

  /**
   * Configuracion findUniqueOrThrow
   */
  export type ConfiguracionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * Filter, which Configuracion to fetch.
     */
    where: ConfiguracionWhereUniqueInput
  }

  /**
   * Configuracion findFirst
   */
  export type ConfiguracionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * Filter, which Configuracion to fetch.
     */
    where?: ConfiguracionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configuracions to fetch.
     */
    orderBy?: ConfiguracionOrderByWithRelationInput | ConfiguracionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configuracions.
     */
    cursor?: ConfiguracionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configuracions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configuracions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configuracions.
     */
    distinct?: ConfiguracionScalarFieldEnum | ConfiguracionScalarFieldEnum[]
  }

  /**
   * Configuracion findFirstOrThrow
   */
  export type ConfiguracionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * Filter, which Configuracion to fetch.
     */
    where?: ConfiguracionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configuracions to fetch.
     */
    orderBy?: ConfiguracionOrderByWithRelationInput | ConfiguracionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Configuracions.
     */
    cursor?: ConfiguracionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configuracions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configuracions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Configuracions.
     */
    distinct?: ConfiguracionScalarFieldEnum | ConfiguracionScalarFieldEnum[]
  }

  /**
   * Configuracion findMany
   */
  export type ConfiguracionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * Filter, which Configuracions to fetch.
     */
    where?: ConfiguracionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Configuracions to fetch.
     */
    orderBy?: ConfiguracionOrderByWithRelationInput | ConfiguracionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Configuracions.
     */
    cursor?: ConfiguracionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Configuracions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Configuracions.
     */
    skip?: number
    distinct?: ConfiguracionScalarFieldEnum | ConfiguracionScalarFieldEnum[]
  }

  /**
   * Configuracion create
   */
  export type ConfiguracionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * The data needed to create a Configuracion.
     */
    data?: XOR<ConfiguracionCreateInput, ConfiguracionUncheckedCreateInput>
  }

  /**
   * Configuracion createMany
   */
  export type ConfiguracionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Configuracions.
     */
    data: ConfiguracionCreateManyInput | ConfiguracionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Configuracion createManyAndReturn
   */
  export type ConfiguracionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * The data used to create many Configuracions.
     */
    data: ConfiguracionCreateManyInput | ConfiguracionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Configuracion update
   */
  export type ConfiguracionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * The data needed to update a Configuracion.
     */
    data: XOR<ConfiguracionUpdateInput, ConfiguracionUncheckedUpdateInput>
    /**
     * Choose, which Configuracion to update.
     */
    where: ConfiguracionWhereUniqueInput
  }

  /**
   * Configuracion updateMany
   */
  export type ConfiguracionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Configuracions.
     */
    data: XOR<ConfiguracionUpdateManyMutationInput, ConfiguracionUncheckedUpdateManyInput>
    /**
     * Filter which Configuracions to update
     */
    where?: ConfiguracionWhereInput
    /**
     * Limit how many Configuracions to update.
     */
    limit?: number
  }

  /**
   * Configuracion updateManyAndReturn
   */
  export type ConfiguracionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * The data used to update Configuracions.
     */
    data: XOR<ConfiguracionUpdateManyMutationInput, ConfiguracionUncheckedUpdateManyInput>
    /**
     * Filter which Configuracions to update
     */
    where?: ConfiguracionWhereInput
    /**
     * Limit how many Configuracions to update.
     */
    limit?: number
  }

  /**
   * Configuracion upsert
   */
  export type ConfiguracionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * The filter to search for the Configuracion to update in case it exists.
     */
    where: ConfiguracionWhereUniqueInput
    /**
     * In case the Configuracion found by the `where` argument doesn't exist, create a new Configuracion with this data.
     */
    create: XOR<ConfiguracionCreateInput, ConfiguracionUncheckedCreateInput>
    /**
     * In case the Configuracion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConfiguracionUpdateInput, ConfiguracionUncheckedUpdateInput>
  }

  /**
   * Configuracion delete
   */
  export type ConfiguracionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
    /**
     * Filter which Configuracion to delete.
     */
    where: ConfiguracionWhereUniqueInput
  }

  /**
   * Configuracion deleteMany
   */
  export type ConfiguracionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Configuracions to delete
     */
    where?: ConfiguracionWhereInput
    /**
     * Limit how many Configuracions to delete.
     */
    limit?: number
  }

  /**
   * Configuracion without action
   */
  export type ConfiguracionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Configuracion
     */
    select?: ConfiguracionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Configuracion
     */
    omit?: ConfiguracionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EmpresaScalarFieldEnum: {
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

  export type EmpresaScalarFieldEnum = (typeof EmpresaScalarFieldEnum)[keyof typeof EmpresaScalarFieldEnum]


  export const CategoriaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoriaScalarFieldEnum = (typeof CategoriaScalarFieldEnum)[keyof typeof CategoriaScalarFieldEnum]


  export const MarcaScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MarcaScalarFieldEnum = (typeof MarcaScalarFieldEnum)[keyof typeof MarcaScalarFieldEnum]


  export const ProductoScalarFieldEnum: {
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

  export type ProductoScalarFieldEnum = (typeof ProductoScalarFieldEnum)[keyof typeof ProductoScalarFieldEnum]


  export const EquipoItemScalarFieldEnum: {
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

  export type EquipoItemScalarFieldEnum = (typeof EquipoItemScalarFieldEnum)[keyof typeof EquipoItemScalarFieldEnum]


  export const ClienteScalarFieldEnum: {
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

  export type ClienteScalarFieldEnum = (typeof ClienteScalarFieldEnum)[keyof typeof ClienteScalarFieldEnum]


  export const PresupuestoScalarFieldEnum: {
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

  export type PresupuestoScalarFieldEnum = (typeof PresupuestoScalarFieldEnum)[keyof typeof PresupuestoScalarFieldEnum]


  export const ItemPresupuestoScalarFieldEnum: {
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

  export type ItemPresupuestoScalarFieldEnum = (typeof ItemPresupuestoScalarFieldEnum)[keyof typeof ItemPresupuestoScalarFieldEnum]


  export const FacturaScalarFieldEnum: {
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

  export type FacturaScalarFieldEnum = (typeof FacturaScalarFieldEnum)[keyof typeof FacturaScalarFieldEnum]


  export const ItemFacturaScalarFieldEnum: {
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

  export type ItemFacturaScalarFieldEnum = (typeof ItemFacturaScalarFieldEnum)[keyof typeof ItemFacturaScalarFieldEnum]


  export const ConfiguracionScalarFieldEnum: {
    id: 'id',
    ivaPorDefecto: 'ivaPorDefecto',
    moneda: 'moneda',
    prefijoFactura: 'prefijoFactura',
    prefijoPresupuesto: 'prefijoPresupuesto'
  };

  export type ConfiguracionScalarFieldEnum = (typeof ConfiguracionScalarFieldEnum)[keyof typeof ConfiguracionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'EstadoEquipo'
   */
  export type EnumEstadoEquipoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoEquipo'>
    


  /**
   * Reference to a field of type 'EstadoEquipo[]'
   */
  export type ListEnumEstadoEquipoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoEquipo[]'>
    


  /**
   * Reference to a field of type 'TipoCliente'
   */
  export type EnumTipoClienteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoCliente'>
    


  /**
   * Reference to a field of type 'TipoCliente[]'
   */
  export type ListEnumTipoClienteFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipoCliente[]'>
    


  /**
   * Reference to a field of type 'EstadoPresupuesto'
   */
  export type EnumEstadoPresupuestoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPresupuesto'>
    


  /**
   * Reference to a field of type 'EstadoPresupuesto[]'
   */
  export type ListEnumEstadoPresupuestoFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoPresupuesto[]'>
    


  /**
   * Reference to a field of type 'EstadoFactura'
   */
  export type EnumEstadoFacturaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoFactura'>
    


  /**
   * Reference to a field of type 'EstadoFactura[]'
   */
  export type ListEnumEstadoFacturaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EstadoFactura[]'>
    
  /**
   * Deep Input Types
   */


  export type EmpresaWhereInput = {
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    id?: StringFilter<"Empresa"> | string
    nombre?: StringFilter<"Empresa"> | string
    cif?: StringFilter<"Empresa"> | string
    direccion?: StringFilter<"Empresa"> | string
    email?: StringFilter<"Empresa"> | string
    telefono?: StringFilter<"Empresa"> | string
    logoUrl?: StringNullableFilter<"Empresa"> | string | null
    createdAt?: DateTimeFilter<"Empresa"> | Date | string
    updatedAt?: DateTimeFilter<"Empresa"> | Date | string
  }

  export type EmpresaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    cif?: SortOrder
    direccion?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmpresaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    cif?: string
    AND?: EmpresaWhereInput | EmpresaWhereInput[]
    OR?: EmpresaWhereInput[]
    NOT?: EmpresaWhereInput | EmpresaWhereInput[]
    nombre?: StringFilter<"Empresa"> | string
    direccion?: StringFilter<"Empresa"> | string
    email?: StringFilter<"Empresa"> | string
    telefono?: StringFilter<"Empresa"> | string
    logoUrl?: StringNullableFilter<"Empresa"> | string | null
    createdAt?: DateTimeFilter<"Empresa"> | Date | string
    updatedAt?: DateTimeFilter<"Empresa"> | Date | string
  }, "id" | "cif">

  export type EmpresaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    cif?: SortOrder
    direccion?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EmpresaCountOrderByAggregateInput
    _max?: EmpresaMaxOrderByAggregateInput
    _min?: EmpresaMinOrderByAggregateInput
  }

  export type EmpresaScalarWhereWithAggregatesInput = {
    AND?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    OR?: EmpresaScalarWhereWithAggregatesInput[]
    NOT?: EmpresaScalarWhereWithAggregatesInput | EmpresaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Empresa"> | string
    nombre?: StringWithAggregatesFilter<"Empresa"> | string
    cif?: StringWithAggregatesFilter<"Empresa"> | string
    direccion?: StringWithAggregatesFilter<"Empresa"> | string
    email?: StringWithAggregatesFilter<"Empresa"> | string
    telefono?: StringWithAggregatesFilter<"Empresa"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Empresa"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Empresa"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Empresa"> | Date | string
  }

  export type CategoriaWhereInput = {
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    id?: StringFilter<"Categoria"> | string
    nombre?: StringFilter<"Categoria"> | string
    createdAt?: DateTimeFilter<"Categoria"> | Date | string
    updatedAt?: DateTimeFilter<"Categoria"> | Date | string
    productos?: ProductoListRelationFilter
  }

  export type CategoriaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productos?: ProductoOrderByRelationAggregateInput
  }

  export type CategoriaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nombre?: string
    AND?: CategoriaWhereInput | CategoriaWhereInput[]
    OR?: CategoriaWhereInput[]
    NOT?: CategoriaWhereInput | CategoriaWhereInput[]
    createdAt?: DateTimeFilter<"Categoria"> | Date | string
    updatedAt?: DateTimeFilter<"Categoria"> | Date | string
    productos?: ProductoListRelationFilter
  }, "id" | "nombre">

  export type CategoriaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoriaCountOrderByAggregateInput
    _max?: CategoriaMaxOrderByAggregateInput
    _min?: CategoriaMinOrderByAggregateInput
  }

  export type CategoriaScalarWhereWithAggregatesInput = {
    AND?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    OR?: CategoriaScalarWhereWithAggregatesInput[]
    NOT?: CategoriaScalarWhereWithAggregatesInput | CategoriaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Categoria"> | string
    nombre?: StringWithAggregatesFilter<"Categoria"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Categoria"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Categoria"> | Date | string
  }

  export type MarcaWhereInput = {
    AND?: MarcaWhereInput | MarcaWhereInput[]
    OR?: MarcaWhereInput[]
    NOT?: MarcaWhereInput | MarcaWhereInput[]
    id?: StringFilter<"Marca"> | string
    nombre?: StringFilter<"Marca"> | string
    createdAt?: DateTimeFilter<"Marca"> | Date | string
    updatedAt?: DateTimeFilter<"Marca"> | Date | string
    productos?: ProductoListRelationFilter
  }

  export type MarcaOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    productos?: ProductoOrderByRelationAggregateInput
  }

  export type MarcaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nombre?: string
    AND?: MarcaWhereInput | MarcaWhereInput[]
    OR?: MarcaWhereInput[]
    NOT?: MarcaWhereInput | MarcaWhereInput[]
    createdAt?: DateTimeFilter<"Marca"> | Date | string
    updatedAt?: DateTimeFilter<"Marca"> | Date | string
    productos?: ProductoListRelationFilter
  }, "id" | "nombre">

  export type MarcaOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MarcaCountOrderByAggregateInput
    _max?: MarcaMaxOrderByAggregateInput
    _min?: MarcaMinOrderByAggregateInput
  }

  export type MarcaScalarWhereWithAggregatesInput = {
    AND?: MarcaScalarWhereWithAggregatesInput | MarcaScalarWhereWithAggregatesInput[]
    OR?: MarcaScalarWhereWithAggregatesInput[]
    NOT?: MarcaScalarWhereWithAggregatesInput | MarcaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Marca"> | string
    nombre?: StringWithAggregatesFilter<"Marca"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Marca"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Marca"> | Date | string
  }

  export type ProductoWhereInput = {
    AND?: ProductoWhereInput | ProductoWhereInput[]
    OR?: ProductoWhereInput[]
    NOT?: ProductoWhereInput | ProductoWhereInput[]
    id?: StringFilter<"Producto"> | string
    nombre?: StringFilter<"Producto"> | string
    marcaId?: StringNullableFilter<"Producto"> | string | null
    modelo?: StringNullableFilter<"Producto"> | string | null
    descripcion?: StringNullableFilter<"Producto"> | string | null
    stock?: IntFilter<"Producto"> | number
    precio?: FloatFilter<"Producto"> | number
    precioCompra?: FloatNullableFilter<"Producto"> | number | null
    precioAlquiler?: FloatNullableFilter<"Producto"> | number | null
    categoriaId?: StringFilter<"Producto"> | string
    createdAt?: DateTimeFilter<"Producto"> | Date | string
    updatedAt?: DateTimeFilter<"Producto"> | Date | string
    marca?: XOR<MarcaNullableScalarRelationFilter, MarcaWhereInput> | null
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    itemsPresupuesto?: ItemPresupuestoListRelationFilter
    itemsFactura?: ItemFacturaListRelationFilter
    equipoItems?: EquipoItemListRelationFilter
  }

  export type ProductoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    marcaId?: SortOrderInput | SortOrder
    modelo?: SortOrderInput | SortOrder
    descripcion?: SortOrderInput | SortOrder
    stock?: SortOrder
    precio?: SortOrder
    precioCompra?: SortOrderInput | SortOrder
    precioAlquiler?: SortOrderInput | SortOrder
    categoriaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    marca?: MarcaOrderByWithRelationInput
    categoria?: CategoriaOrderByWithRelationInput
    itemsPresupuesto?: ItemPresupuestoOrderByRelationAggregateInput
    itemsFactura?: ItemFacturaOrderByRelationAggregateInput
    equipoItems?: EquipoItemOrderByRelationAggregateInput
  }

  export type ProductoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductoWhereInput | ProductoWhereInput[]
    OR?: ProductoWhereInput[]
    NOT?: ProductoWhereInput | ProductoWhereInput[]
    nombre?: StringFilter<"Producto"> | string
    marcaId?: StringNullableFilter<"Producto"> | string | null
    modelo?: StringNullableFilter<"Producto"> | string | null
    descripcion?: StringNullableFilter<"Producto"> | string | null
    stock?: IntFilter<"Producto"> | number
    precio?: FloatFilter<"Producto"> | number
    precioCompra?: FloatNullableFilter<"Producto"> | number | null
    precioAlquiler?: FloatNullableFilter<"Producto"> | number | null
    categoriaId?: StringFilter<"Producto"> | string
    createdAt?: DateTimeFilter<"Producto"> | Date | string
    updatedAt?: DateTimeFilter<"Producto"> | Date | string
    marca?: XOR<MarcaNullableScalarRelationFilter, MarcaWhereInput> | null
    categoria?: XOR<CategoriaScalarRelationFilter, CategoriaWhereInput>
    itemsPresupuesto?: ItemPresupuestoListRelationFilter
    itemsFactura?: ItemFacturaListRelationFilter
    equipoItems?: EquipoItemListRelationFilter
  }, "id">

  export type ProductoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    marcaId?: SortOrderInput | SortOrder
    modelo?: SortOrderInput | SortOrder
    descripcion?: SortOrderInput | SortOrder
    stock?: SortOrder
    precio?: SortOrder
    precioCompra?: SortOrderInput | SortOrder
    precioAlquiler?: SortOrderInput | SortOrder
    categoriaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductoCountOrderByAggregateInput
    _avg?: ProductoAvgOrderByAggregateInput
    _max?: ProductoMaxOrderByAggregateInput
    _min?: ProductoMinOrderByAggregateInput
    _sum?: ProductoSumOrderByAggregateInput
  }

  export type ProductoScalarWhereWithAggregatesInput = {
    AND?: ProductoScalarWhereWithAggregatesInput | ProductoScalarWhereWithAggregatesInput[]
    OR?: ProductoScalarWhereWithAggregatesInput[]
    NOT?: ProductoScalarWhereWithAggregatesInput | ProductoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Producto"> | string
    nombre?: StringWithAggregatesFilter<"Producto"> | string
    marcaId?: StringNullableWithAggregatesFilter<"Producto"> | string | null
    modelo?: StringNullableWithAggregatesFilter<"Producto"> | string | null
    descripcion?: StringNullableWithAggregatesFilter<"Producto"> | string | null
    stock?: IntWithAggregatesFilter<"Producto"> | number
    precio?: FloatWithAggregatesFilter<"Producto"> | number
    precioCompra?: FloatNullableWithAggregatesFilter<"Producto"> | number | null
    precioAlquiler?: FloatNullableWithAggregatesFilter<"Producto"> | number | null
    categoriaId?: StringWithAggregatesFilter<"Producto"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Producto"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Producto"> | Date | string
  }

  export type EquipoItemWhereInput = {
    AND?: EquipoItemWhereInput | EquipoItemWhereInput[]
    OR?: EquipoItemWhereInput[]
    NOT?: EquipoItemWhereInput | EquipoItemWhereInput[]
    id?: StringFilter<"EquipoItem"> | string
    productoId?: StringFilter<"EquipoItem"> | string
    numeroSerie?: StringNullableFilter<"EquipoItem"> | string | null
    notasInternas?: StringNullableFilter<"EquipoItem"> | string | null
    estado?: EnumEstadoEquipoFilter<"EquipoItem"> | $Enums.EstadoEquipo
    fechaCompra?: DateTimeNullableFilter<"EquipoItem"> | Date | string | null
    precioCompra?: FloatNullableFilter<"EquipoItem"> | number | null
    createdAt?: DateTimeFilter<"EquipoItem"> | Date | string
    updatedAt?: DateTimeFilter<"EquipoItem"> | Date | string
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }

  export type EquipoItemOrderByWithRelationInput = {
    id?: SortOrder
    productoId?: SortOrder
    numeroSerie?: SortOrderInput | SortOrder
    notasInternas?: SortOrderInput | SortOrder
    estado?: SortOrder
    fechaCompra?: SortOrderInput | SortOrder
    precioCompra?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    producto?: ProductoOrderByWithRelationInput
  }

  export type EquipoItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productoId_numeroSerie?: EquipoItemProductoIdNumeroSerieCompoundUniqueInput
    AND?: EquipoItemWhereInput | EquipoItemWhereInput[]
    OR?: EquipoItemWhereInput[]
    NOT?: EquipoItemWhereInput | EquipoItemWhereInput[]
    productoId?: StringFilter<"EquipoItem"> | string
    numeroSerie?: StringNullableFilter<"EquipoItem"> | string | null
    notasInternas?: StringNullableFilter<"EquipoItem"> | string | null
    estado?: EnumEstadoEquipoFilter<"EquipoItem"> | $Enums.EstadoEquipo
    fechaCompra?: DateTimeNullableFilter<"EquipoItem"> | Date | string | null
    precioCompra?: FloatNullableFilter<"EquipoItem"> | number | null
    createdAt?: DateTimeFilter<"EquipoItem"> | Date | string
    updatedAt?: DateTimeFilter<"EquipoItem"> | Date | string
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }, "id" | "productoId_numeroSerie">

  export type EquipoItemOrderByWithAggregationInput = {
    id?: SortOrder
    productoId?: SortOrder
    numeroSerie?: SortOrderInput | SortOrder
    notasInternas?: SortOrderInput | SortOrder
    estado?: SortOrder
    fechaCompra?: SortOrderInput | SortOrder
    precioCompra?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EquipoItemCountOrderByAggregateInput
    _avg?: EquipoItemAvgOrderByAggregateInput
    _max?: EquipoItemMaxOrderByAggregateInput
    _min?: EquipoItemMinOrderByAggregateInput
    _sum?: EquipoItemSumOrderByAggregateInput
  }

  export type EquipoItemScalarWhereWithAggregatesInput = {
    AND?: EquipoItemScalarWhereWithAggregatesInput | EquipoItemScalarWhereWithAggregatesInput[]
    OR?: EquipoItemScalarWhereWithAggregatesInput[]
    NOT?: EquipoItemScalarWhereWithAggregatesInput | EquipoItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EquipoItem"> | string
    productoId?: StringWithAggregatesFilter<"EquipoItem"> | string
    numeroSerie?: StringNullableWithAggregatesFilter<"EquipoItem"> | string | null
    notasInternas?: StringNullableWithAggregatesFilter<"EquipoItem"> | string | null
    estado?: EnumEstadoEquipoWithAggregatesFilter<"EquipoItem"> | $Enums.EstadoEquipo
    fechaCompra?: DateTimeNullableWithAggregatesFilter<"EquipoItem"> | Date | string | null
    precioCompra?: FloatNullableWithAggregatesFilter<"EquipoItem"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"EquipoItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EquipoItem"> | Date | string
  }

  export type ClienteWhereInput = {
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    id?: StringFilter<"Cliente"> | string
    nombre?: StringFilter<"Cliente"> | string
    tipo?: EnumTipoClienteFilter<"Cliente"> | $Enums.TipoCliente
    nif?: StringNullableFilter<"Cliente"> | string | null
    direccion?: StringNullableFilter<"Cliente"> | string | null
    email?: StringNullableFilter<"Cliente"> | string | null
    telefono?: StringNullableFilter<"Cliente"> | string | null
    createdAt?: DateTimeFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeFilter<"Cliente"> | Date | string
    presupuestos?: PresupuestoListRelationFilter
    facturas?: FacturaListRelationFilter
  }

  export type ClienteOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    nif?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    presupuestos?: PresupuestoOrderByRelationAggregateInput
    facturas?: FacturaOrderByRelationAggregateInput
  }

  export type ClienteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nif?: string
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    nombre?: StringFilter<"Cliente"> | string
    tipo?: EnumTipoClienteFilter<"Cliente"> | $Enums.TipoCliente
    direccion?: StringNullableFilter<"Cliente"> | string | null
    email?: StringNullableFilter<"Cliente"> | string | null
    telefono?: StringNullableFilter<"Cliente"> | string | null
    createdAt?: DateTimeFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeFilter<"Cliente"> | Date | string
    presupuestos?: PresupuestoListRelationFilter
    facturas?: FacturaListRelationFilter
  }, "id" | "nif">

  export type ClienteOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    nif?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClienteCountOrderByAggregateInput
    _max?: ClienteMaxOrderByAggregateInput
    _min?: ClienteMinOrderByAggregateInput
  }

  export type ClienteScalarWhereWithAggregatesInput = {
    AND?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    OR?: ClienteScalarWhereWithAggregatesInput[]
    NOT?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Cliente"> | string
    nombre?: StringWithAggregatesFilter<"Cliente"> | string
    tipo?: EnumTipoClienteWithAggregatesFilter<"Cliente"> | $Enums.TipoCliente
    nif?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    direccion?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    email?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    telefono?: StringNullableWithAggregatesFilter<"Cliente"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Cliente"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cliente"> | Date | string
  }

  export type PresupuestoWhereInput = {
    AND?: PresupuestoWhereInput | PresupuestoWhereInput[]
    OR?: PresupuestoWhereInput[]
    NOT?: PresupuestoWhereInput | PresupuestoWhereInput[]
    id?: StringFilter<"Presupuesto"> | string
    numero?: StringFilter<"Presupuesto"> | string
    fecha?: DateTimeFilter<"Presupuesto"> | Date | string
    fechaValidez?: DateTimeFilter<"Presupuesto"> | Date | string
    clienteId?: StringFilter<"Presupuesto"> | string
    estado?: EnumEstadoPresupuestoFilter<"Presupuesto"> | $Enums.EstadoPresupuesto
    observaciones?: StringNullableFilter<"Presupuesto"> | string | null
    subtotal?: FloatFilter<"Presupuesto"> | number
    iva?: FloatFilter<"Presupuesto"> | number
    total?: FloatFilter<"Presupuesto"> | number
    facturaId?: StringNullableFilter<"Presupuesto"> | string | null
    createdAt?: DateTimeFilter<"Presupuesto"> | Date | string
    updatedAt?: DateTimeFilter<"Presupuesto"> | Date | string
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
    items?: ItemPresupuestoListRelationFilter
    factura?: XOR<FacturaNullableScalarRelationFilter, FacturaWhereInput> | null
  }

  export type PresupuestoOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    fecha?: SortOrder
    fechaValidez?: SortOrder
    clienteId?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    facturaId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cliente?: ClienteOrderByWithRelationInput
    items?: ItemPresupuestoOrderByRelationAggregateInput
    factura?: FacturaOrderByWithRelationInput
  }

  export type PresupuestoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numero?: string
    AND?: PresupuestoWhereInput | PresupuestoWhereInput[]
    OR?: PresupuestoWhereInput[]
    NOT?: PresupuestoWhereInput | PresupuestoWhereInput[]
    fecha?: DateTimeFilter<"Presupuesto"> | Date | string
    fechaValidez?: DateTimeFilter<"Presupuesto"> | Date | string
    clienteId?: StringFilter<"Presupuesto"> | string
    estado?: EnumEstadoPresupuestoFilter<"Presupuesto"> | $Enums.EstadoPresupuesto
    observaciones?: StringNullableFilter<"Presupuesto"> | string | null
    subtotal?: FloatFilter<"Presupuesto"> | number
    iva?: FloatFilter<"Presupuesto"> | number
    total?: FloatFilter<"Presupuesto"> | number
    facturaId?: StringNullableFilter<"Presupuesto"> | string | null
    createdAt?: DateTimeFilter<"Presupuesto"> | Date | string
    updatedAt?: DateTimeFilter<"Presupuesto"> | Date | string
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
    items?: ItemPresupuestoListRelationFilter
    factura?: XOR<FacturaNullableScalarRelationFilter, FacturaWhereInput> | null
  }, "id" | "numero">

  export type PresupuestoOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    fecha?: SortOrder
    fechaValidez?: SortOrder
    clienteId?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    facturaId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PresupuestoCountOrderByAggregateInput
    _avg?: PresupuestoAvgOrderByAggregateInput
    _max?: PresupuestoMaxOrderByAggregateInput
    _min?: PresupuestoMinOrderByAggregateInput
    _sum?: PresupuestoSumOrderByAggregateInput
  }

  export type PresupuestoScalarWhereWithAggregatesInput = {
    AND?: PresupuestoScalarWhereWithAggregatesInput | PresupuestoScalarWhereWithAggregatesInput[]
    OR?: PresupuestoScalarWhereWithAggregatesInput[]
    NOT?: PresupuestoScalarWhereWithAggregatesInput | PresupuestoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Presupuesto"> | string
    numero?: StringWithAggregatesFilter<"Presupuesto"> | string
    fecha?: DateTimeWithAggregatesFilter<"Presupuesto"> | Date | string
    fechaValidez?: DateTimeWithAggregatesFilter<"Presupuesto"> | Date | string
    clienteId?: StringWithAggregatesFilter<"Presupuesto"> | string
    estado?: EnumEstadoPresupuestoWithAggregatesFilter<"Presupuesto"> | $Enums.EstadoPresupuesto
    observaciones?: StringNullableWithAggregatesFilter<"Presupuesto"> | string | null
    subtotal?: FloatWithAggregatesFilter<"Presupuesto"> | number
    iva?: FloatWithAggregatesFilter<"Presupuesto"> | number
    total?: FloatWithAggregatesFilter<"Presupuesto"> | number
    facturaId?: StringNullableWithAggregatesFilter<"Presupuesto"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Presupuesto"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Presupuesto"> | Date | string
  }

  export type ItemPresupuestoWhereInput = {
    AND?: ItemPresupuestoWhereInput | ItemPresupuestoWhereInput[]
    OR?: ItemPresupuestoWhereInput[]
    NOT?: ItemPresupuestoWhereInput | ItemPresupuestoWhereInput[]
    id?: StringFilter<"ItemPresupuesto"> | string
    presupuestoId?: StringFilter<"ItemPresupuesto"> | string
    productoId?: StringFilter<"ItemPresupuesto"> | string
    cantidad?: IntFilter<"ItemPresupuesto"> | number
    precioUnitario?: FloatFilter<"ItemPresupuesto"> | number
    descuento?: FloatFilter<"ItemPresupuesto"> | number
    iva?: FloatFilter<"ItemPresupuesto"> | number
    total?: FloatFilter<"ItemPresupuesto"> | number
    createdAt?: DateTimeFilter<"ItemPresupuesto"> | Date | string
    updatedAt?: DateTimeFilter<"ItemPresupuesto"> | Date | string
    presupuesto?: XOR<PresupuestoScalarRelationFilter, PresupuestoWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }

  export type ItemPresupuestoOrderByWithRelationInput = {
    id?: SortOrder
    presupuestoId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    presupuesto?: PresupuestoOrderByWithRelationInput
    producto?: ProductoOrderByWithRelationInput
  }

  export type ItemPresupuestoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ItemPresupuestoWhereInput | ItemPresupuestoWhereInput[]
    OR?: ItemPresupuestoWhereInput[]
    NOT?: ItemPresupuestoWhereInput | ItemPresupuestoWhereInput[]
    presupuestoId?: StringFilter<"ItemPresupuesto"> | string
    productoId?: StringFilter<"ItemPresupuesto"> | string
    cantidad?: IntFilter<"ItemPresupuesto"> | number
    precioUnitario?: FloatFilter<"ItemPresupuesto"> | number
    descuento?: FloatFilter<"ItemPresupuesto"> | number
    iva?: FloatFilter<"ItemPresupuesto"> | number
    total?: FloatFilter<"ItemPresupuesto"> | number
    createdAt?: DateTimeFilter<"ItemPresupuesto"> | Date | string
    updatedAt?: DateTimeFilter<"ItemPresupuesto"> | Date | string
    presupuesto?: XOR<PresupuestoScalarRelationFilter, PresupuestoWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }, "id">

  export type ItemPresupuestoOrderByWithAggregationInput = {
    id?: SortOrder
    presupuestoId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ItemPresupuestoCountOrderByAggregateInput
    _avg?: ItemPresupuestoAvgOrderByAggregateInput
    _max?: ItemPresupuestoMaxOrderByAggregateInput
    _min?: ItemPresupuestoMinOrderByAggregateInput
    _sum?: ItemPresupuestoSumOrderByAggregateInput
  }

  export type ItemPresupuestoScalarWhereWithAggregatesInput = {
    AND?: ItemPresupuestoScalarWhereWithAggregatesInput | ItemPresupuestoScalarWhereWithAggregatesInput[]
    OR?: ItemPresupuestoScalarWhereWithAggregatesInput[]
    NOT?: ItemPresupuestoScalarWhereWithAggregatesInput | ItemPresupuestoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ItemPresupuesto"> | string
    presupuestoId?: StringWithAggregatesFilter<"ItemPresupuesto"> | string
    productoId?: StringWithAggregatesFilter<"ItemPresupuesto"> | string
    cantidad?: IntWithAggregatesFilter<"ItemPresupuesto"> | number
    precioUnitario?: FloatWithAggregatesFilter<"ItemPresupuesto"> | number
    descuento?: FloatWithAggregatesFilter<"ItemPresupuesto"> | number
    iva?: FloatWithAggregatesFilter<"ItemPresupuesto"> | number
    total?: FloatWithAggregatesFilter<"ItemPresupuesto"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ItemPresupuesto"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ItemPresupuesto"> | Date | string
  }

  export type FacturaWhereInput = {
    AND?: FacturaWhereInput | FacturaWhereInput[]
    OR?: FacturaWhereInput[]
    NOT?: FacturaWhereInput | FacturaWhereInput[]
    id?: StringFilter<"Factura"> | string
    numero?: StringFilter<"Factura"> | string
    fecha?: DateTimeFilter<"Factura"> | Date | string
    fechaVencimiento?: DateTimeFilter<"Factura"> | Date | string
    clienteId?: StringFilter<"Factura"> | string
    estado?: EnumEstadoFacturaFilter<"Factura"> | $Enums.EstadoFactura
    observaciones?: StringNullableFilter<"Factura"> | string | null
    subtotal?: FloatFilter<"Factura"> | number
    iva?: FloatFilter<"Factura"> | number
    total?: FloatFilter<"Factura"> | number
    createdAt?: DateTimeFilter<"Factura"> | Date | string
    updatedAt?: DateTimeFilter<"Factura"> | Date | string
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
    items?: ItemFacturaListRelationFilter
    presupuestos?: PresupuestoListRelationFilter
  }

  export type FacturaOrderByWithRelationInput = {
    id?: SortOrder
    numero?: SortOrder
    fecha?: SortOrder
    fechaVencimiento?: SortOrder
    clienteId?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    cliente?: ClienteOrderByWithRelationInput
    items?: ItemFacturaOrderByRelationAggregateInput
    presupuestos?: PresupuestoOrderByRelationAggregateInput
  }

  export type FacturaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    numero?: string
    AND?: FacturaWhereInput | FacturaWhereInput[]
    OR?: FacturaWhereInput[]
    NOT?: FacturaWhereInput | FacturaWhereInput[]
    fecha?: DateTimeFilter<"Factura"> | Date | string
    fechaVencimiento?: DateTimeFilter<"Factura"> | Date | string
    clienteId?: StringFilter<"Factura"> | string
    estado?: EnumEstadoFacturaFilter<"Factura"> | $Enums.EstadoFactura
    observaciones?: StringNullableFilter<"Factura"> | string | null
    subtotal?: FloatFilter<"Factura"> | number
    iva?: FloatFilter<"Factura"> | number
    total?: FloatFilter<"Factura"> | number
    createdAt?: DateTimeFilter<"Factura"> | Date | string
    updatedAt?: DateTimeFilter<"Factura"> | Date | string
    cliente?: XOR<ClienteScalarRelationFilter, ClienteWhereInput>
    items?: ItemFacturaListRelationFilter
    presupuestos?: PresupuestoListRelationFilter
  }, "id" | "numero">

  export type FacturaOrderByWithAggregationInput = {
    id?: SortOrder
    numero?: SortOrder
    fecha?: SortOrder
    fechaVencimiento?: SortOrder
    clienteId?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrderInput | SortOrder
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FacturaCountOrderByAggregateInput
    _avg?: FacturaAvgOrderByAggregateInput
    _max?: FacturaMaxOrderByAggregateInput
    _min?: FacturaMinOrderByAggregateInput
    _sum?: FacturaSumOrderByAggregateInput
  }

  export type FacturaScalarWhereWithAggregatesInput = {
    AND?: FacturaScalarWhereWithAggregatesInput | FacturaScalarWhereWithAggregatesInput[]
    OR?: FacturaScalarWhereWithAggregatesInput[]
    NOT?: FacturaScalarWhereWithAggregatesInput | FacturaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Factura"> | string
    numero?: StringWithAggregatesFilter<"Factura"> | string
    fecha?: DateTimeWithAggregatesFilter<"Factura"> | Date | string
    fechaVencimiento?: DateTimeWithAggregatesFilter<"Factura"> | Date | string
    clienteId?: StringWithAggregatesFilter<"Factura"> | string
    estado?: EnumEstadoFacturaWithAggregatesFilter<"Factura"> | $Enums.EstadoFactura
    observaciones?: StringNullableWithAggregatesFilter<"Factura"> | string | null
    subtotal?: FloatWithAggregatesFilter<"Factura"> | number
    iva?: FloatWithAggregatesFilter<"Factura"> | number
    total?: FloatWithAggregatesFilter<"Factura"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Factura"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Factura"> | Date | string
  }

  export type ItemFacturaWhereInput = {
    AND?: ItemFacturaWhereInput | ItemFacturaWhereInput[]
    OR?: ItemFacturaWhereInput[]
    NOT?: ItemFacturaWhereInput | ItemFacturaWhereInput[]
    id?: StringFilter<"ItemFactura"> | string
    facturaId?: StringFilter<"ItemFactura"> | string
    productoId?: StringFilter<"ItemFactura"> | string
    cantidad?: IntFilter<"ItemFactura"> | number
    precioUnitario?: FloatFilter<"ItemFactura"> | number
    descuento?: FloatFilter<"ItemFactura"> | number
    iva?: FloatFilter<"ItemFactura"> | number
    total?: FloatFilter<"ItemFactura"> | number
    createdAt?: DateTimeFilter<"ItemFactura"> | Date | string
    updatedAt?: DateTimeFilter<"ItemFactura"> | Date | string
    factura?: XOR<FacturaScalarRelationFilter, FacturaWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }

  export type ItemFacturaOrderByWithRelationInput = {
    id?: SortOrder
    facturaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    factura?: FacturaOrderByWithRelationInput
    producto?: ProductoOrderByWithRelationInput
  }

  export type ItemFacturaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ItemFacturaWhereInput | ItemFacturaWhereInput[]
    OR?: ItemFacturaWhereInput[]
    NOT?: ItemFacturaWhereInput | ItemFacturaWhereInput[]
    facturaId?: StringFilter<"ItemFactura"> | string
    productoId?: StringFilter<"ItemFactura"> | string
    cantidad?: IntFilter<"ItemFactura"> | number
    precioUnitario?: FloatFilter<"ItemFactura"> | number
    descuento?: FloatFilter<"ItemFactura"> | number
    iva?: FloatFilter<"ItemFactura"> | number
    total?: FloatFilter<"ItemFactura"> | number
    createdAt?: DateTimeFilter<"ItemFactura"> | Date | string
    updatedAt?: DateTimeFilter<"ItemFactura"> | Date | string
    factura?: XOR<FacturaScalarRelationFilter, FacturaWhereInput>
    producto?: XOR<ProductoScalarRelationFilter, ProductoWhereInput>
  }, "id">

  export type ItemFacturaOrderByWithAggregationInput = {
    id?: SortOrder
    facturaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ItemFacturaCountOrderByAggregateInput
    _avg?: ItemFacturaAvgOrderByAggregateInput
    _max?: ItemFacturaMaxOrderByAggregateInput
    _min?: ItemFacturaMinOrderByAggregateInput
    _sum?: ItemFacturaSumOrderByAggregateInput
  }

  export type ItemFacturaScalarWhereWithAggregatesInput = {
    AND?: ItemFacturaScalarWhereWithAggregatesInput | ItemFacturaScalarWhereWithAggregatesInput[]
    OR?: ItemFacturaScalarWhereWithAggregatesInput[]
    NOT?: ItemFacturaScalarWhereWithAggregatesInput | ItemFacturaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ItemFactura"> | string
    facturaId?: StringWithAggregatesFilter<"ItemFactura"> | string
    productoId?: StringWithAggregatesFilter<"ItemFactura"> | string
    cantidad?: IntWithAggregatesFilter<"ItemFactura"> | number
    precioUnitario?: FloatWithAggregatesFilter<"ItemFactura"> | number
    descuento?: FloatWithAggregatesFilter<"ItemFactura"> | number
    iva?: FloatWithAggregatesFilter<"ItemFactura"> | number
    total?: FloatWithAggregatesFilter<"ItemFactura"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ItemFactura"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ItemFactura"> | Date | string
  }

  export type ConfiguracionWhereInput = {
    AND?: ConfiguracionWhereInput | ConfiguracionWhereInput[]
    OR?: ConfiguracionWhereInput[]
    NOT?: ConfiguracionWhereInput | ConfiguracionWhereInput[]
    id?: StringFilter<"Configuracion"> | string
    ivaPorDefecto?: FloatFilter<"Configuracion"> | number
    moneda?: StringFilter<"Configuracion"> | string
    prefijoFactura?: StringFilter<"Configuracion"> | string
    prefijoPresupuesto?: StringFilter<"Configuracion"> | string
  }

  export type ConfiguracionOrderByWithRelationInput = {
    id?: SortOrder
    ivaPorDefecto?: SortOrder
    moneda?: SortOrder
    prefijoFactura?: SortOrder
    prefijoPresupuesto?: SortOrder
  }

  export type ConfiguracionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConfiguracionWhereInput | ConfiguracionWhereInput[]
    OR?: ConfiguracionWhereInput[]
    NOT?: ConfiguracionWhereInput | ConfiguracionWhereInput[]
    ivaPorDefecto?: FloatFilter<"Configuracion"> | number
    moneda?: StringFilter<"Configuracion"> | string
    prefijoFactura?: StringFilter<"Configuracion"> | string
    prefijoPresupuesto?: StringFilter<"Configuracion"> | string
  }, "id">

  export type ConfiguracionOrderByWithAggregationInput = {
    id?: SortOrder
    ivaPorDefecto?: SortOrder
    moneda?: SortOrder
    prefijoFactura?: SortOrder
    prefijoPresupuesto?: SortOrder
    _count?: ConfiguracionCountOrderByAggregateInput
    _avg?: ConfiguracionAvgOrderByAggregateInput
    _max?: ConfiguracionMaxOrderByAggregateInput
    _min?: ConfiguracionMinOrderByAggregateInput
    _sum?: ConfiguracionSumOrderByAggregateInput
  }

  export type ConfiguracionScalarWhereWithAggregatesInput = {
    AND?: ConfiguracionScalarWhereWithAggregatesInput | ConfiguracionScalarWhereWithAggregatesInput[]
    OR?: ConfiguracionScalarWhereWithAggregatesInput[]
    NOT?: ConfiguracionScalarWhereWithAggregatesInput | ConfiguracionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Configuracion"> | string
    ivaPorDefecto?: FloatWithAggregatesFilter<"Configuracion"> | number
    moneda?: StringWithAggregatesFilter<"Configuracion"> | string
    prefijoFactura?: StringWithAggregatesFilter<"Configuracion"> | string
    prefijoPresupuesto?: StringWithAggregatesFilter<"Configuracion"> | string
  }

  export type EmpresaCreateInput = {
    id?: string
    nombre: string
    cif: string
    direccion: string
    email: string
    telefono: string
    logoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmpresaUncheckedCreateInput = {
    id?: string
    nombre: string
    cif: string
    direccion: string
    email: string
    telefono: string
    logoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmpresaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    cif?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    cif?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaCreateManyInput = {
    id?: string
    nombre: string
    cif: string
    direccion: string
    email: string
    telefono: string
    logoUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EmpresaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    cif?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EmpresaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    cif?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    telefono?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaCreateInput = {
    id?: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    productos?: ProductoCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUncheckedCreateInput = {
    id?: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    productos?: ProductoUncheckedCreateNestedManyWithoutCategoriaInput
  }

  export type CategoriaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productos?: ProductoUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productos?: ProductoUncheckedUpdateManyWithoutCategoriaNestedInput
  }

  export type CategoriaCreateManyInput = {
    id?: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoriaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarcaCreateInput = {
    id?: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    productos?: ProductoCreateNestedManyWithoutMarcaInput
  }

  export type MarcaUncheckedCreateInput = {
    id?: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
    productos?: ProductoUncheckedCreateNestedManyWithoutMarcaInput
  }

  export type MarcaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productos?: ProductoUpdateManyWithoutMarcaNestedInput
  }

  export type MarcaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productos?: ProductoUncheckedUpdateManyWithoutMarcaNestedInput
  }

  export type MarcaCreateManyInput = {
    id?: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarcaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarcaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoCreateInput = {
    id?: string
    nombre: string
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marca?: MarcaCreateNestedOneWithoutProductosInput
    categoria: CategoriaCreateNestedOneWithoutProductosInput
    itemsPresupuesto?: ItemPresupuestoCreateNestedManyWithoutProductoInput
    itemsFactura?: ItemFacturaCreateNestedManyWithoutProductoInput
    equipoItems?: EquipoItemCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateInput = {
    id?: string
    nombre: string
    marcaId?: string | null
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    categoriaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsPresupuesto?: ItemPresupuestoUncheckedCreateNestedManyWithoutProductoInput
    itemsFactura?: ItemFacturaUncheckedCreateNestedManyWithoutProductoInput
    equipoItems?: EquipoItemUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marca?: MarcaUpdateOneWithoutProductosNestedInput
    categoria?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    itemsPresupuesto?: ItemPresupuestoUpdateManyWithoutProductoNestedInput
    itemsFactura?: ItemFacturaUpdateManyWithoutProductoNestedInput
    equipoItems?: EquipoItemUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    marcaId?: NullableStringFieldUpdateOperationsInput | string | null
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    categoriaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsPresupuesto?: ItemPresupuestoUncheckedUpdateManyWithoutProductoNestedInput
    itemsFactura?: ItemFacturaUncheckedUpdateManyWithoutProductoNestedInput
    equipoItems?: EquipoItemUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoCreateManyInput = {
    id?: string
    nombre: string
    marcaId?: string | null
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    categoriaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    marcaId?: NullableStringFieldUpdateOperationsInput | string | null
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    categoriaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipoItemCreateInput = {
    id?: string
    numeroSerie?: string | null
    notasInternas?: string | null
    estado?: $Enums.EstadoEquipo
    fechaCompra?: Date | string | null
    precioCompra?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    producto: ProductoCreateNestedOneWithoutEquipoItemsInput
  }

  export type EquipoItemUncheckedCreateInput = {
    id?: string
    productoId: string
    numeroSerie?: string | null
    notasInternas?: string | null
    estado?: $Enums.EstadoEquipo
    fechaCompra?: Date | string | null
    precioCompra?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipoItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroSerie?: NullableStringFieldUpdateOperationsInput | string | null
    notasInternas?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoEquipoFieldUpdateOperationsInput | $Enums.EstadoEquipo
    fechaCompra?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutEquipoItemsNestedInput
  }

  export type EquipoItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    numeroSerie?: NullableStringFieldUpdateOperationsInput | string | null
    notasInternas?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoEquipoFieldUpdateOperationsInput | $Enums.EstadoEquipo
    fechaCompra?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipoItemCreateManyInput = {
    id?: string
    productoId: string
    numeroSerie?: string | null
    notasInternas?: string | null
    estado?: $Enums.EstadoEquipo
    fechaCompra?: Date | string | null
    precioCompra?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipoItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroSerie?: NullableStringFieldUpdateOperationsInput | string | null
    notasInternas?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoEquipoFieldUpdateOperationsInput | $Enums.EstadoEquipo
    fechaCompra?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipoItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    numeroSerie?: NullableStringFieldUpdateOperationsInput | string | null
    notasInternas?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoEquipoFieldUpdateOperationsInput | $Enums.EstadoEquipo
    fechaCompra?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteCreateInput = {
    id?: string
    nombre: string
    tipo?: $Enums.TipoCliente
    nif?: string | null
    direccion?: string | null
    email?: string | null
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    presupuestos?: PresupuestoCreateNestedManyWithoutClienteInput
    facturas?: FacturaCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateInput = {
    id?: string
    nombre: string
    tipo?: $Enums.TipoCliente
    nif?: string | null
    direccion?: string | null
    email?: string | null
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    presupuestos?: PresupuestoUncheckedCreateNestedManyWithoutClienteInput
    facturas?: FacturaUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoClienteFieldUpdateOperationsInput | $Enums.TipoCliente
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presupuestos?: PresupuestoUpdateManyWithoutClienteNestedInput
    facturas?: FacturaUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoClienteFieldUpdateOperationsInput | $Enums.TipoCliente
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presupuestos?: PresupuestoUncheckedUpdateManyWithoutClienteNestedInput
    facturas?: FacturaUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ClienteCreateManyInput = {
    id?: string
    nombre: string
    tipo?: $Enums.TipoCliente
    nif?: string | null
    direccion?: string | null
    email?: string | null
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClienteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoClienteFieldUpdateOperationsInput | $Enums.TipoCliente
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoClienteFieldUpdateOperationsInput | $Enums.TipoCliente
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresupuestoCreateInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClienteCreateNestedOneWithoutPresupuestosInput
    items?: ItemPresupuestoCreateNestedManyWithoutPresupuestoInput
    factura?: FacturaCreateNestedOneWithoutPresupuestosInput
  }

  export type PresupuestoUncheckedCreateInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    clienteId: string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    facturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemPresupuestoUncheckedCreateNestedManyWithoutPresupuestoInput
  }

  export type PresupuestoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneRequiredWithoutPresupuestosNestedInput
    items?: ItemPresupuestoUpdateManyWithoutPresupuestoNestedInput
    factura?: FacturaUpdateOneWithoutPresupuestosNestedInput
  }

  export type PresupuestoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    clienteId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    facturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemPresupuestoUncheckedUpdateManyWithoutPresupuestoNestedInput
  }

  export type PresupuestoCreateManyInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    clienteId: string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    facturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PresupuestoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresupuestoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    clienteId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    facturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresupuestoCreateInput = {
    id?: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    presupuesto: PresupuestoCreateNestedOneWithoutItemsInput
    producto: ProductoCreateNestedOneWithoutItemsPresupuestoInput
  }

  export type ItemPresupuestoUncheckedCreateInput = {
    id?: string
    presupuestoId: string
    productoId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresupuestoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presupuesto?: PresupuestoUpdateOneRequiredWithoutItemsNestedInput
    producto?: ProductoUpdateOneRequiredWithoutItemsPresupuestoNestedInput
  }

  export type ItemPresupuestoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    presupuestoId?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresupuestoCreateManyInput = {
    id?: string
    presupuestoId: string
    productoId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresupuestoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresupuestoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    presupuestoId?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacturaCreateInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaVencimiento: Date | string
    estado?: $Enums.EstadoFactura
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClienteCreateNestedOneWithoutFacturasInput
    items?: ItemFacturaCreateNestedManyWithoutFacturaInput
    presupuestos?: PresupuestoCreateNestedManyWithoutFacturaInput
  }

  export type FacturaUncheckedCreateInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaVencimiento: Date | string
    clienteId: string
    estado?: $Enums.EstadoFactura
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemFacturaUncheckedCreateNestedManyWithoutFacturaInput
    presupuestos?: PresupuestoUncheckedCreateNestedManyWithoutFacturaInput
  }

  export type FacturaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneRequiredWithoutFacturasNestedInput
    items?: ItemFacturaUpdateManyWithoutFacturaNestedInput
    presupuestos?: PresupuestoUpdateManyWithoutFacturaNestedInput
  }

  export type FacturaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    clienteId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemFacturaUncheckedUpdateManyWithoutFacturaNestedInput
    presupuestos?: PresupuestoUncheckedUpdateManyWithoutFacturaNestedInput
  }

  export type FacturaCreateManyInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaVencimiento: Date | string
    clienteId: string
    estado?: $Enums.EstadoFactura
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FacturaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacturaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    clienteId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemFacturaCreateInput = {
    id?: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    factura: FacturaCreateNestedOneWithoutItemsInput
    producto: ProductoCreateNestedOneWithoutItemsFacturaInput
  }

  export type ItemFacturaUncheckedCreateInput = {
    id?: string
    facturaId: string
    productoId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemFacturaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    factura?: FacturaUpdateOneRequiredWithoutItemsNestedInput
    producto?: ProductoUpdateOneRequiredWithoutItemsFacturaNestedInput
  }

  export type ItemFacturaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    facturaId?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemFacturaCreateManyInput = {
    id?: string
    facturaId: string
    productoId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemFacturaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemFacturaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    facturaId?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConfiguracionCreateInput = {
    id?: string
    ivaPorDefecto?: number
    moneda?: string
    prefijoFactura?: string
    prefijoPresupuesto?: string
  }

  export type ConfiguracionUncheckedCreateInput = {
    id?: string
    ivaPorDefecto?: number
    moneda?: string
    prefijoFactura?: string
    prefijoPresupuesto?: string
  }

  export type ConfiguracionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ivaPorDefecto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    prefijoFactura?: StringFieldUpdateOperationsInput | string
    prefijoPresupuesto?: StringFieldUpdateOperationsInput | string
  }

  export type ConfiguracionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ivaPorDefecto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    prefijoFactura?: StringFieldUpdateOperationsInput | string
    prefijoPresupuesto?: StringFieldUpdateOperationsInput | string
  }

  export type ConfiguracionCreateManyInput = {
    id?: string
    ivaPorDefecto?: number
    moneda?: string
    prefijoFactura?: string
    prefijoPresupuesto?: string
  }

  export type ConfiguracionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ivaPorDefecto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    prefijoFactura?: StringFieldUpdateOperationsInput | string
    prefijoPresupuesto?: StringFieldUpdateOperationsInput | string
  }

  export type ConfiguracionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ivaPorDefecto?: FloatFieldUpdateOperationsInput | number
    moneda?: StringFieldUpdateOperationsInput | string
    prefijoFactura?: StringFieldUpdateOperationsInput | string
    prefijoPresupuesto?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmpresaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    cif?: SortOrder
    direccion?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    logoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmpresaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    cif?: SortOrder
    direccion?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    logoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EmpresaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    cif?: SortOrder
    direccion?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    logoUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProductoListRelationFilter = {
    every?: ProductoWhereInput
    some?: ProductoWhereInput
    none?: ProductoWhereInput
  }

  export type ProductoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoriaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoriaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoriaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarcaCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarcaMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarcaMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type MarcaNullableScalarRelationFilter = {
    is?: MarcaWhereInput | null
    isNot?: MarcaWhereInput | null
  }

  export type CategoriaScalarRelationFilter = {
    is?: CategoriaWhereInput
    isNot?: CategoriaWhereInput
  }

  export type ItemPresupuestoListRelationFilter = {
    every?: ItemPresupuestoWhereInput
    some?: ItemPresupuestoWhereInput
    none?: ItemPresupuestoWhereInput
  }

  export type ItemFacturaListRelationFilter = {
    every?: ItemFacturaWhereInput
    some?: ItemFacturaWhereInput
    none?: ItemFacturaWhereInput
  }

  export type EquipoItemListRelationFilter = {
    every?: EquipoItemWhereInput
    some?: EquipoItemWhereInput
    none?: EquipoItemWhereInput
  }

  export type ItemPresupuestoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemFacturaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EquipoItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    marcaId?: SortOrder
    modelo?: SortOrder
    descripcion?: SortOrder
    stock?: SortOrder
    precio?: SortOrder
    precioCompra?: SortOrder
    precioAlquiler?: SortOrder
    categoriaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductoAvgOrderByAggregateInput = {
    stock?: SortOrder
    precio?: SortOrder
    precioCompra?: SortOrder
    precioAlquiler?: SortOrder
  }

  export type ProductoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    marcaId?: SortOrder
    modelo?: SortOrder
    descripcion?: SortOrder
    stock?: SortOrder
    precio?: SortOrder
    precioCompra?: SortOrder
    precioAlquiler?: SortOrder
    categoriaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    marcaId?: SortOrder
    modelo?: SortOrder
    descripcion?: SortOrder
    stock?: SortOrder
    precio?: SortOrder
    precioCompra?: SortOrder
    precioAlquiler?: SortOrder
    categoriaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductoSumOrderByAggregateInput = {
    stock?: SortOrder
    precio?: SortOrder
    precioCompra?: SortOrder
    precioAlquiler?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumEstadoEquipoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoEquipo | EnumEstadoEquipoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoEquipo[] | ListEnumEstadoEquipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoEquipo[] | ListEnumEstadoEquipoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoEquipoFilter<$PrismaModel> | $Enums.EstadoEquipo
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProductoScalarRelationFilter = {
    is?: ProductoWhereInput
    isNot?: ProductoWhereInput
  }

  export type EquipoItemProductoIdNumeroSerieCompoundUniqueInput = {
    productoId: string
    numeroSerie: string
  }

  export type EquipoItemCountOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    numeroSerie?: SortOrder
    notasInternas?: SortOrder
    estado?: SortOrder
    fechaCompra?: SortOrder
    precioCompra?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipoItemAvgOrderByAggregateInput = {
    precioCompra?: SortOrder
  }

  export type EquipoItemMaxOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    numeroSerie?: SortOrder
    notasInternas?: SortOrder
    estado?: SortOrder
    fechaCompra?: SortOrder
    precioCompra?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipoItemMinOrderByAggregateInput = {
    id?: SortOrder
    productoId?: SortOrder
    numeroSerie?: SortOrder
    notasInternas?: SortOrder
    estado?: SortOrder
    fechaCompra?: SortOrder
    precioCompra?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EquipoItemSumOrderByAggregateInput = {
    precioCompra?: SortOrder
  }

  export type EnumEstadoEquipoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoEquipo | EnumEstadoEquipoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoEquipo[] | ListEnumEstadoEquipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoEquipo[] | ListEnumEstadoEquipoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoEquipoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoEquipo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoEquipoFilter<$PrismaModel>
    _max?: NestedEnumEstadoEquipoFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTipoClienteFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCliente | EnumTipoClienteFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCliente[] | ListEnumTipoClienteFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoCliente[] | ListEnumTipoClienteFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoClienteFilter<$PrismaModel> | $Enums.TipoCliente
  }

  export type PresupuestoListRelationFilter = {
    every?: PresupuestoWhereInput
    some?: PresupuestoWhereInput
    none?: PresupuestoWhereInput
  }

  export type FacturaListRelationFilter = {
    every?: FacturaWhereInput
    some?: FacturaWhereInput
    none?: FacturaWhereInput
  }

  export type PresupuestoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FacturaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClienteCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    nif?: SortOrder
    direccion?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClienteMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    nif?: SortOrder
    direccion?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClienteMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    tipo?: SortOrder
    nif?: SortOrder
    direccion?: SortOrder
    email?: SortOrder
    telefono?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTipoClienteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCliente | EnumTipoClienteFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCliente[] | ListEnumTipoClienteFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoCliente[] | ListEnumTipoClienteFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoClienteWithAggregatesFilter<$PrismaModel> | $Enums.TipoCliente
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoClienteFilter<$PrismaModel>
    _max?: NestedEnumTipoClienteFilter<$PrismaModel>
  }

  export type EnumEstadoPresupuestoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPresupuesto | EnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPresupuesto[] | ListEnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPresupuesto[] | ListEnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPresupuestoFilter<$PrismaModel> | $Enums.EstadoPresupuesto
  }

  export type ClienteScalarRelationFilter = {
    is?: ClienteWhereInput
    isNot?: ClienteWhereInput
  }

  export type FacturaNullableScalarRelationFilter = {
    is?: FacturaWhereInput | null
    isNot?: FacturaWhereInput | null
  }

  export type PresupuestoCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    fecha?: SortOrder
    fechaValidez?: SortOrder
    clienteId?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrder
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    facturaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PresupuestoAvgOrderByAggregateInput = {
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
  }

  export type PresupuestoMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    fecha?: SortOrder
    fechaValidez?: SortOrder
    clienteId?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrder
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    facturaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PresupuestoMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    fecha?: SortOrder
    fechaValidez?: SortOrder
    clienteId?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrder
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    facturaId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PresupuestoSumOrderByAggregateInput = {
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
  }

  export type EnumEstadoPresupuestoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPresupuesto | EnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPresupuesto[] | ListEnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPresupuesto[] | ListEnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPresupuestoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPresupuesto
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPresupuestoFilter<$PrismaModel>
    _max?: NestedEnumEstadoPresupuestoFilter<$PrismaModel>
  }

  export type PresupuestoScalarRelationFilter = {
    is?: PresupuestoWhereInput
    isNot?: PresupuestoWhereInput
  }

  export type ItemPresupuestoCountOrderByAggregateInput = {
    id?: SortOrder
    presupuestoId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemPresupuestoAvgOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
  }

  export type ItemPresupuestoMaxOrderByAggregateInput = {
    id?: SortOrder
    presupuestoId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemPresupuestoMinOrderByAggregateInput = {
    id?: SortOrder
    presupuestoId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemPresupuestoSumOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
  }

  export type EnumEstadoFacturaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoFactura | EnumEstadoFacturaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoFacturaFilter<$PrismaModel> | $Enums.EstadoFactura
  }

  export type FacturaCountOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    fecha?: SortOrder
    fechaVencimiento?: SortOrder
    clienteId?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrder
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FacturaAvgOrderByAggregateInput = {
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
  }

  export type FacturaMaxOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    fecha?: SortOrder
    fechaVencimiento?: SortOrder
    clienteId?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrder
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FacturaMinOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
    fecha?: SortOrder
    fechaVencimiento?: SortOrder
    clienteId?: SortOrder
    estado?: SortOrder
    observaciones?: SortOrder
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FacturaSumOrderByAggregateInput = {
    subtotal?: SortOrder
    iva?: SortOrder
    total?: SortOrder
  }

  export type EnumEstadoFacturaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoFactura | EnumEstadoFacturaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoFacturaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoFactura
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoFacturaFilter<$PrismaModel>
    _max?: NestedEnumEstadoFacturaFilter<$PrismaModel>
  }

  export type FacturaScalarRelationFilter = {
    is?: FacturaWhereInput
    isNot?: FacturaWhereInput
  }

  export type ItemFacturaCountOrderByAggregateInput = {
    id?: SortOrder
    facturaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemFacturaAvgOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
  }

  export type ItemFacturaMaxOrderByAggregateInput = {
    id?: SortOrder
    facturaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemFacturaMinOrderByAggregateInput = {
    id?: SortOrder
    facturaId?: SortOrder
    productoId?: SortOrder
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemFacturaSumOrderByAggregateInput = {
    cantidad?: SortOrder
    precioUnitario?: SortOrder
    descuento?: SortOrder
    iva?: SortOrder
    total?: SortOrder
  }

  export type ConfiguracionCountOrderByAggregateInput = {
    id?: SortOrder
    ivaPorDefecto?: SortOrder
    moneda?: SortOrder
    prefijoFactura?: SortOrder
    prefijoPresupuesto?: SortOrder
  }

  export type ConfiguracionAvgOrderByAggregateInput = {
    ivaPorDefecto?: SortOrder
  }

  export type ConfiguracionMaxOrderByAggregateInput = {
    id?: SortOrder
    ivaPorDefecto?: SortOrder
    moneda?: SortOrder
    prefijoFactura?: SortOrder
    prefijoPresupuesto?: SortOrder
  }

  export type ConfiguracionMinOrderByAggregateInput = {
    id?: SortOrder
    ivaPorDefecto?: SortOrder
    moneda?: SortOrder
    prefijoFactura?: SortOrder
    prefijoPresupuesto?: SortOrder
  }

  export type ConfiguracionSumOrderByAggregateInput = {
    ivaPorDefecto?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProductoCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type ProductoUncheckedCreateNestedManyWithoutCategoriaInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type ProductoUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutCategoriaInput | ProductoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutCategoriaInput | ProductoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutCategoriaInput | ProductoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type ProductoUncheckedUpdateManyWithoutCategoriaNestedInput = {
    create?: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput> | ProductoCreateWithoutCategoriaInput[] | ProductoUncheckedCreateWithoutCategoriaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutCategoriaInput | ProductoCreateOrConnectWithoutCategoriaInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutCategoriaInput | ProductoUpsertWithWhereUniqueWithoutCategoriaInput[]
    createMany?: ProductoCreateManyCategoriaInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutCategoriaInput | ProductoUpdateWithWhereUniqueWithoutCategoriaInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutCategoriaInput | ProductoUpdateManyWithWhereWithoutCategoriaInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type ProductoCreateNestedManyWithoutMarcaInput = {
    create?: XOR<ProductoCreateWithoutMarcaInput, ProductoUncheckedCreateWithoutMarcaInput> | ProductoCreateWithoutMarcaInput[] | ProductoUncheckedCreateWithoutMarcaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutMarcaInput | ProductoCreateOrConnectWithoutMarcaInput[]
    createMany?: ProductoCreateManyMarcaInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type ProductoUncheckedCreateNestedManyWithoutMarcaInput = {
    create?: XOR<ProductoCreateWithoutMarcaInput, ProductoUncheckedCreateWithoutMarcaInput> | ProductoCreateWithoutMarcaInput[] | ProductoUncheckedCreateWithoutMarcaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutMarcaInput | ProductoCreateOrConnectWithoutMarcaInput[]
    createMany?: ProductoCreateManyMarcaInputEnvelope
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
  }

  export type ProductoUpdateManyWithoutMarcaNestedInput = {
    create?: XOR<ProductoCreateWithoutMarcaInput, ProductoUncheckedCreateWithoutMarcaInput> | ProductoCreateWithoutMarcaInput[] | ProductoUncheckedCreateWithoutMarcaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutMarcaInput | ProductoCreateOrConnectWithoutMarcaInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutMarcaInput | ProductoUpsertWithWhereUniqueWithoutMarcaInput[]
    createMany?: ProductoCreateManyMarcaInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutMarcaInput | ProductoUpdateWithWhereUniqueWithoutMarcaInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutMarcaInput | ProductoUpdateManyWithWhereWithoutMarcaInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type ProductoUncheckedUpdateManyWithoutMarcaNestedInput = {
    create?: XOR<ProductoCreateWithoutMarcaInput, ProductoUncheckedCreateWithoutMarcaInput> | ProductoCreateWithoutMarcaInput[] | ProductoUncheckedCreateWithoutMarcaInput[]
    connectOrCreate?: ProductoCreateOrConnectWithoutMarcaInput | ProductoCreateOrConnectWithoutMarcaInput[]
    upsert?: ProductoUpsertWithWhereUniqueWithoutMarcaInput | ProductoUpsertWithWhereUniqueWithoutMarcaInput[]
    createMany?: ProductoCreateManyMarcaInputEnvelope
    set?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    disconnect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    delete?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    connect?: ProductoWhereUniqueInput | ProductoWhereUniqueInput[]
    update?: ProductoUpdateWithWhereUniqueWithoutMarcaInput | ProductoUpdateWithWhereUniqueWithoutMarcaInput[]
    updateMany?: ProductoUpdateManyWithWhereWithoutMarcaInput | ProductoUpdateManyWithWhereWithoutMarcaInput[]
    deleteMany?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
  }

  export type MarcaCreateNestedOneWithoutProductosInput = {
    create?: XOR<MarcaCreateWithoutProductosInput, MarcaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: MarcaCreateOrConnectWithoutProductosInput
    connect?: MarcaWhereUniqueInput
  }

  export type CategoriaCreateNestedOneWithoutProductosInput = {
    create?: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutProductosInput
    connect?: CategoriaWhereUniqueInput
  }

  export type ItemPresupuestoCreateNestedManyWithoutProductoInput = {
    create?: XOR<ItemPresupuestoCreateWithoutProductoInput, ItemPresupuestoUncheckedCreateWithoutProductoInput> | ItemPresupuestoCreateWithoutProductoInput[] | ItemPresupuestoUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ItemPresupuestoCreateOrConnectWithoutProductoInput | ItemPresupuestoCreateOrConnectWithoutProductoInput[]
    createMany?: ItemPresupuestoCreateManyProductoInputEnvelope
    connect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
  }

  export type ItemFacturaCreateNestedManyWithoutProductoInput = {
    create?: XOR<ItemFacturaCreateWithoutProductoInput, ItemFacturaUncheckedCreateWithoutProductoInput> | ItemFacturaCreateWithoutProductoInput[] | ItemFacturaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ItemFacturaCreateOrConnectWithoutProductoInput | ItemFacturaCreateOrConnectWithoutProductoInput[]
    createMany?: ItemFacturaCreateManyProductoInputEnvelope
    connect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
  }

  export type EquipoItemCreateNestedManyWithoutProductoInput = {
    create?: XOR<EquipoItemCreateWithoutProductoInput, EquipoItemUncheckedCreateWithoutProductoInput> | EquipoItemCreateWithoutProductoInput[] | EquipoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: EquipoItemCreateOrConnectWithoutProductoInput | EquipoItemCreateOrConnectWithoutProductoInput[]
    createMany?: EquipoItemCreateManyProductoInputEnvelope
    connect?: EquipoItemWhereUniqueInput | EquipoItemWhereUniqueInput[]
  }

  export type ItemPresupuestoUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<ItemPresupuestoCreateWithoutProductoInput, ItemPresupuestoUncheckedCreateWithoutProductoInput> | ItemPresupuestoCreateWithoutProductoInput[] | ItemPresupuestoUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ItemPresupuestoCreateOrConnectWithoutProductoInput | ItemPresupuestoCreateOrConnectWithoutProductoInput[]
    createMany?: ItemPresupuestoCreateManyProductoInputEnvelope
    connect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
  }

  export type ItemFacturaUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<ItemFacturaCreateWithoutProductoInput, ItemFacturaUncheckedCreateWithoutProductoInput> | ItemFacturaCreateWithoutProductoInput[] | ItemFacturaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ItemFacturaCreateOrConnectWithoutProductoInput | ItemFacturaCreateOrConnectWithoutProductoInput[]
    createMany?: ItemFacturaCreateManyProductoInputEnvelope
    connect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
  }

  export type EquipoItemUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<EquipoItemCreateWithoutProductoInput, EquipoItemUncheckedCreateWithoutProductoInput> | EquipoItemCreateWithoutProductoInput[] | EquipoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: EquipoItemCreateOrConnectWithoutProductoInput | EquipoItemCreateOrConnectWithoutProductoInput[]
    createMany?: EquipoItemCreateManyProductoInputEnvelope
    connect?: EquipoItemWhereUniqueInput | EquipoItemWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MarcaUpdateOneWithoutProductosNestedInput = {
    create?: XOR<MarcaCreateWithoutProductosInput, MarcaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: MarcaCreateOrConnectWithoutProductosInput
    upsert?: MarcaUpsertWithoutProductosInput
    disconnect?: MarcaWhereInput | boolean
    delete?: MarcaWhereInput | boolean
    connect?: MarcaWhereUniqueInput
    update?: XOR<XOR<MarcaUpdateToOneWithWhereWithoutProductosInput, MarcaUpdateWithoutProductosInput>, MarcaUncheckedUpdateWithoutProductosInput>
  }

  export type CategoriaUpdateOneRequiredWithoutProductosNestedInput = {
    create?: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    connectOrCreate?: CategoriaCreateOrConnectWithoutProductosInput
    upsert?: CategoriaUpsertWithoutProductosInput
    connect?: CategoriaWhereUniqueInput
    update?: XOR<XOR<CategoriaUpdateToOneWithWhereWithoutProductosInput, CategoriaUpdateWithoutProductosInput>, CategoriaUncheckedUpdateWithoutProductosInput>
  }

  export type ItemPresupuestoUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ItemPresupuestoCreateWithoutProductoInput, ItemPresupuestoUncheckedCreateWithoutProductoInput> | ItemPresupuestoCreateWithoutProductoInput[] | ItemPresupuestoUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ItemPresupuestoCreateOrConnectWithoutProductoInput | ItemPresupuestoCreateOrConnectWithoutProductoInput[]
    upsert?: ItemPresupuestoUpsertWithWhereUniqueWithoutProductoInput | ItemPresupuestoUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ItemPresupuestoCreateManyProductoInputEnvelope
    set?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    disconnect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    delete?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    connect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    update?: ItemPresupuestoUpdateWithWhereUniqueWithoutProductoInput | ItemPresupuestoUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ItemPresupuestoUpdateManyWithWhereWithoutProductoInput | ItemPresupuestoUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ItemPresupuestoScalarWhereInput | ItemPresupuestoScalarWhereInput[]
  }

  export type ItemFacturaUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ItemFacturaCreateWithoutProductoInput, ItemFacturaUncheckedCreateWithoutProductoInput> | ItemFacturaCreateWithoutProductoInput[] | ItemFacturaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ItemFacturaCreateOrConnectWithoutProductoInput | ItemFacturaCreateOrConnectWithoutProductoInput[]
    upsert?: ItemFacturaUpsertWithWhereUniqueWithoutProductoInput | ItemFacturaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ItemFacturaCreateManyProductoInputEnvelope
    set?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    disconnect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    delete?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    connect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    update?: ItemFacturaUpdateWithWhereUniqueWithoutProductoInput | ItemFacturaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ItemFacturaUpdateManyWithWhereWithoutProductoInput | ItemFacturaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ItemFacturaScalarWhereInput | ItemFacturaScalarWhereInput[]
  }

  export type EquipoItemUpdateManyWithoutProductoNestedInput = {
    create?: XOR<EquipoItemCreateWithoutProductoInput, EquipoItemUncheckedCreateWithoutProductoInput> | EquipoItemCreateWithoutProductoInput[] | EquipoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: EquipoItemCreateOrConnectWithoutProductoInput | EquipoItemCreateOrConnectWithoutProductoInput[]
    upsert?: EquipoItemUpsertWithWhereUniqueWithoutProductoInput | EquipoItemUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: EquipoItemCreateManyProductoInputEnvelope
    set?: EquipoItemWhereUniqueInput | EquipoItemWhereUniqueInput[]
    disconnect?: EquipoItemWhereUniqueInput | EquipoItemWhereUniqueInput[]
    delete?: EquipoItemWhereUniqueInput | EquipoItemWhereUniqueInput[]
    connect?: EquipoItemWhereUniqueInput | EquipoItemWhereUniqueInput[]
    update?: EquipoItemUpdateWithWhereUniqueWithoutProductoInput | EquipoItemUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: EquipoItemUpdateManyWithWhereWithoutProductoInput | EquipoItemUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: EquipoItemScalarWhereInput | EquipoItemScalarWhereInput[]
  }

  export type ItemPresupuestoUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ItemPresupuestoCreateWithoutProductoInput, ItemPresupuestoUncheckedCreateWithoutProductoInput> | ItemPresupuestoCreateWithoutProductoInput[] | ItemPresupuestoUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ItemPresupuestoCreateOrConnectWithoutProductoInput | ItemPresupuestoCreateOrConnectWithoutProductoInput[]
    upsert?: ItemPresupuestoUpsertWithWhereUniqueWithoutProductoInput | ItemPresupuestoUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ItemPresupuestoCreateManyProductoInputEnvelope
    set?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    disconnect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    delete?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    connect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    update?: ItemPresupuestoUpdateWithWhereUniqueWithoutProductoInput | ItemPresupuestoUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ItemPresupuestoUpdateManyWithWhereWithoutProductoInput | ItemPresupuestoUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ItemPresupuestoScalarWhereInput | ItemPresupuestoScalarWhereInput[]
  }

  export type ItemFacturaUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<ItemFacturaCreateWithoutProductoInput, ItemFacturaUncheckedCreateWithoutProductoInput> | ItemFacturaCreateWithoutProductoInput[] | ItemFacturaUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: ItemFacturaCreateOrConnectWithoutProductoInput | ItemFacturaCreateOrConnectWithoutProductoInput[]
    upsert?: ItemFacturaUpsertWithWhereUniqueWithoutProductoInput | ItemFacturaUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: ItemFacturaCreateManyProductoInputEnvelope
    set?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    disconnect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    delete?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    connect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    update?: ItemFacturaUpdateWithWhereUniqueWithoutProductoInput | ItemFacturaUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: ItemFacturaUpdateManyWithWhereWithoutProductoInput | ItemFacturaUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: ItemFacturaScalarWhereInput | ItemFacturaScalarWhereInput[]
  }

  export type EquipoItemUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<EquipoItemCreateWithoutProductoInput, EquipoItemUncheckedCreateWithoutProductoInput> | EquipoItemCreateWithoutProductoInput[] | EquipoItemUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: EquipoItemCreateOrConnectWithoutProductoInput | EquipoItemCreateOrConnectWithoutProductoInput[]
    upsert?: EquipoItemUpsertWithWhereUniqueWithoutProductoInput | EquipoItemUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: EquipoItemCreateManyProductoInputEnvelope
    set?: EquipoItemWhereUniqueInput | EquipoItemWhereUniqueInput[]
    disconnect?: EquipoItemWhereUniqueInput | EquipoItemWhereUniqueInput[]
    delete?: EquipoItemWhereUniqueInput | EquipoItemWhereUniqueInput[]
    connect?: EquipoItemWhereUniqueInput | EquipoItemWhereUniqueInput[]
    update?: EquipoItemUpdateWithWhereUniqueWithoutProductoInput | EquipoItemUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: EquipoItemUpdateManyWithWhereWithoutProductoInput | EquipoItemUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: EquipoItemScalarWhereInput | EquipoItemScalarWhereInput[]
  }

  export type ProductoCreateNestedOneWithoutEquipoItemsInput = {
    create?: XOR<ProductoCreateWithoutEquipoItemsInput, ProductoUncheckedCreateWithoutEquipoItemsInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutEquipoItemsInput
    connect?: ProductoWhereUniqueInput
  }

  export type EnumEstadoEquipoFieldUpdateOperationsInput = {
    set?: $Enums.EstadoEquipo
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProductoUpdateOneRequiredWithoutEquipoItemsNestedInput = {
    create?: XOR<ProductoCreateWithoutEquipoItemsInput, ProductoUncheckedCreateWithoutEquipoItemsInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutEquipoItemsInput
    upsert?: ProductoUpsertWithoutEquipoItemsInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutEquipoItemsInput, ProductoUpdateWithoutEquipoItemsInput>, ProductoUncheckedUpdateWithoutEquipoItemsInput>
  }

  export type PresupuestoCreateNestedManyWithoutClienteInput = {
    create?: XOR<PresupuestoCreateWithoutClienteInput, PresupuestoUncheckedCreateWithoutClienteInput> | PresupuestoCreateWithoutClienteInput[] | PresupuestoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PresupuestoCreateOrConnectWithoutClienteInput | PresupuestoCreateOrConnectWithoutClienteInput[]
    createMany?: PresupuestoCreateManyClienteInputEnvelope
    connect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
  }

  export type FacturaCreateNestedManyWithoutClienteInput = {
    create?: XOR<FacturaCreateWithoutClienteInput, FacturaUncheckedCreateWithoutClienteInput> | FacturaCreateWithoutClienteInput[] | FacturaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: FacturaCreateOrConnectWithoutClienteInput | FacturaCreateOrConnectWithoutClienteInput[]
    createMany?: FacturaCreateManyClienteInputEnvelope
    connect?: FacturaWhereUniqueInput | FacturaWhereUniqueInput[]
  }

  export type PresupuestoUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<PresupuestoCreateWithoutClienteInput, PresupuestoUncheckedCreateWithoutClienteInput> | PresupuestoCreateWithoutClienteInput[] | PresupuestoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PresupuestoCreateOrConnectWithoutClienteInput | PresupuestoCreateOrConnectWithoutClienteInput[]
    createMany?: PresupuestoCreateManyClienteInputEnvelope
    connect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
  }

  export type FacturaUncheckedCreateNestedManyWithoutClienteInput = {
    create?: XOR<FacturaCreateWithoutClienteInput, FacturaUncheckedCreateWithoutClienteInput> | FacturaCreateWithoutClienteInput[] | FacturaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: FacturaCreateOrConnectWithoutClienteInput | FacturaCreateOrConnectWithoutClienteInput[]
    createMany?: FacturaCreateManyClienteInputEnvelope
    connect?: FacturaWhereUniqueInput | FacturaWhereUniqueInput[]
  }

  export type EnumTipoClienteFieldUpdateOperationsInput = {
    set?: $Enums.TipoCliente
  }

  export type PresupuestoUpdateManyWithoutClienteNestedInput = {
    create?: XOR<PresupuestoCreateWithoutClienteInput, PresupuestoUncheckedCreateWithoutClienteInput> | PresupuestoCreateWithoutClienteInput[] | PresupuestoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PresupuestoCreateOrConnectWithoutClienteInput | PresupuestoCreateOrConnectWithoutClienteInput[]
    upsert?: PresupuestoUpsertWithWhereUniqueWithoutClienteInput | PresupuestoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: PresupuestoCreateManyClienteInputEnvelope
    set?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    disconnect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    delete?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    connect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    update?: PresupuestoUpdateWithWhereUniqueWithoutClienteInput | PresupuestoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: PresupuestoUpdateManyWithWhereWithoutClienteInput | PresupuestoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: PresupuestoScalarWhereInput | PresupuestoScalarWhereInput[]
  }

  export type FacturaUpdateManyWithoutClienteNestedInput = {
    create?: XOR<FacturaCreateWithoutClienteInput, FacturaUncheckedCreateWithoutClienteInput> | FacturaCreateWithoutClienteInput[] | FacturaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: FacturaCreateOrConnectWithoutClienteInput | FacturaCreateOrConnectWithoutClienteInput[]
    upsert?: FacturaUpsertWithWhereUniqueWithoutClienteInput | FacturaUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: FacturaCreateManyClienteInputEnvelope
    set?: FacturaWhereUniqueInput | FacturaWhereUniqueInput[]
    disconnect?: FacturaWhereUniqueInput | FacturaWhereUniqueInput[]
    delete?: FacturaWhereUniqueInput | FacturaWhereUniqueInput[]
    connect?: FacturaWhereUniqueInput | FacturaWhereUniqueInput[]
    update?: FacturaUpdateWithWhereUniqueWithoutClienteInput | FacturaUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: FacturaUpdateManyWithWhereWithoutClienteInput | FacturaUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: FacturaScalarWhereInput | FacturaScalarWhereInput[]
  }

  export type PresupuestoUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<PresupuestoCreateWithoutClienteInput, PresupuestoUncheckedCreateWithoutClienteInput> | PresupuestoCreateWithoutClienteInput[] | PresupuestoUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: PresupuestoCreateOrConnectWithoutClienteInput | PresupuestoCreateOrConnectWithoutClienteInput[]
    upsert?: PresupuestoUpsertWithWhereUniqueWithoutClienteInput | PresupuestoUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: PresupuestoCreateManyClienteInputEnvelope
    set?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    disconnect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    delete?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    connect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    update?: PresupuestoUpdateWithWhereUniqueWithoutClienteInput | PresupuestoUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: PresupuestoUpdateManyWithWhereWithoutClienteInput | PresupuestoUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: PresupuestoScalarWhereInput | PresupuestoScalarWhereInput[]
  }

  export type FacturaUncheckedUpdateManyWithoutClienteNestedInput = {
    create?: XOR<FacturaCreateWithoutClienteInput, FacturaUncheckedCreateWithoutClienteInput> | FacturaCreateWithoutClienteInput[] | FacturaUncheckedCreateWithoutClienteInput[]
    connectOrCreate?: FacturaCreateOrConnectWithoutClienteInput | FacturaCreateOrConnectWithoutClienteInput[]
    upsert?: FacturaUpsertWithWhereUniqueWithoutClienteInput | FacturaUpsertWithWhereUniqueWithoutClienteInput[]
    createMany?: FacturaCreateManyClienteInputEnvelope
    set?: FacturaWhereUniqueInput | FacturaWhereUniqueInput[]
    disconnect?: FacturaWhereUniqueInput | FacturaWhereUniqueInput[]
    delete?: FacturaWhereUniqueInput | FacturaWhereUniqueInput[]
    connect?: FacturaWhereUniqueInput | FacturaWhereUniqueInput[]
    update?: FacturaUpdateWithWhereUniqueWithoutClienteInput | FacturaUpdateWithWhereUniqueWithoutClienteInput[]
    updateMany?: FacturaUpdateManyWithWhereWithoutClienteInput | FacturaUpdateManyWithWhereWithoutClienteInput[]
    deleteMany?: FacturaScalarWhereInput | FacturaScalarWhereInput[]
  }

  export type ClienteCreateNestedOneWithoutPresupuestosInput = {
    create?: XOR<ClienteCreateWithoutPresupuestosInput, ClienteUncheckedCreateWithoutPresupuestosInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutPresupuestosInput
    connect?: ClienteWhereUniqueInput
  }

  export type ItemPresupuestoCreateNestedManyWithoutPresupuestoInput = {
    create?: XOR<ItemPresupuestoCreateWithoutPresupuestoInput, ItemPresupuestoUncheckedCreateWithoutPresupuestoInput> | ItemPresupuestoCreateWithoutPresupuestoInput[] | ItemPresupuestoUncheckedCreateWithoutPresupuestoInput[]
    connectOrCreate?: ItemPresupuestoCreateOrConnectWithoutPresupuestoInput | ItemPresupuestoCreateOrConnectWithoutPresupuestoInput[]
    createMany?: ItemPresupuestoCreateManyPresupuestoInputEnvelope
    connect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
  }

  export type FacturaCreateNestedOneWithoutPresupuestosInput = {
    create?: XOR<FacturaCreateWithoutPresupuestosInput, FacturaUncheckedCreateWithoutPresupuestosInput>
    connectOrCreate?: FacturaCreateOrConnectWithoutPresupuestosInput
    connect?: FacturaWhereUniqueInput
  }

  export type ItemPresupuestoUncheckedCreateNestedManyWithoutPresupuestoInput = {
    create?: XOR<ItemPresupuestoCreateWithoutPresupuestoInput, ItemPresupuestoUncheckedCreateWithoutPresupuestoInput> | ItemPresupuestoCreateWithoutPresupuestoInput[] | ItemPresupuestoUncheckedCreateWithoutPresupuestoInput[]
    connectOrCreate?: ItemPresupuestoCreateOrConnectWithoutPresupuestoInput | ItemPresupuestoCreateOrConnectWithoutPresupuestoInput[]
    createMany?: ItemPresupuestoCreateManyPresupuestoInputEnvelope
    connect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
  }

  export type EnumEstadoPresupuestoFieldUpdateOperationsInput = {
    set?: $Enums.EstadoPresupuesto
  }

  export type ClienteUpdateOneRequiredWithoutPresupuestosNestedInput = {
    create?: XOR<ClienteCreateWithoutPresupuestosInput, ClienteUncheckedCreateWithoutPresupuestosInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutPresupuestosInput
    upsert?: ClienteUpsertWithoutPresupuestosInput
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutPresupuestosInput, ClienteUpdateWithoutPresupuestosInput>, ClienteUncheckedUpdateWithoutPresupuestosInput>
  }

  export type ItemPresupuestoUpdateManyWithoutPresupuestoNestedInput = {
    create?: XOR<ItemPresupuestoCreateWithoutPresupuestoInput, ItemPresupuestoUncheckedCreateWithoutPresupuestoInput> | ItemPresupuestoCreateWithoutPresupuestoInput[] | ItemPresupuestoUncheckedCreateWithoutPresupuestoInput[]
    connectOrCreate?: ItemPresupuestoCreateOrConnectWithoutPresupuestoInput | ItemPresupuestoCreateOrConnectWithoutPresupuestoInput[]
    upsert?: ItemPresupuestoUpsertWithWhereUniqueWithoutPresupuestoInput | ItemPresupuestoUpsertWithWhereUniqueWithoutPresupuestoInput[]
    createMany?: ItemPresupuestoCreateManyPresupuestoInputEnvelope
    set?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    disconnect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    delete?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    connect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    update?: ItemPresupuestoUpdateWithWhereUniqueWithoutPresupuestoInput | ItemPresupuestoUpdateWithWhereUniqueWithoutPresupuestoInput[]
    updateMany?: ItemPresupuestoUpdateManyWithWhereWithoutPresupuestoInput | ItemPresupuestoUpdateManyWithWhereWithoutPresupuestoInput[]
    deleteMany?: ItemPresupuestoScalarWhereInput | ItemPresupuestoScalarWhereInput[]
  }

  export type FacturaUpdateOneWithoutPresupuestosNestedInput = {
    create?: XOR<FacturaCreateWithoutPresupuestosInput, FacturaUncheckedCreateWithoutPresupuestosInput>
    connectOrCreate?: FacturaCreateOrConnectWithoutPresupuestosInput
    upsert?: FacturaUpsertWithoutPresupuestosInput
    disconnect?: FacturaWhereInput | boolean
    delete?: FacturaWhereInput | boolean
    connect?: FacturaWhereUniqueInput
    update?: XOR<XOR<FacturaUpdateToOneWithWhereWithoutPresupuestosInput, FacturaUpdateWithoutPresupuestosInput>, FacturaUncheckedUpdateWithoutPresupuestosInput>
  }

  export type ItemPresupuestoUncheckedUpdateManyWithoutPresupuestoNestedInput = {
    create?: XOR<ItemPresupuestoCreateWithoutPresupuestoInput, ItemPresupuestoUncheckedCreateWithoutPresupuestoInput> | ItemPresupuestoCreateWithoutPresupuestoInput[] | ItemPresupuestoUncheckedCreateWithoutPresupuestoInput[]
    connectOrCreate?: ItemPresupuestoCreateOrConnectWithoutPresupuestoInput | ItemPresupuestoCreateOrConnectWithoutPresupuestoInput[]
    upsert?: ItemPresupuestoUpsertWithWhereUniqueWithoutPresupuestoInput | ItemPresupuestoUpsertWithWhereUniqueWithoutPresupuestoInput[]
    createMany?: ItemPresupuestoCreateManyPresupuestoInputEnvelope
    set?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    disconnect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    delete?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    connect?: ItemPresupuestoWhereUniqueInput | ItemPresupuestoWhereUniqueInput[]
    update?: ItemPresupuestoUpdateWithWhereUniqueWithoutPresupuestoInput | ItemPresupuestoUpdateWithWhereUniqueWithoutPresupuestoInput[]
    updateMany?: ItemPresupuestoUpdateManyWithWhereWithoutPresupuestoInput | ItemPresupuestoUpdateManyWithWhereWithoutPresupuestoInput[]
    deleteMany?: ItemPresupuestoScalarWhereInput | ItemPresupuestoScalarWhereInput[]
  }

  export type PresupuestoCreateNestedOneWithoutItemsInput = {
    create?: XOR<PresupuestoCreateWithoutItemsInput, PresupuestoUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PresupuestoCreateOrConnectWithoutItemsInput
    connect?: PresupuestoWhereUniqueInput
  }

  export type ProductoCreateNestedOneWithoutItemsPresupuestoInput = {
    create?: XOR<ProductoCreateWithoutItemsPresupuestoInput, ProductoUncheckedCreateWithoutItemsPresupuestoInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutItemsPresupuestoInput
    connect?: ProductoWhereUniqueInput
  }

  export type PresupuestoUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<PresupuestoCreateWithoutItemsInput, PresupuestoUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PresupuestoCreateOrConnectWithoutItemsInput
    upsert?: PresupuestoUpsertWithoutItemsInput
    connect?: PresupuestoWhereUniqueInput
    update?: XOR<XOR<PresupuestoUpdateToOneWithWhereWithoutItemsInput, PresupuestoUpdateWithoutItemsInput>, PresupuestoUncheckedUpdateWithoutItemsInput>
  }

  export type ProductoUpdateOneRequiredWithoutItemsPresupuestoNestedInput = {
    create?: XOR<ProductoCreateWithoutItemsPresupuestoInput, ProductoUncheckedCreateWithoutItemsPresupuestoInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutItemsPresupuestoInput
    upsert?: ProductoUpsertWithoutItemsPresupuestoInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutItemsPresupuestoInput, ProductoUpdateWithoutItemsPresupuestoInput>, ProductoUncheckedUpdateWithoutItemsPresupuestoInput>
  }

  export type ClienteCreateNestedOneWithoutFacturasInput = {
    create?: XOR<ClienteCreateWithoutFacturasInput, ClienteUncheckedCreateWithoutFacturasInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutFacturasInput
    connect?: ClienteWhereUniqueInput
  }

  export type ItemFacturaCreateNestedManyWithoutFacturaInput = {
    create?: XOR<ItemFacturaCreateWithoutFacturaInput, ItemFacturaUncheckedCreateWithoutFacturaInput> | ItemFacturaCreateWithoutFacturaInput[] | ItemFacturaUncheckedCreateWithoutFacturaInput[]
    connectOrCreate?: ItemFacturaCreateOrConnectWithoutFacturaInput | ItemFacturaCreateOrConnectWithoutFacturaInput[]
    createMany?: ItemFacturaCreateManyFacturaInputEnvelope
    connect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
  }

  export type PresupuestoCreateNestedManyWithoutFacturaInput = {
    create?: XOR<PresupuestoCreateWithoutFacturaInput, PresupuestoUncheckedCreateWithoutFacturaInput> | PresupuestoCreateWithoutFacturaInput[] | PresupuestoUncheckedCreateWithoutFacturaInput[]
    connectOrCreate?: PresupuestoCreateOrConnectWithoutFacturaInput | PresupuestoCreateOrConnectWithoutFacturaInput[]
    createMany?: PresupuestoCreateManyFacturaInputEnvelope
    connect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
  }

  export type ItemFacturaUncheckedCreateNestedManyWithoutFacturaInput = {
    create?: XOR<ItemFacturaCreateWithoutFacturaInput, ItemFacturaUncheckedCreateWithoutFacturaInput> | ItemFacturaCreateWithoutFacturaInput[] | ItemFacturaUncheckedCreateWithoutFacturaInput[]
    connectOrCreate?: ItemFacturaCreateOrConnectWithoutFacturaInput | ItemFacturaCreateOrConnectWithoutFacturaInput[]
    createMany?: ItemFacturaCreateManyFacturaInputEnvelope
    connect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
  }

  export type PresupuestoUncheckedCreateNestedManyWithoutFacturaInput = {
    create?: XOR<PresupuestoCreateWithoutFacturaInput, PresupuestoUncheckedCreateWithoutFacturaInput> | PresupuestoCreateWithoutFacturaInput[] | PresupuestoUncheckedCreateWithoutFacturaInput[]
    connectOrCreate?: PresupuestoCreateOrConnectWithoutFacturaInput | PresupuestoCreateOrConnectWithoutFacturaInput[]
    createMany?: PresupuestoCreateManyFacturaInputEnvelope
    connect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
  }

  export type EnumEstadoFacturaFieldUpdateOperationsInput = {
    set?: $Enums.EstadoFactura
  }

  export type ClienteUpdateOneRequiredWithoutFacturasNestedInput = {
    create?: XOR<ClienteCreateWithoutFacturasInput, ClienteUncheckedCreateWithoutFacturasInput>
    connectOrCreate?: ClienteCreateOrConnectWithoutFacturasInput
    upsert?: ClienteUpsertWithoutFacturasInput
    connect?: ClienteWhereUniqueInput
    update?: XOR<XOR<ClienteUpdateToOneWithWhereWithoutFacturasInput, ClienteUpdateWithoutFacturasInput>, ClienteUncheckedUpdateWithoutFacturasInput>
  }

  export type ItemFacturaUpdateManyWithoutFacturaNestedInput = {
    create?: XOR<ItemFacturaCreateWithoutFacturaInput, ItemFacturaUncheckedCreateWithoutFacturaInput> | ItemFacturaCreateWithoutFacturaInput[] | ItemFacturaUncheckedCreateWithoutFacturaInput[]
    connectOrCreate?: ItemFacturaCreateOrConnectWithoutFacturaInput | ItemFacturaCreateOrConnectWithoutFacturaInput[]
    upsert?: ItemFacturaUpsertWithWhereUniqueWithoutFacturaInput | ItemFacturaUpsertWithWhereUniqueWithoutFacturaInput[]
    createMany?: ItemFacturaCreateManyFacturaInputEnvelope
    set?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    disconnect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    delete?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    connect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    update?: ItemFacturaUpdateWithWhereUniqueWithoutFacturaInput | ItemFacturaUpdateWithWhereUniqueWithoutFacturaInput[]
    updateMany?: ItemFacturaUpdateManyWithWhereWithoutFacturaInput | ItemFacturaUpdateManyWithWhereWithoutFacturaInput[]
    deleteMany?: ItemFacturaScalarWhereInput | ItemFacturaScalarWhereInput[]
  }

  export type PresupuestoUpdateManyWithoutFacturaNestedInput = {
    create?: XOR<PresupuestoCreateWithoutFacturaInput, PresupuestoUncheckedCreateWithoutFacturaInput> | PresupuestoCreateWithoutFacturaInput[] | PresupuestoUncheckedCreateWithoutFacturaInput[]
    connectOrCreate?: PresupuestoCreateOrConnectWithoutFacturaInput | PresupuestoCreateOrConnectWithoutFacturaInput[]
    upsert?: PresupuestoUpsertWithWhereUniqueWithoutFacturaInput | PresupuestoUpsertWithWhereUniqueWithoutFacturaInput[]
    createMany?: PresupuestoCreateManyFacturaInputEnvelope
    set?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    disconnect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    delete?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    connect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    update?: PresupuestoUpdateWithWhereUniqueWithoutFacturaInput | PresupuestoUpdateWithWhereUniqueWithoutFacturaInput[]
    updateMany?: PresupuestoUpdateManyWithWhereWithoutFacturaInput | PresupuestoUpdateManyWithWhereWithoutFacturaInput[]
    deleteMany?: PresupuestoScalarWhereInput | PresupuestoScalarWhereInput[]
  }

  export type ItemFacturaUncheckedUpdateManyWithoutFacturaNestedInput = {
    create?: XOR<ItemFacturaCreateWithoutFacturaInput, ItemFacturaUncheckedCreateWithoutFacturaInput> | ItemFacturaCreateWithoutFacturaInput[] | ItemFacturaUncheckedCreateWithoutFacturaInput[]
    connectOrCreate?: ItemFacturaCreateOrConnectWithoutFacturaInput | ItemFacturaCreateOrConnectWithoutFacturaInput[]
    upsert?: ItemFacturaUpsertWithWhereUniqueWithoutFacturaInput | ItemFacturaUpsertWithWhereUniqueWithoutFacturaInput[]
    createMany?: ItemFacturaCreateManyFacturaInputEnvelope
    set?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    disconnect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    delete?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    connect?: ItemFacturaWhereUniqueInput | ItemFacturaWhereUniqueInput[]
    update?: ItemFacturaUpdateWithWhereUniqueWithoutFacturaInput | ItemFacturaUpdateWithWhereUniqueWithoutFacturaInput[]
    updateMany?: ItemFacturaUpdateManyWithWhereWithoutFacturaInput | ItemFacturaUpdateManyWithWhereWithoutFacturaInput[]
    deleteMany?: ItemFacturaScalarWhereInput | ItemFacturaScalarWhereInput[]
  }

  export type PresupuestoUncheckedUpdateManyWithoutFacturaNestedInput = {
    create?: XOR<PresupuestoCreateWithoutFacturaInput, PresupuestoUncheckedCreateWithoutFacturaInput> | PresupuestoCreateWithoutFacturaInput[] | PresupuestoUncheckedCreateWithoutFacturaInput[]
    connectOrCreate?: PresupuestoCreateOrConnectWithoutFacturaInput | PresupuestoCreateOrConnectWithoutFacturaInput[]
    upsert?: PresupuestoUpsertWithWhereUniqueWithoutFacturaInput | PresupuestoUpsertWithWhereUniqueWithoutFacturaInput[]
    createMany?: PresupuestoCreateManyFacturaInputEnvelope
    set?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    disconnect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    delete?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    connect?: PresupuestoWhereUniqueInput | PresupuestoWhereUniqueInput[]
    update?: PresupuestoUpdateWithWhereUniqueWithoutFacturaInput | PresupuestoUpdateWithWhereUniqueWithoutFacturaInput[]
    updateMany?: PresupuestoUpdateManyWithWhereWithoutFacturaInput | PresupuestoUpdateManyWithWhereWithoutFacturaInput[]
    deleteMany?: PresupuestoScalarWhereInput | PresupuestoScalarWhereInput[]
  }

  export type FacturaCreateNestedOneWithoutItemsInput = {
    create?: XOR<FacturaCreateWithoutItemsInput, FacturaUncheckedCreateWithoutItemsInput>
    connectOrCreate?: FacturaCreateOrConnectWithoutItemsInput
    connect?: FacturaWhereUniqueInput
  }

  export type ProductoCreateNestedOneWithoutItemsFacturaInput = {
    create?: XOR<ProductoCreateWithoutItemsFacturaInput, ProductoUncheckedCreateWithoutItemsFacturaInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutItemsFacturaInput
    connect?: ProductoWhereUniqueInput
  }

  export type FacturaUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<FacturaCreateWithoutItemsInput, FacturaUncheckedCreateWithoutItemsInput>
    connectOrCreate?: FacturaCreateOrConnectWithoutItemsInput
    upsert?: FacturaUpsertWithoutItemsInput
    connect?: FacturaWhereUniqueInput
    update?: XOR<XOR<FacturaUpdateToOneWithWhereWithoutItemsInput, FacturaUpdateWithoutItemsInput>, FacturaUncheckedUpdateWithoutItemsInput>
  }

  export type ProductoUpdateOneRequiredWithoutItemsFacturaNestedInput = {
    create?: XOR<ProductoCreateWithoutItemsFacturaInput, ProductoUncheckedCreateWithoutItemsFacturaInput>
    connectOrCreate?: ProductoCreateOrConnectWithoutItemsFacturaInput
    upsert?: ProductoUpsertWithoutItemsFacturaInput
    connect?: ProductoWhereUniqueInput
    update?: XOR<XOR<ProductoUpdateToOneWithWhereWithoutItemsFacturaInput, ProductoUpdateWithoutItemsFacturaInput>, ProductoUncheckedUpdateWithoutItemsFacturaInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumEstadoEquipoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoEquipo | EnumEstadoEquipoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoEquipo[] | ListEnumEstadoEquipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoEquipo[] | ListEnumEstadoEquipoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoEquipoFilter<$PrismaModel> | $Enums.EstadoEquipo
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumEstadoEquipoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoEquipo | EnumEstadoEquipoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoEquipo[] | ListEnumEstadoEquipoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoEquipo[] | ListEnumEstadoEquipoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoEquipoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoEquipo
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoEquipoFilter<$PrismaModel>
    _max?: NestedEnumEstadoEquipoFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTipoClienteFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCliente | EnumTipoClienteFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCliente[] | ListEnumTipoClienteFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoCliente[] | ListEnumTipoClienteFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoClienteFilter<$PrismaModel> | $Enums.TipoCliente
  }

  export type NestedEnumTipoClienteWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipoCliente | EnumTipoClienteFieldRefInput<$PrismaModel>
    in?: $Enums.TipoCliente[] | ListEnumTipoClienteFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipoCliente[] | ListEnumTipoClienteFieldRefInput<$PrismaModel>
    not?: NestedEnumTipoClienteWithAggregatesFilter<$PrismaModel> | $Enums.TipoCliente
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipoClienteFilter<$PrismaModel>
    _max?: NestedEnumTipoClienteFilter<$PrismaModel>
  }

  export type NestedEnumEstadoPresupuestoFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPresupuesto | EnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPresupuesto[] | ListEnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPresupuesto[] | ListEnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPresupuestoFilter<$PrismaModel> | $Enums.EstadoPresupuesto
  }

  export type NestedEnumEstadoPresupuestoWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoPresupuesto | EnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoPresupuesto[] | ListEnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoPresupuesto[] | ListEnumEstadoPresupuestoFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoPresupuestoWithAggregatesFilter<$PrismaModel> | $Enums.EstadoPresupuesto
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoPresupuestoFilter<$PrismaModel>
    _max?: NestedEnumEstadoPresupuestoFilter<$PrismaModel>
  }

  export type NestedEnumEstadoFacturaFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoFactura | EnumEstadoFacturaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoFacturaFilter<$PrismaModel> | $Enums.EstadoFactura
  }

  export type NestedEnumEstadoFacturaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EstadoFactura | EnumEstadoFacturaFieldRefInput<$PrismaModel>
    in?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    notIn?: $Enums.EstadoFactura[] | ListEnumEstadoFacturaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstadoFacturaWithAggregatesFilter<$PrismaModel> | $Enums.EstadoFactura
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstadoFacturaFilter<$PrismaModel>
    _max?: NestedEnumEstadoFacturaFilter<$PrismaModel>
  }

  export type ProductoCreateWithoutCategoriaInput = {
    id?: string
    nombre: string
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marca?: MarcaCreateNestedOneWithoutProductosInput
    itemsPresupuesto?: ItemPresupuestoCreateNestedManyWithoutProductoInput
    itemsFactura?: ItemFacturaCreateNestedManyWithoutProductoInput
    equipoItems?: EquipoItemCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutCategoriaInput = {
    id?: string
    nombre: string
    marcaId?: string | null
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsPresupuesto?: ItemPresupuestoUncheckedCreateNestedManyWithoutProductoInput
    itemsFactura?: ItemFacturaUncheckedCreateNestedManyWithoutProductoInput
    equipoItems?: EquipoItemUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutCategoriaInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput>
  }

  export type ProductoCreateManyCategoriaInputEnvelope = {
    data: ProductoCreateManyCategoriaInput | ProductoCreateManyCategoriaInput[]
    skipDuplicates?: boolean
  }

  export type ProductoUpsertWithWhereUniqueWithoutCategoriaInput = {
    where: ProductoWhereUniqueInput
    update: XOR<ProductoUpdateWithoutCategoriaInput, ProductoUncheckedUpdateWithoutCategoriaInput>
    create: XOR<ProductoCreateWithoutCategoriaInput, ProductoUncheckedCreateWithoutCategoriaInput>
  }

  export type ProductoUpdateWithWhereUniqueWithoutCategoriaInput = {
    where: ProductoWhereUniqueInput
    data: XOR<ProductoUpdateWithoutCategoriaInput, ProductoUncheckedUpdateWithoutCategoriaInput>
  }

  export type ProductoUpdateManyWithWhereWithoutCategoriaInput = {
    where: ProductoScalarWhereInput
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyWithoutCategoriaInput>
  }

  export type ProductoScalarWhereInput = {
    AND?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
    OR?: ProductoScalarWhereInput[]
    NOT?: ProductoScalarWhereInput | ProductoScalarWhereInput[]
    id?: StringFilter<"Producto"> | string
    nombre?: StringFilter<"Producto"> | string
    marcaId?: StringNullableFilter<"Producto"> | string | null
    modelo?: StringNullableFilter<"Producto"> | string | null
    descripcion?: StringNullableFilter<"Producto"> | string | null
    stock?: IntFilter<"Producto"> | number
    precio?: FloatFilter<"Producto"> | number
    precioCompra?: FloatNullableFilter<"Producto"> | number | null
    precioAlquiler?: FloatNullableFilter<"Producto"> | number | null
    categoriaId?: StringFilter<"Producto"> | string
    createdAt?: DateTimeFilter<"Producto"> | Date | string
    updatedAt?: DateTimeFilter<"Producto"> | Date | string
  }

  export type ProductoCreateWithoutMarcaInput = {
    id?: string
    nombre: string
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    categoria: CategoriaCreateNestedOneWithoutProductosInput
    itemsPresupuesto?: ItemPresupuestoCreateNestedManyWithoutProductoInput
    itemsFactura?: ItemFacturaCreateNestedManyWithoutProductoInput
    equipoItems?: EquipoItemCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutMarcaInput = {
    id?: string
    nombre: string
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    categoriaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsPresupuesto?: ItemPresupuestoUncheckedCreateNestedManyWithoutProductoInput
    itemsFactura?: ItemFacturaUncheckedCreateNestedManyWithoutProductoInput
    equipoItems?: EquipoItemUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutMarcaInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutMarcaInput, ProductoUncheckedCreateWithoutMarcaInput>
  }

  export type ProductoCreateManyMarcaInputEnvelope = {
    data: ProductoCreateManyMarcaInput | ProductoCreateManyMarcaInput[]
    skipDuplicates?: boolean
  }

  export type ProductoUpsertWithWhereUniqueWithoutMarcaInput = {
    where: ProductoWhereUniqueInput
    update: XOR<ProductoUpdateWithoutMarcaInput, ProductoUncheckedUpdateWithoutMarcaInput>
    create: XOR<ProductoCreateWithoutMarcaInput, ProductoUncheckedCreateWithoutMarcaInput>
  }

  export type ProductoUpdateWithWhereUniqueWithoutMarcaInput = {
    where: ProductoWhereUniqueInput
    data: XOR<ProductoUpdateWithoutMarcaInput, ProductoUncheckedUpdateWithoutMarcaInput>
  }

  export type ProductoUpdateManyWithWhereWithoutMarcaInput = {
    where: ProductoScalarWhereInput
    data: XOR<ProductoUpdateManyMutationInput, ProductoUncheckedUpdateManyWithoutMarcaInput>
  }

  export type MarcaCreateWithoutProductosInput = {
    id?: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarcaUncheckedCreateWithoutProductosInput = {
    id?: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarcaCreateOrConnectWithoutProductosInput = {
    where: MarcaWhereUniqueInput
    create: XOR<MarcaCreateWithoutProductosInput, MarcaUncheckedCreateWithoutProductosInput>
  }

  export type CategoriaCreateWithoutProductosInput = {
    id?: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoriaUncheckedCreateWithoutProductosInput = {
    id?: string
    nombre: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoriaCreateOrConnectWithoutProductosInput = {
    where: CategoriaWhereUniqueInput
    create: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
  }

  export type ItemPresupuestoCreateWithoutProductoInput = {
    id?: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    presupuesto: PresupuestoCreateNestedOneWithoutItemsInput
  }

  export type ItemPresupuestoUncheckedCreateWithoutProductoInput = {
    id?: string
    presupuestoId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresupuestoCreateOrConnectWithoutProductoInput = {
    where: ItemPresupuestoWhereUniqueInput
    create: XOR<ItemPresupuestoCreateWithoutProductoInput, ItemPresupuestoUncheckedCreateWithoutProductoInput>
  }

  export type ItemPresupuestoCreateManyProductoInputEnvelope = {
    data: ItemPresupuestoCreateManyProductoInput | ItemPresupuestoCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type ItemFacturaCreateWithoutProductoInput = {
    id?: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    factura: FacturaCreateNestedOneWithoutItemsInput
  }

  export type ItemFacturaUncheckedCreateWithoutProductoInput = {
    id?: string
    facturaId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemFacturaCreateOrConnectWithoutProductoInput = {
    where: ItemFacturaWhereUniqueInput
    create: XOR<ItemFacturaCreateWithoutProductoInput, ItemFacturaUncheckedCreateWithoutProductoInput>
  }

  export type ItemFacturaCreateManyProductoInputEnvelope = {
    data: ItemFacturaCreateManyProductoInput | ItemFacturaCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type EquipoItemCreateWithoutProductoInput = {
    id?: string
    numeroSerie?: string | null
    notasInternas?: string | null
    estado?: $Enums.EstadoEquipo
    fechaCompra?: Date | string | null
    precioCompra?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipoItemUncheckedCreateWithoutProductoInput = {
    id?: string
    numeroSerie?: string | null
    notasInternas?: string | null
    estado?: $Enums.EstadoEquipo
    fechaCompra?: Date | string | null
    precioCompra?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipoItemCreateOrConnectWithoutProductoInput = {
    where: EquipoItemWhereUniqueInput
    create: XOR<EquipoItemCreateWithoutProductoInput, EquipoItemUncheckedCreateWithoutProductoInput>
  }

  export type EquipoItemCreateManyProductoInputEnvelope = {
    data: EquipoItemCreateManyProductoInput | EquipoItemCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type MarcaUpsertWithoutProductosInput = {
    update: XOR<MarcaUpdateWithoutProductosInput, MarcaUncheckedUpdateWithoutProductosInput>
    create: XOR<MarcaCreateWithoutProductosInput, MarcaUncheckedCreateWithoutProductosInput>
    where?: MarcaWhereInput
  }

  export type MarcaUpdateToOneWithWhereWithoutProductosInput = {
    where?: MarcaWhereInput
    data: XOR<MarcaUpdateWithoutProductosInput, MarcaUncheckedUpdateWithoutProductosInput>
  }

  export type MarcaUpdateWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarcaUncheckedUpdateWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUpsertWithoutProductosInput = {
    update: XOR<CategoriaUpdateWithoutProductosInput, CategoriaUncheckedUpdateWithoutProductosInput>
    create: XOR<CategoriaCreateWithoutProductosInput, CategoriaUncheckedCreateWithoutProductosInput>
    where?: CategoriaWhereInput
  }

  export type CategoriaUpdateToOneWithWhereWithoutProductosInput = {
    where?: CategoriaWhereInput
    data: XOR<CategoriaUpdateWithoutProductosInput, CategoriaUncheckedUpdateWithoutProductosInput>
  }

  export type CategoriaUpdateWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriaUncheckedUpdateWithoutProductosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresupuestoUpsertWithWhereUniqueWithoutProductoInput = {
    where: ItemPresupuestoWhereUniqueInput
    update: XOR<ItemPresupuestoUpdateWithoutProductoInput, ItemPresupuestoUncheckedUpdateWithoutProductoInput>
    create: XOR<ItemPresupuestoCreateWithoutProductoInput, ItemPresupuestoUncheckedCreateWithoutProductoInput>
  }

  export type ItemPresupuestoUpdateWithWhereUniqueWithoutProductoInput = {
    where: ItemPresupuestoWhereUniqueInput
    data: XOR<ItemPresupuestoUpdateWithoutProductoInput, ItemPresupuestoUncheckedUpdateWithoutProductoInput>
  }

  export type ItemPresupuestoUpdateManyWithWhereWithoutProductoInput = {
    where: ItemPresupuestoScalarWhereInput
    data: XOR<ItemPresupuestoUpdateManyMutationInput, ItemPresupuestoUncheckedUpdateManyWithoutProductoInput>
  }

  export type ItemPresupuestoScalarWhereInput = {
    AND?: ItemPresupuestoScalarWhereInput | ItemPresupuestoScalarWhereInput[]
    OR?: ItemPresupuestoScalarWhereInput[]
    NOT?: ItemPresupuestoScalarWhereInput | ItemPresupuestoScalarWhereInput[]
    id?: StringFilter<"ItemPresupuesto"> | string
    presupuestoId?: StringFilter<"ItemPresupuesto"> | string
    productoId?: StringFilter<"ItemPresupuesto"> | string
    cantidad?: IntFilter<"ItemPresupuesto"> | number
    precioUnitario?: FloatFilter<"ItemPresupuesto"> | number
    descuento?: FloatFilter<"ItemPresupuesto"> | number
    iva?: FloatFilter<"ItemPresupuesto"> | number
    total?: FloatFilter<"ItemPresupuesto"> | number
    createdAt?: DateTimeFilter<"ItemPresupuesto"> | Date | string
    updatedAt?: DateTimeFilter<"ItemPresupuesto"> | Date | string
  }

  export type ItemFacturaUpsertWithWhereUniqueWithoutProductoInput = {
    where: ItemFacturaWhereUniqueInput
    update: XOR<ItemFacturaUpdateWithoutProductoInput, ItemFacturaUncheckedUpdateWithoutProductoInput>
    create: XOR<ItemFacturaCreateWithoutProductoInput, ItemFacturaUncheckedCreateWithoutProductoInput>
  }

  export type ItemFacturaUpdateWithWhereUniqueWithoutProductoInput = {
    where: ItemFacturaWhereUniqueInput
    data: XOR<ItemFacturaUpdateWithoutProductoInput, ItemFacturaUncheckedUpdateWithoutProductoInput>
  }

  export type ItemFacturaUpdateManyWithWhereWithoutProductoInput = {
    where: ItemFacturaScalarWhereInput
    data: XOR<ItemFacturaUpdateManyMutationInput, ItemFacturaUncheckedUpdateManyWithoutProductoInput>
  }

  export type ItemFacturaScalarWhereInput = {
    AND?: ItemFacturaScalarWhereInput | ItemFacturaScalarWhereInput[]
    OR?: ItemFacturaScalarWhereInput[]
    NOT?: ItemFacturaScalarWhereInput | ItemFacturaScalarWhereInput[]
    id?: StringFilter<"ItemFactura"> | string
    facturaId?: StringFilter<"ItemFactura"> | string
    productoId?: StringFilter<"ItemFactura"> | string
    cantidad?: IntFilter<"ItemFactura"> | number
    precioUnitario?: FloatFilter<"ItemFactura"> | number
    descuento?: FloatFilter<"ItemFactura"> | number
    iva?: FloatFilter<"ItemFactura"> | number
    total?: FloatFilter<"ItemFactura"> | number
    createdAt?: DateTimeFilter<"ItemFactura"> | Date | string
    updatedAt?: DateTimeFilter<"ItemFactura"> | Date | string
  }

  export type EquipoItemUpsertWithWhereUniqueWithoutProductoInput = {
    where: EquipoItemWhereUniqueInput
    update: XOR<EquipoItemUpdateWithoutProductoInput, EquipoItemUncheckedUpdateWithoutProductoInput>
    create: XOR<EquipoItemCreateWithoutProductoInput, EquipoItemUncheckedCreateWithoutProductoInput>
  }

  export type EquipoItemUpdateWithWhereUniqueWithoutProductoInput = {
    where: EquipoItemWhereUniqueInput
    data: XOR<EquipoItemUpdateWithoutProductoInput, EquipoItemUncheckedUpdateWithoutProductoInput>
  }

  export type EquipoItemUpdateManyWithWhereWithoutProductoInput = {
    where: EquipoItemScalarWhereInput
    data: XOR<EquipoItemUpdateManyMutationInput, EquipoItemUncheckedUpdateManyWithoutProductoInput>
  }

  export type EquipoItemScalarWhereInput = {
    AND?: EquipoItemScalarWhereInput | EquipoItemScalarWhereInput[]
    OR?: EquipoItemScalarWhereInput[]
    NOT?: EquipoItemScalarWhereInput | EquipoItemScalarWhereInput[]
    id?: StringFilter<"EquipoItem"> | string
    productoId?: StringFilter<"EquipoItem"> | string
    numeroSerie?: StringNullableFilter<"EquipoItem"> | string | null
    notasInternas?: StringNullableFilter<"EquipoItem"> | string | null
    estado?: EnumEstadoEquipoFilter<"EquipoItem"> | $Enums.EstadoEquipo
    fechaCompra?: DateTimeNullableFilter<"EquipoItem"> | Date | string | null
    precioCompra?: FloatNullableFilter<"EquipoItem"> | number | null
    createdAt?: DateTimeFilter<"EquipoItem"> | Date | string
    updatedAt?: DateTimeFilter<"EquipoItem"> | Date | string
  }

  export type ProductoCreateWithoutEquipoItemsInput = {
    id?: string
    nombre: string
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marca?: MarcaCreateNestedOneWithoutProductosInput
    categoria: CategoriaCreateNestedOneWithoutProductosInput
    itemsPresupuesto?: ItemPresupuestoCreateNestedManyWithoutProductoInput
    itemsFactura?: ItemFacturaCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutEquipoItemsInput = {
    id?: string
    nombre: string
    marcaId?: string | null
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    categoriaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsPresupuesto?: ItemPresupuestoUncheckedCreateNestedManyWithoutProductoInput
    itemsFactura?: ItemFacturaUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutEquipoItemsInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutEquipoItemsInput, ProductoUncheckedCreateWithoutEquipoItemsInput>
  }

  export type ProductoUpsertWithoutEquipoItemsInput = {
    update: XOR<ProductoUpdateWithoutEquipoItemsInput, ProductoUncheckedUpdateWithoutEquipoItemsInput>
    create: XOR<ProductoCreateWithoutEquipoItemsInput, ProductoUncheckedCreateWithoutEquipoItemsInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutEquipoItemsInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutEquipoItemsInput, ProductoUncheckedUpdateWithoutEquipoItemsInput>
  }

  export type ProductoUpdateWithoutEquipoItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marca?: MarcaUpdateOneWithoutProductosNestedInput
    categoria?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    itemsPresupuesto?: ItemPresupuestoUpdateManyWithoutProductoNestedInput
    itemsFactura?: ItemFacturaUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutEquipoItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    marcaId?: NullableStringFieldUpdateOperationsInput | string | null
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    categoriaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsPresupuesto?: ItemPresupuestoUncheckedUpdateManyWithoutProductoNestedInput
    itemsFactura?: ItemFacturaUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type PresupuestoCreateWithoutClienteInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemPresupuestoCreateNestedManyWithoutPresupuestoInput
    factura?: FacturaCreateNestedOneWithoutPresupuestosInput
  }

  export type PresupuestoUncheckedCreateWithoutClienteInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    facturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemPresupuestoUncheckedCreateNestedManyWithoutPresupuestoInput
  }

  export type PresupuestoCreateOrConnectWithoutClienteInput = {
    where: PresupuestoWhereUniqueInput
    create: XOR<PresupuestoCreateWithoutClienteInput, PresupuestoUncheckedCreateWithoutClienteInput>
  }

  export type PresupuestoCreateManyClienteInputEnvelope = {
    data: PresupuestoCreateManyClienteInput | PresupuestoCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type FacturaCreateWithoutClienteInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaVencimiento: Date | string
    estado?: $Enums.EstadoFactura
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemFacturaCreateNestedManyWithoutFacturaInput
    presupuestos?: PresupuestoCreateNestedManyWithoutFacturaInput
  }

  export type FacturaUncheckedCreateWithoutClienteInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaVencimiento: Date | string
    estado?: $Enums.EstadoFactura
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemFacturaUncheckedCreateNestedManyWithoutFacturaInput
    presupuestos?: PresupuestoUncheckedCreateNestedManyWithoutFacturaInput
  }

  export type FacturaCreateOrConnectWithoutClienteInput = {
    where: FacturaWhereUniqueInput
    create: XOR<FacturaCreateWithoutClienteInput, FacturaUncheckedCreateWithoutClienteInput>
  }

  export type FacturaCreateManyClienteInputEnvelope = {
    data: FacturaCreateManyClienteInput | FacturaCreateManyClienteInput[]
    skipDuplicates?: boolean
  }

  export type PresupuestoUpsertWithWhereUniqueWithoutClienteInput = {
    where: PresupuestoWhereUniqueInput
    update: XOR<PresupuestoUpdateWithoutClienteInput, PresupuestoUncheckedUpdateWithoutClienteInput>
    create: XOR<PresupuestoCreateWithoutClienteInput, PresupuestoUncheckedCreateWithoutClienteInput>
  }

  export type PresupuestoUpdateWithWhereUniqueWithoutClienteInput = {
    where: PresupuestoWhereUniqueInput
    data: XOR<PresupuestoUpdateWithoutClienteInput, PresupuestoUncheckedUpdateWithoutClienteInput>
  }

  export type PresupuestoUpdateManyWithWhereWithoutClienteInput = {
    where: PresupuestoScalarWhereInput
    data: XOR<PresupuestoUpdateManyMutationInput, PresupuestoUncheckedUpdateManyWithoutClienteInput>
  }

  export type PresupuestoScalarWhereInput = {
    AND?: PresupuestoScalarWhereInput | PresupuestoScalarWhereInput[]
    OR?: PresupuestoScalarWhereInput[]
    NOT?: PresupuestoScalarWhereInput | PresupuestoScalarWhereInput[]
    id?: StringFilter<"Presupuesto"> | string
    numero?: StringFilter<"Presupuesto"> | string
    fecha?: DateTimeFilter<"Presupuesto"> | Date | string
    fechaValidez?: DateTimeFilter<"Presupuesto"> | Date | string
    clienteId?: StringFilter<"Presupuesto"> | string
    estado?: EnumEstadoPresupuestoFilter<"Presupuesto"> | $Enums.EstadoPresupuesto
    observaciones?: StringNullableFilter<"Presupuesto"> | string | null
    subtotal?: FloatFilter<"Presupuesto"> | number
    iva?: FloatFilter<"Presupuesto"> | number
    total?: FloatFilter<"Presupuesto"> | number
    facturaId?: StringNullableFilter<"Presupuesto"> | string | null
    createdAt?: DateTimeFilter<"Presupuesto"> | Date | string
    updatedAt?: DateTimeFilter<"Presupuesto"> | Date | string
  }

  export type FacturaUpsertWithWhereUniqueWithoutClienteInput = {
    where: FacturaWhereUniqueInput
    update: XOR<FacturaUpdateWithoutClienteInput, FacturaUncheckedUpdateWithoutClienteInput>
    create: XOR<FacturaCreateWithoutClienteInput, FacturaUncheckedCreateWithoutClienteInput>
  }

  export type FacturaUpdateWithWhereUniqueWithoutClienteInput = {
    where: FacturaWhereUniqueInput
    data: XOR<FacturaUpdateWithoutClienteInput, FacturaUncheckedUpdateWithoutClienteInput>
  }

  export type FacturaUpdateManyWithWhereWithoutClienteInput = {
    where: FacturaScalarWhereInput
    data: XOR<FacturaUpdateManyMutationInput, FacturaUncheckedUpdateManyWithoutClienteInput>
  }

  export type FacturaScalarWhereInput = {
    AND?: FacturaScalarWhereInput | FacturaScalarWhereInput[]
    OR?: FacturaScalarWhereInput[]
    NOT?: FacturaScalarWhereInput | FacturaScalarWhereInput[]
    id?: StringFilter<"Factura"> | string
    numero?: StringFilter<"Factura"> | string
    fecha?: DateTimeFilter<"Factura"> | Date | string
    fechaVencimiento?: DateTimeFilter<"Factura"> | Date | string
    clienteId?: StringFilter<"Factura"> | string
    estado?: EnumEstadoFacturaFilter<"Factura"> | $Enums.EstadoFactura
    observaciones?: StringNullableFilter<"Factura"> | string | null
    subtotal?: FloatFilter<"Factura"> | number
    iva?: FloatFilter<"Factura"> | number
    total?: FloatFilter<"Factura"> | number
    createdAt?: DateTimeFilter<"Factura"> | Date | string
    updatedAt?: DateTimeFilter<"Factura"> | Date | string
  }

  export type ClienteCreateWithoutPresupuestosInput = {
    id?: string
    nombre: string
    tipo?: $Enums.TipoCliente
    nif?: string | null
    direccion?: string | null
    email?: string | null
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    facturas?: FacturaCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateWithoutPresupuestosInput = {
    id?: string
    nombre: string
    tipo?: $Enums.TipoCliente
    nif?: string | null
    direccion?: string | null
    email?: string | null
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    facturas?: FacturaUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteCreateOrConnectWithoutPresupuestosInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutPresupuestosInput, ClienteUncheckedCreateWithoutPresupuestosInput>
  }

  export type ItemPresupuestoCreateWithoutPresupuestoInput = {
    id?: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    producto: ProductoCreateNestedOneWithoutItemsPresupuestoInput
  }

  export type ItemPresupuestoUncheckedCreateWithoutPresupuestoInput = {
    id?: string
    productoId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresupuestoCreateOrConnectWithoutPresupuestoInput = {
    where: ItemPresupuestoWhereUniqueInput
    create: XOR<ItemPresupuestoCreateWithoutPresupuestoInput, ItemPresupuestoUncheckedCreateWithoutPresupuestoInput>
  }

  export type ItemPresupuestoCreateManyPresupuestoInputEnvelope = {
    data: ItemPresupuestoCreateManyPresupuestoInput | ItemPresupuestoCreateManyPresupuestoInput[]
    skipDuplicates?: boolean
  }

  export type FacturaCreateWithoutPresupuestosInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaVencimiento: Date | string
    estado?: $Enums.EstadoFactura
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClienteCreateNestedOneWithoutFacturasInput
    items?: ItemFacturaCreateNestedManyWithoutFacturaInput
  }

  export type FacturaUncheckedCreateWithoutPresupuestosInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaVencimiento: Date | string
    clienteId: string
    estado?: $Enums.EstadoFactura
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemFacturaUncheckedCreateNestedManyWithoutFacturaInput
  }

  export type FacturaCreateOrConnectWithoutPresupuestosInput = {
    where: FacturaWhereUniqueInput
    create: XOR<FacturaCreateWithoutPresupuestosInput, FacturaUncheckedCreateWithoutPresupuestosInput>
  }

  export type ClienteUpsertWithoutPresupuestosInput = {
    update: XOR<ClienteUpdateWithoutPresupuestosInput, ClienteUncheckedUpdateWithoutPresupuestosInput>
    create: XOR<ClienteCreateWithoutPresupuestosInput, ClienteUncheckedCreateWithoutPresupuestosInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutPresupuestosInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutPresupuestosInput, ClienteUncheckedUpdateWithoutPresupuestosInput>
  }

  export type ClienteUpdateWithoutPresupuestosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoClienteFieldUpdateOperationsInput | $Enums.TipoCliente
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    facturas?: FacturaUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateWithoutPresupuestosInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoClienteFieldUpdateOperationsInput | $Enums.TipoCliente
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    facturas?: FacturaUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ItemPresupuestoUpsertWithWhereUniqueWithoutPresupuestoInput = {
    where: ItemPresupuestoWhereUniqueInput
    update: XOR<ItemPresupuestoUpdateWithoutPresupuestoInput, ItemPresupuestoUncheckedUpdateWithoutPresupuestoInput>
    create: XOR<ItemPresupuestoCreateWithoutPresupuestoInput, ItemPresupuestoUncheckedCreateWithoutPresupuestoInput>
  }

  export type ItemPresupuestoUpdateWithWhereUniqueWithoutPresupuestoInput = {
    where: ItemPresupuestoWhereUniqueInput
    data: XOR<ItemPresupuestoUpdateWithoutPresupuestoInput, ItemPresupuestoUncheckedUpdateWithoutPresupuestoInput>
  }

  export type ItemPresupuestoUpdateManyWithWhereWithoutPresupuestoInput = {
    where: ItemPresupuestoScalarWhereInput
    data: XOR<ItemPresupuestoUpdateManyMutationInput, ItemPresupuestoUncheckedUpdateManyWithoutPresupuestoInput>
  }

  export type FacturaUpsertWithoutPresupuestosInput = {
    update: XOR<FacturaUpdateWithoutPresupuestosInput, FacturaUncheckedUpdateWithoutPresupuestosInput>
    create: XOR<FacturaCreateWithoutPresupuestosInput, FacturaUncheckedCreateWithoutPresupuestosInput>
    where?: FacturaWhereInput
  }

  export type FacturaUpdateToOneWithWhereWithoutPresupuestosInput = {
    where?: FacturaWhereInput
    data: XOR<FacturaUpdateWithoutPresupuestosInput, FacturaUncheckedUpdateWithoutPresupuestosInput>
  }

  export type FacturaUpdateWithoutPresupuestosInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneRequiredWithoutFacturasNestedInput
    items?: ItemFacturaUpdateManyWithoutFacturaNestedInput
  }

  export type FacturaUncheckedUpdateWithoutPresupuestosInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    clienteId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemFacturaUncheckedUpdateManyWithoutFacturaNestedInput
  }

  export type PresupuestoCreateWithoutItemsInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClienteCreateNestedOneWithoutPresupuestosInput
    factura?: FacturaCreateNestedOneWithoutPresupuestosInput
  }

  export type PresupuestoUncheckedCreateWithoutItemsInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    clienteId: string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    facturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PresupuestoCreateOrConnectWithoutItemsInput = {
    where: PresupuestoWhereUniqueInput
    create: XOR<PresupuestoCreateWithoutItemsInput, PresupuestoUncheckedCreateWithoutItemsInput>
  }

  export type ProductoCreateWithoutItemsPresupuestoInput = {
    id?: string
    nombre: string
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marca?: MarcaCreateNestedOneWithoutProductosInput
    categoria: CategoriaCreateNestedOneWithoutProductosInput
    itemsFactura?: ItemFacturaCreateNestedManyWithoutProductoInput
    equipoItems?: EquipoItemCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutItemsPresupuestoInput = {
    id?: string
    nombre: string
    marcaId?: string | null
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    categoriaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsFactura?: ItemFacturaUncheckedCreateNestedManyWithoutProductoInput
    equipoItems?: EquipoItemUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutItemsPresupuestoInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutItemsPresupuestoInput, ProductoUncheckedCreateWithoutItemsPresupuestoInput>
  }

  export type PresupuestoUpsertWithoutItemsInput = {
    update: XOR<PresupuestoUpdateWithoutItemsInput, PresupuestoUncheckedUpdateWithoutItemsInput>
    create: XOR<PresupuestoCreateWithoutItemsInput, PresupuestoUncheckedCreateWithoutItemsInput>
    where?: PresupuestoWhereInput
  }

  export type PresupuestoUpdateToOneWithWhereWithoutItemsInput = {
    where?: PresupuestoWhereInput
    data: XOR<PresupuestoUpdateWithoutItemsInput, PresupuestoUncheckedUpdateWithoutItemsInput>
  }

  export type PresupuestoUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneRequiredWithoutPresupuestosNestedInput
    factura?: FacturaUpdateOneWithoutPresupuestosNestedInput
  }

  export type PresupuestoUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    clienteId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    facturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoUpsertWithoutItemsPresupuestoInput = {
    update: XOR<ProductoUpdateWithoutItemsPresupuestoInput, ProductoUncheckedUpdateWithoutItemsPresupuestoInput>
    create: XOR<ProductoCreateWithoutItemsPresupuestoInput, ProductoUncheckedCreateWithoutItemsPresupuestoInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutItemsPresupuestoInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutItemsPresupuestoInput, ProductoUncheckedUpdateWithoutItemsPresupuestoInput>
  }

  export type ProductoUpdateWithoutItemsPresupuestoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marca?: MarcaUpdateOneWithoutProductosNestedInput
    categoria?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    itemsFactura?: ItemFacturaUpdateManyWithoutProductoNestedInput
    equipoItems?: EquipoItemUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutItemsPresupuestoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    marcaId?: NullableStringFieldUpdateOperationsInput | string | null
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    categoriaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsFactura?: ItemFacturaUncheckedUpdateManyWithoutProductoNestedInput
    equipoItems?: EquipoItemUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ClienteCreateWithoutFacturasInput = {
    id?: string
    nombre: string
    tipo?: $Enums.TipoCliente
    nif?: string | null
    direccion?: string | null
    email?: string | null
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    presupuestos?: PresupuestoCreateNestedManyWithoutClienteInput
  }

  export type ClienteUncheckedCreateWithoutFacturasInput = {
    id?: string
    nombre: string
    tipo?: $Enums.TipoCliente
    nif?: string | null
    direccion?: string | null
    email?: string | null
    telefono?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    presupuestos?: PresupuestoUncheckedCreateNestedManyWithoutClienteInput
  }

  export type ClienteCreateOrConnectWithoutFacturasInput = {
    where: ClienteWhereUniqueInput
    create: XOR<ClienteCreateWithoutFacturasInput, ClienteUncheckedCreateWithoutFacturasInput>
  }

  export type ItemFacturaCreateWithoutFacturaInput = {
    id?: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    producto: ProductoCreateNestedOneWithoutItemsFacturaInput
  }

  export type ItemFacturaUncheckedCreateWithoutFacturaInput = {
    id?: string
    productoId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemFacturaCreateOrConnectWithoutFacturaInput = {
    where: ItemFacturaWhereUniqueInput
    create: XOR<ItemFacturaCreateWithoutFacturaInput, ItemFacturaUncheckedCreateWithoutFacturaInput>
  }

  export type ItemFacturaCreateManyFacturaInputEnvelope = {
    data: ItemFacturaCreateManyFacturaInput | ItemFacturaCreateManyFacturaInput[]
    skipDuplicates?: boolean
  }

  export type PresupuestoCreateWithoutFacturaInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClienteCreateNestedOneWithoutPresupuestosInput
    items?: ItemPresupuestoCreateNestedManyWithoutPresupuestoInput
  }

  export type PresupuestoUncheckedCreateWithoutFacturaInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    clienteId: string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: ItemPresupuestoUncheckedCreateNestedManyWithoutPresupuestoInput
  }

  export type PresupuestoCreateOrConnectWithoutFacturaInput = {
    where: PresupuestoWhereUniqueInput
    create: XOR<PresupuestoCreateWithoutFacturaInput, PresupuestoUncheckedCreateWithoutFacturaInput>
  }

  export type PresupuestoCreateManyFacturaInputEnvelope = {
    data: PresupuestoCreateManyFacturaInput | PresupuestoCreateManyFacturaInput[]
    skipDuplicates?: boolean
  }

  export type ClienteUpsertWithoutFacturasInput = {
    update: XOR<ClienteUpdateWithoutFacturasInput, ClienteUncheckedUpdateWithoutFacturasInput>
    create: XOR<ClienteCreateWithoutFacturasInput, ClienteUncheckedCreateWithoutFacturasInput>
    where?: ClienteWhereInput
  }

  export type ClienteUpdateToOneWithWhereWithoutFacturasInput = {
    where?: ClienteWhereInput
    data: XOR<ClienteUpdateWithoutFacturasInput, ClienteUncheckedUpdateWithoutFacturasInput>
  }

  export type ClienteUpdateWithoutFacturasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoClienteFieldUpdateOperationsInput | $Enums.TipoCliente
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presupuestos?: PresupuestoUpdateManyWithoutClienteNestedInput
  }

  export type ClienteUncheckedUpdateWithoutFacturasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    tipo?: EnumTipoClienteFieldUpdateOperationsInput | $Enums.TipoCliente
    nif?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presupuestos?: PresupuestoUncheckedUpdateManyWithoutClienteNestedInput
  }

  export type ItemFacturaUpsertWithWhereUniqueWithoutFacturaInput = {
    where: ItemFacturaWhereUniqueInput
    update: XOR<ItemFacturaUpdateWithoutFacturaInput, ItemFacturaUncheckedUpdateWithoutFacturaInput>
    create: XOR<ItemFacturaCreateWithoutFacturaInput, ItemFacturaUncheckedCreateWithoutFacturaInput>
  }

  export type ItemFacturaUpdateWithWhereUniqueWithoutFacturaInput = {
    where: ItemFacturaWhereUniqueInput
    data: XOR<ItemFacturaUpdateWithoutFacturaInput, ItemFacturaUncheckedUpdateWithoutFacturaInput>
  }

  export type ItemFacturaUpdateManyWithWhereWithoutFacturaInput = {
    where: ItemFacturaScalarWhereInput
    data: XOR<ItemFacturaUpdateManyMutationInput, ItemFacturaUncheckedUpdateManyWithoutFacturaInput>
  }

  export type PresupuestoUpsertWithWhereUniqueWithoutFacturaInput = {
    where: PresupuestoWhereUniqueInput
    update: XOR<PresupuestoUpdateWithoutFacturaInput, PresupuestoUncheckedUpdateWithoutFacturaInput>
    create: XOR<PresupuestoCreateWithoutFacturaInput, PresupuestoUncheckedCreateWithoutFacturaInput>
  }

  export type PresupuestoUpdateWithWhereUniqueWithoutFacturaInput = {
    where: PresupuestoWhereUniqueInput
    data: XOR<PresupuestoUpdateWithoutFacturaInput, PresupuestoUncheckedUpdateWithoutFacturaInput>
  }

  export type PresupuestoUpdateManyWithWhereWithoutFacturaInput = {
    where: PresupuestoScalarWhereInput
    data: XOR<PresupuestoUpdateManyMutationInput, PresupuestoUncheckedUpdateManyWithoutFacturaInput>
  }

  export type FacturaCreateWithoutItemsInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaVencimiento: Date | string
    estado?: $Enums.EstadoFactura
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    cliente: ClienteCreateNestedOneWithoutFacturasInput
    presupuestos?: PresupuestoCreateNestedManyWithoutFacturaInput
  }

  export type FacturaUncheckedCreateWithoutItemsInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaVencimiento: Date | string
    clienteId: string
    estado?: $Enums.EstadoFactura
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
    presupuestos?: PresupuestoUncheckedCreateNestedManyWithoutFacturaInput
  }

  export type FacturaCreateOrConnectWithoutItemsInput = {
    where: FacturaWhereUniqueInput
    create: XOR<FacturaCreateWithoutItemsInput, FacturaUncheckedCreateWithoutItemsInput>
  }

  export type ProductoCreateWithoutItemsFacturaInput = {
    id?: string
    nombre: string
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marca?: MarcaCreateNestedOneWithoutProductosInput
    categoria: CategoriaCreateNestedOneWithoutProductosInput
    itemsPresupuesto?: ItemPresupuestoCreateNestedManyWithoutProductoInput
    equipoItems?: EquipoItemCreateNestedManyWithoutProductoInput
  }

  export type ProductoUncheckedCreateWithoutItemsFacturaInput = {
    id?: string
    nombre: string
    marcaId?: string | null
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    categoriaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    itemsPresupuesto?: ItemPresupuestoUncheckedCreateNestedManyWithoutProductoInput
    equipoItems?: EquipoItemUncheckedCreateNestedManyWithoutProductoInput
  }

  export type ProductoCreateOrConnectWithoutItemsFacturaInput = {
    where: ProductoWhereUniqueInput
    create: XOR<ProductoCreateWithoutItemsFacturaInput, ProductoUncheckedCreateWithoutItemsFacturaInput>
  }

  export type FacturaUpsertWithoutItemsInput = {
    update: XOR<FacturaUpdateWithoutItemsInput, FacturaUncheckedUpdateWithoutItemsInput>
    create: XOR<FacturaCreateWithoutItemsInput, FacturaUncheckedCreateWithoutItemsInput>
    where?: FacturaWhereInput
  }

  export type FacturaUpdateToOneWithWhereWithoutItemsInput = {
    where?: FacturaWhereInput
    data: XOR<FacturaUpdateWithoutItemsInput, FacturaUncheckedUpdateWithoutItemsInput>
  }

  export type FacturaUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneRequiredWithoutFacturasNestedInput
    presupuestos?: PresupuestoUpdateManyWithoutFacturaNestedInput
  }

  export type FacturaUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    clienteId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presupuestos?: PresupuestoUncheckedUpdateManyWithoutFacturaNestedInput
  }

  export type ProductoUpsertWithoutItemsFacturaInput = {
    update: XOR<ProductoUpdateWithoutItemsFacturaInput, ProductoUncheckedUpdateWithoutItemsFacturaInput>
    create: XOR<ProductoCreateWithoutItemsFacturaInput, ProductoUncheckedCreateWithoutItemsFacturaInput>
    where?: ProductoWhereInput
  }

  export type ProductoUpdateToOneWithWhereWithoutItemsFacturaInput = {
    where?: ProductoWhereInput
    data: XOR<ProductoUpdateWithoutItemsFacturaInput, ProductoUncheckedUpdateWithoutItemsFacturaInput>
  }

  export type ProductoUpdateWithoutItemsFacturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marca?: MarcaUpdateOneWithoutProductosNestedInput
    categoria?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    itemsPresupuesto?: ItemPresupuestoUpdateManyWithoutProductoNestedInput
    equipoItems?: EquipoItemUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutItemsFacturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    marcaId?: NullableStringFieldUpdateOperationsInput | string | null
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    categoriaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsPresupuesto?: ItemPresupuestoUncheckedUpdateManyWithoutProductoNestedInput
    equipoItems?: EquipoItemUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoCreateManyCategoriaInput = {
    id?: string
    nombre: string
    marcaId?: string | null
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductoUpdateWithoutCategoriaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marca?: MarcaUpdateOneWithoutProductosNestedInput
    itemsPresupuesto?: ItemPresupuestoUpdateManyWithoutProductoNestedInput
    itemsFactura?: ItemFacturaUpdateManyWithoutProductoNestedInput
    equipoItems?: EquipoItemUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutCategoriaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    marcaId?: NullableStringFieldUpdateOperationsInput | string | null
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsPresupuesto?: ItemPresupuestoUncheckedUpdateManyWithoutProductoNestedInput
    itemsFactura?: ItemFacturaUncheckedUpdateManyWithoutProductoNestedInput
    equipoItems?: EquipoItemUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateManyWithoutCategoriaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    marcaId?: NullableStringFieldUpdateOperationsInput | string | null
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductoCreateManyMarcaInput = {
    id?: string
    nombre: string
    modelo?: string | null
    descripcion?: string | null
    stock?: number
    precio: number
    precioCompra?: number | null
    precioAlquiler?: number | null
    categoriaId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductoUpdateWithoutMarcaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoria?: CategoriaUpdateOneRequiredWithoutProductosNestedInput
    itemsPresupuesto?: ItemPresupuestoUpdateManyWithoutProductoNestedInput
    itemsFactura?: ItemFacturaUpdateManyWithoutProductoNestedInput
    equipoItems?: EquipoItemUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateWithoutMarcaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    categoriaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    itemsPresupuesto?: ItemPresupuestoUncheckedUpdateManyWithoutProductoNestedInput
    itemsFactura?: ItemFacturaUncheckedUpdateManyWithoutProductoNestedInput
    equipoItems?: EquipoItemUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type ProductoUncheckedUpdateManyWithoutMarcaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    modelo?: NullableStringFieldUpdateOperationsInput | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    precio?: FloatFieldUpdateOperationsInput | number
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    precioAlquiler?: NullableFloatFieldUpdateOperationsInput | number | null
    categoriaId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresupuestoCreateManyProductoInput = {
    id?: string
    presupuestoId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemFacturaCreateManyProductoInput = {
    id?: string
    facturaId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EquipoItemCreateManyProductoInput = {
    id?: string
    numeroSerie?: string | null
    notasInternas?: string | null
    estado?: $Enums.EstadoEquipo
    fechaCompra?: Date | string | null
    precioCompra?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresupuestoUpdateWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    presupuesto?: PresupuestoUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ItemPresupuestoUncheckedUpdateWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    presupuestoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresupuestoUncheckedUpdateManyWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    presupuestoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemFacturaUpdateWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    factura?: FacturaUpdateOneRequiredWithoutItemsNestedInput
  }

  export type ItemFacturaUncheckedUpdateWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    facturaId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemFacturaUncheckedUpdateManyWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    facturaId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipoItemUpdateWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroSerie?: NullableStringFieldUpdateOperationsInput | string | null
    notasInternas?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoEquipoFieldUpdateOperationsInput | $Enums.EstadoEquipo
    fechaCompra?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipoItemUncheckedUpdateWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroSerie?: NullableStringFieldUpdateOperationsInput | string | null
    notasInternas?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoEquipoFieldUpdateOperationsInput | $Enums.EstadoEquipo
    fechaCompra?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipoItemUncheckedUpdateManyWithoutProductoInput = {
    id?: StringFieldUpdateOperationsInput | string
    numeroSerie?: NullableStringFieldUpdateOperationsInput | string | null
    notasInternas?: NullableStringFieldUpdateOperationsInput | string | null
    estado?: EnumEstadoEquipoFieldUpdateOperationsInput | $Enums.EstadoEquipo
    fechaCompra?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    precioCompra?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresupuestoCreateManyClienteInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    facturaId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FacturaCreateManyClienteInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaVencimiento: Date | string
    estado?: $Enums.EstadoFactura
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PresupuestoUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemPresupuestoUpdateManyWithoutPresupuestoNestedInput
    factura?: FacturaUpdateOneWithoutPresupuestosNestedInput
  }

  export type PresupuestoUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    facturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemPresupuestoUncheckedUpdateManyWithoutPresupuestoNestedInput
  }

  export type PresupuestoUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    facturaId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacturaUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemFacturaUpdateManyWithoutFacturaNestedInput
    presupuestos?: PresupuestoUpdateManyWithoutFacturaNestedInput
  }

  export type FacturaUncheckedUpdateWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemFacturaUncheckedUpdateManyWithoutFacturaNestedInput
    presupuestos?: PresupuestoUncheckedUpdateManyWithoutFacturaNestedInput
  }

  export type FacturaUncheckedUpdateManyWithoutClienteInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaVencimiento?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoFacturaFieldUpdateOperationsInput | $Enums.EstadoFactura
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresupuestoCreateManyPresupuestoInput = {
    id?: string
    productoId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemPresupuestoUpdateWithoutPresupuestoInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutItemsPresupuestoNestedInput
  }

  export type ItemPresupuestoUncheckedUpdateWithoutPresupuestoInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemPresupuestoUncheckedUpdateManyWithoutPresupuestoInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemFacturaCreateManyFacturaInput = {
    id?: string
    productoId: string
    cantidad: number
    precioUnitario: number
    descuento?: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PresupuestoCreateManyFacturaInput = {
    id?: string
    numero: string
    fecha?: Date | string
    fechaValidez: Date | string
    clienteId: string
    estado?: $Enums.EstadoPresupuesto
    observaciones?: string | null
    subtotal: number
    iva: number
    total: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemFacturaUpdateWithoutFacturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: ProductoUpdateOneRequiredWithoutItemsFacturaNestedInput
  }

  export type ItemFacturaUncheckedUpdateWithoutFacturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemFacturaUncheckedUpdateManyWithoutFacturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    productoId?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precioUnitario?: FloatFieldUpdateOperationsInput | number
    descuento?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PresupuestoUpdateWithoutFacturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cliente?: ClienteUpdateOneRequiredWithoutPresupuestosNestedInput
    items?: ItemPresupuestoUpdateManyWithoutPresupuestoNestedInput
  }

  export type PresupuestoUncheckedUpdateWithoutFacturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    clienteId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: ItemPresupuestoUncheckedUpdateManyWithoutPresupuestoNestedInput
  }

  export type PresupuestoUncheckedUpdateManyWithoutFacturaInput = {
    id?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaValidez?: DateTimeFieldUpdateOperationsInput | Date | string
    clienteId?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstadoPresupuestoFieldUpdateOperationsInput | $Enums.EstadoPresupuesto
    observaciones?: NullableStringFieldUpdateOperationsInput | string | null
    subtotal?: FloatFieldUpdateOperationsInput | number
    iva?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}