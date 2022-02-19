const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const fs = require("fs");

describe("Casos de testeo", () => {
  var server;
  var token = "Initial value";

  before(() => {
    console.log("Al iniciar casos de testeo");

    try {
      token = fs.readFileSync("./test/token.txt", "utf8");
      //console.log(token);
    } catch (err) {
      console.error(err);
    }

    server = require("../index");
  });

  beforeEach(() => {
    console.log("Antes de cada caso de testeo");
  });

  after(function (done) {
    server.close();
    done();
  });

  it("Obtener pagina principal", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  it("Acceder a un endpoint teniendo el token", function (done) {
    chai
      .request(server)
      .get("/characters")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("Intentar accecer a un endpoint sin token", (done) => {
    chai
      .request(server)
      .get("/characters")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }

        //console.log(res);
        res.should.have.status(513);
        done();
      });
  });

  /* Formato básico
  it("Caso 1", () => {
    assert(true, "True es true");
  });
*/
});
