// Importaciones necesarias: IncomingMessage para tipar las respuestas HTTP y el módulo http.
import { IncomingMessage } from "http";
const http = require("http");

// Función makeHttpRequest: Realiza peticiones HTTP y devuelve una promesa con los datos como texto.
const makeHttpRequest = async (url: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    // Realiza una petición HTTP GET al URL proporcionado.
    http
      .get(url, (res: IncomingMessage) => {
        res.setEncoding("utf8"); // Configura la codificación de caracteres a UTF-8.

        let data = ""; // Almacena los datos recibidos.

        // Evento 'data': se dispara cuando se reciben datos de la respuesta.
        res.on("data", (chunk: string) => {
          data += chunk; // Acumula cada fragmento de datos.
        });

        // Evento 'end': se activa cuando se completa la recepción de todos los datos.
        res.on("end", () => {
          resolve(data); // Resuelve la promesa con los datos acumulados.
        });

        // Maneja errores en la respuesta.
        res.on("error", (err: Error) => {
          reject(err); // Rechaza la promesa en caso de error.
        });
      })
      // Maneja errores en la petición.
      .on("error", (err: Error) => {
        reject(err); // Rechaza la promesa en caso de error en la petición.
      });
  });
};

// Función main: Realiza peticiones HTTP a múltiples URLs y maneja las respuestas.
const main = async () => {
  try {
    // Obtiene URLs de los argumentos de la línea de comandos.
    const urls = [process.argv[2], process.argv[3], process.argv[4]];

    // Realiza las solicitudes HTTP y espera todas las respuestas.
    const results = await Promise.all(urls.map((url) => makeHttpRequest(url)));

    // Imprime los resultados en el mismo orden de las URLs.
    results.forEach((result) => {
      console.log(result);
    });
  } catch (err) {
    // Maneja y muestra los errores.

    if (err instanceof Error) {
      console.error(`Error: ${err.message}`); // Imprime el mensaje de error.
    } else {
      console.error(`Error desconocido: ${err}`); // Maneja otros tipos de errores.
    }
  }
};

main(); // Ejecuta la función principal.
