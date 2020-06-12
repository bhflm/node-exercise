const axios = require('axios');
const queryString = require('querystring');
const { pickBy } = require('lodash');
const { API } = require('../config');
const logger = require('../logger');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

exports.getList = async params => {
  const queryOptions = params ? pickBy(params) : { limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET };
  const query = `?${queryString.stringify(queryOptions)}`;
  try {
    logger.info(`Querying service /employees${query}`);
    const response = await axios.get(`${API.BigCorp}/employees${query}`);
    if (params.expand) {
      // const responseWithExpand = await expandRelation(response.data, params.expand);
      // return { data: responseWithExpand };
      return {};
    }
    return response;
  } catch (err) {
    logger.error(`Error querying service:${err}`);
    return Promise.reject(err);
  }
};

exports.getDetail = async (params, query) => {
  try {
    const queryParams = `?${queryString.stringify(query)}`;
    logger.info(`Querying service /employee/${params}${queryParams}`);
    const response = await axios.get(`${API.BigCorp}/employees/?${params}`);
    if (query.expand) {
      const responseWithExpand = await expandRelation(response.data, query.expand);
      return { data: responseWithExpand };
    }
    return { data: response.data };
  } catch (err) {
    return Promise.reject(err);
  }
};
