const app = require('./proj/app')
const assert = require('assert');
const request = require('supertest');

const it = (desc, fn) => {
    try {
      fn();
      console.log('\x1b[32m%s\x1b[0m', `\u2714 ${desc}`);
    } catch (error) {
      console.log('\n');
      console.log('\x1b[31m%s\x1b[0m', `\u2718 ${desc}`);
      console.error(error);
    }
  };
  
it('should return the sum of two numbers', () => {
    request(app).get('/login').expect(200)
});