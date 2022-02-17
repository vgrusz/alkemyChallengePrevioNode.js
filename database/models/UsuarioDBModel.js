const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Usuario extends Model {}
Usuario.init(
  {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,

      validate: { isEmail: true },
    },
    clave: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Usuario",
    timestamps: false,
  }
);

module.exports = Usuario;
