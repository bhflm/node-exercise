const request = require('supertest'),
  nock = require('nock'),
  Util = require('util'),
  server = require('../../app'),
  { API } = require('../../app/config');

describe('Employees tests', () => {
  test('Dont get employees but receive error', done => {
    return request(server)
      .get('/employees?id=a')
      .end((err, res) => {
        expect(res.error).toHaveProperty('text');
        expect(res.error).toHaveProperty('status');
        expect(res.error.status).toBe(400);
        done();
      });
  });
  test('Get employees list with status = 200', done => {
    return request(server)
      .get('/employees')
      .end((err, res) => {
        expect(res.body.response.length).not.toBe(0);
        expect(res.body.response[0]).toHaveProperty('first');
        expect(res.body.response[0]).toHaveProperty('last');
        expect(res.body.response[0]).toHaveProperty('id');
        expect(res.body.response[0]).toHaveProperty('manager');
        expect(res.body.response[0]).toHaveProperty('department');
        expect(res.body.response[0]).toHaveProperty('office');
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get employees with expand=manager', done => {
    return request(server)
      .get('/employees?expand=manager')
      .end((err, res) => {
        expect(res.body.response[0].manager).toBe(null);
        expect(res.body.response[1].manager).toHaveProperty('first');
        expect(res.body.response[1].manager).toHaveProperty('last');
        expect(res.body.response[1].manager).toHaveProperty('id');
        expect(res.body.response[1].manager).toHaveProperty('manager');
        expect(res.body.response[1].manager).toHaveProperty('department');
        expect(res.body.response[1].manager).toHaveProperty('office');
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get employees with expand=office', done => {
    return request(server)
      .get('/employees?expand=office')
      .end((err, res) => {
        expect(res.body.response[0].office.address).toBe('20 W 34th St');
        expect(res.body.response[1].office.address).toBe('20 W 34th St');
        expect(res.body.response[2].office).toBe(null);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get employees with expand=department', done => {
    return request(server)
      .get('/employees?expand=department')
      .end((err, res) => {
        expect(res.body.response[0].department.name).toBe('Inbound Sales');
        expect(res.body.response[1].department.name).toBe('Inbound Sales');
        expect(res.body.response[2].department.name).toBe('Design');
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get employees with expand=manager.manager', done => {
    return request(server)
      .get('/employees?expand=manager.manager')
      .end((err, res) => {
        expect(res.body.response[47].manager.manager).toBe(3);
        expect(res.body.response[48].manager.manager).toBe(5);
        expect(res.body.response[60].manager.manager).toBe(6);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get employees with expand=manager.department', done => {
    return request(server)
      .get('/employees?expand=manager.department')
      .end((err, res) => {
        expect(res.body.response[2].manager).toBe(null);
        expect(res.body.response[3].manager).toBe(null);
        expect(res.body.response[4].manager.department.id).toBe(4);
        expect(res.body.response[4].manager.department.name).toBe('Design');
        expect(res.body.response[4].manager.department.superdepartment).toBe(3);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get employees with expand=managers.office', done => {
    return request(server)
      .get('/employees?expand=manager.office')
      .end((err, res) => {
        expect(res.body.response[1].manager.office.id).toBe(2);
        expect(res.body.response[1].manager.office.city).toBe('New York');
        expect(res.body.response[1].manager.office.address).toBe('20 W 34th St');
        expect(res.body.response[2].manager).toBe(null);
        expect(res.body.response[3].manager).toBe(null);
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get two employees from list with id 4 & 6', done => {
    return request(server)
      .get('/employees?id=4&id=6')
      .end((err, res) => {
        expect(res.body.response[0]).toHaveProperty('id');
        expect(res.body.response[0].id).toBe(4);
        expect(res.body.response[1]).toHaveProperty('id');
        expect(res.body.response[1].id).toBe(6);
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
