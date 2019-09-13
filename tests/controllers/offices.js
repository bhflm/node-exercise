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
        expect(res.body.data.length).toBe(5);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get all offices with limit 2', done => {
    return request(server)
      .get('/offices?limit=2')
      .end((err, res) => {
        expect(res.body.data.length).toBe(2);
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
  test('Get all offices with offset 2 and limit 2', done => {
    return request(server)
      .get('/offices?limit=2&offset=2')
      .end((err, res) => {
        expect(res.body.data[0].id).toBe(3);
        expect(res.body.data.length).toBe(2);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get single office with id 3', done => {
    return request(server)
      .get('/offices/3')
      .end((err, res) => {
        expect(res.body.data.id).toBe(3);
        expect(res.status).toBe(200);
        done();
      });
  });
});
