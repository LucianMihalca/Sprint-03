import { suma } from "../baby-steps";

describe("Pruebas para el script de suma", () => {
  it("Debe sumar un conjunto de números correctamente", () => {
    expect(suma(["1", "2", "3"])).toBe(6);
  });

  it("Debe sumar correctamente un conjunto de números que incluyen negativos", () => {
    expect(suma(["-1", "2", "-3"])).toBe(-2);
  });
  it("Debe sumar correctamente cuando se incluyen ceros y strings vacíos", () => {
    expect(suma(["", "0", "5"])).toBe(5);
  });
});
