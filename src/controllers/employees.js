const logger = require('../logger');
const employeesService = require('../services/employees');

exports.getList = async (req, res) => {
  logger.info(`Employees list request with params ${req.params}`);
  const employeesRes = await employeesService.getList();
  return res.json(employeesRes.data);
};

exports.getDetail = async (req, res) => {
  logger.info(`Employees list request with params ${req.params}`);
  const employeesRes = await employeesService.getList();
  return res.json(employeesRes.data);
};
