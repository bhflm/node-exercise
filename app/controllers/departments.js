const Util = require('util');
const departmentsService = require('../services/departments');
const logger = require('../logger');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

exports.getList = (req, res) => {
  logger.info(`Departments list request with query params ${Util.inspect(req.query, { depth: null })}`);
  const { limit, offset } =
    req.query.limit && req.query.offset ? req.query : { limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET };
  return departmentsService // todo: limit & offset
    .getMultipleDepartments({ limit, offset })
    .then(response => res.json({ response: response.data }))
    .catch(errResponse => {
      logger.error(errResponse.erorr);
      return res.status(400).send(errResponse.error);
    });
};
