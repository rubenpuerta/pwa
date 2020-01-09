// Routes.js - Módulo de rutas
const express = require("express");
const push = require("./push");
const router = express.Router();

const mensajes = [
  {
    _id: "XXX",
    user: "spiderman",
    mensaje: "Hola Mundo"
  }
];

// Get mensajes
router.get("/", function(req, res) {
  // res.json('Obteniendo mensajes');
  res.json(mensajes);
});

// Post mensaje
router.post("/", function(req, res) {
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push(mensaje);

  console.log(mensajes);

  res.json({
    ok: true,
    mensaje
  });
});

// Almacenar la suscripción
router.post("/subscribe", (req, res) => {
  const suscripcion = req.body;

  push.addSubscription(suscripcion);
  console.log(suscripcion);
  res.json("suscripción");
});

router.get("/key", (req, res) => {
  const key = push.getKey();
  res.send(key);
});

// Enviar una notificacion push a las personas que nosotros queramos
// ESTO ES ALGO QUE SE CONROLA DEL LADO DE SERVE NORMALMENTE
router.post("/push", (req, res) => {
  const post = {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    usuario: req.body.usuario
  };

  push.sendPush(post);

  res.json(post);
});

module.exports = router;
