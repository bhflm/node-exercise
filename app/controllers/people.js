const Util = require('util');
const logger = require('../logger');
const peopleService = require('../services/people');
const { calculateRemainingPages, buildPageQueriesArray } = require('../utils');

const parsePeopleResponse = rawData =>
  rawData
    .map(eachResponse => (eachResponse.data ? eachResponse.data.results : []))
    .filter(each => each.length)
    .flat();

const isValidSort = value => ['height', 'mass', 'name'].includes(value);

const sortBy = (people, value) => {
  let sorted = [];
  if (value === 'name') {
    sorted = people.sort((a, b) => (a[value].toLowerCase() < b[value].toLowerCase() ? -1 : 1));
  }
  else {
    // assert 'Height' or 'Mass' to Number in order to avoid string comparison
    sorted = people.sort((a, b) => Number(a[value]) - Number(b[value]));
  }
  return sorted;
};

exports.getList = async (req, res) => {
  try {
    logger.info(`[PEOPLE] Request to: ${req.route.path} `);
    const peopleResponse = await peopleService.getOnePage(`?page=1`);
    const { query } = req;
    if (peopleResponse.data) {
      const { count, results } = peopleResponse.data;
      const pagesAmount = calculateRemainingPages(count, results.length);
      const pagesLeft = buildPageQueriesArray(pagesAmount);
      const remainingResponses = await Promise.all(
        pagesLeft.map(currentPage => peopleService.getOnePage(currentPage))
      );
      let peopleList = parsePeopleResponse([peopleResponse, ...remainingResponses]);
      if (isValidSort(query.sortBy)) {
        // Sort is working kinda weird
        peopleList = sortBy(peopleList, query.sortBy);
      }
      return res.json({ data: peopleList, count: peopleList.length });
    }
    return res.json({ message: 'No data found ' });
  } catch (error) {
    logger.error(`[PEOPLE]: Error within getList controller: ${error}`);
    return res.status(404).send(error);
  }
};
