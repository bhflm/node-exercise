const Util = require('util');
const officesService = require('../services/offices');
const logger = require('../logger');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

exports.getList = (req, res) => {
  logger.info(`Offices list request with query params ${Util.inspect(req.query, { depth: null })}`);
  const { limit, offset } =
    req.query.limit && req.query.offset ? req.query : { limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET };
  return officesService // todo: limit & offset
    .getMultipleOffices({ limit, offset })
    .then(response => res.json({ response: response.data }))
    .catch(errResponse => {
      logger.error(errResponse.erorr);
      return res.status(400).send(errResponse.error);
    });
};
