const axios = require('axios');
const { API } = require('../config');
const logger = require('../logger');

exports.get = async params => {
  const queryParams = params || '';
  const path = `/planets${queryParams}`;
  try {
    logger.info(`[PLANETS] Requesting service ${path}`);
    const response = await axios.get(`${API.SWAPI}${path}`);
    if (response.status === 200 && response.data) {
      return { data: response.data };
    }
    logger.info(`[PLANETS] ${path} No data found`);
    return { data: {} };
  } catch (err) {
    logger.error(`[PLANETS] Error requesting ${path}: ${err}`);
    return err;
  }
};
