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

  test('Get employees with query with limit 15', done => {
      return request(server)
        .get('/employees?limit=15')
        .end((err, res) => {
          expect(res.body.length).toBe(15);
          expect(res.status).toBe(200);
          done();
        });
  })

});
