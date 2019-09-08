const axios = require('axios');
const { api } = require('../config');

exports.getList = () => axios.get(api.employees).catch(err => Promise.reject(err));
