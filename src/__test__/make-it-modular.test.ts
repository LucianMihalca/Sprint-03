const fs = require("fs");
const path = require("path");
const listarMisArchivos = require("../mymodule");

// Tipamos el mock para fs
jest.mock("fs");

describe("listarMisArchivos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("filtra archivos por extensión", (done) => {
    const mockFiles = ["file1.txt", "file2.js", "script.ts"];

    (fs.readdir as jest.Mock).mockImplementation((dir: string, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void) => {
      callback(null, mockFiles);
    });

    listarMisArchivos("/path/to/dir", "ts", (error: NodeJS.ErrnoException | null, files: string[]) => {
      expect(error).toBeNull();
      expect(files).toEqual(["script.ts"]);
      done();
    });
  });

  it("maneja errores", (done) => {
    const mockError = new Error("Failed to read directory");

    (fs.readdir as jest.Mock).mockImplementation((dir: string, callback: (err: NodeJS.ErrnoException | null, files: string[]) => void) => {
      callback(mockError, [dir]);
    });

    listarMisArchivos("/path/to/dir", "ts", (error: NodeJS.ErrnoException | null, files: string[]) => {
      expect(error).not.toBeNull();
      expect(error!.message).toBe(mockError.message);
      expect(files).toEqual([]);
      done();
    });
  });
});
