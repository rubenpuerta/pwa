// const CACHE_NAME = "cache-1";

const CACHE_STATIC_NAME = "static-v2";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";

const CACHE_DYNAMIC_LIMIT = 50;

function liampiarCache(cacheName, numeroItems) {
  caches.open(cacheName).then(cache => {
    return cache.keys().then(keys => {
      if (keys.length > numeroItems) {
        cache.delete(keys[0]).then(liampiarCache(cacheName, numeroItems));
      }
    });
  });
}

self.addEventListener("install", e => {
  const staticCache = caches.open(CACHE_STATIC_NAME).then(cache => {
    return cache.addAll([
      "/",
      "/index.html",
      "/css/style.css",
      "/img/main.jpg",
      "/img/no-img.jpg",
      "/js/app.js"
    ]);
  });
  const inmutableCache = caches.open(CACHE_INMUTABLE_NAME).then(cache => {
    return cache.addAll([
      "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    ]);
  });
  e.waitUntil(Promise.all([staticCache, inmutableCache]));
});

self.addEventListener("fetch", e => {
  //  1 - Cache Only
  // Es usada cuando queremos que toda la aplicacion sea servida desde el cache.
  // Todo sale de la cache. La infomacion no se actualiza si no se actualiza el SW
  // e.respondWith(caches.match(e.request));
  //
  //
  // 2 - Cache (first) Network Fallback
  // Intenta primero cache y si no esta, ve a internet a buscarlo y lo guarda en cache
  //   const respuesta = caches.match(e.request).then(resp => {
  //     // Si existe ese fetch en cache, lo devuelve
  //     if (resp) return resp;
  //     console.log("SW: No existe:", e.request.url);
  //     // Si no existe hay que ir a la web
  //     return fetch(e.request).then(newResp => {
  //       caches.open(CACHE_DYNAMIC_NAME).then(cache => {
  //         cache.put(e.request, newResp);
  //         liampiarCache(CACHE_DYNAMIC_NAME, 50);
  //       });
  //       return newResp.clone();
  //     });
  //   });
  //   e.respondWith(respuesta);
  //
  // 3. Network (first) with cache Fallback
  //   const respuesta = fetch(e.request)
  //     .then(resp => {
  //       if (!resp) return caches.match(e.request);
  //       caches.open(CACHE_DYNAMIC_NAME).then(cache => {
  //         cache.put(e.request, resp);
  //         liampiarCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
  //       });
  //       return resp.clone();
  //     })
  //     .catch(err => {
  //       return caches.match(e.request);
  //     });
  //   e.respondWith(respuesta);
  //
  // 4. Cache (first) with network update ( Para rendimiento critico )
  // Las actualizaciones siempre estaran un paso por detras

  //   //Busca en los inmutables
  //   if (e.request.url.includes("/4.1.3/css/bootstrap.min.css")) {
  //     return e.respondWith(caches.match(e.request));
  //   }

  //   const respuesta = caches.open(CACHE_STATIC_NAME).then(cache => {
  //     fetch(e.request).then(newRes => cache.put(e.request, newRes));
  //     return cache.match(e.request);
  //   });

  //   e.respondWith(respuesta);
  //
  // Cache & Network Race

  const respuesta = new Promise((resolve, reject) => {
    let rechazada = false;

    const falloUnaVez = () => {
      if (rechazada) {
        if (/\.(png|jpg)$/i.test(e.request.url)) {
          resolve(caches.match("/img/no-img.jpg"));
        } else {
          reject("No se encontro respuesta");
        }
      } else {
        rechazada = true;
      }
    };

    fetch(e.request)
      .then(res => {
        res.ok ? resolve(res) : falloUnaVez();
      })
      .catch(falloUnaVez);

    caches
      .match(e.request)
      .then(res => {
        res ? resolve(res) : falloUnaVez();
      })
      .catch(falloUnaVez);
  });

  e.respondWith(respuesta);
});
