require('dotenv').config();

module.exports = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  API: {
    SWAPI: process.env.SWAPI_API_URL
  }
};
