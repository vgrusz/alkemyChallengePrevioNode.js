const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  let token = req.headers["authorization"] ? req.headers["authorization"] : "";

  token = token.replace("Bearer ", "");

  jwt.verify(token, process.env.JWT_SECRET_WORD, (error, user) => {
    if (error) {
      res.status(401).send("Error: wrong token or user not logged in");
    } else {
      next();
    }
  });
}

module.exports = auth;
