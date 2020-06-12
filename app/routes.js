const employees = require('./controllers/employees'),
  departments = require('./controllers/departments'),
  offices = require('./controllers/offices');

exports.init = app => {
  app.get('/employees', employees.getList);
};
