const request = require('supertest');
const nock = require('nock');
const server = require('../../app');
const planetsMock = require('../mocks/planets');

describe('Planets controller tests', () => {
  const defaultTimeout = 100000;
  test(
    'should have nested residents',
    async done => {
      const res = await request(server).get('/planets');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('count');
      const { data } = res.body;
      expect(data.count).not.toBe(0);
      const aPlanet = data[0];
      const anotherPlanet = data[Math.ceil(data.length / 2)];
      expect(aPlanet).toHaveProperty('name');
      expect(aPlanet).toHaveProperty('diameter');
      expect(aPlanet).toHaveProperty('climate');
      expect(anotherPlanet).toHaveProperty('name');
      expect(anotherPlanet).toHaveProperty('diameter');
      expect(anotherPlanet).toHaveProperty('climate');
      expect(aPlanet.residents[0]).toHaveProperty('name');
      expect(aPlanet.residents[0]).toHaveProperty('height');
      expect(aPlanet.residents[0]).toHaveProperty('mass');
      expect(anotherPlanet.residents[0]).toHaveProperty('name');
      expect(anotherPlanet.residents[0]).toHaveProperty('height');
      expect(anotherPlanet.residents[0]).toHaveProperty('mass');
      return done();
    },
    defaultTimeout
  );
});
