const officesJson = require('./seeds/offices');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

class OfficesSingleton {
  constructor(deparments = {}) {
    if (OfficesSingleton.instance) {
      return OfficesSingleton.instance;
    }
    OfficesSingleton.instance = this;

    this.offices = this.saveOffices('id');
    return this;
  }

  saveOffices(key) {
    return Object.assign({}, ...officesJson.map(item => ({ [item[key]]: item })));
  }

  fetchOne(id) {
    return this.offices[id];
  }

  fetchAll({ limit, offset }) {
    let offices = Object.values(this.offices);
    if (offset != DEFAULT_OFFSET) offices = offices.slice(offset, offices.length);
    if (offset != DEFAULT_LIMIT) offices = offices.slice(0, limit);
    return offices;
  }
}

module.exports = OfficesSingleton;
