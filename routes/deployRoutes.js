const app = require("express")();

const { urlencoded } = require("express");

//Ruta para llenar inicialmente la BD con set de datos de prueba.
//Únicamente con propósitos de testeo.
//Eliminar luego de fase de pruebas.

app.post("/resetPopulateDB", (req, res) => {
  require("../test/resetSeedDB");
  res.send("Petición enviada - El resultado se verifica en logs y en BD");
});

module.exports = app;
