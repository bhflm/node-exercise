const axios = require('axios');
const { API } = require('../config');
const logger = require('../logger');

exports.get = async ({ route, query }) => {
  const path = `/${route}${query || ''}`;
  try {
    logger.info(`[Service]: Requesting ${path}`);
    const response = await axios.get(`${API.SWAPI}${path}`);
    if (response.status === 200 && response.data) {
      return { data: response.data };
    }
    logger.info(`[Service] ${path} No data found`);
    return { data: {} };
  } catch (err) {
    logger.error(`[Service] Error requesting ${path}: ${err}`);
    return err;
  }
};
