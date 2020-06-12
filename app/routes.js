const people = require('./controllers/people');

exports.init = app => {
  app.get('/people', people.getList);
};
