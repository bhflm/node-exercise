const Util = require('util');
const logger = require('../logger');
const employeesService = require('../services/employees');

exports.getList = (req, res) => {
  logger.info(`Employees list request with query params ${Util.inspect(req.query, { depth: null })}`);
  return employeesService
    .getList(req.query)
    .then(response => res.json({ response: response.data }))
    .catch(errResponse => {
      return res.status(400).send(errResponse);
    });
};

exports.getDetail = (req, res) => {
  logger.info(`Employee detail request with params
    ${Util.inspect({ params: req.params, query: req.query }, { depth: null })}`);
  const id = `id=${req.params.id}`;
  return employeesService
    .getDetail(id, req.query)
    .then(response => res.json(response.data))
    .catch(errResponse => {
      logger.error(errResponse);
      return res.status(400).send(errResponse);
    });
};
