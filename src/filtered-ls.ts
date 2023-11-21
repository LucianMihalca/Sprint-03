// Importa el módulo fs para trabajar con el sistema de archivos.
import fs from "fs";

// Importa el módulo path para manejar rutas de archivos y directorios.
import path from "path";

// Obtiene el directorio y la extensión de los argumentos de la línea de comandos.
// process.argv[2]: Aquí estamos accediendo al tercer elemento del array, representa el directorio objetivo (es un string).
const directorio = process.argv[2];
// process.argv[3]: el cuarto elemento del array, representa la extensión de archivo a filtrar (es un string).
const extension = "." + process.argv[3];

// Lee el contenido del directorio de forma asíncrona usando fs.readdir.
fs.readdir(directorio, (error: NodeJS.ErrnoException | null, archivos: string[]) => {
  if (error) {
    console.error("Error al leer el directorio:", error);
    return;
  }

  // Filtra y muestra los archivos que coinciden con la extensión dada.
  archivos.forEach((archivo: string) => {
    if (path.extname(archivo) === extension) {
      console.log(archivo);
    }
  });
});

/*
- readdir() de fs: Lista archivos y subdirectorios en un directorio.
- extname() de path: Extrae extensiones de archivos.

- process: Objeto global en Node.js para información y control del proceso en ejecución.
- process.argv: Array de argumentos de la línea de comandos. 

Ejemplo de uso:
  $ node miScript.js arg1 arg2
  - process.argv[0]: 'node'
  - process.argv[1]: 'miScript.js'
  - process.argv[2]: 'arg1'
  - process.argv[3]: 'arg2'
*/
