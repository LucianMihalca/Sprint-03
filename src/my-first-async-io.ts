// Importa el módulo fs para trabajar con el sistema de archivos.
import fs from "fs";

// Obtiene la ruta del archivo de los argumentos de la línea de comandos.
const ruta = process.argv[2];

const contarLineas = (ruta: string) => {
  return new Promise((resolve, reject) => {
    // Verifica si la ruta del archivo ha sido proporcionada
    // si no se proporciona una ruta o hay algún problema con ella, la función se detiene y no intente leer un archivo inexistente o mal especificado. 
    if (!ruta) {
      reject(`Error al leer la ruta`);
      return;
    }
    fs.readFile(ruta, "utf8", (error: NodeJS.ErrnoException | null, data: string) => {
      if (error) {
        reject(`Error al leer el archivo: ${error}`);
        return;
      }
      // Verifica si el archivo está vacío
      if (data.length === 0) {
        resolve(0);
        return;
      }
      // Cuenta el número de líneas en el archivo y resuelve con el resultado.
      const numLineas = data.split("\n").length - 1;
      resolve(numLineas);
    });
  });
};

// Llama a la función para contar las líneas del archivo.
contarLineas(ruta)
  .then((numLineas) => {
    console.log(numLineas);
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
  });
export default contarLineas;
/*
- fs2.readFile: Función asíncrona del módulo fs para leer el contenido de un archivo. 
  Se ejecuta en segundo plano, permitiendo que otras operaciones continúen.

- process.argv: Array que contiene los argumentos de la línea de comandos.
  - process.argv[0]: Ruta al ejecutable de Node.js.
  - process.argv[1]: Ruta al script en ejecución.
  - process.argv[2]: Ruta al archivo a leer (proporcionado por el usuario).


- data.split("\n"): Divide el contenido del archivo (string) en un array de líneas, 
  utilizando el salto de línea (\n) como separador.
- .length - 1: Calcula el número de líneas. Se resta 1 para ajustar por un posible salto de línea al final del archivo.
*/
