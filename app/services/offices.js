const Util = require('util'),
  { compact } = require('lodash'),
  OfficesSingleton = require('../models/offices'),
  offices = new OfficesSingleton(),
  logger = require('../logger'),
  { filterResourceByIds } = require('../utils/controllers'),
  { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

exports.getOffice = id => offices.fetchOne(id);

exports.getMultipleOffices = ({ ids, params }, { limit, offset }) =>
  new Promise((resolve, reject) => {
    logger.info(`Querying offices service with ${Util.inspect({ ids, params }, { depth: null })}`);
    const allOffices = offices.fetchAll({ limit, offset });
    let responseOffices = [...allOffices];
    if (ids) responseOffices = filterResourceByIds(responseOffices, ids);
    return resolve(responseOffices);
  });
