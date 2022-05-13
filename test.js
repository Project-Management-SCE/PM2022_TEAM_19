const app = require('./proj/app')
const request = require('supertest');

jest.useFakeTimers('legacy')

describe("Testing /login", () => {
    test("It should response the GET method", done => {
      request(app)
        .get("/login")
        .then(response => {
          expect(response.statusCode).toBe(200);
          done();
        });
    });
});
  