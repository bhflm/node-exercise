const Chance = require('chance'),
  chance = new Chance();

exports.employeesMock = [
  {
    "first": chance.name(),
    "last": chance.name(),
    "id": chance.integer({ min: 0, max: 20 }),
    "manager": chance.integer({ min: 0, max: 20 }),
    "department": chance.integer({ min: 0, max: 20 }),
    "office": chance.integer({ min: 0, max: 20 })
  },
  {
    "first": chance.name(),
    "last": chance.name(),
    "id": chance.integer({ min: 0, max: 20 }),
    "manager": chance.integer({ min: 0, max: 20 }),
    "department": chance.integer({ min: 0, max: 20 }),
    "office": chance.integer({ min: 0, max: 20 })
  },
  {
    "first": chance.name(),
    "last": chance.name(),
    "id": chance.integer({ min: 0, max: 20 }),
    "manager": chance.integer({ min: 0, max: 20 }),
    "department": chance.integer({ min: 0, max: 20 }),
    "office": chance.integer({ min: 0, max: 20 })
  }
];
