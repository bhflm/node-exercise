const { compact } = require('lodash'),
  DepartmentsSingleton = require('../models/departments'),
  departments = new DepartmentsSingleton();

exports.getDepartment = id => departments.fetchOne(id);

exports.getMultipleDepartments = ({ id }) =>
  new Promise((resolve, reject) => {
    const bulkDepartments = id.map(id => departments.fetchOne(id));
    return bulkDepartments ? resolve(bulkDepartments) : reject(new Error('Could not fetch departments'));
  });
