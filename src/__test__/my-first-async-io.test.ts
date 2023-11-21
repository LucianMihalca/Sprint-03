import fs from "fs";
import contarLineas from "../my-first-async-io";
import { error } from "console";

describe("contarLineas", () => {
  const testFilePath = "test.txt";

  beforeEach(() => {
    // Crear un archivo de prueba antes de cada test
    fs.writeFileSync(testFilePath, "Contenido del archivo\nOtra línea\n");
  });

  afterEach(() => {
    // Eliminar el archivo de prueba después de cada test
    fs.unlinkSync(testFilePath);
  });

  it("debe contar correctamente el número de líneas en un archivo", async () => {
    await expect(contarLineas(testFilePath)).resolves.toBe(2);
  });

  it("Debería dar un error si el archivo no existe", async () => {
    await expect(contarLineas("archivoInexistente.ts")).rejects.toThrow("Error al leer el archivo: ENOENT: no such file or directory, open 'archivoInexistente.ts'");
  });
  
  // Otros tests...
});
