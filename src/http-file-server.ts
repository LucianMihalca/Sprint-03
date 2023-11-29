// Importar los módulos necesarios.
import http from "http";
import fs from "fs";
import "dotenv/config"; // 1. Importa configuraciones de variables de entorno.

// Función para crear el servidor HTTP.
// Esta función establece un servidor que responde con el contenido de un archivo especificado.
export const createHttpServer = (filePath: string) => {
  return http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    // Configurar las cabeceras de la respuesta HTTP como texto plano.
    res.writeHead(200, { "content-type": "text/plain" });

    // Crear un stream de lectura para el archivo especificado.
    const fileStream = fs.createReadStream(filePath);

    // Manejar errores durante la lectura del archivo.
    fileStream.on("error", (err) => {
      console.error(`Error al leer el archivo: ${err.message}`);
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("Error interno del servidor");
    });

    // Enviar el contenido del archivo a la respuesta HTTP.
    fileStream.pipe(res);
  });
};

// Función para obtener y validar el puerto del servidor.
// Si el puerto no es válido, el script terminará con un error.
export const getValidatedPort = (portArg: string): number => {
  const portNumber = parseInt(portArg);
  if (!portArg || isNaN(portNumber) || portNumber < 1024 || portNumber > 65535) {
    console.error("Por favor, proporciona un número de puerto válido entre 1024 y 65535.");
    // process.exit(1);
  }
  return portNumber;
};

// Obtener y validar el puerto del servidor de los argumentos de línea de comandos.
const portArg = process.argv[2];
const serverPort = getValidatedPort(portArg);

// Obtener la ruta del archivo de los argumentos de línea de comandos.

const filePath = process.argv[3];

// Crear y configurar el servidor para que escuche en el puerto proporcionado.
const createServer = createHttpServer(filePath);
createServer.listen(serverPort, () => {
  console.log(`Servidor escuchando en el puerto ${serverPort}`);
});
// .on("error", (err) => {
//   console.error(`Error al iniciar el servidor: ${err.message}`);
// });

// Descripción general del script:
// - Se importan los módulos 'http' y 'fs' de Node.js para la creación del servidor y manejo de archivos.
// - Se define 'createHttpServer' para configurar y crear un servidor HTTP que sirve un archivo.
// - El servidor responde a todas las solicitudes con el contenido del archivo especificado.
// - Se define 'getValidatedPort' para validar el puerto proporcionado y terminar el script si no es válido.
// - El servidor se inicia y escucha en el puerto validado, manejando errores de inicio.
