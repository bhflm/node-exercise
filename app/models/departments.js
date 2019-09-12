const departmentsJson = require('./seeds/departments');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

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

  fetchAll({ limit, offset }) {
    let departments = Object.values(this.departments);
    if (offset != DEFAULT_OFFSET) departments = departments.slice(offset, departments.length);
    if (offset != DEFAULT_LIMIT) departments = departments.slice(0, limit);
    return departments;
  }
}

module.exports = DepartmentsSingleton;
