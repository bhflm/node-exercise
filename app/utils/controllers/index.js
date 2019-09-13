const Util = require('util');
const { set, get, compact, uniq, flatten } = require('lodash');
const logger = require('../../logger');
const employeesService = require('../../services/employees');
const departmentsService = require('../../services/departments');
const officesService = require('../../services/offices');
const { DEFAULT_QUERY_PARAMS, DEPARTMENT, SUPERDEPARTMENT, OFFICE } = require('../../constants');

const arrayAsObj = (target, key) => Object.assign({}, ...target.map(item => ({ [item[key]]: item })));

const getNestedPath = (nestedPath, levelsDeep) => nestedPath.slice(0, levelsDeep);

const hasOneExpand = obj => typeof obj === 'string';

const filterResourceByIds = (resources, ids) =>
  resources.filter(each => {
    const resource = ids.indexOf(each.id);
    if (resource != -1) return each;
  });

const assignNested = (each, resourceKey, nestedResources) => {
  const resourceId = each[resourceKey];
  const nestedResource = { [resourceKey]: nestedResources[resourceId] };
  return { ...each, [resourceKey]: nestedResources[resourceId] };
};

const setNestedPaths = expands => {
  const resources = hasOneExpand(expands) ? expands.split('.') : expands.map(each => each.split('.'));
  return typeof resources[0] === 'string' ? [resources] : resources;
};

const getResourceData = {
  department: id => departmentsService.getMultipleDepartments({ id, params: {} }, DEFAULT_QUERY_PARAMS),
  office: id => officesService.getMultipleOffices({ id, params: {} }, DEFAULT_QUERY_PARAMS),
  superdepartment: id => departmentsService.getMultipleDepartments({ id, params: {} }, DEFAULT_QUERY_PARAMS),
  manager: ids => employeesService.getList(ids)
};

const expandResource = {
  department: (data, path) => getResourcesData(data, DEPARTMENT, path),
  superdepartment: (data, path) => getResourcesData(data, SUPERDEPARTMENT, path),
  manager: (data, path) => getManagersData(data, path),
  office: (data, path) => getResourcesData(data, OFFICE, path)
};

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

const getResourcesData = (data, resource, { nestedPath, levelsDeep }) => {
  const nestedRelation = getNestedPath(nestedPath, levelsDeep);
  const resourcesIds = compact(uniq(data.map(each => get(each, nestedRelation))));
  return getResourceData[resource]({ id: resourcesIds })
    .then(response => {
      const resourcesHash = arrayAsObj(response, 'id');
      const expandedData = data.map(each => {
        if (resourcesHash[get(each, nestedRelation)])
          set(each, nestedRelation, resourcesHash[get(each, nestedRelation)]);
        return each;
      });
      return expandedData;
    })
    .catch(err => Promise.reject(err));
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

exports.expandRelation = async (data, expands, pagination) => {
  try {
    const resourcesToExpand = setNestedPaths(expands);
    const expandedResources = resourcesToExpand.map(async resources => {
      const originalPath = Object.assign({}, { nestedPath: resources, levelsDeep: 1 });
      const toExpand = [...resources];
      const nested = await nestResourcesInfo(originalPath, toExpand, data);
      return nested;
    });
    const rawResponse = await Promise.all(expandedResources);
    const response = uniq(flatten(rawResponse));
    return response;
  } catch (error) {
    logger.error(`Service error: ${error}`);
    return error;
  }
};
