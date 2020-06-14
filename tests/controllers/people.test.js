const request = require('supertest');
const nock = require('nock');
const Util = require('util');
const server = require('../../app');
const peopleMock = require('../mocks/people');

const extractNumberValue = value => {
  if (value === 'unknown') return 0;
  return Number(value);
};

describe.only('People controller tests', () => {
  const defaultTimeout = 100000;
  // test(
  //   'status is 200 with no sortBy',
  //   async done => {
  //     const res = await request(server).get('/people');
  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty('data');
  //     expect(res.body).toHaveProperty('count');
  //     expect(res.body.data.count).not.toBe(0);
  //     return done();
  //   },
  //   defaultTimeout
  // );
  // test(
  //   'status is 200 and sort by height is ok',
  //   async done => {
  //     const res = await request(server).get('/people?sortBy=height');
  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty('data');
  //     expect(res.body).toHaveProperty('count');
  //     const { data } = res.body;
  //     expect(data.count).not.toBe(0);
  //     const firstPerson = data[0];
  //     const middlePerson = data[Math.ceil(data.length / 2)]
  //     const lastPerson = data[data.length - 1];
  //     expect(Number(firstPerson.height) < Number(lastPerson.height)).toBe(true);
  //     expect(Number(firstPerson.height) > Number(middlePerson.height)).toBe(false);
  //     expect(Number(middlePerson.height) < Number(lastPerson.height)).toBe(true);
  //     return done();
  //   },
  //   defaultTimeout
  // );
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
      const middlePerson = extractNumberValue(data[Math.ceil(data.length / 2)].mass);=
      const lastPerson = extractNumberValue(data[data.length - 1].mass);
      // Add the '|| 0' statement because the custom sort sends the unknowns to the beggining;
      expect(firstPerson > lastPerson).toBe(false);
      expect(firstPerson < middlePerson).toBe(true);
      expect(middlePerson < lastPerson).toBe(true);
      return done();
    },
    defaultTimeout
  );
  // test(
  //   'status is 200 and sort by name',
  //   async done => {
  //     const res = await request(server).get('/people?sortBy=name');
  //     expect(res.status).toBe(200);
  //     expect(res.body).toHaveProperty('data');
  //     expect(res.body).toHaveProperty('count');
  //     const { data } = res.body;
  //     expect(data.count).not.toBe(0);
  //     const firstPerson = data[0];
  //     const middlePerson = data[Math.ceil(data.length / 2)]
  //     const lastPerson = data[data.length - 1];
  //     expect(firstPerson.name < lastPerson.name).toBe(true);
  //     expect(firstPerson.height < middlePerson.name).toBe(true);
  //     expect(middlePerson.name > lastPerson.name).toBe(false);
  //     return done();
  //   },
  //   defaultTimeout
  // );
});
