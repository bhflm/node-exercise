const Util = require('util');
const logger = require('../logger');
const employeesService = require('../services/employees');

exports.getList = async (req, res) => {
  logger.info(`Employees list request with params ${Util.inspect(req.query, { depth: null })}`);
  const employeesRes = await employeesService.getList();
  return res.json(employeesRes.data);
};

exports.getDetail = async (req, res) => {
  logger.info(`Employee detail request with params ${req.query}`);
  //TODO: api/{resource}/:id is broken, {missing auth token}
  const id = req.params.id;
  const employeesRes = await employeesService.getDetail(id);
  return res.json(employeesRes.data);
};
