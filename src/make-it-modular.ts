// Importa la función listarMysArchivos del módulo 'mymodule'.
const listarMysArchivos = require("./mymodule")

// Obtiene el directorio y la extensión de los argumentos de la línea de comandos.
const dir = process.argv[2];
const ext = process.argv[3];

// Llama a listarMysArchivos con el directorio, extensión y una función de callback.
listarMysArchivos(dir, ext, (error: NodeJS.ErrnoException | null, archivos: string[]) => {
  if (error) {
    // Imprime el error en la consola si ocurre alguno durante la operación.
    return console.error("Error al leer el directorio:", error);
  } else {
    // Si no hay error, imprime cada archivo que coincide con la extensión.
    archivos.forEach((archivo: string) => {
      console.log(archivo);
    });
  }
});

/*
- listarMysArchivos: Función importada del módulo 'mymodule' que lista archivos en un directorio 
  basándose en una extensión específica.
- process.argv: Array que contiene los argumentos de la línea de comandos. 
  - process.argv[2]: Ruta del directorio a leer.
  - process.argv[3]: Extensión de archivo para filtrar.

- La función listarMysArchivos se llama con un callback que maneja el resultado:
  - Si hay un error, se imprime en la consola.
  - Si no hay error, se recorren e imprimen los nombres de los archivos filtrados.
*/
