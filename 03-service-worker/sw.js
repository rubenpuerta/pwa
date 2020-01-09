// CICLO DE VIDA DE SERVICEWORKER

// INSTALL: Instalacion del SW

self.addEventListener("install", event => {
  // Descargar assets
  // Creamos cache

  console.log("SW: Instalando SW");
  //   Fuerza la instalacion inmediata del SW
  //   self.skipWaiting();

  const instalacion = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("SW: Instalaciones terminadas");
      self.skipWaiting();
      resolve();
    }, 100);
  });

  event.waitUntil(instalacion);
});

// Cuando el SW toma el control de la aplicación
self.addEventListener("activate", event => {
  // Borrar cache viejo
  console.log("SW: Activo y listo para controlar la app");
});

// FETCH: Manejo de peticiones HTTP

// self.addEventListener("fetch", event => {
//   // Aplicar estrategias del cache
//   console.log("SW:", event.request.url);

//   if (event.request.url.includes("https://reqres.in/")) {
//     const resp = new Response(`{ ok: false, mensaje: 'jajaja }`);
//     event.respondWith(resp);
//   }
// });

// SYNC: Es cuando recuperamos la conexión a internet

self.addEventListener("sync", event => {
  console.log("SW: Tenemos conexión!");
  console.log(event);
  console.log(event.tag);
});

// PUSH: Manejar las push notifications
self.addEventListener("push", event => {
  console.log("SW: Notificacion recibida");
});
