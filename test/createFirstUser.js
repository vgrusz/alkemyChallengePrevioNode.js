const chai = require("chai");
const assert = chai.assert;
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);

const fs = require("fs");

describe("Initial testing suite, creates an user, logins it, gets its token and stores token in a text file to be used by the next suite of tests", () => {
  var server;

  before(async () => {
    //console.log("Al iniciar casos de testeo");

    server = require("../index");
  });

  beforeEach(() => {
    //console.log("Antes de cada caso de testeo");
  });

  after(function (done) {
    server.close();
    done();
  });

  it("Create a user", (done) => {
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

  it("Login a user", (done) => {
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
});
