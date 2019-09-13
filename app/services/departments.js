const Util = require('util'),
  { compact, set, get } = require('lodash'),
  logger = require('../logger'),
  DepartmentsSingleton = require('../models/departments'),
  departments = new DepartmentsSingleton(),
  { filterResourceByIds } = require('../utils/controllers'),
  { DEFAULT_LIMIT, DEFAULT_OFFSET, SUPERDEPARTMENT } = require('../constants');

const expandSuperDepartment = responseDepartments =>
  responseDepartments.map(each => {
    const department = departments.fetchOne(each.superdepartment);
    if (each.superdepartment) return { ...each, superdepartment: department };
    return each;
  });

const filterAndReturnExpanded = (data, ids, expand) => {
  let responseDepartments = [...data];
  if (ids) responseDepartments = [...filterResourceByIds(responseDepartments, ids)];
  return expand === SUPERDEPARTMENT ? expandSuperDepartment(responseDepartments) : responseDepartments;
};

exports.getDepartment = (id, params) =>
  new Promise((resolve, reject) => {
    const department = departments.fetchOne(id);
    if (!department) return reject(null);
    const responseDepartment = filterAndReturnExpanded([department], null, params);
    return resolve(responseDepartment);
  });

exports.getMultipleDepartments = ({ ids, params }, { limit, offset }) =>
  new Promise((resolve, reject) => {
    logger.info(`Querying departments service with ${Util.inspect({ ids, params }, { depth: null })}`);
    const allDepartments = departments.fetchAll({ limit, offset });
    if (!allDepartments) return reject(null);
    const responseDepartments = filterAndReturnExpanded(allDepartments, ids, params);
    return resolve(responseDepartments);
  });
