const app = require('./app');
const request = require('supertest');


describe("Test Home Page", () => {
  test("GET /", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
});

describe("Test Login Page", () => {
  test("GET /login", (done) => {
    request(app)
      .get("/login")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
});
