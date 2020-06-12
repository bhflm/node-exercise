const request = require('supertest'),
  nock = require('nock'),
  Util = require('util'),
  server = require('../../app'),
  { API } = require('../../app/config');

describe('Users tests', () => {
  test('Get all Users', done => {
    return request(server)
      .get('/users')
      .end((err, res) => {
        expect(res.body.data.length).toBe(10);
        expect(res.status).toBe(200);
        done();
      });
  });
});
