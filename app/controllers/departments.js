const Util = require('util');
const departmentsService = require('../services/departments');
const logger = require('../logger');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');
const { expandRelation } = require('../utils/controllers');

exports.getList = (req, res) => {
  logger.info(`Departments list request with query params ${Util.inspect(req.query, { depth: null })}`);
  const limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_LIMIT;
  const offset = req.query.offset ? parseInt(req.query.offset) : DEFAULT_OFFSET;
  return departmentsService
    .getMultipleDepartments({ id: req.query.id, params: req.query.params }, { limit, offset })
    .then(response => res.json({ data: response }))
    .catch(err => {
      logger.error(`Error getting departments list:${err}`);
      return Promise.reject(err);
    });
};

exports.getDetail = (req, res) => {
  logger.info(`Single department request with param: ${Util.inspect(req.params, { depth:null })}`);
  const departmentId = req.params.id;
  return departmentsService.getDepartment(departmentId)
  .then(response => res.json({ data: response }))
  .catch(err => {
    logger.error(`Error getting single department ${err}`);
    return Promise.reject(err);
  })
};
