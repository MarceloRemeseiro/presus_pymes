import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Crear una respuesta para poder manipular las cookies
    const response = NextResponse.json(
      { message: "Logout exitoso" }, 
      { status: 200 }
    );

    // Eliminar la cookie estableciendo maxAge a 0 (o una fecha de expiración pasada)
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 0, // Indica al navegador que la elimine inmediatamente
    });

    return response;

  } catch (error) {
    console.error("[LOGOUT_API_ERROR]", error);
    // Evitar exponer detalles del error en producción
    let errorMessage = "Error interno del servidor al intentar cerrar sesión";
    if (error instanceof Error && process.env.NODE_ENV !== 'production') {
        // errorMessage = error.message; // Solo en desarrollo podrías querer ver el mensaje original
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 