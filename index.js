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

//IMPORTANT this middleware must be before the rest of routes.
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

//For initial testing only, delete after.
app.use(deployRoutes);

// Server initialize and DB connection

const PORT = process.env.PORT || 3000;

// Initial testing route
app.get("/", function (req, res) {
  res.send("Hello world");
});

const server = app.listen(PORT, function () {
  console.log(`App on http://localhost:${PORT}\n`);

  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Connection to BD ok");
    })
    .catch((error) => {
      console.log("Error connecting to DB", error);
    });
});

module.exports = server;
