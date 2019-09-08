const Chance = require('chance'),
  chance = new Chance();

const newEmployee = () => ({
  "first": chance.name(),
  "last": chance.name(),
  "id": chance.integer({ min: 0, max: 20 }),
  "manager": chance.integer({ min: 0, max: 20 }),
  "department": chance.integer({ min: 0, max: 20 }),
  "office": chance.integer({ min: 0, max: 20 })
});

const makeEmployeesMock = amount => {
  let employees = [];
  for (i = 0; i < amount; i++) {
    employees.push(newEmployee())
  }
  return employees;
};

exports.employeesMock = makeEmployeesMock(15);
