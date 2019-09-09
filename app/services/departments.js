const DepartmentsSingleton = require('../models/departments'),
  departments = new DepartmentsSingleton();

exports.getDepartment = id => departments.fetchOne(id);
