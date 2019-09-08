const departmentsService = require('../services/departments');

exports.getRelation = (data,expands) => {
  console.log('data: ', data);
  // console.log('data: ', resources);
  let resources = expands.split('.'); // O(n)
  console.log('resources: ', resources);
  let resource = resources.shift();
  console.log('RESOURCE: ', resource);
  data.forEach(each => {
    console.log('RELATION TO LOOK FOR: ', each[resource]);
  });
  return departmentsService.getDepartment();
};
