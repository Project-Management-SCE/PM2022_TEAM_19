const app = require('./app');
const request = require('supertest');
const mongoose = require('mongoose');


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

describe("Test register Page", () => {
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


describe("Test register Page", () => {
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


describe("Test Sort Page", () => {
  test("GET /sort", (done) => {
    request(app)
      .get("/sort")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
});

describe("Test Cart Page", () => {
  test("GET /cart", (done) => {
    request(app)
      .get("/cart")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
});


describe("Test shared parkings Page", () => {
  test("GET /parkings", (done) => {
    request(app)
      .get("/parkings")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
});


describe("Test the Owner Page", () => {
  test("GET /ownerPage", (done) => {
    request(app)
      .get("/ownerPage")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
});


describe("Test the Admin Page", () => {
  test("GET /home", (done) => {
    request(app)
      .get("/home")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
});


describe("Test parking compose Page", () => {
  test("GET /compose", (done) => {
    request(app)
      .get("/compose")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  
});

