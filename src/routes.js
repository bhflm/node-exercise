const employees = require('./controllers/employees');

exports.init = app => {
  app.get('/employees', [], employees.getList);
  app.get('/employees/:id', [], employees.getDetail);
};
