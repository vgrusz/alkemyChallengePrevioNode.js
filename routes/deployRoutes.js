const app = require("express")();

const { urlencoded } = require("express");

//LISTAR TODOS

app.post("/resetPopulateDB", (req, res) => {
  require("../test/resetSeedDB");
  res.send("Petición enviada - El resultado se verifica en logs y en BD");
});

module.exports = app;
