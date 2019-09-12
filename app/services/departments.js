const Util = require('util'),
  { compact } = require('lodash'),
  DepartmentsSingleton = require('../models/departments'),
  logger = require('../logger'),
  departments = new DepartmentsSingleton(),
  { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

exports.getDepartment = id => departments.fetchOne(id);

exports.getMultipleDepartments = ({ ids, params }, { limit , offset }) =>
  new Promise((resolve, reject) => {
    logger.info(`Querying departments service with ${Util.inspect({ ids, params }, {depth: null})}`);
    const allDepartments = departments.fetchAll({ limit, offset });
    let responseDepartments = [...allDepartments];
    if (ids) {
      responseDepartments = responseDepartments.filter(each => {
        const department = ids.indexOf(each.id)
        if (department != -1) return each;
      });
    }
    return resolve(responseDepartments);
  });
