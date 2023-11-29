import { validatePort, timeServer, formatDate } from "../time-server";
import net from "net";

describe("validatePort", () => {
  it("debería mostrar un mensaje de error y no llamar a process.exit() para un puerto inválido", () => {
    // Espía la función console.error() para evitar que se muestre el mensaje de error
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Espía la función process.exit() para evitar que se llame a process.exit(1)
    const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error(); // Lanza un error en lugar de process.exit()
    });

    // Llama a validatePort con un puerto inválido
    validatePort("80000");

    // Verifica que console.error() se haya llamado con el mensaje de error esperado
    expect(errorSpy).toHaveBeenCalledWith(
      "Por favor, proporciona un número de puerto válido entre 1024 y 65535."
    );

    // Restaura las implementaciones originales de console.error() y process.exit()
    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });
  it("debería retornar null para un puerto válido", () => {
    // Define un puerto válido, por ejemplo, 8080
    const validPort = "8080";

    // Llama a la función validatePort con el puerto válido
    const result = validatePort(validPort);

    // Verifica que el resultado sea null
    expect(result).toBeNull();
  });
});

// Define la suite de pruebas para timeServer
describe("timeServer", () => {
  // Antes de cada prueba, inicia el servidor en un puerto ficticio
  beforeAll((done) => {
    const mockServerPort = 12345; // Puerto ficticio
    if (timeServer.listening) {
      timeServer.close(() => {
        timeServer.listen(mockServerPort, done);
      });
    } else {
      timeServer.listen(mockServerPort, done);
    }
  });

  // Después de todas las pruebas, cierra el servidor
  afterAll((done) => {
    timeServer.close(() => {
      done(); // Asegúrate de que el servidor se haya cerrado completamente antes de continuar.
    });
  });

  // Define una prueba para verificar si el servidor responde
  it("debería responder con la fecha y hora actual", (done) => {
    // Crea una conexión al servidor ficticio
    const client = net.createConnection({ port: 12345 });

    // Define un manejador de datos para recibir la respuesta del servidor
    client.on("data", (data) => {
      // Convierte los datos en una cadena
      const response = data.toString();

      // Obtiene la fecha y hora actual formateada
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Agrega cero a la izquierda si es necesario
      const day = currentDate.getDate().toString().padStart(2, "0"); // Agrega cero a la izquierda si es necesario
      const hours = currentDate.getHours().toString().padStart(2, "0"); // Agrega cero a la izquierda si es necesario
      const minutes = currentDate.getMinutes().toString().padStart(2, "0"); // Agrega cero a la izquierda si es necesario

      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

      // Compara la respuesta del servidor con la fecha y hora actual
      expect(response).toBe(`${formattedDate}\n`);

      // Cierra la conexión del cliente
      client.end();
      done();
    });

    // Maneja cualquier error de conexión
    client.on("error", (error) => {
      done.fail(error);
    });
  });
});

describe("formatDate", () => {
  it("debería formatear la fecha y hora actual correctamente", () => {
    // Obtén la fecha y hora actual
    const currentDate = new Date();

    // Calcula los valores esperados para el año, mes, día, hora y minutos
    const expectedYear = currentDate.getFullYear();
    const expectedMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const expectedDay = currentDate.getDate().toString().padStart(2, "0");
    const expectedHours = currentDate.getHours().toString().padStart(2, "0");
    const expectedMinutes = currentDate.getMinutes().toString().padStart(2, "0");

    // Formatea la fecha y hora actual utilizando la función formatDate
    const formattedDate = formatDate();

    // Construye la cadena esperada en el formato YYYY-MM-DD hh:mm
    const expectedFormattedDate = `${expectedYear}-${expectedMonth}-${expectedDay} ${expectedHours}:${expectedMinutes}`;

    // Verifica que la fecha formateada sea igual a la esperada
    expect(formattedDate).toBe(expectedFormattedDate);
  });
});
