const fsa = require("fs");

const ruta: string = process.argv[2];
fsa.readFile(ruta, "utf8", (error: NodeJS.ErrnoException | null, data: string) => {
  if (error) {
    return console.log(error);
  }
  const numLineas: number = data.split("\n").length - 1;
  console.log(numLineas);
});
