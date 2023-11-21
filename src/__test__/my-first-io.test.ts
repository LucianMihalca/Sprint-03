import fs from "fs";
import numeroDeLineas from "../my-first-io";

jest.mock("fs", () => ({
  readFileSync: jest.fn().mockReturnValue(""),
}));

describe("Contar Líneas", () => {
  it("retorna el número de líneas para un archivo con múltiples líneas y la última línea vacía", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("Línea1\nLínea2\nLínea3\nLínea4\n");
    const filename = "multipleLinesLastEmpty.txt";
    const lineCount = numeroDeLineas(filename);
    expect(lineCount).toBe(4);
  });

  it("retorna 1 para un archivo con una sola línea y la ultima vacía", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("Línea1\n");
    const filename = "singleLine.txt";
    const lineCount = numeroDeLineas(filename);
    expect(lineCount).toBe(1);
  });

  it("retorna 0 para un archivo vacío", () => {
    (fs.readFileSync as jest.Mock).mockReturnValue("");
    const filename = "emptyFile.txt";
    const lineCount = numeroDeLineas(filename);
    expect(lineCount).toBe(0);
  });
});
