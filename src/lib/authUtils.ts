import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import * as jose from 'jose';

const jwtSecretFromEnv = process.env.JWT_SECRET;

if (!jwtSecretFromEnv) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in environment variables.');
  // En un entorno real, podrías querer que la aplicación no se inicie o maneje esto de forma más robusta.
  // Por ahora, lanzaremos un error para detener la ejecución si no está definida.
  throw new Error('JWT_SECRET is not defined. Please set it in your .env file.');
}

const JWT_SECRET_UINT8ARRAY = new TextEncoder().encode(jwtSecretFromEnv);
const JWT_SECRET_STRING: string = jwtSecretFromEnv;

/**
 * Convierte un string de duración (ej: "1d", "2h", "30m") a segundos.
 * @param durationString El string de duración.
 * @returns La duración en segundos, o undefined si el string no es válido.
 */
function parseDurationToSeconds(durationString: string): number | undefined {
  const match = durationString.match(/^(\d+)([smhd])$/);
  if (!match) return undefined;

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 60 * 60;
    case 'd': return value * 24 * 60 * 60;
    default: return undefined;
  }
}

/**
 * Hashea una contraseña.
 * @param password La contraseña en texto plano.
 * @returns El hash de la contraseña.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compara una contraseña en texto plano con un hash.
 * @param password La contraseña en texto plano.
 * @param hashedPassword El hash de la contraseña almacenado.
 * @returns True si las contraseñas coinciden, false en caso contrario.
 */
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Genera un JSON Web Token (JWT) usando 'jsonwebtoken'.
 * Esta función se usará en el lado del servidor (API routes, Node.js runtime).
 */
export function generateToken(payload: object, expiresInDuration: string = '1d'): string {
  const expiresInSeconds = parseDurationToSeconds(expiresInDuration);

  if (expiresInSeconds === undefined) {
    console.warn(`Invalid duration string: "${expiresInDuration}". Defaulting to 1 day.`);
    const fallbackSeconds = 24 * 60 * 60;
    return jwt.sign(payload, JWT_SECRET_STRING, { expiresIn: fallbackSeconds });
  }

  const options: SignOptions = {
    expiresIn: expiresInSeconds,
  };
  return jwt.sign(payload, JWT_SECRET_STRING, options);
}

/**
 * Verifica y decodifica un JWT usando 'jose'.
 * Esta función está diseñada para ser compatible con el Edge Runtime.
 * @param token El JWT a verificar.
 * @returns El payload decodificado si el token es válido, o null si no lo es.
 */
export async function verifyTokenEdge(token: string): Promise<Record<string, any> | null> {
  if (!token) return null;
  try {
    const { payload } = await jose.jwtVerify(
      token, 
      JWT_SECRET_UINT8ARRAY, 
      // Puedes especificar algoritmos esperados si quieres ser más estricto
      // algorithms: ['HS256'] 
    );
    return payload as Record<string, any>;
  } catch (error) {
    // Loguear el error específico para depuración
    if (error instanceof Error && error.name === 'JWSSignatureVerificationFailed') {
      console.warn("Edge JWT Verification Error: Signature verification failed");
    } else if (error instanceof Error && error.name === 'JWTExpired') {
      console.warn("Edge JWT Verification Error: Token has expired");
    } else {
      console.error("An unexpected error occurred during Edge token verification:", error);
    }
    return null;
  }
} 