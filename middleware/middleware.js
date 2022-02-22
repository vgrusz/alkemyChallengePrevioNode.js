const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let token = req.headers["authorization"] ? req.headers["authorization"] : "";

  token = token.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET_WORD, (error, usuario) => {
    if (error) {
      res.status(401).send("Error de token y/o usuario no logueado");
    } else {
      next();
    }
  });
}

module.exports = auth;
