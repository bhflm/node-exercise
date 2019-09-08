const request = require('supertest'),
  nock = require('nock'),
  server = require('../../app'),
  { API } = require('../../app/config'),
  { employeesMock } = require('../mocks');

describe('Employees tests', () => {
  test('Get employees list with status = 200', done => {

  nock(API.BigCorp)
    .get('/employees')
    .reply(200, { data: employeesMock });

    return request(server)
      .get('/employees')
      .end((err, res) => {
        expect(res.body.data.length).not.toBe(0);
        expect(res.body.data[0]).toHaveProperty('first');
        expect(res.body.data[0]).toHaveProperty('last');
        expect(res.body.data[0]).toHaveProperty('id');
        expect(res.body.data[0]).toHaveProperty('manager');
        expect(res.body.data[0]).toHaveProperty('department');
        expect(res.body.data[0]).toHaveProperty('office');
        expect(res.status).toBe(200);
        done();
      });
  });

  // test('Get employees with query with limit 15', done => {
  //
  //   nock(API.BigCorp)
  //     .get('/employees')
  //     .query( {limit: 15})
  //     .reply(200, { data: employeesMock });
  //
  // })

});
