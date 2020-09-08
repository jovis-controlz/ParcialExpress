const express = require("express");
const boxen = require("boxen");
const juego = require("./juego");


const appServer = express();

appServer.listen(3000, () => {
  console.log(
    boxen("SERVER IS RUNNING ON PORT 3000", {
      padding: 1,
      borderColor: "green",
    })
  );
});


appServer.use(express.json());

let list_juegos = [];

appServer.post("/crearjuego", (req, res) => {
  
  let juego = {};
  juego.id = req.body.id;
  juego.titulo = req.body.titulo;
  juego.estudio = req.body.estudio;
  juego.lanzamiento = req.body.lanzamiento;
  juego.descripcion = req.body.descripcion;
  juego.edadmin = req.body.edadmin;
  list_juegos.push(juego);

  res.send(juego);
  console.log("JUEGO CREADO");
  console.log(list_juegos);
});

appServer.delete("/eliminarjuego/:idjuego", (req, res) => {
  list_juegos = list_juegos.filter(juego => juego.id != req.params.idjuego);
  console.log("JUEGO ELIMINADO");
  console.log(list_juegos);
  res.send(list_juegos);
});

appServer.get("/mostrarjuegos", (req, res) => {
  res.send(list_juegos);
  console.log("LISTA DE JUEGOS:");
  console.log(list_juegos);
});

appServer.get("/mostrarjuegoid/:idjuego", (req, res) => {
  let juego = list_juegos.find(element => element.id == req.params.idjuego);
  console.log("JUEGO CON ID: " + req.params.idjuego);
  console.log(juego);
  res.send(juego);
});

appServer.get("/mostrarjuegonom/:titulo", (req, res) => {
  let juego = list_juegos.find(element => element.titulo == req.params.titulo);
  console.log("JUEGO CON NOMBRE: " + req.params.titulo);
  console.log(juego);
  res.send(juego);
});

appServer.get("/mostrarlanzamiento/:lanzamiento", (req, res) => {
  let juego = list_juegos.filter(element => element.lanzamiento < req.params.lanzamiento);
  console.log("JUEGOS CON AÑO MENOR A: " + req.params.lanzamiento);
  console.log(juego);
  res.send(juego);
});