import { Socket } from "net";
const net = require("net");

// Función para agregar un cero a la izquierda si el número es menor que 10.
function padZero(num: number): string {
  return num < 10 ? '0' + num : '' + num;
}

// Función para formatear la fecha y hora actuales en el formato YYYY-MM-DD hh:mm.
function formatDate(): string {
  const now = new Date();
  return now.getFullYear() + '-' +
    padZero(now.getMonth() + 1) + '-' +
    padZero(now.getDate()) + ' ' +
    padZero(now.getHours()) + ':' +
    padZero(now.getMinutes());
}

// Crea un servidor de tiempo que escucha conexiones TCP.
const timeServer = net.createServer((socket: Socket): void => {
  // Envía la fecha y hora formateadas al cliente y cierra la conexión.
  socket.end(formatDate() + '\n');
});

// El servidor comienza a escuchar en el puerto proporcionado por la línea de comandos.
timeServer.listen(Number(process.argv[2]));

/*
- net.createServer: Crea un servidor TCP utilizando el módulo net.
- socket.end: Envía datos al cliente conectado y cierra la conexión.

- formatDate: Genera una cadena con la fecha y hora actual formateada.
- padZero: Añade un cero a la izquierda para números menores de 10 para un formato consistente.

- process.argv[2]: El puerto en el que el servidor debe escuchar, proporcionado como argumento en la línea de comandos.
*/
