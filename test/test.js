const chai = require("chai");

const seed = require("./seedDB");

const assert = chai.assert;

const chaiHttp = require("chai-http");

const should = chai.should();

chai.use(chaiHttp);

const rellenar = require("./seedDB");

describe("Casos de testeo", () => {
  var server;

  before(async () => {
    console.log("Al iniciar casos de testeo");

    //await rellenar();

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
        console.log(res.text);
        res.should.have.status(200);
        done();
      });
  });

  var token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYUBhLmNvbSIsImlhdCI6MTY0NTIzMjUzMywiZXhwIjoxNjQ1MzE4OTMzfQ.Ujm-NjIIyB4wnwWToK5mqt5sLK5iKqsT928WO11LSB4";

  it("Get some random Info", function (done) {
    chai
      .request(server)
      .get("/characters")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        //console.log(res.body);
        res.should.have.status(200);
        done();
      });
  });

  it("Intentar obtener una pagina sin token", (done) => {
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
