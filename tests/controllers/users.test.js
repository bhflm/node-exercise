const request = require('supertest');
const nock = require('nock');
const Util = require('util');
const server = require('../../app');
const peopleMock = require('../mocks/people');

describe('People controller tests', () => {
  // @@TODO: Complete these tests
  test('status is 200 with no sortBy', done => {
    expect(true).toBe(true);
    return done();
  });
  test('assert sortBy name and return 200', done => {
    expect(true).toBe(true);
    return done();
  });
  test('sortBy mass and return 200', done => {
    expect(true).toBe(true);
    return done();
  });
  test('sortBy height and return 200', done => {
    expect(true).toBe(true);
    return done();
  });
});
