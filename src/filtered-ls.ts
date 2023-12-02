// Importando módulos necesarios de Node.js.
import fs from "fs";        // Módulo para trabajar con el sistema de archivos.
import path from "path";    // Módulo para manejar rutas de archivos y directorios.
import util from "util";    // Módulo para utilidades generales de Node.js.

// Convirtiendo métodos fs.access y fs.readdir en versiones que retornan promesas.
const access = util.promisify(fs.access);
const readdir = util.promisify(fs.readdir);

// Función asíncrona para validar la existencia y accesibilidad de un directorio y la presencia de una extensión.
export async function validarEntradas(directorio: string, extension: string) {
  if (!directorio || !extension) {
    console.error(`Error: Se requiere un directorio y una extensión de archivo.`);
    return false;
  }

  try {
    await access(directorio, fs.constants.R_OK); // Comprueba si el directorio es accesible.
    return true;
  } catch (error) {
    console.error(`Error: El directorio "${directorio}" no existe o no es accesible.`);
    return false;
  }
}

// Función asíncrona para filtrar archivos en un directorio basándose en su extensión.
export async function filtrarArchivos(directorio: string, extension: string) {
  try {
    const archivos = await readdir(directorio); // Lee el directorio y obtiene una lista de archivos.
    const extensionConPunto = "." + extension;  // Prepara la extensión para la comparación.
    // Filtra y retorna archivos que coincidan con la extensión proporcionada.
    return archivos.filter((archivo: string) => path.extname(archivo) === extensionConPunto);
  } catch (error) {
    throw new Error("Error al leer el directorio"); // Lanza un error si la lectura del directorio falla.
  }
}

// Función principal que coordina la validación de entradas y el filtrado de archivos.
export async function main() {
  const directorio = process.argv[2]; // Obtiene el directorio desde argumentos de línea de comandos.
  const extension = process.argv[3]; // Obtiene la extensión desde argumentos de línea de comandos.

  try {
    const esValido = await validarEntradas(directorio, extension); // Valida entradas.
    if (!esValido) {
      console.error("Error en el script:", Error); // Registra un error si las entradas no son válidas.
      return;
    }

    const archivosFiltrados = await filtrarArchivos(directorio, extension); // Filtra archivos.
    archivosFiltrados.forEach((archivo: string) => console.log(archivo)); // Imprime los archivos filtrados.
  } catch (error) {
    console.error("Error en el script:", error); // Maneja errores generales.
    process.exit(1); // Termina el proceso con un código de error.
  }
}

// Ejecuta la función principal y maneja errores no capturados.
main().catch((error) => {
  console.error("Error en el script:", error); // Maneja errores no capturados en main.
  process.exit(1); // Termina el proceso con un código de error.
});


/*
Resumen y Conclusión del Script:

1. Importación de Módulos: 
   - Se importan los módulos 'fs' para operaciones de sistema de archivos, 'path' para manipulación de rutas de archivos, 
     y 'util' para herramientas adicionales de Node.js.

2. Promisificación de Funciones:
   - Las funciones 'fs.access' y 'fs.readdir' se promisifican para permitir un manejo más sencillo de operaciones asíncronas mediante async/await.

3. Función 'validarEntradas':
   - Valida que se hayan proporcionado un directorio y una extensión de archivo.
   - Comprueba si el directorio proporcionado es accesible, devolviendo true si lo es, y false en caso contrario.

4. Función 'filtrarArchivos':
   - Filtra los archivos dentro del directorio especificado, retornando aquellos que coinciden con la extensión dada.
   - Utiliza 'path.extname' para comparar las extensiones de archivo.

5. Función Principal 'main':
   - Coordina la ejecución del script. Procesa los argumentos de línea de comandos, invoca a 'validarEntradas', y si es exitoso, procede a 'filtrarArchivos'.
   - Imprime en consola los nombres de los archivos filtrados.
   - Maneja los errores capturados y no capturados, terminando el proceso con un código de salida en caso de error.

Conclusión:
Este script es una herramienta de línea de comandos en Node.js diseñada para filtrar archivos en un directorio basándose en su extensión. 
Es un ejemplo práctico de cómo manejar operaciones de archivos de manera asíncrona en Node.js, 
integrando conceptos como promesas, async/await, y manejo de errores. 
Su uso es ideal para situaciones donde se necesita procesar listas de archivos y realizar acciones basadas en sus tipos,
como en sistemas de automatización, scripts de utilidad, y tareas de mantenimiento de archivos.
*/