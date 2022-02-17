const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let token = req.headers["authorization"] ? req.headers["authorization"] : "";

  token = token.replace("Bearer ", "");

  jwt.verify(token, "Secret", (error, usuario) => {
    if (error) {
      res.send("Error de token y/o usuario no logueado");
    } else {
      next();
    }
  });
}

module.exports = auth;
