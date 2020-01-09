if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js");
}

// VERIFICA SI SE PUEDE USAR CACHE STORAGE
if (window.caches) {
  // INTENTA ABRIR LA INFORMACION CON ESTA ETIQUETA, SI NO EXISTE LA CREA
  caches.open("prueba-1");

  caches.open("prueba-2");

  //   PREGUNTA SI EXISTE CACHE CON EL NOMBRE "PRUEBA-2"
  caches.has("prueba-2").then(console.log);

  // BORRA LA CACHE
  //    caches.delete("prueba-1").then(console.log);

  caches.open("cache-v1.1").then(cache => {
    //   cache.add("../index.html");
    cache
      .addAll(["/index.html", "/css/style.css", "/img/main.jpg"])
      .then(() => {
        // BORRA EL ARCHICO STYLE.CSS DE LA CACHE
        // cache.delete("/css/style.css");

        // REEMPLAZA EL CONTENIDO DE SE ARCHIVO POR LO QUE SE ESPECIFIQUE COMO RESPONSE
        cache.put("index.html", new Response("Hola Mundo"));
      });
    // PREGUNTA SI EXISTE ESE ARCHIVO EN LA CACHE Y LO ABRE
    // cache.match("/index.html").then(resp => {
    //   resp.text().then(console.log);
    // });
  });

  caches.keys().then(console.log);
}
