const nock = require('nock');
const config = require('../../app/config');

exports.mockEndpoint = (query, statusCode, responseObj) =>
  nock(`${config.API.SWAPI}`)
    .get(`/people${query || '/'}`)
    .reply(statusCode, responseObj);
