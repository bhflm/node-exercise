const Util = require('util');
const logger = require('../logger');
const peopleService = require('../services/people');

const asyncFetchAll = async (peopleList = [], { currentPage = false, nextPage = false }) => {
  const page = `?page=${currentPage || 1}`;
  try {
    // If there are no users left and we have already fetched users we end the fetch
    if (!nextPage && peopleList.length > 0) {
      logger.info(`Fetched all users available (${peopleList.length}) up to page ${page}`);
      return peopleList;
    }
    let fetched = [];
    const peopleResponse = await peopleService.getOne(page);
    // If users remaining is undef, means it is the first run
    if (peopleResponse.data) {
      const { results, next } = peopleResponse.data;
      nextPage = next;
      fetched = [...results];
    }
    await asyncFetchAll([...peopleList, ...fetched], { currentPage: currentPage + 1, nextPage });
  } catch (error) {
    logger.error(`Error withing asyncFetchAll: ${error}`)
    Promise.reject(error);
  }
};

exports.getList = async (req, res) => {
  try {
    logger.info(`[PEOPLE] Request to: ${req.route.path} `);
    const peopleList = await asyncFetchAll([], {});
    return res.json({ data: { peopleList, count: peopleList.length } });
  } catch (error) {
    logger.error(`[PEOPLE]: Error within getList controller: ${error}`);
    return res.status(404).send({ message: error });
  }
};
