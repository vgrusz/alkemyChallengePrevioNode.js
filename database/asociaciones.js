const Personaje = require("./models/PersonajeDBModel");
const Pelicula = require("./models/PeliculaDBModel");
const Genero = require("./models/GeneroDBModel");

Genero.hasMany(Pelicula, {
  foreignKey: {
    allowNull: false,
  },
});

Pelicula.belongsTo(Genero);

Pelicula.belongsToMany(Personaje, { through: "pelicula_x_personaje", timestamps: false });
Personaje.belongsToMany(Pelicula, { through: "pelicula_x_personaje" });
