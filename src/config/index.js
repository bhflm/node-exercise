require('dotenv').config();

module.exports = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  api: {
    employees: process.env.DATA_SOURCE_URL
  }
};
