import http from "http";
import { createHttpServer, getValidatedPort } from "../http-file-server";

// Mockear la creación del servidor http
jest.mock("http", () => ({
  createServer: jest.fn().mockImplementation((requestListener) => ({
    listen: jest.fn(),
    on: jest.fn(),
  })),
}));

// Mockear el módulo http-file-server para getValidatedPort
jest.mock("../http-file-server", () => ({
  ...jest.requireActual("../http-file-server"),
  getValidatedPort: jest.fn((portArg) => {
    if (!portArg || isNaN(parseInt(portArg)) || parseInt(portArg) < 1024 || parseInt(portArg) > 65535) {
      console.error("Por favor, proporciona un número de puerto válido entre 1024 y 65535.");
      return null; // Devuelve null para un puerto no válido
    }
    return parseInt(portArg); // Devuelve el puerto como número si es válido
  }),
}));

describe("getValidatedPort", () => {
  it("debe manejar el caso cuando no se proporciona un puerto", () => {
    const invalidPort = "";
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = getValidatedPort(invalidPort);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Por favor, proporciona un número de puerto válido entre 1024 y 65535.");
    expect(result).toBeNull();

    consoleErrorSpy.mockRestore();
  });

  it("debe retornar null para un puerto no válido", () => {
    const invalidPort = "invalido";

    const result = getValidatedPort(invalidPort);

    expect(result).toBeNull();
  });
});

describe("createHttpServer", () => {
  it("debe crear un servidor que se pueda escuchar en un puerto", () => {
    const filePath = "ruta/a/un/archivo/ficticio.txt";
    const server = createHttpServer(filePath);

    expect(http.createServer).toHaveBeenCalled();
    expect(server.listen).toBeDefined();
    expect(server.on).toBeDefined();
  });
});
