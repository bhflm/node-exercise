const people = require('./controllers/people');
const planets = require('./controllers/planets');

exports.init = app => {
  app.get('/people', people.getAll);
  app.get('/planets', planets.getAll);
};
