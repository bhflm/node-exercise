const request = require('supertest');
const nock = require('nock');
const peopleService = require('../../app/services/people');
const config = require('../../app/config');
const peopleMock = require('../mocks/people');

const mockEndpoint = (path, statusCode, responseObj) =>
  nock(`${config.API.SWAPI}`)
    .get(`/people${path}`)
    .reply(statusCode, responseObj);

describe('Users tests', () => {
  test('Get invalid page returns 404', () => {
    const queryPage = `?page=10`;
    const endpoint = mockEndpoint(queryPage, 404, {});
    return peopleService.getOnePage(queryPage).then(obj => {
      expect(obj.response.status).toBe(404);
    });
  });
  test('Get a page returns people', () => {
    const queryPage = `?page=2`;
    const endpoint = mockEndpoint(queryPage, 200, peopleMock.onePage);
    return peopleService.getOnePage(queryPage).then(obj => {
      expect(obj.data).toHaveProperty('count');
      expect(obj.data.count).toBe(82);
      expect(obj.data.next).not.toBe(null);
      expect(obj.data.results.length).toBe(10);
    });
  });
  test('Get last page returns people but no next page ref', () => {
    const queryPage = `?page=9`;
    const endpoint = mockEndpoint(queryPage, 200, peopleMock.lastPage);
    return peopleService.getOnePage(queryPage).then(obj => {
      expect(obj.data).toHaveProperty('count');
      expect(obj.data.count).toBe(82);
      expect(obj.data.next).toBe(null);
    });
  });
});
