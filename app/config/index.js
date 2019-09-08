require('dotenv').config();

module.exports = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  API: {
    BigCorp: process.env.DATA_SOURCE_URL
  }
};
