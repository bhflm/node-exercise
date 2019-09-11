const Util = require('util');
const { set, get, compact, uniq } = require('lodash');
const employeesService = require('../../services/employees');
const departmentsService = require('../../services/departments');
const officesService = require('../../services/offices');

const arrayAsObj = (target, key) => Object.assign({}, ...target.map(item => ({ [item[key]]: item })));

const getManagersData = (data, {nestedPath, levelsDeep}) => {
  const nestedRelation = nestedPath[levelsDeep];
  const managersIds = compact(uniq(data.map(each => each[nestedRelation] || null)));
  return getResourceData
    .manager({ id: managersIds })
    .then(managersDataResponse => {
      const managersHash = arrayAsObj(managersDataResponse.data, 'id');
      const expandedData = data.map(each => {
        const nestedData =  each[nestedRelation] ? managersHash[each[nestedRelation]] : null;
        if (each[nestedRelation]) each[nestedRelation] = nestedData;
        return each;
      });
      return expandedData;
    })
    .catch(err => Promise.reject(err));
};

const getDepartmentsData = (data, {nestedPath, levelsDeep}) => {
  console.log('GET DEPARTMENTS');
  console.log('data: ', data);
  console.log('etc: ', {nestedPath, levelsDeep});
  const nestedRelation = nestedPath[levelsDeep];
  const departmentsIds = compact(uniq(data.map(each => each[nestedRelation] || null)));
  const departmentsData = departmentsIds.map(
    department => departmentsService.getDepartment(department.id) || null
  );
  console.log('DEPARTMENTS DATA', departmentsData);
  return departmentsData;
};

const getOfficesData = (data, {nestedPath, levelsDeep}) => {
  const officesIds = data.map(each => {
    each.office;
  });
  const officesData = officesIds.map(office => officesService.getOffice(office.id) || null);
  return officesData;
};

const getResourceData = {
  department: id => departmentsService.getDepartment(id),
  office: id => officesService.getOffice(id),
  superdepartment: id => departmentsService.getDepartment(id),
  manager: ids => employeesService.getList(ids)
};

const expandResource = {
  department: (data, path) => getDepartmentsData(data, path),
  superdepartment: (data, path) => getDepartmentsData(data, path),
  manager: (data, path) => getManagersData(data,path),
  office: (data, path) => getOfficesData(data, path)
};

const getNestedPath = ({ nestedPath, levelsDeep }, resource) => {
  const index = nestedPath.indexOf(resource);
  if (index !== -1) return nestedPath.slice(index, levelsDeep);
  return index;
};

const nestResourcesInfo = async (originalPath, resourcesLeft, rawData) => {
  let resource = resourcesLeft.length ? resourcesLeft.shift() : null;
  try {
    const resourceData = await expandResource[resource](rawData,originalPath);
    originalPath.levelsDeep += 1;
    return resourcesLeft.length
      ? nestResourcesInfo(originalPath, resourcesLeft, resourceData)
      : arrayAsObj(resourceData, 'id');
  } catch (err) {
    console.log('err: ', err);
    return {};
  }
};

const assignNested = (each, resourceKey, nestedResources) => {
  const resourceId = each[resourceKey];
  const nestedResource = { [resourceKey]: nestedResources[resourceId] };
  return { ...each, [resourceKey]: nestedResources[resourceId] };
};

exports.expandRelation = async (data, expands) => {
  const resourcesToExpand = expands.split('.');
  const originalPath = Object.assign({},{ nestedPath: expands.split('.'), levelsDeep: 1});
  const nestedResources = await nestResourcesInfo(originalPath, resourcesToExpand, data);
  const resourceKey = resourcesToExpand[0];
  const expandedData = data.map(each => assignNested(each, resourceKey, nestedResources));
  return expandedData;
};
