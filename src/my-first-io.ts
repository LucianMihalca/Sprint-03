// Importa el módulo fs para trabajar con el sistema de archivos.
import fs from "fs";

// Función numeroDeLineas: Calcula el número de líneas en un archivo de texto.
const numeroDeLineas = (filename: Buffer|string): number => {
  // Lee el contenido del archivo especificado y lo pasa a String.
  const text = fs.readFileSync(filename).toString();
  // Divide el text en líneas y cuenta su cantidad, restando 1 para el último salto de línea.
  const nrLines = text.split("\n").length - 1;
  return nrLines;
};

// Ejecuta la función numeroDeLineas con el nombre de archivo proporcionado en la línea de comandos.
console.log(numeroDeLineas(process.argv[2]));
export default numeroDeLineas;
/*
- fs.readFileSync: Lee el contenido completo de un archivo de manera síncrona. 
  Esta función bloquea la ejecución del resto del script hasta que se completa la lectura del archivo.
  Al especificar "utf8" como segundo argumento, el archivo se lee como una cadena de texto (string), en lugar de un buffer de datos binarios.

- process.argv[2]: Argumento de la línea de comandos que especifica la ruta del archivo a leer.
  En Node.js, process.argv[0] es la ruta de Node.js y process.argv[1] es la ruta del script actual.

- contenido.split("\n"): Utiliza el método split para dividir el contenido del archivo (string) en un array de líneas, 
  utilizando el carácter de salto de línea (\n) como separador. Esto permite contar las líneas del archivo.

- .length - 1: La longitud del array resultante de split (número de elementos) representa la cantidad de líneas. 
  Se resta 1 porque un archivo de texto típicamente termina con un salto de línea, lo que resultaría en un elemento adicional vacío en el array.

Este script proporciona una manera sencilla y efectiva de contar las líneas de un archivo de texto, mostrando el resultado en la consola.
*/
