function sumarLento(numero) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(numero + 1);
    }, 800);
  });
}

let sumarRapido = numero =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      // resolve(numero + 1)
      reject("Error en sumar rápido");
    }, 300)
  );

Promise.race([sumarLento(5), sumarRapido(10)])
  .then(respuesta => {
    console.log(respuesta);
  })
  .catch(console.log);
