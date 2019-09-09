const officesJson = require('./seeds/offices');

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
    return Object.assign({}, ...officesJson.map(item => ({ [item[key]]: item })))
  }

  fetchOne(id) {
    return this.offices[id];
  }
}

module.exports = OfficesSingleton;
