const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const fs = require("fs");

describe("Suite de testeos que lee archivo de token de la suite inicial y hace pruebas con ese token", () => {
  var server;
  var token = "Initial value";

  before(() => {
    //console.log("Before all tests");

    try {
      token = fs.readFileSync("./test/token.txt", "utf8");
      //console.log(token);
    } catch (err) {
      console.error(err);
    }

    server = require("../index");
  });

  beforeEach(() => {
    //console.log("Before each test");
  });

  after(function (done) {
    server.close();
    done();
  });

  it("Get main page", (done) => {
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

  it("Access an endpoint having token", function (done) {
    chai
      .request(server)
      .get("/characters")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("Try access an endpoint without token", (done) => {
    chai
      .request(server)
      .get("/characters")
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        res.should.have.status(401);
        done();
      });
  });

  it("Try to create a movie without genre", (done) => {
    chai
      .request(server)
      .post("/movies")
      .auth(token, { type: "bearer" })
      .send({ titulo: "Fantasía 3", imagen: "url img Fantasía3", fecha: "1998-12-31T23:00:00.000Z", calificacion: 1 })
      .end(function (err, res) {
        res.should.have.status(404);
        done();
      });
  });
});
