import net from "net";
import "dotenv/config"; // 1. Importa configuraciones de variables de entorno.

// 2. Función para formatear la fecha y hora actuales en formato YYYY-MM-DD hh:mm.
export const formatDate = (): string => {
  const date = new Date();

  // Función interna para añadir un cero a la izquierda si el número es menor que 10.
  const pad = (num: number) => (num < 10 ? "0" : "") + num;

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const min = pad(date.getMinutes());

  return `${year}-${month}-${day} ${hours}:${min}`;
};

// 3. Crea un servidor TCP que envía la fecha y hora actuales a los clientes.
export const timeServer = net.createServer((socket: net.Socket): void => {
  const currentDate = formatDate();
  socket.write(currentDate + "\n");
  socket.end();
});

// 4. Función para validar el puerto de entrada. Asegura que el puerto esté en el rango aceptable.
export const validatePort = (port: string): number | null => {
  const portNumber = parseInt(port);
  if (!port || isNaN(portNumber) || portNumber < 1024 || portNumber > 65535) {
    console.error("Por favor, proporciona un número de puerto válido entre 1024 y 65535.");
    return 1; // Devuelve un código de error personalizado
  }
  return null; // Devuelve null si el puerto es válido
};

// 5. Determina el puerto del servidor, priorizando una variable de entorno y luego argumentos de línea de comandos.
const serverPort = process.env.PORT || process.argv[2];

validatePort(serverPort);

// 6. Inicia el servidor y maneja posibles errores de inicio.
timeServer
  .listen(serverPort, () => {
    const currentDate = formatDate();
    console.log(`${currentDate} Servidor escuchando en el puerto ${serverPort}`);
  })
  .on("error", (err) => {
    console.error(`Error al iniciar el servidor: ${err.message}`);
  });

/* 
   Descripción general del script:

   Este script crea un servidor TCP simple que escucha en un puerto especificado.
   Cuando un cliente se conecta, el servidor envía la fecha y hora actuales formateadas
   y luego cierra la conexión.

   Este script utiliza el módulo 'net' de Node.js para crear un servidor TCP. El módulo 'net'
   proporciona funcionalidades para trabajar con redes TCP/IP, permitiendo la creación de servidores
   y clientes TCP. TCP, o Protocolo de Control de Transmisión, es un estándar fundamental en
   la comunicación por Internet que facilita la entrega confiable de flujos de datos entre
   distintos dispositivos en una red.

   El servidor TCP creado en este script escucha en un puerto especificado, que se determina
   a través de una variable de entorno o un argumento de línea de comandos. Cuando un cliente
   se conecta, el servidor envía la fecha y hora actuales formateadas y luego cierra la conexión.
   Se implementa una validación para asegurar que el puerto sea un número válido dentro del rango
   aceptado para puertos TCP.

   Este servidor es útil para proporcionar una marca de tiempo simple a cualquier cliente
   que se conecte, demostrando un uso básico de la red TCP con Node.js.
*/
