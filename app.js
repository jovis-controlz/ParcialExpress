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

let listJuegos = [];

appServer.post("/crearJuego", (req, res) => {
  
  let juego = {};
  juego.id = req.body.id;
  juego.titulo = req.body.titulo;
  juego.estudio = req.body.estudio;
  juego.lanzamiento = req.body.lanzamiento;
  juego.descripcion = req.body.descripcion;
  juego.edadmin = req.body.edadmin;
  listJuegos.push(juego);

  res.send(juego);
  console.log("JUEGO CREADO");
  console.log(listJuegos);
});

appServer.delete("/eliminarJuego/:idJuego", (req, res) => {
  listJuegos = listJuegos.filter(juego => juego.id != req.params.idJuego);
  console.log("JUEGO ELIMINADO");
  console.log(listJuegos);
  res.send(listJuegos);
});

appServer.get("/mostrarJuegos", (req, res) => {
  res.send(listJuegos);
  console.log("LISTA DE JUEGOS:");
  console.log(listJuegos);
});

appServer.get("/mostrarJuegoid/:idjuego", (req, res) => {
  let juego = listJuegos.find(element => element.id == req.params.idjuego);
  console.log("JUEGO CON ID: " + req.params.idjuego);
  console.log(juego);
  res.send(juego);
});

appServer.get("/mostrarJuegoNom/:titulo", (req, res) => {
  let juego = listJuegos.find(element => element.titulo == req.params.titulo);
  console.log("JUEGO CON NOMBRE: " + req.params.titulo);
  console.log(juego);
  res.send(juego);
});

appServer.get("/mostrarLanzamiento/:lanzamiento", (req, res) => {
  let juego = listJuegos.filter(element => element.lanzamiento < req.params.lanzamiento);
  console.log("JUEGOS CON AÑO MENOR A: " + req.params.lanzamiento);
  console.log(juego);
  res.send(juego);
});