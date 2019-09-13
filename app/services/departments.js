const Util = require('util'),
  { compact } = require('lodash'),
  DepartmentsSingleton = require('../models/departments'),
  logger = require('../logger'),
  departments = new DepartmentsSingleton(),
  { filterResourceByIds } = require('../utils/controllers'),
  { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

exports.getDepartment = id => new Promise((resolve, reject) => {
  const department = departments.fetchOne(id);
  if (!department) return reject(null);
  return resolve(department);
});

exports.getMultipleDepartments = ({ ids, params }, { limit, offset }) =>
  new Promise((resolve, reject) => {
    logger.info(`Querying departments service with ${Util.inspect({ ids, params }, { depth: null })}`);
    const allDepartments = departments.fetchAll({ limit, offset });
    let responseDepartments = [...allDepartments];
    if (!responseDepartments) return reject(null);
    if (ids) responseDepartments = filterResourceByIds(responseDepartments, ids);
    return resolve(responseDepartments);
});
