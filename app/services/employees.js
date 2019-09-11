const axios = require('axios');
const queryString = require('querystring');
const { pickBy } = require('lodash');
const { API } = require('../config');
const { expandRelation } = require('../utils/controllers');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

exports.getList = async params => {
  const queryOptions = params ? pickBy(params) : { limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET };
  const query = `?${queryString.stringify(queryOptions)}`;
  try {
    const response = await axios.get(`${API.BigCorp}/employees${query}`);
    if (params.expand) {
      const responseWithExpand = await expandRelation(response.data, params.expand);
      return { data: responseWithExpand };
    }
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.getDetail = async params => {
  try {
    const response = await axios.get(`${API.BigCorp}/employees/?${params}`);
    return { data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};
