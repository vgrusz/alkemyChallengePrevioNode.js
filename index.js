const express = require("express");
const app = express();

const sequelize = require("./database/db");
const personajesRoutes = require("./routes/personajesRoutes");
const peliculasRoutes = require("./routes/peliculasRoutes");
const generosRoutes = require("./routes/generosRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const unless = require("express-unless");
const auth = require("./middleware/middleware");

require("./database/asociaciones");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//IMPORTANTE este middleware debe estar antes que las rutas.
auth.unless = unless;
app.use(
  auth.unless({
    path: [
      { url: "/auth/login", methods: ["POST"] },
      { url: "/auth/register", methods: ["POST"] },
    ],
  })
);

app.use(personajesRoutes);
app.use(peliculasRoutes);
app.use(generosRoutes);
app.use(usuarioRoutes);

// Inicio del servidor y conexión a la BD

const PORT = process.env.PORT || 3000;

// Ruta de testeo inicial
app.get("/", function (req, res) {
  res.send("Hola mundo");
});

app.listen(PORT, function () {
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
