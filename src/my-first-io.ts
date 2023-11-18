// Importa el módulo fs para trabajar con el sistema de archivos.
const fs = require("fs");

// Lee el contenido del archivo especificado en la línea de comandos como una cadena de texto.
const contenido: string = fs.readFileSync(process.argv[2], "utf8");

// Cuenta las líneas del archivo y las muestra en la consola.
const numeroDeLineas: number = contenido.split("\n").length - 1;
console.log(numeroDeLineas);

/*
- fs.readFileSync: Función que lee el contenido de un archivo de manera síncrona, 
  bloqueando la ejecución hasta que se completa la lectura. 
  Al especificar "utf8" como segundo argumento, el contenido se lee directamente como una cadena de texto.

- process.argv[2]: Argumento de la línea de comandos que especifica la ruta del archivo a leer.

- contenido.split("\n"): Utiliza el método split para dividir la cadena de texto en un array de líneas, 
  usando el carácter de salto de línea (\n) como separador.

- .length - 1: Calcula el número de líneas en el archivo. Se resta 1 para ajustar por un posible salto de línea al final del archivo, 
  evitando contar una línea vacía final.

Este script lee un archivo de texto (ruta especificada en process.argv[2]), cuenta sus líneas, y muestra este número en la consola.
*/
