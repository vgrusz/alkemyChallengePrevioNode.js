const app = require("express")();

const { urlencoded } = require("express");
const Genre = require("../database/models/GenreDBModel");

//LISTAR TODOS

app.get("/genres", (req, res) => {
  Genre.findAll()
    .then((genres) => {
      res.json(genres);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//CREATE
app.post("/genre", (req, res) => {
  Genre.create({
    nombre: req.body.nombre,
    imagen: req.body.imagen,
  })
    .then((genre) => {
      res.json(genre);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//READ

app.get("/genre/:id", (req, res) => {
  Genre.findByPk(req.params.id)
    .then((genre) => {
      res.json(genre);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//UPDATE
app.put("/genre/:id", (req, res) => {
  Genre.update(
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

app.delete("/genre/:id", (req, res) => {
  Genre.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

module.exports = app;
