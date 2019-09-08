const Util = require('util');
const logger = require('../logger');
const employeesService = require('../services/employees');

exports.getList = async (req, res) => {
  logger.info(`Employees list request with query params ${Util.inspect(req.query, { depth: null })}`);
  return employeesService.getList(req.query)
    .then(response => res.json(response.data))
    .catch(err => {
      logger.error(err);
      return res.status(400).send(err);
    });
};

exports.getDetail = async (req, res) => {
  logger.info(`Employee detail request with params
    ${Util.inspect({ params: req.params, query: req.query }, { depth: null })}`);
  //TODO: api/{resource}/:id is broken, {missing auth token}
  const id = `id=${req.params.id}`; //temporary fix:
  return employeesService.getDetail(id)
    .then(response => res.json(response.data))
    .catch(err => {
      logger.error(err);
      return res.status(400).send(err);
    });
};
