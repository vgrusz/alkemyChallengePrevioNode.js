const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const fs = require("fs");

describe("Suite de prueba inicial que crea un usuario, lo loguea, obtiene el token y guarda el token en un archivo de texto para ser usado por la siguiente suite de test", () => {
  var server;

  before(async () => {
    console.log("Al iniciar casos de testeo");

    server = require("../index");
  });

  beforeEach(() => {
    console.log("Antes de cada caso de testeo");
  });

  after(function (done) {
    server.close();
    done();
  });

  it("Crear un usuario", (done) => {
    chai
      .request(server)
      .post("/auth/register")
      .send({ email: "a@a.com", clave: "123" })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  it("Loguear un usuario", (done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({ email: "a@a.com", clave: "123" })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }

        try {
          fs.writeFileSync("./test/token.txt", res.text);
        } catch (err) {
          console.error(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  /* Formato básico
  it("Caso 1", () => {
    assert(true, "True es true");
  });
*/
});
