# 📚 HTTP UPPERCASERER - Ejercicio 12

## Descripción General
Este documento ofrece un resumen detallado del ejercicio "HTTP UPPERCASERER", enfocado en la creación de un servidor HTTP en Node.js para transformar datos de solicitudes POST a mayúsculas.

## Paso 1: Configuración Inicial
- **Objetivo**: Preparar el entorno de desarrollo.
- **Acciones**:
   - Crear el archivo `http-uppercaserer.js`.
   - Instalar `through2-map` para la transformación de streams.
- **Dependencias**: `http`, `through2-map`.

## Paso 2: Creación del Servidor HTTP
- **Objetivo**: Establecer un servidor HTTP básico.
- **Implementación**: Uso del método `http.createServer`.

## Paso 3: Manejo de Solicitudes POST
- **Objetivo**: Filtrar y procesar solo solicitudes POST.
- **Implementación**: Verificación del método `req.method`.

## Paso 4: Procesamiento de la Solicitud
- **Objetivo**: Aplicar transformaciones a los datos de la solicitud.
- **Implementación**: Uso del método `pipe` y `through2-map`.

## Paso 5: Transformación de Datos
- **Objetivo**: Convertir datos a mayúsculas.
- **Implementación**: Función `map` para cambiar cada `chunk` a mayúsculas.

## Paso 6: Envío de la Respuesta
- **Objetivo**: Devolver los datos transformados al cliente.
- **Implementación**: Método `pipe` para enviar la respuesta transformada.

## Paso 7: Manejo de Otros Métodos HTTP
- **Objetivo**: Gestionar métodos HTTP no soportados.
- **Implementación**: Configuración de un código de estado 405.

## Paso 8: Inicio del Servidor
- **Objetivo**: Activar el servidor en el puerto especificado.
- **Implementación**: Método `server.listen` con el puerto de `process.argv[2]`.

## Conclusión 🤌🏼
Este ejercicio demuestra la implementación de un servidor HTTP en Node.js que procesa solicitudes POST, utilizando streams para transformar los datos. Refuerza conceptos importantes como la programación asíncrona, el manejo de streams y el desarrollo de servidores HTTP.
