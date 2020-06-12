const Util = require('util');
const logger = require('../logger');
const peopleService = require('../services/people');

const asyncFetchAll = async (peopleList, { currentPage = null, peopleRemaining = null }) => {
  try {
    // If there are no users left we close the connection and end the function
    if (!peopleRemaining) {
      logger.info(`Fetched all users available up to page ${currentPage}`);
      return peopleList;
    }
    const fetched = [];
    const query = `?page=${currentPage || 1}`;
    const peopleResponse = await peopleService.getOne(query);
    // const { page, usersPerPage, next } = peopleResponse;
    console.log('PEOPLE RESPONSE: ', peopleResponse);
    // If users remaining is undef, means it is the first run
    // let remaining = usersRemaining || next;
    if (peopleResponse.data) {
      parsePeopleResponse(peopleResponse.data).map(fetched.push);
    }
    await asyncFetchAll([...peopleList, ...fetched], { currentPage: currentPage + 1, usersRemaining: next });
  } catch (error) {
    logger.error(`Error withing asyncFetchAll: ${error}`)
    Promise.reject(error);
  }
};

exports.getList = async (req, res) => {
  try {
    logger.info(`[PEOPLE] Request to: ${req.route.path} `);
    const people = await asyncFetchAll([], {});
    return res.json({ message: 'much people' });
  } catch (error) {
    logger.error(`[PEOPLE]: Error within getList controller: ${error}`);
    return res.status(404).send({ message: error });
  }
};
