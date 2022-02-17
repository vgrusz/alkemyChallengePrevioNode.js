const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Genero extends Model {}
Genero.init(
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    imagen: DataTypes.STRING,

    //Peliculas asociadas
  },
  {
    sequelize,
    modelName: "Genero",
    timestamps: false,
  }
);

module.exports = Genero;
