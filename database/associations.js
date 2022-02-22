const Personaje = require("./models/CharacterDBModel");
const Pelicula = require("./models/MovieDBModel");
const Genero = require("./models/GenreDBModel");

Genero.hasMany(Pelicula, {
  foreignKey: {
    allowNull: false,
  },
});

Pelicula.belongsTo(Genero);

Pelicula.belongsToMany(Personaje, { through: "pelicula_x_personaje", timestamps: false });
Personaje.belongsToMany(Pelicula, { through: "pelicula_x_personaje" });
