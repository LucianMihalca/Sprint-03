// Importa el módulo fs para trabajar con el sistema de archivos.
const fs2 = require("fs");

// Obtiene la ruta del archivo de los argumentos de la línea de comandos.
const ruta = process.argv[2];

// Lee el contenido del archivo de forma asíncrona.
fs2.readFile(ruta, "utf8", (error: NodeJS.ErrnoException | null, data: string) => {
  if (error) {
    console.error("Error al leer el archivo:", error);
    return;
  }

  // Cuenta el número de líneas en el archivo y muestra el resultado.
  const numLineas = data.split("\n").length - 1;
  console.log(numLineas);
});

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
