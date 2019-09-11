const OfficesSingleton = require('../models/offices'),
  offices = new OfficesSingleton();

exports.getOffice = id => offices.fetchOne(id);

exports.getMultipleOffices = ({ id }) =>
  new Promise((resolve, reject) => {
    const bulkOffices = id.map(id => offices.fetchOne(id));
    return bulkOffices ? resolve(bulkOffices) : reject(new Error('Could not fetch offices'));
  });
