const Util = require('util');
const { set, get, compact, uniq } = require('lodash');
const employeesService = require('../../services/employees');
const departmentsService = require('../../services/departments');
const officesService = require('../../services/offices');

const arrayAsObj = (target, key) => Object.assign({}, ...target.map(item => ({ [item[key]]: item })));

const getNestedPath = (nestedPath, levelsDeep) => nestedPath.slice(0, levelsDeep);

const getManagersData = (data, { nestedPath, levelsDeep }) => {
  const nestedRelation = getNestedPath(nestedPath, levelsDeep);
  const managersIds = compact(
    uniq(
      data.map(each => {
        const foo = get(each, nestedRelation);
        return foo;
      })
    )
  );
  return getResourceData
    .manager({ id: managersIds })
    .then(managersDataResponse => {
      const managersHash = arrayAsObj(managersDataResponse.data, 'id');
      const expandedData = data.map(each => {
        const nestedData = each[nestedRelation] ? managersHash[each[nestedRelation]] : null;
        if (each[nestedRelation]) each[nestedRelation] = nestedData;
        return each;
      });
      return expandedData;
    })
    .catch(err => Promise.reject(err));
};

const getResourceData = {
  department: id => departmentsService.getMultipleDepartments(id),
  office: id => officesService.getMultipleOffices(id),
  superdepartment: id => departmentsService.getMultipleDepartments(id),
  manager: ids => employeesService.getList(ids)
};

const getResourcesData = (data, resource, { nestedPath, levelsDeep }) => {
  const nestedRelation = getNestedPath(nestedPath, levelsDeep);
  const resourcesIds = compact(uniq(data.map(each => get(each, nestedRelation))));
  return getResourceData[resource]({ id: resourcesIds }).then(response => {
    const resourcesHash = arrayAsObj(response, 'id');
    const expandedData = data.map(each => {
      if (resourcesHash[get(each, nestedRelation)]) set(each, nestedRelation, resourcesHash[get(each, nestedRelation)]);
      return each;
    })
    return expandedData;
  }).catch(err => Promise.reject(err));
};

const expandResource = {
  department: (data, path) => getResourcesData(data, 'department', path),
  superdepartment: (data, path) => getResourcesData(data, 'superdepartment', path),
  manager: (data, path) => getManagersData(data, path),
  office: (data, path) => getResourcesData(data, 'office', path)
};

const nestResourcesInfo = async (originalPath, resourcesLeft, rawData) => {
  let resource = resourcesLeft.length ? resourcesLeft.shift() : null;
  try {
    const resourceData = await expandResource[resource](rawData, originalPath);
    originalPath.levelsDeep += 1;
    return resourcesLeft.length ? nestResourcesInfo(originalPath, resourcesLeft, resourceData) : resourceData;
  } catch (err) {
    return { err };
  }
};

const assignNested = (each, resourceKey, nestedResources) => {
  const resourceId = each[resourceKey];
  const nestedResource = { [resourceKey]: nestedResources[resourceId] };
  return { ...each, [resourceKey]: nestedResources[resourceId] };
};

exports.expandRelation = async (data, expands) => {
  const resourcesToExpand = expands.split('.');
  const originalPath = Object.assign({}, { nestedPath: expands.split('.'), levelsDeep: 1 });
  const expandedData = await nestResourcesInfo(originalPath, resourcesToExpand, data);
  console.log(Util.inspect(expandedData, {depth: null}));
  return expandedData;
};
