// Interceptar la imagen main.jpg y reemplazarla por otra
self.addEventListener("fetch", event => {
  if (event.request.url.includes("main.jpg")) {
    console.log(event.request.url);
    let fotoReq = fetch("./img/main-patas-arriba.jpg");
    // let fotoReq = fetch(event.request.url);
    // let fotoReq = fetch(event.request);
    event.respondWith(fotoReq);
  }
});
