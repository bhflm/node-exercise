const express = require('express');
const bodyParser = require('body-parser');
const Util = require('util');
const { config, ENVIRONMENT } = require('./config');
const logger = require('./app/logger');
const routes = require('./app/routes');

const init = () => {
  // Set up the express app
  const app = express();
  const port = config.api.port || 8080;
  // Parse incoming requests data (https://github.com/expressjs/body-parser)
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Require routes into app
  routes.init(app);
  if (ENVIRONMENT !== 'testing') {
    app.listen(port);
  }

  module.exports = app;
  console.info(`🚀BIG CORP API - ${ENVIRONMENT} - RUNNING @ PORT:${port}`); // eslint-disable-line
};

init();
