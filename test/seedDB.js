const sequelize = require("../database/db");
const Genero = require("../database/models/GeneroDBModel");
const Personaje = require("../database/models/PersonajeDBModel");
const Pelicula = require("../database/models/PeliculaDBModel");
const Usuario = require("../database/models/UsuarioDBModel");
require("../database/asociaciones");

const generos = [
  { nombre: "Ficcion", imagen: "url img ficcion" },
  { nombre: "Animacion", imagen: "url img animacion" },
  { nombre: "Documental", imagen: "url img documental" },
];

const personajes = [
  { id: 1, nombre: "Mickey", imagen: "url img mickey", edad: 10, peso: 1, historia: "Un pequeño ratón" },
  { id: 2, nombre: "Pluto", imagen: "url img Pluto", edad: 50, peso: 5, historia: "Un perro" },
  { id: 3, nombre: "Elsa", imagen: "url img Elsa", edad: 20, peso: 2, historia: "Una princesa del frío" },
  { id: 4, nombre: "Cenicienta", imagen: "url img Cenicienta", edad: 3, peso: 10, historia: "El clásico infantil" },
];

const peliculas = [
  { id: 1, titulo: "Fantasía", imagen: "url img Fantasía", fecha: "01/01/1999", calificacion: 1, GeneroId: 1 },
  { id: 2, titulo: "Frozen 1", imagen: "url img Frozen", fecha: "01/01/1998", calificacion: 4, GeneroId: 2 },
  { id: 3, titulo: "Frozen 2", imagen: "url img Frozen2", fecha: "01/01/1997", calificacion: 2, GeneroId: 3 },
  { id: 4, titulo: "Cenicienta", imagen: "url img Cenicienta", fecha: "01-01-1996", calificacion: 3, GeneroId: 1 },
];

const personajes_x_peliculas = [
  { peliculaId: 1, personajeId: 1 },
  { peliculaId: 1, personajeId: 2 },
  { peliculaId: 2, personajeId: 3 },
  { peliculaId: 3, personajeId: 3 },
  { peliculaId: 4, personajeId: 4 },
  /*
  {peliculaId: ,personajeId: }
  {peliculaId: ,personajeId: }
  {peliculaId: ,personajeId: }
  {peliculaId: ,personajeId: }
  {peliculaId: ,personajeId: }
  {peliculaId: ,personajeId: }
  {peliculaId: ,personajeId: }
  {peliculaId: ,personajeId: }
  {peliculaId: ,personajeId: }
  {peliculaId: ,personajeId: }
  {peliculaId: ,personajeId: }
*/
];

function rellenar() {
  console.log("rellenar");
  sequelize.sync({ force: true }).then(() => {
    setTimeout(() => {
      generos.forEach((genero) => Genero.create(genero));

      personajes.forEach((personaje) => Personaje.create(personaje));

      peliculas.forEach((pelicula) => Pelicula.create(pelicula));

      setTimeout(() => {
        personajes_x_peliculas.forEach(async (unElemento) => {
          let consulta =
            "INSERT INTO pelicula_x_personaje (`PeliculaId`, `PersonajeId`) VALUES (" +
            unElemento.peliculaId +
            "," +
            unElemento.personajeId +
            ")";

          try {
            sequelize.query(consulta);
          } catch (error) {
            console.log(error);
          }
        });
      }, 15000);
    }, 15000);

    //Brinda 5 segundos al servidor para actualizar sus índices y que no dé error de validación
  });
}

module.exports = rellenar;