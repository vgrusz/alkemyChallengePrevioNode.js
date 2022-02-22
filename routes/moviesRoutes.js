const app = require("express")();

const { urlencoded } = require("express");
const Pelicula = require("../database/models/MovieDBModel");
const Personaje = require("../database/models/CharacterDBModel");

//LISTAR TODOS EN FORMATO DEL PUNTO 7 Y 10 DEL CHALLENGE

app.get("/movies", (req, res) => {
  // Punto 7 del challenge
  if (!req.query.name && !req.query.genre && !req.query.order) {
    Pelicula.findAll({ attributes: { exclude: ["id", "calificacion", "GeneroId"] } })
      .then((peliculas) => {
        res.json(peliculas);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  }
  //punto 10 del challenge
  else if (req.query.name) {
    Pelicula.findAll({
      where: { titulo: req.query.name },
      attributes: { exclude: ["id", "calificacion", "GeneroId"] },
    })
      .then((peliculas) => {
        res.json(peliculas);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  } else if (req.query.genre) {
    Pelicula.findAll({
      where: { GeneroId: req.query.genre },
      attributes: { exclude: ["id", "calificacion", "GeneroId"] },
    })
      .then((peliculas) => {
        res.json(peliculas);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  } else {
    // /movie/order?XXX

    console.log(req.query.order);
    Pelicula.findAll({
      attributes: { exclude: ["id", "calificacion", "GeneroId"] },
      order: [["fecha", req.query.order]],
    })
      .then((peliculas) => {
        res.json(peliculas);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  }
});

//LISTAR TODOS
app.get("/rawMovies", (req, res) => {
  Pelicula.findAll()
    .then((peliculas) => {
      res.json(peliculas);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//CREATE
app.post("/movie", (req, res) => {
  Pelicula.create({
    imagen: req.body.imagen,
    titulo: req.body.titulo,
    fecha: req.body.fecha,
    calificacion: req.body.calificacion,
    GeneroId: req.body.GeneroId,
  })
    .then((pelicula) => {
      res.json(pelicula);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//READ

//Punto 8 del challenge

app.get("/movie/:id", (req, res) => {
  Pelicula.findByPk(req.params.id, {
    include: { model: Personaje },
  })
    .then((pelicula) => {
      res.json(pelicula);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//UPDATE
app.put("/movie/:id", (req, res) => {
  Pelicula.update(
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
  Pelicula.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

module.exports = app;
