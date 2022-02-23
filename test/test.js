const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const fs = require("fs");

describe("This test suite reads token from file left by the intitial suite and makes tests with that token", () => {
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

  //Basic test of "working or not" of all endpoints

  //Movies routes

  it("get /movies", function (done) {
    chai
      .request(server)
      .get("/movies")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("get /movie/1", function (done) {
    chai
      .request(server)
      .get("/movie/1")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("get /movies name", function (done) {
    chai
      .request(server)
      .get("/movies?name=Cenicienta")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("get /movies genre", function (done) {
    chai
      .request(server)
      .get("/movies?genre=1")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("get /movies order", function (done) {
    chai
      .request(server)
      .get("/movies?order=ASC")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("get /rawMovies", function (done) {
    chai
      .request(server)
      .get("/rawMovies")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("post /movie", function (done) {
    chai
      .request(server)
      .post("/movie")
      .auth(token, { type: "bearer" })
      .send({
        titulo: "Fantasía 3",
        imagen: "url img Fantasía3",
        fecha: "1998-12-31T23:00:00.000Z",
        calificacion: 1,
        GeneroId: 1,
      })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("put /movie/1", function (done) {
    chai
      .request(server)
      .put("/movie/1")
      .auth(token, { type: "bearer" })
      .send({
        titulo: "Fantasía 4",
        imagen: "url img Fantasía3",
        fecha: "1998-12-31T23:00:00.000Z",
        calificacion: 1,
        GeneroId: 1,
      })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("del /movie/4", function (done) {
    chai
      .request(server)
      .del("/movie/4")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  //Characters routes

  it("get /characters", function (done) {
    chai
      .request(server)
      .get("/characters")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("get /character/1", function (done) {
    chai
      .request(server)
      .get("/character/1")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("get /character name", function (done) {
    chai
      .request(server)
      .get("/characters?name=Pluto")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("get /characters age", function (done) {
    chai
      .request(server)
      .get("/characters?age=20")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("get /characters movies=idMovie", function (done) {
    chai
      .request(server)
      .get("/characters?movies=2")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("get /rawCharacters", function (done) {
    chai
      .request(server)
      .get("/rawCharacters")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("post /character", function (done) {
    chai
      .request(server)
      .post("/character")
      .auth(token, { type: "bearer" })
      .send({
        nombre: "Shreck",
        imagen: "url img shreck",
        edad: 100,
        peso: 100,
        historia: "Un gran ogro",
      })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("put /character/1", function (done) {
    chai
      .request(server)
      .put("/movie/1")
      .auth(token, { type: "bearer" })
      .send({
        nombre: "Mickey 2",
        imagen: "url img Mickey 2",
        edad: 100,
        peso: 100,
        historia: "Un ratón",
      })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("del /character/4", function (done) {
    chai
      .request(server)
      .del("/character/4")
      .auth(token, { type: "bearer" })
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  //end
});
