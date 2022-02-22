const app = require("express")();

const { urlencoded } = require("express");
const Genero = require("../database/models/GenreDBModel");

//LISTAR TODOS

app.get("/generos", (req, res) => {
  Genero.findAll()
    .then((generos) => {
      res.json(generos);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//CREATE
app.post("/genero", (req, res) => {
  Genero.create({
    nombre: req.body.nombre,
    imagen: req.body.imagen,
  })
    .then((genero) => {
      res.json(genero);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//READ

app.get("/genero/:id", (req, res) => {
  Genero.findByPk(req.params.id)
    .then((genero) => {
      res.json(genero);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//UPDATE
app.put("/genero/:id", (req, res) => {
  Genero.update(
    {
      nombre: req.body.nombre,
      imagen: req.body.imagen,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//DELETE

app.delete("/genero/:id", (req, res) => {
  Genero.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

module.exports = app;
