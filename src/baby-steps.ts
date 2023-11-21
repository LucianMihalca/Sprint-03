// Importa el módulo process para acceder a los argumentos de la línea de comandos.
const argumentos = process.argv.slice(2); // Obtiene los argumentos de la línea de comandos, excluyendo los dos primeros.

// Función 'suma': Calcula la suma de un array de números representados como cadenas.
export const suma = (numeros: string[]): number => {
  // Utiliza 'reduce' para acumular la suma. 'acc' es el acumulador y 'arg' es el elemento actual.
  return numeros.reduce((acc, arg) => acc + Number(arg), 0);
  // Convierte cada argumento a número con 'Number(arg)' y lo suma al acumulador 'acc'.
};

console.log(suma(argumentos)); // Imprime el resultado de la suma de los argumentos.

/*
- process.argv: Array que contiene los argumentos de la línea de comandos. En Node.js, estos argumentos siempre se proporcionan como strings, independientemente de si representan números, palabras o algo más. 
  - process.argv.slice(2): Omite los dos primeros elementos (ruta de Node.js y ruta del script) para acceder solo a los argumentos proporcionados por el usuario.

- suma: Función que recibe un array de strings (números representados como cadenas), los convierte a números y calcula su suma.
  - Utiliza 'reduce' para iterar sobre cada elemento del array y acumular su suma. En cada iteración, 'Number(arg)' convierte el string 'arg' a un número y lo suma al acumulador 'acc'.
  - Retorna el valor total acumulado.

- El resultado de 'suma(argumentos)' se imprime en la consola, mostrando la suma total de los argumentos numéricos proporcionados por el usuario.
*/
