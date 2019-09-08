const departmentsService = require('../services/departments');

exports.getRelation = (data,resources) => {
  console.log('resources: ', resources);
  return departmentsService.getDepartment();
};
