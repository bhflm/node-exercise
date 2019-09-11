const Util = require('util');
const departmentsService = require('../services/departments');
const logger = require('../logger');

exports.getList = (req, res) => {
  logger.info(`Departments list request with query params ${Util.inspect(req.query, { depth: null })}`);
  const { id, limit, offset } = req.query;
  return departmentsService
    .getMultipleDepartments(id)
    .then(response => res.json({ response: response.data} ))
    .catch(errResponse => {
      logger.error(errResponse.erorr);
      return res.status(400).send(errResponse.error);
    });
};
