const request = require('supertest');
const nock = require('nock');
const config = require('../../app/config');
const swapiService = require('../../app/services/swapi');
const peopleMock = require('../mocks/people');
const planetsMock = require('../mocks/planets');

const mockEndpoint = ({ route, query }, statusCode, responseObj) =>
  nock(`${config.API.SWAPI}`)
    .get(`/${route}${query || ''}`)
    .reply(statusCode, responseObj);

describe('[SERVICE]: Swapi', () => {
  let params = { route: 'people', query: '' };
  test('Get valid people page returns people', () => {
    params = { route: 'people', query: '?page=1' };
    const endpoint = mockEndpoint(params, 200, peopleMock.onePage);
    return swapiService.get(params).then(obj => {
      expect(obj.data).toHaveProperty('count');
      expect(obj.data.count).toBe(82);
      expect(obj.data.next).not.toBe(null);
      expect(obj.data.results.length).toBe(10);
    });
  });
  test('Get invalid people page returns 404', () => {
    params = { route: 'people', query: '?page=1000000' };
    const endpoint = mockEndpoint(params, 404, {});
    return swapiService.get(params).then(obj => {
      expect(obj.response.status).toBe(404);
    });
  });
  test('Get last people page returns people, but no next page ref', () => {
    params = { route: 'people', query: '?page=9' };
    const endpoint = mockEndpoint(params, 200, peopleMock.lastPage);
    return swapiService.get(params).then(obj => {
      expect(obj.data).toHaveProperty('count');
      expect(obj.data.count).toBe(82);
      expect(obj.data.next).toBe(null);
    });
  });
  test('Get valid first planets page returns planets', () => {
    params = { route: 'planets', query: '' };
    const endpoint = mockEndpoint(params, 200, planetsMock.onePage);
    return swapiService.get(params).then(obj => {
      expect(obj.data).toHaveProperty('count');
      expect(obj.data).toHaveProperty('results');
      expect(obj.data).toHaveProperty('previous');
      expect(obj.data.previous).toBe(null);
      expect(obj.data.count).toBe(60);
      expect(obj.data.next).not.toBe(null);
      expect(obj.data.results.length).toBe(10);
    });
  });
  test('Get invalid planets page returns 404', () => {
    params = { route: 'page', query: '?page=1000000' };
    const endpoint = mockEndpoint(params, 404, {});
    return swapiService.get(params).then(obj => {
      const { response } = obj;
      expect(response.status).toBe(404);
    });
  });
  test('Get valid last planets page returns planets, but no next page ref', () => {
    params = { route: 'planets', query: '?page=6' };
    const endpoint = mockEndpoint(params, 200, planetsMock.lastPage);
    return swapiService.get(params).then(obj => {
      expect(obj.data).toHaveProperty('count');
      expect(obj.data).toHaveProperty('results');
      expect(obj.data).toHaveProperty('previous');
      expect(obj.data).toHaveProperty('next');
      expect(obj.data.next).toBe(null);
      expect(obj.data.previous).not.toBe(null);
      expect(obj.data.count).toBe(60);
      expect(obj.data.results.length).toBe(10);
    });
  });
});
