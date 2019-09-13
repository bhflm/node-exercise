const request = require('supertest'),
  nock = require('nock'),
  Util = require('util'),
  server = require('../../app'),
  { API } = require('../../app/config');

describe('Departments tests', () => {
  test('Get all departments', done => {
    return request(server)
      .get('/departments')
      .end((err, res) => {
        expect(res.body.data.length).toBe(10);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get all departments with limit 3', done => {
    return request(server)
      .get('/departments?limit=3')
      .end((err, res) => {
        expect(res.body.data.length).toBe(3);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get all departments with offset 3', done => {
    return request(server)
      .get('/departments?offset=3')
      .end((err, res) => {
        expect(res.body.data[0].id).toBe(4);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get all departments with offset 3 and limit 3', done => {
    return request(server)
      .get('/departments?limit=3&offset=3')
      .end((err, res) => {
        expect(res.body.data[0].id).toBe(4);
        expect(res.body.data.length).toBe(3);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get single department with id 3', done => {
    return request(server)
      .get('/departments/3')
      .end((err, res) => {
        expect(res.body.data[0].id).toBe(3);
        expect(res.status).toBe(200);
        done();
      });
  });
});
