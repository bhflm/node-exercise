const factory = require('factory-girl').factory;

factory.define('employee', {
  first: factory.chance('string'),
  last: factory.chance('string'),
  id: factory.chance('natural', { min: 0, max: 100 }),
  manager: factory.chance('natural', { min: 0, max: 80 }),
  department: factory.chance('natural', { min: 0, max: 20 }),
  office: factory.chance('natural', { min: 0, max: 10 })
});

factory.define('office', {
  id: factory.chance('natural', { min: 0, max: 5 }),
  city: factory.chance('string'),
  country: factory.chance('string'),
  address: factory.chance('string')
});

factory.define('department', {
  id: factory.chance('natural', { min: 0, max: 10 }),
  name: factory.chance('string'),
  superdepartment: factory.chance('natural', { min: 0, max: 6 })
});
