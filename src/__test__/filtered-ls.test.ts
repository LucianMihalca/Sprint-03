import { validarEntradas, filtrarArchivos } from "../filtered-ls";
import fs from "fs";
import path from "path";



const directorioPrueba = path.join(__dirname, "directorioPrueba");
const archivo1 = path.join(directorioPrueba, "archivo1.txt");
const archivo2 = path.join(directorioPrueba, "archivo2.md");

beforeAll(() => {
  fs.mkdirSync(directorioPrueba);
  fs.writeFileSync(archivo1, "contenido");
  fs.writeFileSync(archivo2, "contenido");
});

afterAll(() => {
  fs.unlinkSync(archivo1);
  fs.unlinkSync(archivo2);
  fs.rmdirSync(directorioPrueba);
});

describe("validarEntradas", () => {
  it("debería devolver true para un directorio existente", async () => {
    const resultado = await validarEntradas(directorioPrueba, "txt");
    expect(resultado).toBe(true);
  });

  it("debería devolver false para un directorio inexistente", async () => {
    const resultado = await validarEntradas("/ruta/inexistente", "txt");
    expect(resultado).toBe(false);
  });
});

describe("filtrarArchivos", () => {
  it("debería filtrar archivos por extensión", async () => {
    const archivosFiltrados = await filtrarArchivos(directorioPrueba, "txt");
    expect(archivosFiltrados).toEqual(["archivo1.txt"]);
  });
});

describe("filtrarArchivos", () => {
  it("debería retornar archivos con la extensión especificada", async () => {
    const archivosFiltrados = await filtrarArchivos(directorioPrueba, "txt");
    expect(archivosFiltrados).toEqual(["archivo1.txt"]);
  });

  it('debería manejar directorios inexistentes lanzando un error', async () => {
    await expect(filtrarArchivos('/ruta/inexistente', 'txt')).rejects.toThrow('Error al leer el directorio');
  });
  
});
