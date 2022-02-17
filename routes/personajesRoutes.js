const app = require("express")();

const { urlencoded } = require("express");
const Personaje = require("../database/models/PersonajeDBModel");
const Pelicula = require("../database/models/PeliculaDBModel");
require("../database/asociaciones");

app.get("/characters", (req, res) => {
  // Punto 3 del challenge
  if (!req.query.name && !req.query.age && !req.query.movies) {
    Personaje.findAll({ attributes: { exclude: ["id", "edad", "peso", "historia"] } })
      .then((personajes) => {
        res.json(personajes);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  }
  //punto 6 del challenge
  else if (req.query.name) {
    Personaje.findAll({
      where: { nombre: req.query.name },
      attributes: { exclude: ["id", "edad", "peso", "historia"] },
    })
      .then((personajes) => {
        res.json(personajes);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  } else if (req.query.age) {
    Personaje.findAll({
      where: { edad: req.query.age },
      attributes: { exclude: ["id", "edad", "peso", "historia"] },
    })
      .then((personajes) => {
        res.json(personajes);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  } else {
    //Caso final req.query.movies
    Personaje.findAll({
      attributes: { exclude: ["id", "edad", "peso", "historia", "Peliculas"] },
      include: {
        model: Pelicula,
        where: { id: req.query.movie },
        attributes: {
          exclude: ["Peliculas", "id", "imagen", "titulo", "fecha", "calificacion", "generoId", "pelicula_x_personaje"],
        },
      },
    })
      .then((personajes) => {
        let personajes2 = personajes.map((unPersonaje) => {
          return { imagen: unPersonaje.imagen, nombre: unPersonaje.nombre };
        });

        res.json(personajes2);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  }
});

// Punto 5 del challenge

app.get("/character/:id", async (req, res) => {
  Personaje.findAll({
    where: { id: req.params.id },
    include: { model: Pelicula },
  })
    .then((personaje) => {
      res.json(personaje);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//LISTAR TODOS
app.get("/rawCharacters", (req, res) => {
  Personaje.findAll()
    .then((personajes) => {
      res.json(personajes);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//CREATE

app.post("/character", (req, res) => {
  Personaje.create({
    nombre: req.body.nombre,
    imagen: req.body.imagen,
    edad: req.body.edad,
    peso: req.body.peso,
    historia: req.body.historia,
  })
    .then((personaje) => {
      let listaPeliculas = req.body.peliculasAsociadas ? req.body.peliculasAsociadas : [];

      listaPeliculas.forEach((element) => {
        personaje
          .addPelicula(element)
          .then(() => {
            console.log("ok al asociar pelicula");
          })
          .catch(() => {
            console.log("error al asociar pelicula");
          });
      });

      res.json(personaje);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//READ

app.get("/character/:id", (req, res) => {
  Personaje.findByPk(req.params.id)
    .then((personaje) => {
      res.json(personaje);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//UPDATE

app.put("/character/:id", (req, res) => {
  Personaje.update(
    {
      nombre: req.body.nombre,
      imagen: req.body.imagen,
      edad: req.body.edad,
      peso: req.body.peso,
      historia: req.body.historia,
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

app.delete("/character/:id", (req, res) => {
  Personaje.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

module.exports = app;
