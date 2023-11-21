// Importa el módulo fs para trabajar con el sistema de archivos.
import fs from "fs";

// Obtiene la ruta del archivo de los argumentos de la línea de comandos.
const ruta = process.argv[2];

// Función contarLineas: Cuenta las líneas de un archivo de texto.
const contarLineas = (ruta: string) => {
  return new Promise((resolve, reject) => {
    // Verifica si se ha proporcionado una ruta válida.
    if (!ruta) {
      reject(new Error(`Error al leer la ruta`));
      return;
    }

    // Lee el archivo de manera asíncrona.
    fs.readFile(ruta, "utf8", (error: NodeJS.ErrnoException | null, data: string) => {
      if (error) {
        // Maneja los errores de lectura del archivo.
        reject(new Error(`Error al leer el archivo: ${error.message}`));
        return;
      }

      // Verifica si el archivo está vacío.
      if (data.length === 0) {
        resolve(0);
        return;
      }

      // Cuenta el número de líneas en el archivo.
      const numLineas = data.split("\n").length - 1;
      resolve(numLineas);
    });
  });
};

// Ejecuta contarLineas y maneja los resultados o errores.
contarLineas(ruta)
  .then((numLineas) => {
    console.log(numLineas); // Imprime el número de líneas del archivo.
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`); // Imprime el error si ocurre.
  });

export default contarLineas;

/*
- fs.readFile: Función asíncrona de fs para leer el contenido de un archivo. 
  Lee el archivo de forma no bloqueante, permitiendo que el proceso de Node.js continúe con otras tareas.
  - El primer argumento 'ruta' especifica la ruta del archivo a leer.
  - El segundo argumento "utf8" indica la codificación del archivo; al usar "utf8", el contenido se lee como texto. Sin "utf8", Node devuelve un Buffer, una secuencia de bytes que requiere conversión para texto.
  - El tercer argumento es una función de callback que se ejecuta al completar la lectura del archivo, con dos parámetros: error y data.

- process.argv: Array que contiene los argumentos de la línea de comandos.
  - process.argv[2]: Especifica la ruta del archivo que se va a leer.

- Promise: Utilizada para manejar operaciones asíncronas. La promesa se resuelve con el número de líneas del archivo o se rechaza con un error.

- data.split("\n"): Divide el contenido del archivo en un array de líneas usando el salto de línea (\n) como separador.
  - .length - 1: Calcula el número de líneas en el archivo, restando 1 para ajustar por el último salto de línea.

- Manejo de Errores: Dentro de la función de callback, se verifica si hay un error y se maneja adecuadamente.
  - Si se encuentra un error, se rechaza la promesa con un mensaje de error.
  - Si no hay error, se procesa el contenido del archivo para contar las líneas.
*/
