const express = require("express");
const app = express();

const sequelize = require("./database/db");
const charactersRoutes = require("./routes/charactersRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const genresRoutes = require("./routes/genresRoutes");
const usersRoutes = require("./routes/usersRoutes");
const deployRoutes = require("./routes/deployRoutes");
const unless = require("express-unless");
const auth = require("./middleware/middleware");

require("./database/associations");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//IMPORTANTE este middleware debe estar antes que las rutas.
auth.unless = unless;
app.use(
  auth.unless({
    path: [
      { url: "/auth/login", methods: ["POST"] },
      { url: "/auth/register", methods: ["POST"] },
      { url: "/resetPopulateDB", methods: ["POST"] },
      { url: "/", methods: ["GET"] },
    ],
  })
);

app.use(charactersRoutes);
app.use(moviesRoutes);
app.use(genresRoutes);
app.use(usersRoutes);

//Rutas para pruebas iniciales, eliminar luego.
app.use(deployRoutes);

// Inicio del servidor y conexión a la BD

const PORT = process.env.PORT || 3000;

// Ruta de testeo inicial
app.get("/", function (req, res) {
  res.send("Hola mundo");
});

const server = app.listen(PORT, function () {
  console.log(`App en http://localhost:${PORT}\n`);

  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Conexión a BD ok");
    })
    .catch((error) => {
      console.log("Error al conectar a DB", error);
    });
});

module.exports = server;
