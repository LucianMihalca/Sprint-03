import fs from "fs";
import contarLineas from "../my-first-async-io";

describe("contarLineas", () => {
  const testFilePath = "test.txt";

  beforeEach(() => {
    // Crear un archivo de prueba antes de cada test
    fs.writeFileSync(testFilePath, "Contenido del archivo\nOtra línea\n");
  });

  afterEach(() => {
    // Eliminar el archivo de prueba después de cada test
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  it("debe contar correctamente el número de líneas en un archivo con contenido", async () => {
    await expect(contarLineas(testFilePath)).resolves.toBe(2);
  });

  it("debe rechazar la promesa con un error cuando se proporciona una ruta vacía", async () => {
    await expect(contarLineas("")).rejects.toEqual(new Error("Error al leer la ruta"));
  });

  it("debe devolver 0 para un archivo vacío", async () => {
    fs.writeFileSync(testFilePath, "");
    const numLineas = await contarLineas(testFilePath);
    expect(numLineas).toBe(0);
  });

  it("debe dar un error al intentar leer un directorio como archivo", async () => {
    const directoryPath = "test_directory";
    fs.mkdirSync(directoryPath); // Crear un directorio para la prueba
    await expect(contarLineas(directoryPath)).rejects.toThrow();
    fs.rmdirSync(directoryPath); // Limpiar después de la prueba
  });

  it("debe rechazar la promesa con un error para una ruta vacía", async () => {
    await expect(contarLineas('')).rejects.toThrow();
  });
});
