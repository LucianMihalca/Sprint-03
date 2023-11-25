import fs from "fs"; // Importa el módulo fs para trabajar con el sistema de archivos.
import path from "path"; // Importa el módulo path para manejar rutas de archivos y directorios.
import util from "util"; // Importa el módulo util para utilidades generales de Node.js.

export { filtrarArchivos, validarEntradas }

// Promisify fs.access para convertirlo en una función que devuelve una promesa
const access = util.promisify(fs.access);

// Función asíncrona para validar las entradas
// Esta función verifica si se han proporcionado los argumentos necesarios (directorio y extensión) y si el directorio existe.
async function validarEntradas(directorio: string, extension: string) {
  // Verifica si se han proporcionado los argumentos necesarios.
  if (!directorio || !extension) {
    console.error(`Error: Se requiere un directorio y una extensión de archivo.`);
    return false;
  }

  // Intenta acceder al directorio para verificar su existencia.
  try {
    await access(directorio, fs.constants.R_OK);
  } catch (error) {
    console.error(`Error: El directorio "${directorio}" no existe o no es accesible.`);
    return false;
  }

  // Retorna true si todas las validaciones son exitosas.
  return true;
}

// Tipo para la función de callback que se usará en filtrarArchivos.
type Callback = (error: NodeJS.ErrnoException | null, data: string[]) => void;

// Función principal que contiene la lógica de negocio.
// Esta función se encarga de leer el contenido de un directorio y filtrar los archivos según la extensión proporcionada.
const filtrarArchivos = (directorio: string, extension: string, callback: Callback) => {
  // Lee el directorio de forma asíncrona.
  fs.readdir(directorio, (error: NodeJS.ErrnoException | null, archivos: string[]) => {
    // En caso de error, lo retorna a través del callback.
    if (error) {
      return callback(error, []);
    }

    // Prepara la extensión para ser comparada (añade un punto al inicio).
    const extensionConPunto = "." + extension;
    // Filtra los archivos que coinciden con la extensión dada.
    const archivosFiltrados = archivos.filter((archivo: string) => path.extname(archivo) === extensionConPunto);
    // Retorna los archivos filtrados a través del callback.
    callback(null, archivosFiltrados);
  });
};

// Función principal del script (punto de entrada).
async function main() {
  // Lee los argumentos de la línea de comandos.
  const directorio = process.argv[2];
  const extension = process.argv[3];

  // Ejecuta la validación de las entradas.
  const esValido = await validarEntradas(directorio, extension);
  if (!esValido) {
    process.exit(1);
  }

  // Llama a filtrarArchivos y maneja la respuesta o error.
  filtrarArchivos(directorio, extension, (error, archivosFiltrados) => {
    if (error) {
      console.error("Error al leer el directorio:", error);
      return;
    }

    // Imprime los archivos filtrados.
    archivosFiltrados.forEach((archivo) => {
      console.log(archivo);
    });
  });
}

// Ejecuta la función principal y maneja posibles errores globales.
main().catch((error) => {
  console.error("Error en el script:", error);
  process.exit(1);
});

/*
Resumen del Script:

1. Función `filtrarArchivos`:
   - Propósito: Filtrar archivos en un directorio dado por su extensión.
   - Reutilizable para diferentes directorios y extensiones.
   - Utiliza operaciones asíncronas para leer el directorio y filtrar los archivos.

2. Función `validarEntradas`:
   - Verifica que se hayan proporcionado los argumentos necesarios (directorio y extensión).
   - Comprueba si el directorio existe de manera asíncrona.
   - Retorna `true` si las validaciones son exitosas, de lo contrario, `false`.

3. Función `main`:
   - Punto de entrada del script. Coordina el flujo general de la aplicación.
   - Secuencia:
     a. Lee los argumentos de la línea de comandos.
     b. Valida los argumentos usando `validarEntradas`.
     c. Si la validación es exitosa, llama a `filtrarArchivos`.
     d. Maneja la respuesta, imprimiendo los archivos filtrados o reportando errores.
   - Emplea `async/await` para un flujo de ejecución lineal y claro, a pesar de las operaciones asíncronas.

Uso:
- El script se puede adaptar fácilmente para filtrar diferentes tipos de archivos en varios directorios, cambiando los argumentos al ejecutarlo.
- Proporciona un ejemplo claro de cómo estructurar un script en Node.js con operaciones asíncronas y manejo de errores.
*/
