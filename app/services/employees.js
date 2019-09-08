const axios = require('axios');
const queryString = require('querystring');
const { pickBy } = require('lodash');
const { API } = require('../config');

//TODO REFACTOR SERVICE ROUTE SETTER
exports.getList = params => {
  const queryOptions = params ? pickBy(params) : {};
  const query = `?${queryString.stringify(queryOptions)}`;
  return axios.get(`${API.BigCorp}/employees${query}`).catch(err => Promise.reject(err));
};

exports.getDetail = params =>
  axios.get(`${API.BigCorp}/employees/?${params}`).catch(err => Promise.reject(err));
