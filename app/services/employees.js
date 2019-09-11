const axios = require('axios');
const queryString = require('querystring');
const { pickBy } = require('lodash');
const { API } = require('../config');
const { expandRelation } = require('../utils/controllers');

exports.getList = params => {
  const queryOptions = params ? pickBy(params) : {};
  const query = `?${queryString.stringify(queryOptions)}`;
  return axios.get(`${API.BigCorp}/employees${query}`).then(response =>
    params.expand ? expandRelation(response.data, params.expand) : response);
};

exports.getDetail = params => axios.get(`${API.BigCorp}/employees/?${params}`);
