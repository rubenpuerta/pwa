// Interceptar llamada a archivo y no devolver nada
self.addEventListener("fetch", event => {
  console.log(event);
  if (event.request.url.includes("style.css")) {
    event.respondWith(null);
  } else {
    event.respondWith(fetch(event.request));
  }
});
