// Paso 1: Importar los módulos necesarios.
import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";

// Paso 2: Crear el servidor HTTP.
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  // Paso 3: Configurar las cabeceras de la respuesta HTTP.
  // Esto establece el código de estado a 200 y el tipo de contenido a texto plano.
  res.writeHead(200, { "content-type": "text/plain" });

  // Paso 4: Crear un stream de lectura para el archivo especificado en la línea de comandos.
  // Utiliza process.argv[3] para obtener la ruta del archivo.
  const fileStream = fs.createReadStream(process.argv[3]);

  // Paso 5: Transmite el contenido del archivo a la respuesta HTTP.
  // El método 'pipe' envía los datos del archivo directamente a la respuesta, manejando el flujo de datos.
  fileStream.pipe(res);
});

// Paso 6: Configurar el servidor para que escuche en el puerto proporcionado en la línea de comandos.
// Utiliza process.argv[2] para obtener el número de puerto y lo convierte a un número con 'Number'.
server.listen(Number(process.argv[2]));
