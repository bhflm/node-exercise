const Util = require('util');
const { set, get } = require('lodash');
const employeesService = require('../services/employees');
const departmentsService = require('../services/departments');
const officesService = require('../services/offices');
const arrayAsObj = (array, key) => Object.assign({}, ...array.map(item => ({ [item[key]]: item })));

const getManagersData = data => {
  const managersIds = data.map(each => each.manager);
  return getResourceData.manager({ ids: managersIds }).then(managersDataResponse => {
    // employee may not have a manager, so we can't be sure if both managers and employees arrays have the same length
    console.log('managers data: ', managersData);
    const managersHash = arrayAsObj(managersDataResponse, 'id');
    const expandedData = data.map(each => {...each, manager: managersHash[each.manager] });
    console.log('parsed new data: ', expandedData);
    return expandedData;
  }).catch(err => err);
};

const getDepartmentsData = data => {
  const departmentsIds = data.map(each => { id: each.department });
  console.log('departments ids: ', departmentsIds);
  const departmentsData = departmentsIds.map(department => departmentsService.getDepartment(department.id) || null );
  console.log('departmentsData: ', departmentsData);
  return departmentsData;
}

const getOfficesData = data => {
  const officesIds = data.map(each => { id: each.office });
  console.log('offices ids: ', officesIds);
  const officesData = officesIds.map(office => officesService.getOffice(office.id) || null );
  console.log('offices data: ', officesData);
  return officesData;
}

const getResourceData = {
    department: id => departmentsService.getDepartment(id),
    office: id => officesService.getOffice(id),
    superdepartment: id => departmentsService.getDepartment(id),
    manager: ids => employeesService.getList(ids)
};

const expandResource = {
  department: data => getDepartmentsData(data),
  superdepartment: data => getDepartmentsData(data),
  manager: data => getManagersData(data),
  office: data => getOfficesData(data)
};

const nestResourcesInfo = (resources, resourcesLeft = [] ,rawData) => {
  const originalResources = resources;
  let resource = resources.shift();
  let resourcesLeft = resources;
  const resourceData = expandResource[resource](rawData); // aca tenes la info ya mapeada del resource que pediste.
  const resourceDataHash = arrayAsObj(resourceData, 'id');
  // me devuelve un array de data [foo : { data }, foo : { data}, foo: {data}, foo:{ data } ];
  const responseData = rawData.map(each =>
    {...each, [resourceKey]: set(each, originalResources[array.indexOf(resourceKey)+1)], resourceDataHash[each[resourceKey]]) });
  console.log('responseData: ', responseData);
  console.log('resourcesLeft: ', resourcesLeft);
  return resourcesLeft ? nestResourcesInfo(originalResources, resourcesLeft, responseData) : arrayAsObj(responseData, 'id');
}

exports.getRelation = (data, expands) => {
  const resourcesToExpand = expands.split('.');
  const expandedResources = nestResourcesInfo(resourcesToExpand, [], data);
  const resourceKey = resourcesToExpand[0];
  const expandedData = data.map(each => {...each, [resourceKey]: expandedResources[each[resourceKey]]});
  console.log('expandedData = ', expandedData);
  return expandedData;
};
