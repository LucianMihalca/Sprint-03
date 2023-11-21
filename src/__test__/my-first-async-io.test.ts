import fs from 'fs';
import contarLineas from '../my-first-async-io';

describe('contarLineas', () => {
  const testFilePath = 'test.txt';

  beforeEach(() => {
    // Crear un archivo de prueba antes de cada test
    fs.writeFileSync(testFilePath, 'Contenido del archivo\nOtra línea\n');
  });

  afterEach(() => {
    // Eliminar el archivo de prueba después de cada test
    fs.unlinkSync(testFilePath);
  });

  it('debe contar correctamente el número de líneas en un archivo', async () => {
    await expect(contarLineas(testFilePath)).resolves.toBe(2);
  });

  // Otros tests...
});
