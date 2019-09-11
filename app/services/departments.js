const DepartmentsSingleton = require('../models/departments'),
  departments = new DepartmentsSingleton(),
  { compact } = require('lodash');

exports.getDepartment = id => departments.fetchOne(id);

exports.getMultipleDepartments = ids => new Promise((resolve, reject) => {
  const bulkDepartments = ids.map(id => departments.fetchOne(id));
  return bulkDepartments ? resolve(bulkDepartments) : reject(new Error('Could not fetch departments'));
});
