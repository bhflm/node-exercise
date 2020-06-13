const request = require('supertest');
const nock = require('nock');
const config = require('../../app/config');
const swapiService = require('../../app/services/swapi');
const peopleMock = require('../mocks/people');

const mockEndpoint = ({ route, query }, statusCode, responseObj) =>
  nock(`${config.API.SWAPI}`)
    .get(`/${route}${query || ''}`)
    .reply(statusCode, responseObj);

describe('[SERVICE]: People tests', () => {
  let params = { route: 'people', query: '' };
  test('Get valid page returns people', () => {
    params = { route: 'people', query: '?page=1' };
    const endpoint = mockEndpoint(params, 200, peopleMock.onePage);
    return swapiService.get(params).then(obj => {
      expect(obj.data).toHaveProperty('count');
      expect(obj.data.count).toBe(82);
      expect(obj.data.next).not.toBe(null);
      expect(obj.data.results.length).toBe(10);
    });
  });
  test('Get invalid page returns 404', () => {
    params = { route: 'people', query: '?page=1000000' };
    const endpoint = mockEndpoint(params, 404, {});
    return swapiService.get(params).then(obj => {
      expect(obj.response.status).toBe(404);
    });
  });
  test('Get last page returns people, but no next page ref', () => {
    params = { route: 'people', query: '?page=9' };
    const endpoint = mockEndpoint(params, 200, peopleMock.lastPage);
    return swapiService.get(params).then(obj => {
      expect(obj.data).toHaveProperty('count');
      expect(obj.data.count).toBe(82);
      expect(obj.data.next).toBe(null);
    });
  });
});
