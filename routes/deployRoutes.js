const app = require("express")();

const { urlencoded } = require("express");

//This route is only for initial testing, delete after

app.post("/resetPopulateDB", (req, res) => {
  require("../test/resetSeedDB");
  res.send("Request sent - Check logs and DB to confirm");
});

module.exports = app;
