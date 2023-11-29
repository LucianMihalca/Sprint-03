// Importa el módulo process para acceder a los argumentos de la línea de comandos.
const argumentos = process.argv.slice(2); // Omite los dos primeros elementos para obtener solo los argumentos del usuario.

// Función 'suma': Calcula la suma de un array de números representados como cadenas.
export const suma = (numeros: string[]): number => {
  // Utiliza 'reduce' para acumular la suma, iniciando con un acumulador de valor 0.
  return numeros.reduce((acc, arg) => acc + Number(arg), 0);
  // 'Number(arg)' convierte cada argumento de cadena a número y lo suma al acumulador 'acc'.
};

console.log(suma(argumentos)); // Imprime el resultado de la suma de los argumentos numéricos.

/*
- process.argv: Array que contiene los argumentos de la línea de comandos en Node.js, siempre como strings.
  - process.argv.slice(2): Omite la ruta de Node.js y la ruta del script, accediendo solo a los argumentos del usuario.

- suma: Función de TypeScript que recibe un array de strings, representando números, y calcula su suma.
  - Emplea 'reduce' para iterar sobre cada elemento, convirtiéndolos a números y acumulando su suma. Inicia el acumulador 'acc' en 0.
  - Retorna el total acumulado.

- El resultado de 'suma(argumentos)' se muestra en la consola, representando la suma total de los argumentos numéricos dados por el usuario.
*/
