// Exporta una constante llamada 'sayHello', que es una función.
export const sayHello = (message: string) => {
  // La función imprime en la consola el mensaje recibido como argumento.
  console.log(message);
};

// Llama a la función 'sayHello' pasando el string "HELLO WORLD" como argumento.
sayHello("HELLO WORLD");

/*
  Comentario Final:
  Este script define y exporta una función llamada `sayHello`, la cual acepta un parámetro `message` de tipo `string`.
  Cuando se invoca esta función, imprime el valor de `message` en la consola. Al final del script, se hace una llamada
  a esta función con el argumento "HELLO WORLD", resultando en que se imprima este texto en la consola. 
  Este tipo de función es útil para mostrar mensajes o datos en la consola, lo cual es común durante el desarrollo o la depuración de código.
*/
