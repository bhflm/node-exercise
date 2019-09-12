const request = require('supertest'),
  nock = require('nock'),
  Util = require('util'),
  server = require('../../app'),
  { API } = require('../../app/config');

describe('Offices tests', () => {
  test('Get all Offices', done => {
    return request(server)
      .get('/offices')
      .end((err, res) => {
        expect(res.body.data.length).toBe(10);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get all offices with limit 3', done => {
    return request(server)
      .get('/offices?limit=3')
      .end((err, res) => {
        expect(res.body.data.length).toBe(3);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get all offices with offset 3', done => {
    return request(server)
      .get('/offices?offset=3')
      .end((err, res) => {
        expect(res.body.data[0].id).toBe(4);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get all offices with offset 3 and limit 3', done => {
    return request(server)
      .get('/offices?limit=3&offset=3')
      .end((err, res) => {
        expect(res.body.data[0].id).toBe(4);
        expect(res.body.data.length).toBe(3);
        expect(res.status).toBe(200);
        done();
      });
  });

});
