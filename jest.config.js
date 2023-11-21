/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true, // Activa la recopilación de cobertura de código
  coverageDirectory: "coverage",
  modulePathIgnorePatterns: ["./dist"],
  // Directorio donde se almacenarán los informes de cobertura
};
