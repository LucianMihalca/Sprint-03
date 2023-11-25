import http, { IncomingMessage } from "http";

// Función para realizar una solicitud GET a una URL.
export function fetchUrl(url: string): void {
  http.get(url, (response: IncomingMessage) => {
    response.setEncoding("utf8");

    response.on("data", (chunk: string) => {
      console.log(chunk);
    });

    response.on("error", console.error);
  }).on("error", console.error);
}

// Llamada a la función con la URL proporcionada en la línea de comandos.
const url: string = process.argv[2];
fetchUrl(url);

/*
- http.get: Función del módulo http para realizar una solicitud HTTP GET.
  Toma una URL como argumento y una función de callback para manejar la respuesta.

- IncomingMessage: Tipo importado de "http" que representa la respuesta HTTP.

- response.setEncoding("utf8"): Establece la codificación de la respuesta a UTF-8 para 
  manejar correctamente los caracteres.

- response.on("data"): Evento que se dispara cuando se reciben datos de la respuesta. 
  Cada 'chunk' representa un fragmento de los datos.

- response.on("error"): Evento que se dispara si hay un error al recibir la respuesta.

- .on("error"): Evento de error en la solicitud HTTP, manejando problemas como 
  problemas de conexión o URL incorrecta.
*/
