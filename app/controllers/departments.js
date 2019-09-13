const Util = require('util');
const departmentsService = require('../services/departments');
const logger = require('../logger');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

exports.getList = (req, res) => {
  logger.info(`Departments list request with query params ${Util.inspect(req.query, { depth: null })}`);
  const limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_LIMIT;
  const offset = req.query.offset ? parseInt(req.query.offset) : DEFAULT_OFFSET;
  const params = req.query.expand ? req.query.expand : {};
  return departmentsService
    .getMultipleDepartments({ id: req.query.id, params }, { limit, offset })
    .then(response => res.json({ data: response }))
    .catch(err => {
      logger.error(`Error getting departments list:${err}`);
      return Promise.reject(err);
    });
};

exports.getDetail = (req, res) => {
  logger.info(`Single department request ${Util.inspect(req.params, req.query, { depth: null })}`);
  const departmentId = req.params.id;
  const params = req.query.expand ? req.query.expand : {};
  return departmentsService
    .getDepartment(departmentId, params)
    .then(response => res.json({ data: response }))
    .catch(err => {
      logger.error(`Error getting single department ${err}`);
      return Promise.reject(err);
    });
};
