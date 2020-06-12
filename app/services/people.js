const axios = require('axios');
const { API } = require('../config');
const logger = require('../logger');

const serviceEndpoint = 'people';

exports.getOne = async params => {
  try {
    const queryParams = '';
    logger.info(`Querying service /${serviceEndpoint}/${params}`);
    const response = await axios.get(`${API.SWAPI}/${serviceEndpoint}/?${queryParams}`);
    if (response) {
      return response;
    }
    logger.info(`[Service: ${serviceEndpoint}]: No data found`);
    return { data: {} };
  } catch (err) {
    return Promise.reject(err);
  }
};
