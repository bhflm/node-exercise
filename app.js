const express = require('express');
const bodyParser = require('body-parser');
const Util = require('util');
const { api } = require('./app/config');
const logger = require('./app/logger');
const routes = require('./app/routes');

const init = () => {
  const ENVIRONMENT = process.env.NODE_ENV || 'testing';
  // Set up the express app
  const app = express();
  const port = api.port || 8080;
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
