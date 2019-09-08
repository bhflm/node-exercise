const axios = require('axios');
const { API } = require('../config');

//TODO REFACTOR SERVICE ROUTE SETTER
exports.getList = () => axios.get(`${API.BigCorp}/employees`).catch(err => Promise.reject(err));
exports.getDetail = id => axios.get(`${API.BigCorp}/employees/?id=${id}`).catch(err => Promise.reject(err));
