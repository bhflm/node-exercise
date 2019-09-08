const departments = require('../models/departments');

exports.getDepartment = id => departments.find(each => each.id === id);
