const Util = require('util');
const logger = require('../logger');
const peopleService = require('../services/people');

exports.getList = async (req, res) => {
  try {
    logger.info(`[PEOPLE]: List request`);
    return res.json({ message: 'much people' });
  } catch (error) {
    logger.error(`[PEOPLE]: Error within getList controller: ${error}`);
    return res.status(404).send({ message: error });
  }
};
