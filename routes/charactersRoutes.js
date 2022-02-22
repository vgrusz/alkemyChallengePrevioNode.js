const app = require("express")();

const { urlencoded } = require("express");
const Character = require("../database/models/CharacterDBModel");
const Movie = require("../database/models/MovieDBModel");
require("../database/associations");

app.get("/characters", (req, res) => {
  // Punto 3 del challenge
  if (!req.query.name && !req.query.age && !req.query.movies) {
    Character.findAll({ attributes: { exclude: ["id", "edad", "peso", "historia"] } })
      .then((characters) => {
        res.json(characters);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  }
  //punto 6 del challenge
  else if (req.query.name) {
    Character.findAll({
      where: { nombre: req.query.name },
      attributes: { exclude: ["id", "edad", "peso", "historia"] },
    })
      .then((characters) => {
        res.json(characters);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  } else if (req.query.age) {
    Character.findAll({
      where: { edad: req.query.age },
      attributes: { exclude: ["id", "edad", "peso", "historia"] },
    })
      .then((characters) => {
        res.json(characters);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  } else {
    //Caso final req.query.movies
    Character.findAll({
      attributes: { exclude: ["id", "edad", "peso", "historia", "Peliculas"] },
      include: {
        model: Movie,
        where: { id: req.query.movies },
        attributes: {
          exclude: ["Peliculas", "id", "imagen", "titulo", "fecha", "calificacion", "generoId", "pelicula_x_personaje"],
        },
      },
    })
      .then((characters) => {
        //Quita los campos no solicitados
        let characters2 = characters.map((unPersonaje) => {
          return { imagen: unPersonaje.imagen, nombre: unPersonaje.nombre };
        });

        res.json(characters2);
      })
      .catch((error) => {
        res.status(400).send({ error: error.message });
      });
  }
});

// Punto 5 del challenge

app.get("/character/:id", async (req, res) => {
  Character.findAll({
    where: { id: req.params.id },
    include: { model: Movie },
  })
    .then((character) => {
      res.json(character);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//LISTAR TODOS
app.get("/rawCharacters", (req, res) => {
  Character.findAll()
    .then((characters) => {
      res.json(characters);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//CREATE

app.post("/character", (req, res) => {
  Character.create({
    nombre: req.body.nombre,
    imagen: req.body.imagen,
    edad: req.body.edad,
    peso: req.body.peso,
    historia: req.body.historia,
  })
    .then((character) => {
      let listaPeliculas = req.body.peliculasAsociadas ? req.body.peliculasAsociadas : [];

      listaPeliculas.forEach((element) => {
        character
          .addPelicula(element)
          .then(() => {
            console.log("ok al asociar pelicula");
          })
          .catch(() => {
            console.log("error al asociar pelicula");
          });
      });

      res.json(character);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//READ

app.get("/character/:id", (req, res) => {
  Character.findByPk(req.params.id)
    .then((character) => {
      res.json(character);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

//UPDATE

app.put("/character/:id", (req, res) => {
  Character.update(
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
  Character.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

module.exports = app;
