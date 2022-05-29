const app = require('./app');
const request = require('supertest');
const mongoose = require('mongoose');


describe("Test home Page", () => {
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


describe("Test Signup Page", () => {
  test("GET /signup", (done) => {
    request(app)
      .get("/signup")
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

describe("Test map Page", () => {
  test("GET /map", (done) => {
    request(app)
      .get("/map")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
});


// describe("Test Sort Page", () => {
//   test("GET /sort", (done) => {
//     request(app)
//       .get("/sort")
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         return done();
//       });
//   });
  
// });

// describe("Test Cart Page", () => {
//   test("GET /cart", (done) => {
//     request(app)
//       .get("/cart")
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         return done();
//       });
//   });
  
// });


