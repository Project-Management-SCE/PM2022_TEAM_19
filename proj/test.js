const app = require('./app');
const request = require('supertest');


describe("Test example", () => {
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