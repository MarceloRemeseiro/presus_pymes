import bcrypt from 'bcryptjs';
import readline from 'readline';

// Función para hashear la contraseña, similar a la de authUtils.ts
// La copiamos aquí para evitar problemas con la ejecución de TS directamente con Node
// o configuraciones complejas de importación para un script simple.
async function hashPasswordForScript(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Ingresa la contraseña a hashear: ', async (password) => {
  if (!password) {
    console.error('No se ingresó ninguna contraseña.');
    rl.close();
    process.exit(1);
  }

  try {
    const hashedPassword = await hashPasswordForScript(password);
    console.log('\nContraseña hasheada:');
    console.log(hashedPassword);
    console.log('\nCopia este hash y pégalo en el campo \'hashedPassword\' de tu usuario en la base de datos (ej. usando Prisma Studio).');
  } catch (error) {
    console.error('Error al hashear la contraseña:', error);
  } finally {
    rl.close();
  }
});

rl.on('close', () => {
  process.exit(0);
}); 