const Util = require('util');
const officesService = require('../services/offices');
const logger = require('../logger');
const { DEFAULT_LIMIT, DEFAULT_OFFSET } = require('../constants');

exports.getList = (req, res) => {
  logger.info(`Offices list request with query params ${Util.inspect(req.query, { depth: null })}`);
  const limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_LIMIT;
  const offset = req.query.offset ? parseInt(req.query.offset) : DEFAULT_OFFSET;
  return officesService
    .getMultipleOffices({ id: req.query.id, params: req.query.params }, { limit, offset })
    .then(response => res.json({ data: response }))
    .catch(err => {
      logger.error(`Error getting offices list:${err}`);
      return Promise.reject(err);
    });
};

exports.getDetail = (req, res) => {
  logger.info(`Single office request with param: ${Util.inspect(req.params, { depth:null })}`);
  const officeId = req.params.id;
  return officesService.getOffice(officeId)
  .then(response => res.json({ data: response }))
  .catch(err => {
    logger.error(`Error getting single office ${err}`);
    return Promise.reject(err);
  })
};
