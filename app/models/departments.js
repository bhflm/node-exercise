const departmentsJson = require('./seeds/departments');

class DepartmentsSingleton {
  constructor(deparments = {}) {
    if (DepartmentsSingleton.instance) {
      return DepartmentsSingleton.instance;
    }
    DepartmentsSingleton.instance = this;

    this.departments = this.saveDepartments('id');
    return this;
  }

  saveDepartments(key) {
    return Object.assign({}, ...departmentsJson.map(item => ({ [item[key]]: item })));
  }

  fetchOne(id) {
    return this.departments[id];
  }
}

module.exports = DepartmentsSingleton;
