const employees = require('./controllers/employees');
const departments = require('./controllers/departments');
// const offices = require('./controllers/offices');

exports.init = app => {
  app.get('/employees', [], employees.getList);
  app.get('/employees/:id', [], employees.getDetail);
  app.get('/departments', [], departments.getList);
  // app.get('/departments/:id', [], employees.getDetail);
  // app.get('/offices', [], employees.getList);
  // app.get('/offices/:id', [], employees.getDetail);
};
