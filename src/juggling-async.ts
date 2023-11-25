// Importaciones necesarias: IncomingMessage para tipar las respuestas HTTP y el módulo http.
import { error } from "console";
import http from "http";

// Función makeHttpRequest: Realiza peticiones HTTP y devuelve una promesa con los datos como texto.
export const makeHttpRequest = (url: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    // Realiza una petición HTTP GET al URL proporcionado.
    http
      .get(url, (res: http.IncomingMessage) => {
        res.setEncoding("utf8"); // Configura la codificación de caracteres a UTF-8.

        let data = ""; // Almacena los datos recibidos.

        // Evento 'data': se dispara cuando se reciben datos de la respuesta.
        res.on("data", (chunk: string) => (data += chunk));
        // Acumula cada fragmento de datos.

        // Evento 'end': se activa cuando se completa la recepción de todos los datos.
        res.on("end", () => resolve(data));
        // Resuelve la promesa con los datos acumulados.

        // Maneja errores en la respuesta.
        res.on("error", (err: Error) => reject(err));
      })
      // Maneja errores en la petición.
      .on("error", (err: Error) => {
        reject(err); // Rechaza la promesa en caso de error en la petición.
      });
  });
};

// Función main: Realiza peticiones HTTP a múltiples URLs y maneja las respuestas.
export const main = (urls: string[]) => {
  Promise.all(urls.map((url) => makeHttpRequest(url)))
    .then((results: string[]) => {
      results.forEach((result) => {
        console.log(result);
      });
    })
    .catch((err) => {
      // Maneja y muestra los errores.
      if (err instanceof Error) {
        console.error(`Error: ${err.message}`); // Imprime el mensaje de error.
      } else {
        console.error(`Error desconocido: ${err}`); // Maneja otros tipos de errores.
      }
    });
};
const urls = [process.argv[2], process.argv[3], process.argv[4]];
main(urls); // Ejecuta la función principal.
