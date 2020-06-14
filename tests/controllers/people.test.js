const request = require('supertest');
const nock = require('nock');
const Util = require('util');
const server = require('../../app');
const peopleMock = require('../mocks/people');

const extractNumberValue = value => {
  // unknown is mapped as 0 for avoiding NaN and correct comparison
  if (value === 'unknown') return 0;
  return Number(value);
};

describe('People controller tests', () => {
  const defaultTimeout = 100000;
  test(
    'status is 200 with no sortBy',
    async done => {
      const res = await request(server).get('/people');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('count');
      expect(res.body.data.count).not.toBe(0);
      return done();
    },
    defaultTimeout
  );
  test(
    'status is 200 and sort by height is ok',
    async done => {
      const res = await request(server).get('/people?sortBy=height');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('count');
      const { data } = res.body;
      expect(data.count).not.toBe(0);
      const firstPerson = extractNumberValue(data[0].height);
      const middlePerson = extractNumberValue(data[Math.ceil(data.length / 2)].height);
      const lastPerson = extractNumberValue(data[data.length - 1].height);
      expect(firstPerson > lastPerson).toBe(false);
      expect(firstPerson < middlePerson).toBe(true);
      expect(middlePerson < lastPerson).toBe(true);
      return done();
    },
    defaultTimeout
  );
  test(
    'status is 200 and sort by mass',
    async done => {
      const res = await request(server).get('/people?sortBy=mass');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('count');
      const { data } = res.body;
      expect(data.count).not.toBe(0);
      const firstPerson = extractNumberValue(data[0].mass);
      const middlePerson = extractNumberValue(data[Math.ceil(data.length / 2)].mass);
      const lastPerson = extractNumberValue(data[data.length - 1].mass);
      expect(firstPerson > lastPerson).toBe(false);
      expect(firstPerson < middlePerson).toBe(true);
      expect(middlePerson < lastPerson).toBe(true);
      return done();
    },
    defaultTimeout
  );
  test(
    'status is 200 and sort by name',
    async done => {
      const res = await request(server).get('/people?sortBy=name');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('count');
      const { data } = res.body;
      expect(data.count).not.toBe(0);
      const firstPerson = data[0].name;
      const middlePerson = data[Math.ceil(data.length / 2)].name
      const lastPerson = data[data.length - 1].name;
      expect(firstPerson < lastPerson).toBe(true);
      expect(firstPerson < middlePerson).toBe(true);
      expect(middlePerson > lastPerson).toBe(false);
      return done();
    },
    defaultTimeout
  );
});
