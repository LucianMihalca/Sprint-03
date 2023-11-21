import { sayHello } from "../hello-world";


describe('Pruebas para sayHello', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock para console.log antes de cada prueba
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    // Limpiar el mock después de cada prueba
    consoleSpy.mockRestore();
  });

  it('debe llamar a console.log con un mensaje específico', () => {
    sayHello("HELLO WORLD");
    expect(consoleSpy).toHaveBeenCalledWith("HELLO WORLD");
  });

  it('debe llamar a console.log con diferentes mensajes', () => {
    const mensajes = ["Mensaje 1", "Mensaje 2", "Mensaje 3"];
    mensajes.forEach(mensaje => {
      sayHello(mensaje);
      expect(consoleSpy).toHaveBeenCalledWith(mensaje);
    });
  });

  it('no debería llamar a console.log si sayHello no se invoca', () => {
    // No llamamos a sayHello aquí
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  
});
