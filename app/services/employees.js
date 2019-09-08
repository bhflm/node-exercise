const axios = require('axios');
const queryString = require('querystring');
const { pickBy } = require('lodash');
const { API } = require('../config');
const { getRelation } = require('../utils');

//TODO REFACTOR SERVICE ROUTE SETTER
exports.getList = params => {
  const queryOptions = params ? pickBy(params) : {};
  const query = `?${queryString.stringify(queryOptions)}`;
  return axios.get(`${API.BigCorp}/employees${query}`).then(response => {
    if(params.expand) {
      const relations = getRelation(response,params.expand);
    };
    return response;
  });
};

exports.getDetail = params =>
  axios.get(`${API.BigCorp}/employees/?${params}`);
