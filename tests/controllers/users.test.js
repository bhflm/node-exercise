const request = require('supertest');
const nock = require('nock');
const Util = require('util');
const server = require('../../app');
const peopleMock = require('../mocks/people');

describe.only('People controller tests', () => {
  const defaultTimeout = 100000;
  test(
    'status is 200 with no sortBy',
    async done => {
      const res = await request(server).get('/people');
      expect(res.status).toBe(200);
      return done();
    },
    defaultTimeout
  );
  // test('assert sortBy name and return 200', done => {
  //   expect(true).toBe(true);
  //   return done();
  // });
  // test('sortBy mass and return 200', done => {
  //   expect(true).toBe(true);
  //   return done();
  // });
  // test('sortBy height and return 200', done => {
  //   expect(true).toBe(true);
  //   return done();
  // });
});
