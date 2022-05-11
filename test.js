const app = require('./proj/app')
const request = require('supertest');
jest.setTimeout(10000);
test('Login Page', () => {
    request(app)
        .get('/login')
        .expect(200)
        .end(function(err, res) {
        });
});

test('Sign up', () => {
    request(app)
        .get('/signup')
        .expect(200)
        .end(function(err, res) {
        });
});

test('Home Page', () => {
    request(app)
        .get('/homepage')
        .expect(200)
        .end(function(err, res) {
        });
});

test('about page', () => {
    request(app)
        .get('/about')
        .expect(200)
        .end(function(err, res) {
        });
});

test('Map', () => {
    request(app)
        .get('/map')
        .expect(200)
        .end(function(err, res) {
        });
});
  