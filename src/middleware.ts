import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyTokenEdge } from '@/lib/authUtils'; // Cambiado a verifyTokenEdge

// Lista de rutas que NO requieren autenticación
const PUBLIC_PATHS = [
  '/login', 
  '/api/auth/login', 
  '/api/auth/logout',
  // Puedes añadir aquí otras rutas públicas si las tienes (ej. /api/public-data, /landing-page)
];

// Lista de rutas que son consideradas la "entrada" principal tras el login
// Si un usuario autenticado intenta acceder a /login, será redirigido a una de estas.
const AUTHENTICATED_ENTRY_PATHS = ['/presupuestos']; // Cambia esto a tu ruta principal post-login

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] Path: ${pathname}`);

  const tokenCookie = request.cookies.get('auth_token');
  const token = tokenCookie?.value;
  console.log(`[Middleware] Token en cookie 'auth_token': ${token ? 'Presente' : 'Ausente'}`);

  let userPayload = null;
  if (token) {
    console.log(`[Middleware] Intentando verificar token (Edge) (primeros 20 chars): ${token.substring(0, 20)}...`);
    // Usar la nueva función y await porque es async
    userPayload = await verifyTokenEdge(token); 
    if (userPayload) {
      console.log("[Middleware] Token VERIFICADO (Edge). Payload:", userPayload);
    } else {
      console.log("[Middleware] Token INVÁLIDO o expirado según verifyTokenEdge. Limpiando cookie y redirigiendo a login.");
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('auth_token', '', { maxAge: 0, path: '/' });
      return response;
    }
  }

  const isAuthenticated = !!userPayload;
  console.log(`[Middleware] isAuthenticated: ${isAuthenticated}`);

  // Redirigir a la app si está autenticado e intenta acceder a /login
  if (isAuthenticated && pathname === '/login') {
    console.log("[Middleware] Usuario autenticado intentando acceder a /login. Redirigiendo a", AUTHENTICATED_ENTRY_PATHS[0]);
    return NextResponse.redirect(new URL(AUTHENTICATED_ENTRY_PATHS[0], request.url));
  }

  // Permitir acceso a rutas públicas y rutas de Next.js (ej. _next, archivos estáticos)
  const isPublicOrAsset = PUBLIC_PATHS.includes(pathname) || 
    pathname.startsWith('/_next/') || 
    pathname.startsWith('/static/') || 
    pathname.includes('.'); // Asume que rutas con punto son archivos (ej. favicon.ico, manifest.json)

  if (isPublicOrAsset) {
    console.log(`[Middleware] Ruta pública o asset (${pathname}). Permitiendo acceso.`);
    return NextResponse.next();
  }

  // Si no está autenticado y la ruta no es pública, redirigir a login
  if (!isAuthenticated) {
    console.log("[Middleware] Usuario NO autenticado para ruta protegida. Redirigiendo a /login.");
    let loginUrl = new URL('/login', request.url);
    // Opcional: añadir la URL original como parámetro para redirigir de vuelta después del login
    // loginUrl.searchParams.set('redirect_to', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si está autenticado y la ruta no es pública, permitir acceso
  // Aquí podrías añadir lógica de roles/permisos si el userPayload contiene esa info
  console.log(`[Middleware] Ruta protegida: ${pathname}`);
  console.log("[Middleware] Usuario autenticado. Permitiendo acceso a ruta protegida: ${pathname}.");
  return NextResponse.next();
}

// Configuración del Matcher: especifica en qué rutas se ejecutará el middleware.
// Esto es más eficiente que ejecutarlo en todas las rutas y luego filtrar por pathname.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Esto es una recomendación general. Ajusta según necesites.
     * Queremos que el middleware se ejecute en las páginas de la app y en /login, 
     * pero no necesariamente en todas las rutas de API (excepto las de auth que ya están en PUBLIC_PATHS).
     * Por ahora, para simplificar y asegurar que todas las páginas estén cubiertas, lo aplicaremos a más rutas
     * y filtraremos dentro del middleware. Una configuración más precisa podría ser:
     * /((?!api|_next/static|_next/image|favicon.ico).*)   -- Negativo lookahead para excluir patrones
     */
    '/:path*', // Aplica a todas las rutas, filtramos dentro del middleware
    //  Si quieres ser más específico, por ejemplo, para todas las rutas excepto /api:
    // '/((?!api/).*)'
  ],
}; 