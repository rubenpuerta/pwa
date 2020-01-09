// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajes
const db = new PouchDB("mensajes");

// db.changes({
//   since: "now",
//   live: true
// }).on("change", showMessages);

function getMessages() {
  return db.allDocs({ include_docs: true, descending: true });
}

// 2- Insertar en la base de datos
function addMessage(veces) {
  for (let index = 0; index < veces; index++) {
    // Objeto a grabar en base de datos

    let mensaje = {
      _id: new Date().toISOString() + index,
      user: "spiderman",
      mensaje: "Mi tía hizo unos panqueques muy buenos",
      sincronizado: false
    };
    db.put(mensaje)
      .then(console.log("Insertado"))
      .catch(console.log);
  }
}

// 3- Leer todos los mensajes offline
// y que aparezcan en la consola
async function showMessages() {
  const elemento = document.querySelector("#PintaAqui");
  getMessages().then(messages => {
    messages.rows.forEach(row => {
      let doc = row.doc;
      console.log(doc);
      elemento.innerHTML += `<p>${JSON.stringify(doc)}</p>`;
    });
  });
}

// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE
function updateMessage() {
  getMessages().then(messages => {
    messages.rows.forEach(row => {
      let doc = row.doc;
      doc.sincronizado = true;
      db.put(doc);
    });
  });
}

// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización
function deleteMessage() {
  getMessages()
    .then(doc => {
      doc.rows.forEach(row => {
        let doc = row.doc;
        if (doc.sincronizado) {
          db.remove(doc).then(console.log("Borrado"));
        }
      });
    })
    .catch(console.log);
}

// addMessage(10);
showMessages();
// updateMessage();
deleteMessage();
