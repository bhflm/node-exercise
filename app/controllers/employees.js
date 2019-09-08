const Util = require('util');
const logger = require('../logger');
const employeesService = require('../services/employees');

exports.getList = async (req, res) => {
  logger.info(`Employees list request with query params ${Util.inspect(req.query, { depth: null })}`);
  const employeesRes = await employeesService.getList(req.query);
  return res.json(employeesRes.data);
};

exports.getDetail = async (req, res) => {
  logger.info(`Employee detail request with params
    ${Util.inspect({ params: req.params, query: req.query }, { depth: null })}`);
  //TODO: api/{resource}/:id is broken, {missing auth token}
  const id = `id=${req.params.id}`; //temporary fix:
  const employeesRes = await employeesService.getDetail(id);
  return res.json(employeesRes.data);
};
