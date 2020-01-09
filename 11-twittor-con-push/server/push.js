const fs = require("fs");

const urlSafeBase64 = require("urlsafe-base64");
const vapid = require("./vapid.json");
const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:rupubu@gmail.com",
  vapid.publicKey,
  vapid.privateKey
);

let suscripciones = require("./subs-db.json");

module.exports.getKey = () => {
  return urlSafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = suscripcion => {
  suscripciones.push(suscripcion);
  fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones));
};

module.exports.sendPush = post => {
  console.log("Enviando push");

  const notificacionesEnviadas = [];

  suscripciones.forEach((suscripcion, i) => {
    const pushProm = webpush
      .sendNotification(suscripcion, JSON.stringify(post))
      .then(console.log("Notificaion enviada"))
      .catch(err => {
        console.log("NOTIFICACIÓN FALLÓ");
        if (err.statusCode === 410) {
          // GONE. Ya no existe
          suscripciones[i].borrar = true;
        }
        console.log(err);
      });
    notificacionesEnviadas.push(pushProm);
  });
  Promise.all(notificacionesEnviadas).then(() => {
    suscripciones = suscripciones.filter(subs => !subs.borrar);
    fs.writeFileSync(
      `${__dirname}/subs-db.json`,
      JSON.stringify(suscripciones)
    );
  });
};
