// Obtiene los argumentos de la línea de comandos, excluyendo los dos primeros que son la ruta de node y la ruta del script.
const numeros = process.argv.slice(2);

// Convertir a numero
const suma = numeros.reduce((acc, num) => acc + Number(num), 0);

console.log(suma);
