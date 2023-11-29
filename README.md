## 🚀 Sprint 3 Learnyounode



**Empezando**

Para comenzar, descargue e instale la versión adecuada de node.js para su sistema operativo.

👉🏻 [Node](https://nodejs.org/en)

**Instalar Learyounode**
Navegue hasta el directorio en el que desea instalar learyounode y ejecute

```
npm instala learnyounode -g
```

**Si eres usuario de Linux o Mac** y la instalación falla, intente esto.

```
sudo npm instala learnyounode -g
```

Una vez instalado learnyounode, puede comenzar ejecutándolo desde la línea de comando.

```
learnyounode
```

**Lecciones**

- learnyounode 01 – Hello World!

- learnyounode 02 – Baby Steps

- learnyounode 03 – My First I/O!

- learnyounode 04 – My First Async I/O!

- learnyounode 05 – Filtered LS

- learnyounode 06 – Make it Modular

- learnyounode 07 – HTTP Client

- learnyounode 08 – HTTP Collect

- learnyounode 09 – Juggling Async

- learnyounode 10 – Time Server

- learnyounode 11 – HTTP File Server

- learnyounode 12 – HTTP Uppercase

- learnyounode 13 – HTTP JSON API Server

**Instale las dependencias del proyecto:**

```
npm install
```

---

⚡️ **Guiones:**
Este proyecto viene con varios scripts predefinidos en el archivo package.json:

`npm run test ` Ejecuta pruebas usando Jest.

`npm run build` Transpila el código TypeScript en JavaScript en la carpeta ./dist..

---

📚 **Dependencias**

`dotenv`

`through2-map`

---

📚 **Dependencias de desarrollo**

`@types/through2-map`

`@types/supertest`

`@types/jest`

`@types/node`

`mock-local-storage`

`typescript`

`supertest`

`ts-node`

`ts-jest`

`jest`

---

### 📂 Index y explicaciones

- ⭐️ Scripts validados por Learnyounode.
- ⭐️⭐️ Propios scripts de cada ejercicio.
- ⭐️⭐️⭐️ Realizado con TypeScript y testing.

✅ 01. Hello World!

Imprimir Hello World.

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 02. Baby Steps

Necesitamos escribir un programa que acepte uno o más números como argumentos de la línea de comando y luego imprima la suma de esos argumentos.

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 03. My First I/O!

En este ejercicio, necesitamos crear un programa que lea un archivo de forma sincrónica e imprima el número de líneas nuevas del archivo en la consola.

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 04. My First Async I/O!
Mi primera E/S asíncrona! nos presenta la entrada/salida asincrónica.
El marco node.js se basa en la idea de utilizar operaciones asincrónicas en lugar de operaciones sincrónicas

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 05. Filtered LS
En esta lección necesitamos crear un programa que imprima una lista de archivos en un directorio, filtrados por extensión.

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 06. Make it Modular
En esta lección, debemos hacer casi exactamente lo mismo que hicimos en la lección anterior. Sin embargo, deberíamos encapsular la solución anterior en una función y asignar la función a la propiedad de exportaciones del objeto del módulo para que pueda llamarse desde otro archivo.

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 07. HTTP Client
Para esta lección necesitamos escribir un programa que realice una solicitud HTTP GET a una URL y escriba los datos de respuesta en la consola. Las solicitudes GET son uno de los métodos de solicitud permitidos en el Protocolo de transferencia de hipertexto (HTTP). La solicitud GET solo recupera datos del recurso especificado (determinado por la URL en la que se utiliza la solicitud). Las solicitudes GET se consideran operaciones seguras que no cambian el estado del servidor al que se envía la solicitud porque solo recupera información.

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 08. HTTP Collect
En esta lección necesitamos escribir un programa que recopile todos los datos de una GETsolicitud HTTP y registre la cantidad de caracteres y la cadena completa de caracteres recibidos del servidor.

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 09. Juggling Async
Este problema es el mismo que el problema anterior (HTTP COLLECT) en el sentido de que necesita usar http.get(). Sin embargo, esta vez se le proporcionarán tres URL como los primeros tres argumentos de la línea de comandos.

Se debe recopilar el contenido completo que se proporciona en cada una de las URL e imprimirlo en la consola (stdout). No es necesario imprimir la longitud, sólo los datos como una cadena; una línea por URL. El problema es que debe imprimirlos en el mismo orden en que se le proporcionan las URL como argumentos de la línea de comandos.
- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 10. Time Server
Para esta lección necesitamos crear un servidor de hora del Protocolo de control de transmisión (TCP) que escriba la fecha y hora actuales en el socket en formato de 24 horas. Además de un módulo http, el nodo también tiene un módulo TCP que se puede invocar con require('net')

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 11. HTTP File Server
Para esta lección necesitamos crear un servidor HTTP que proporcione el mismo archivo de texto cada vez que el servidor recibe una solicitud. Al igual que en la lección anterior, el servidor debe escuchar en el puerto proporcionado por el primer argumento del programa (process.argv[2]). Se proporcionará una ubicación para el archivo como segundo argumento del programa. A diferencia de la lección anterior, necesitamos crear un servidor HTTP en lugar de un servidor TCP.

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---

✅ 12. HTTP Uppercase
Para esta lección necesitamos crear un servidor HTTP que solo acepte solicitudes POST. El cuerpo de la POST debe convertirse en una cadena en mayúscula y devolverse al cliente a través de la respuesta del servidor. Al igual que en las lecciones anteriores, el servidor debe escuchar en el puerto proporcionado como primer argumento del programa (process.argv[2]).

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---
✅ 13. HTTP JSON API Server
Para la lección final, necesitamos crear un servidor API JSON que acepte una cadena de consulta de URL que incluya una cadena de tiempo ISO. El servidor debe responder con un objeto que contenga la hora, el minuto y el segundo, o un objeto que contenga la época de Unix, según el punto final incluido en la cadena de consulta de la URL.

- ⭐️
- ⭐️⭐️
- ⭐️⭐️⭐️

---
