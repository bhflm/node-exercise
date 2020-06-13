const axios = require('axios');
const { API } = require('../config');
const logger = require('../logger');

exports.getOnePage = async params => {
  const queryParams = params ? `${params}` : '';
  const path = `/people${queryParams}`;
  try {
    logger.info(`[PEOPLE] Requesting service ${path}`);
    const response = await axios.get(`${API.SWAPI}${path}`);
    if (response.status === 200 && response.data) {
      return { data: response.data };
    }
    logger.info(`[PEOPLE] ${path} No data found`);
    return { data: {} };
  } catch (err) {
    logger.error(`[PEOPLE] Error requesting ${path}: ${err}`);
    return err;
  }
};
