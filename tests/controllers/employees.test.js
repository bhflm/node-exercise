const server = require('../../app'),
  request = require('supertest'),
  { expect } = require('chai');

describe('Employees tests', () => {
  test('have restaurants with needed properties', done => {
    request(server)
      .get('/employees')
      .end((err, res) => {
        console.log('res: ', res);
        expect(res.status).to.equal(200);
        done();
      });
  });
});
