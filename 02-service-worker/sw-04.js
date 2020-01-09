// Control de errores 404
self.addEventListener("fetch", event => {
  const resp = fetch(event.request).then(resp =>
    resp.ok ? resp : fetch("img/main.jpg")
  );
  event.respondWith(resp);
});
