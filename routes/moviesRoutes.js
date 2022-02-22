const app = require("express")();

const { urlencoded } = require("express");
const Movie = require("../database/models/MovieDBModel");
const Character = require("../database/models/CharacterDBModel");

//LISTAR TODOS EN FORMATO DEL PUNTO 7 Y 10 DEL CHALLENGE

app.get("/movies", (req, res) => {
  // Punto 7 del challenge
  if (!req.query.name && !req.query.genre && !req.query.order) {
    Movie.findAll({ attributes: { exclude: ["id", "calificacion", "GeneroId"] } })
      .then((movies) => {
        res.json(movies);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  }
  //punto 10 del challenge
  else if (req.query.name) {
    Movie.findAll({
      where: { titulo: req.query.name },
      attributes: { exclude: ["id", "calificacion", "GeneroId"] },
    })
      .then((movies) => {
        res.json(movies);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  } else if (req.query.genre) {
    Movie.findAll({
      where: { GeneroId: req.query.genre },
      attributes: { exclude: ["id", "calificacion", "GeneroId"] },
    })
      .then((movies) => {
        res.json(movies);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  } else {
    // /movie/order?XXX

    console.log(req.query.order);
    Movie.findAll({
      attributes: { exclude: ["id", "calificacion", "GeneroId"] },
      order: [["fecha", req.query.order]],
    })
      .then((movies) => {
        res.json(movies);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  }
});

//LIST ALL
app.get("/rawMovies", (req, res) => {
  Movie.findAll()
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//CREATE
app.post("/movie", (req, res) => {
  Movie.create({
    imagen: req.body.imagen,
    titulo: req.body.titulo,
    fecha: req.body.fecha,
    calificacion: req.body.calificacion,
    GeneroId: req.body.GeneroId,
  })
    .then((movie) => {
      res.json(movie);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//READ

//Punto 8 del challenge

app.get("/movie/:id", (req, res) => {
  Movie.findByPk(req.params.id, {
    include: { model: Character },
  })
    .then((movie) => {
      res.json(movie);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//UPDATE
app.put("/movie/:id", (req, res) => {
  Movie.update(
    {
      imagen: req.body.imagen,
      titulo: req.body.titulo,
      fecha: req.body.fecha,
      calificacion: req.body.calificacion,
      GeneroId: req.body.GeneroId,
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

app.delete("/movie/:id", (req, res) => {
  Movie.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

module.exports = app;
