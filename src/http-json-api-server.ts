import { IncomingMessage, ServerResponse } from "http";
const http = require("http");

// Crea un servidor HTTP.
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  // Verifica si la solicitud es un método GET y tiene una URL.
  if (req.method === "GET" && req.url) {
    // Analiza la URL y crea un objeto URL para facilitar el acceso a sus partes.
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const iso = parsedUrl.searchParams.get('iso'); // Obtiene el parámetro 'iso' de la URL.

    // Verifica si el parámetro 'iso' está presente.
    if (iso) {
      const date = new Date(iso); // Crea un objeto de fecha con el parámetro 'iso'.

      // Maneja la ruta '/api/parsetime' para devolver la hora, minuto y segundo.
      if (pathname === '/api/parsetime') {
        if (isNaN(date.getTime())) {
          // Si la fecha es inválida, envía un error 400.
          res.writeHead(400);
          res.end("Invalid Date");
        } else {
          // Si la fecha es válida, devuelve la hora, minuto y segundo en formato JSON.
          const time = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
          };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(time));
        }
      } else if (pathname === '/api/unixtime') {
        // Maneja la ruta '/api/unixtime' para devolver el tiempo en formato Unix.
        if (isNaN(date.getTime())) {
          res.writeHead(400);
          res.end("Invalid Date");
        } else {
          const unixtime = { unixtime: date.getTime() };
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(unixtime));
        }
      } else {
        // Si la ruta no es reconocida, devuelve un error 404.
        res.writeHead(404);
        res.end();
      }
    } else {
      // Si falta el parámetro 'iso', devuelve un error 400.
      res.writeHead(400);
      res.end("Missing or invalid 'iso' query parameter");
    }
  } else {
    // Si el método de la solicitud no es GET, devuelve un error 405.
    res.writeHead(405);
    res.end();
  }
});

// El servidor escucha en el puerto proporcionado por los argumentos de la línea de comandos.
server.listen(Number(process.argv[2]));

/*
- http.createServer: Crea un servidor HTTP que escucha las solicitudes entrantes.
- IncomingMessage (req): Objeto que representa la solicitud HTTP entrante.
- ServerResponse (res): Objeto utilizado para devolver respuestas al cliente.

- URL y URLSearchParams: Utilizados para analizar y trabajar con la URL de la solicitud.

- Rutas '/api/parsetime' y '/api/unixtime': Proporcionan diferentes representaciones de la fecha y hora basadas en el parámetro 'iso'.
*/
