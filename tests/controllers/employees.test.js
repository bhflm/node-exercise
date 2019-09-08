const request = require('supertest'),
  nock = require('nock'),
  server = require('../../app'),
  { API } = require('../../app/config');

describe('Employees tests', () => {
  test('Get employees list with status = 200', done => {
    return request(server)
      .get('/employees')
      .end((err, res) => {
        expect(res.body.length).not.toBe(0);
        expect(res.body[0]).toHaveProperty('first');
        expect(res.body[0]).toHaveProperty('last');
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('manager');
        expect(res.body[0]).toHaveProperty('department');
        expect(res.body[0]).toHaveProperty('office');
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get two employees from list with id 4 & 6', done => {
    return request(server)
      .get('/employees?id=4&id=6')
      .end((err, res) => {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0].id).toBe(4);
        expect(res.body[1]).toHaveProperty('id');
        expect(res.body[1].id).toBe(6);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get one employee with id 4', done => {
    return request(server)
      .get('/employees/4')
      .end((err, res) => {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0].id).toBe(4);
        expect(res.status).toBe(200);
        done();
      });
  });
});
