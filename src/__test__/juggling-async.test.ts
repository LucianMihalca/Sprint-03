import http from "http";
import * as jugglingAsync from "../juggling-async";

jest.mock("http");

describe("makeHttpRequest", () => {
  it("debería devolver datos como texto", async () => {
    // Configura tu mock aquí
    (http.get as jest.Mock).mockImplementation((url, callback) => {
      const res = {
        setEncoding: jest.fn(),
        on: jest.fn((event, handler) => {
          if (event === "data") {
            handler("datos de prueba");
          }
          if (event === "end") {
            handler();
          }
          if (event === "error") {
            // Simular un error
            process.nextTick(() => handler(new Error("Error en la petición")));
          }
        }),
      };
      callback(res);
      return { on: jest.fn() }; // Mock para el manejo de errores
    });

    // Llamada a tu función y expectativa
    const result = await jugglingAsync.makeHttpRequest("http://ejemplo.com");
    expect(result).toBe("datos de prueba");
  });
  it("debería manejar una respuesta vacía", async () => {
    (http.get as jest.Mock).mockImplementation((url, callback) => {
      const res = {
        setEncoding: jest.fn(),
        on: jest.fn((event, handler) => {
          if (event === "end") {
            handler(); // Finaliza sin enviar 'data'
          }
        }),
      };
      callback(res);
      return { on: jest.fn() };
    });

    const result = await jugglingAsync.makeHttpRequest("http://ejemplo.com");
    expect(result).toBe("");
  });
  it("debería manejar errores en la petición", async () => {
    (http.get as jest.Mock).mockImplementation((url, callback) => {
      return {
        on: jest.fn((event, handler) => {
          if (event === "error") {
            handler(new Error("Error en la petición"));
          }
        }),
      };
    });

    await expect(jugglingAsync.makeHttpRequest("http://ejemplo.com")).rejects.toThrow("Error en la petición");
  });

  it("debería manejar errores durante la recepción de datos", async () => {
    (http.get as jest.Mock).mockImplementation((url, callback) => {
      const res = {
        setEncoding: jest.fn(),
        on: jest.fn((event, handler) => {
          if (event === "data") {
            handler("datos parciales");
          }
          if (event === "error") {
            process.nextTick(() => handler(new Error("Error al recibir datos")));
          }
        }),
      };
      callback(res);
      return { on: jest.fn() };
    });

    // Esperar que la promesa sea rechazada con el error específico
    await expect(jugglingAsync.makeHttpRequest("http://ejemplo-con-error.com")).rejects.toThrow("Error al recibir datos");
  });
});

describe("main", () => {
  let mockMakeHttpRequest: jest.SpyInstance;

  beforeEach(() => {
    // Crear un mock para makeHttpRequest
    mockMakeHttpRequest = jest.spyOn(jugglingAsync, "makeHttpRequest");
    mockMakeHttpRequest.mockResolvedValue("respuesta de prueba");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("debe llamar a makeHttpRequest con las URLs correctas", async () => {
    const urls = ["http://url1.com", "http://url2.com", "http://url3.com"];

    jugglingAsync.main(urls);

    expect(mockMakeHttpRequest).toHaveBeenCalledTimes(3);
    expect(mockMakeHttpRequest).toHaveBeenCalledWith("http://url1.com");
    expect(mockMakeHttpRequest).toHaveBeenCalledWith("http://url2.com");
    expect(mockMakeHttpRequest).toHaveBeenCalledWith("http://url3.com");
  });
  it("debería imprimir los resultados de las peticiones HTTP", async () => {
    mockMakeHttpRequest.mockResolvedValue("respuesta de prueba");
    const consoleLogSpy = jest.spyOn(console, "log");
  
    const urls = ["http://url1.com", "http://url2.com", "http://url3.com"];
  
    // Asegurarse de que el test espera la finalización de las operaciones asíncronas en main
    await new Promise<void>(resolve => {
      jugglingAsync.main(urls);
      setImmediate(resolve); // setImmediate asegura que las promesas internas se resuelvan
    });
  
    expect(consoleLogSpy).toHaveBeenCalledTimes(urls.length);
    urls.forEach(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("respuesta de prueba");
    });
    consoleLogSpy.mockRestore();
  });
  it("debería manejar errores en las peticiones HTTP", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    const errorMensaje = "Error en la petición";
    mockMakeHttpRequest.mockRejectedValue(new Error(errorMensaje));

    const urls = ["http://url1.com", "http://url2.com", "http://url3.com"];
    await new Promise<void>(resolve => {
      jugglingAsync.main(urls);
      setImmediate(resolve);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(errorMensaje));
    consoleErrorSpy.mockRestore();
  });
  it("debería manejar errores desconocidos en las peticiones HTTP", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error");
    const errorDesconocido = "Este es un error desconocido";
    mockMakeHttpRequest.mockRejectedValue(errorDesconocido);

    const urls = ["http://url1.com", "http://url2.com", "http://url3.com"];
    await new Promise<void>(resolve => {
      jugglingAsync.main(urls);
      setImmediate(resolve);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining(`Error desconocido: ${errorDesconocido}`));
    consoleErrorSpy.mockRestore();
  });
});
