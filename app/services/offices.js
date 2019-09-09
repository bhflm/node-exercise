const OfficesSingleton = require('../models/offices'),
  offices = new OfficesSingleton();

exports.getOffice = id => offices.fetchOne(id);
