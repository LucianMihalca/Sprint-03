// 1. Importaciones:
// Importa tipos para las respuestas y solicitudes HTTP.
// Importa el módulo http para crear el servidor.
import http from "http";

// 2. Creación del servidor:
const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  // 2.1. Verificación del método y existencia de la URL en la solicitud:
  if (req.method === "GET" && req.url) {
    // 2.2. Análisis de la URL:
    // Construye un objeto URL para descomponer la URL de la solicitud.
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    // Extrae el camino (pathname) y el parámetro 'iso' de la URL.
    const pathname = parsedUrl.pathname;
    const iso = parsedUrl.searchParams.get("iso");

    // 3. Verificación del parámetro 'iso':
    if (iso) {
      // 3.1. Creación de un objeto de fecha a partir del parámetro 'iso'.
      const date = new Date(iso);

      // 4. Rutas API y lógica de respuesta:
      // 4.1. Ruta '/api/parsetime':
      if (pathname === "/api/parsetime") {
        // 4.1.1. Verificación de validez de la fecha:
        if (isNaN(date.getTime())) {
          res.writeHead(400);
          res.end("Invalid Date");
        } else {
          // 4.1.2. Creación y envío de la respuesta con hora, minuto y segundo.
          const time = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
          };
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(time));
        }
      }
      // 4.2. Ruta '/api/unixtime':
      else if (pathname === "/api/unixtime") {
        // 4.2.1. Verificación de validez de la fecha y envío de tiempo Unix.
        if (isNaN(date.getTime())) {
          res.writeHead(400);
          res.end("Invalid Date");
        } else {
          const unixtime = { unixtime: date.getTime() };
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(unixtime));
        }
      }
      // 4.3. Manejo de rutas no reconocidas.
      else {
        res.writeHead(404);
        res.end();
      }
    }
    // 5. Manejo de falta del parámetro 'iso'.
    else {
      res.writeHead(400);
      res.end("Missing or invalid 'iso' query parameter");
    }
  }
  // 6. Manejo de métodos de solicitud no permitidos.
  else {
    res.writeHead(405);
    res.end();
  }
});

// 7. Iniciar el servidor para que escuche en el puerto especificado.
server.listen(Number(process.argv[2]));

/*
- http.createServer: Inicializa y configura un servidor HTTP.
- IncomingMessage (req): Representa la solicitud HTTP, incluyendo métodos, URL y headers.
- ServerResponse (res): Proporciona métodos para construir y enviar respuestas HTTP.

- URL: Utilizado para analizar la URL de la solicitud y acceder a sus componentes como pathname y parámetros de búsqueda.
- Rutas API '/api/parsetime' y '/api/unixtime': Manejan solicitudes GET específicas y devuelven información basada en el parámetro 'iso'.
- server.listen: Pone al servidor a escuchar en el puerto proporcionado por los argumentos de la línea de comandos, permitiendo que el servidor acepte conexiones.
*/
