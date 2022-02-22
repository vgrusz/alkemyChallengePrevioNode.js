const app = require("express")();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { urlencoded } = require("express");
const Usuario = require("../database/models/UserDBModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.post("/auth/register", async (req, res) => {
  var clavePlana = req.body.clave ? req.body.clave : "";
  clavePlana = clavePlana + "";

  let claveEncriptada = await bcrypt.hash(clavePlana, 10);

  Usuario.create({
    email: req.body.email,
    clave: claveEncriptada,
  })
    .then((usuario) => {
      enviarEmaildeRegistracion(usuario.email);
      res.send("usuario creado con éxito");
    })
    .catch((error) => {
      res.status(400).send({ error: error.message });
    });
});

app.post("/auth/login", async (req, res) => {
  try {
    let usuario = await Usuario.findOne({ where: { email: req.body.email } });

    if (usuario == null) {
      throw new Error("No se encontró usuario");
    } else {
      let claveEsCorrecta = bcrypt.compareSync(req.body.clave, usuario.clave);

      if (claveEsCorrecta) {
        let tokenData = { usuario: usuario.email };

        let token = jwt.sign(tokenData, process.env.JWT_SECRET_WORD, { expiresIn: 60 * 60 * 24 });
        res.send(token);
      } else {
        throw new Error("Clave incorrecta");
      }
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

function enviarEmaildeRegistracion(email) {
  const msg = {
    to: email,
    from: "disneyapp@gdisney.com",
    subject: "Registración en DisneyApp",
    html: "<strong>Se ha completado el registro</strong>",
  };
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = app;
