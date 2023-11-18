// Version 1.0

// Importaciones necesarias: IncomingMessage para tipar las respuestas HTTP y el módulo http.
import { IncomingMessage } from "http";
const http = require("http");

// Obtiene la URL del argumento de la línea de comandos.
const url = process.argv[2];

// Inicializa una variable para almacenar los datos de la respuesta.
let data = "";

// Realiza una petición GET al URL proporcionado.
http.get(url, (res: IncomingMessage) => {
  // Configura la codificación de caracteres de la respuesta a UTF-8.
  res.setEncoding("utf8");

  // Escucha el evento 'data' para recibir fragmentos de datos de la respuesta.
  res.on("data", (chunk: string): void => {
    data += chunk; // Concatena cada fragmento de datos a la variable data.
  });

  // Escucha el evento 'end' que se activa al completarse la recepción de datos.
  res.on("end", (): void => {
    console.log(data.length); // Imprime la longitud total de los datos.
    console.log(data); // Imprime los datos recibidos.
  });

  // Escucha el evento 'error' en caso de un problema con la respuesta.
  res.on("error", (err: Error): void => {
    console.error(`Error en la respuesta: ${err.message}`); // Imprime el mensaje de error.
  });
});

/*
- http.get: Realiza una petición HTTP GET a la URL proporcionada. 
  Recibe una función de callback que maneja la respuesta HTTP.

- IncomingMessage (res): Objeto que representa la respuesta HTTP. 
  Provee acceso a los datos de la respuesta, estado, y más.

- res.setEncoding("utf8"): Asegura que los datos de la respuesta se manejen como texto UTF-8.

- res.on("data"): Se dispara cuando se reciben datos de la respuesta. 
  Los datos vienen en fragmentos (chunks).

- res.on("end"): Se activa cuando se ha completado la recepción de todos los fragmentos de datos.

- res.on("error"): Maneja cualquier error que ocurra durante la recepción de la respuesta.
*/

// // Version 2.0
// // Importaciones necesarias: IncomingMessage para tipar las respuestas HTTP y el módulo http.
// import { IncomingMessage } from "http";
// const http = require("http");

// // Función makeHttpRequest que realiza una petición HTTP y devuelve una promesa con los datos.
// const makeHttpRequest = async (url: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     http
//       .get(url, (res: IncomingMessage) => {
//         res.setEncoding("utf8"); // Configura la codificación a UTF-8 para la respuesta.
//         let data = ""; // Almacena los datos recibidos.

//         res.on("data", (chunk: string) => {
//           data += chunk; // Acumula los fragmentos de datos recibidos.
//         });

//         res.on("end", () => {
//           resolve(data); // Resuelve la promesa con los datos acumulados al finalizar la recepción.
//         });

//         res.on("error", (err: Error) => {
//           reject(err); // Rechaza la promesa si hay un error en la respuesta.
//         });
//       })
//       .on("error", (err: Error) => {
//         reject(err); // Rechaza la promesa si hay un error en la petición.
//       });
//   });
// };

// // Función principal que realiza la petición HTTP y maneja los resultados.
// const main = async () => {
//   const url = process.argv[2]; // Toma el URL de la línea de comandos.

//   try {
//     const data = await makeHttpRequest(url); // Espera los datos de la petición HTTP.
//     console.log(data.length); // Muestra la longitud de los datos.
//     console.log(data); // Muestra los datos.
//   } catch (err) {
//     // Manejo de errores.
//     if (err instanceof Error) {
//       console.error(`Error: ${err.message}`); // Imprime el mensaje de error.
//     } else {
//       console.error(`Error desconocido: ${err}`); // Maneja otros tipos de errores.
//     }
//   }
// };

// main(); // Ejecuta la función principal.
