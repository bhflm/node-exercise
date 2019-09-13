const employees = require('./controllers/employees'),
  departments = require('./controllers/departments'),
  offices = require('./controllers/offices');

exports.init = app => {
  app.get('/employees', employees.getList);
  app.get('/employees/:id', employees.getDetail);
  app.get('/departments', departments.getList);
  app.get('/departments/:id', departments.getDetail);
  app.get('/offices', offices.getList);
  app.get('/offices/:id', offices.getDetail);
};
