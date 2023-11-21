import http, { IncomingMessage } from "http";

// Obtiene la URL del argumento de la línea de comandos.
const url: string = process.argv[2];

// Realiza una solicitud GET a la URL especificada.
http
  .get(url, (response: IncomingMessage) => {
    // Configura la codificación de caracteres de la respuesta a UTF-8.
    response.setEncoding("utf8");

    // Escucha el evento 'data' para recibir los datos de la respuesta.
    response.on("data", (chunk: string) => {
      // Imprime cada fragmento (chunk) de datos recibidos.
      console.log(chunk);
    });

    // Escucha el evento 'error' en la respuesta.
    response.on("error", console.error);
  })
  // Escucha el evento 'error' en la solicitud HTTP en caso de problemas con la solicitud.
  .on("error", console.error);

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
