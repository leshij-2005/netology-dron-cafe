var supertest = require('supertest');
var assert = require('chai').assert;
var server = supertest.agent('http://localhost:3000');

describe('When auth send without params', function() {
  it('should return 400 code', function(done) {
    server
      .post('/api/v1/auth', {})
      .expect(400)
      .end(function(error, response) {
        done();
      });
  })
});