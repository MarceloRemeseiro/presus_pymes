import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Asegúrate que la ruta a tu cliente Prisma sea correcta
import { comparePasswords, generateToken } from '@/lib/authUtils';
import { z } from 'zod';

// Esquema de validación para los datos de login
const LoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = LoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Datos de entrada inválidos", errors: validation.error.flatten().fieldErrors }, 
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Credenciales incorrectas" }, 
        { status: 401 }
      );
    }

    const passwordsMatch = await comparePasswords(password, user.hashedPassword);

    if (!passwordsMatch) {
      return NextResponse.json(
        { message: "Credenciales incorrectas" }, 
        { status: 401 }
      );
    }

    // Generar el token JWT
    // Puedes incluir más datos en el payload si es necesario, pero mantenlo ligero.
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      // name: user.name, // Opcional, si lo necesitas en el cliente sin otra consulta
    };
    const token = generateToken(tokenPayload, '1d'); // Token expira en 1 día

    // Crear la respuesta y establecer la cookie
    const response = NextResponse.json(
      {
        message: "Login exitoso",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        // No devolvemos el token directamente en el cuerpo si lo ponemos en una cookie HttpOnly
        // token, // Opcional: podrías devolverlo si tu frontend lo necesita directamente
      },
      { status: 200 }
    );

    // Establecer la cookie con el token
    // httpOnly: true -> La cookie no es accesible por JavaScript del lado del cliente (más seguro)
    // secure: process.env.NODE_ENV === 'production' -> Enviar solo sobre HTTPS en producción
    // path: '/' -> Disponible en todo el sitio
    // sameSite: 'lax' -> Protección contra CSRF
    // maxAge: 60 * 60 * 24 -> 1 día (coincide con la expiración del token)
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 día en segundos
    });

    return response;

  } catch (error) {
    console.error("[LOGIN_API_ERROR]", error);
    // Evitar exponer detalles del error en producción
    let errorMessage = "Error interno del servidor";
    if (error instanceof Error && process.env.NODE_ENV !== 'production') {
        // errorMessage = error.message; // Solo en desarrollo podrías querer ver el mensaje original
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 