// Paso 1: Importar los módulos necesarios.
import { IncomingMessage, ServerResponse } from "http";
const http = require("http"); // 'http' para crear el servidor HTTP
const map = require("through2-map"); //'through2-map' para transformar los streams.

// Paso 2: Crear el servidor HTTP usando http.createServer.
// Esta función devuelve una nueva instancia de http.Server.
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  // Paso 3: Verificar el método de la solicitud HTTP.
  // Solo se procesarán las solicitudes POST, las demás devolverán un error.
  if (req.method === "POST") {
    // Paso 4: Procesar las solicitudes POST.
    // 'req' es un stream de entrada: contiene los datos enviados por el cliente.
    req
      .pipe(
        map((chunk: Buffer) => {
          // Paso 5: Transformar los datos.
          // 'map' es un stream de transformación. Aquí, convierte cada chunk (Buffer) a texto en mayúsculas.
          // 'chunk.toString().toUpperCase()' convierte el Buffer a String y luego a mayúsculas.
          return chunk.toString().toUpperCase();
        })
      )
      .pipe(res);  // Paso 6: Enviar la respuesta transformada al cliente.
      // '.pipe(res)' toma el stream transformado y lo envía al cliente como respuesta HTTP.
  } else {
    // Paso 7: Manejar otros métodos HTTP.
    // Si el método no es POST, se configura un código de estado 405 y se finaliza la respuesta.
    res.statusCode = 405;  // Código de estado HTTP para "Método no permitido".
    res.end("Solo se admiten solicitudes POST"); // Mensaje de respuesta enviado al cliente.
  }
});

// Paso 8: Configurar el servidor para que escuche en un puerto específico.
// 'server.listen' inicia el servidor HTTP en el puerto proporcionado en process.argv[2].
// 'Number(process.argv[2])' convierte el argumento de línea de comandos a un número (el puerto).
server.listen(Number(process.argv[2]));
