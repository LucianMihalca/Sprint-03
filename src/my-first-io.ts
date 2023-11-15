const fs = require("fs");

const text: Buffer = fs.readFileSync(process.argv[2]);
const filas: number = text.toString().split("\n").length - 1;

console.log(filas);


/*
1. --> const fs = require("fs");

require("fs"): Esta es una función de Node.js que importa un módulo. 
En este caso, se importa el módulo fs, que es el módulo de sistema de archivos de Node.js. 
Este módulo proporciona funciones para trabajar con archivos y directorios.

2. --> const text = fs.readFileSync(process.argv[2]);

fs.readFileSync: Es una función del módulo fs que lee el contenido de un archivo de manera síncrona (es decir, el flujo de ejecución se detiene hasta que se completa la lectura del archivo).
process.argv[2]: Aquí estamos accediendo al tercer elemento del array process.argv, que contiene los argumentos pasados desde la línea de comandos. 
En este caso, process.argv[2] sería la ruta al archivo que quieres leer. 
Este valor se pasa como argumento a fs.readFileSync para especificar qué archivo debe leer.

3. --> const filas = text.toString().split("\n").length - 1;

text.toString(): 
Convierte el contenido del archivo (originalmente leído como un Buffer) a una cadena de texto (string).

.split("\n"): Divide la cadena de texto en un array, 
utilizando el carácter de salto de línea (\n) como separador. 
Esto significa que cada elemento del array es una línea del archivo.

.length: Obtiene la longitud del array, que corresponde al número de elementos (líneas) en él.
- 1: Se resta 1 porque generalmente un archivo de texto termina con un salto de línea, 
lo que resultaría en una línea vacía adicional al final del array. 
Restando 1, se ajusta el conteo al número de líneas de texto reales en el archivo.
console.log(filas);

En resumen, este script lee un archivo de texto (cuya ruta se pasa como argumento en la línea de comandos), cuenta cuántas líneas tiene y muestra este número en la consola.

*/