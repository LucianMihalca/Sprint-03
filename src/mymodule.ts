// Importa el módulo fs para trabajar con el sistema de archivos.
const fs3 = require("fs");

// Importa el módulo path para manejar rutas de archivos y directorios.
const path2 = require("path");

// Define un tipo Callback para la función de callback que se utilizará en listarMysArchivos.
// Este Callback es una función que se llama al completar una operación asíncrona.
// - error: Un objeto de error de NodeJS si ocurre un error, o null si no hay errores.
// - data?: Un array opcional de strings, que contiene los nombres de archivo cuando la operación es exitosa.
type Callback = (error: NodeJS.ErrnoException | null, data?: string[]) => void;

// Exporta una función para listar archivos en un directorio que coincidan con una extensión específica.
module.exports = function listarMysArchivos(dir: string, extension: string, callback: Callback): void {
  fs3.readdir(dir, (error: NodeJS.ErrnoException, data: string[]) => {
    if (error) {
      return callback(error);
    }

    // Si no hay error filtra los archivos que tienen la extensión especificada.
    let archivos = data.filter((archivo: string) => {
      return path2.extname(archivo) === "." + extension;
    });

    // Llama al callback con la lista de archivos filtrados.
    callback(null, archivos);
  });
};

/*
- fs3.readdir: Función asíncrona de fs para leer los contenidos de un directorio. 
  Ejecuta el callback proporcionado una vez completada la lectura.

- path2.extname: Método del módulo path que obtiene la extensión de un archivo.

- listarMysArchivos: Función que lee un directorio y filtra archivos por extensión.
  - dir: Ruta del directorio a leer.
  - extension: Extensión de archivo para filtrar.
  - callback: Función de callback que se llama con los archivos filtrados o un error.
*/
