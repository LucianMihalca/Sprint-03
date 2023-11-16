//Este módulo proporciona funciones para trabajar con archivos y directorios.
const fss = require("fs");

//módulo path de Node.js, utilizado para trabajar con rutas de archivos y directorios.
const path = require("path");

const directorio = process.argv[2]; //  Aquí estamos accediendo al tercer elemento del array process.argv,
const extension = '.' + process.argv[3]; //  Concatenas un punto . con el cuarto elemento de process.argv, formando así la extensión de archivo que quieres filtrar.


// Usas readdir del módulo fs para leer asincrónicamente el contenido del directorio especificado.
fss.readdir(directorio, (error:  NodeJS.ErrnoException, archivos: string[]) => {
  if (error) {
    console.error("Error al leer el directorio:", error);
    return;
  }

  archivos.forEach((archivo: string) => {

    //  Para cada archivo, utilizamos extname() del módulo path para obtener su extensión. 
    if (path.extname(archivo) === extension) {
      console.log(archivo);
    }
  });
});


/*
El método --> readdir() es parte del módulo fs (File System) en Node.js. 
Es utilizado para leer los contenidos de un directorio, 
para listar los archivos y subdirectorios que se encuentran dentro de un directorio especificado.
-----
El método --> extname() es parte del módulo path en Node.js. 
Se utiliza para extraer la extensión de un archivo.
Uso Común: Se utiliza comúnmente para filtrar archivos por tipo, 
realizar operaciones específicas basadas en el tipo de archivo, 
o para manipular nombres de archivos en diversas aplicaciones.



*/