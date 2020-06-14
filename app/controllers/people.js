const Util = require('util');
const logger = require('../logger');
const swapiService = require('../services/swapi');
const { calculateRemainingPages, mapResponseData } = require('../utils');


const isValidSort = value => ['height', 'mass', 'name'].includes(value);

const sortBy = (people, value) => {
  let sorted = [];
  if (value === 'name') {
    sorted = people.sort((a, b) => (a[value].toLowerCase() < b[value].toLowerCase() ? -1 : 1));
  }
  else {
    // assert 'Height' or 'Mass' to Number in order to avoid string comparison
    sorted = people.sort((a, b) => (Number(a[value]) || 0) - Number(b[value] || 0));
  }
  return sorted;
};

exports.getAll = async (req, res) => {
  try {
    logger.info(`[PEOPLE] Request to: ${req.route.path} `);
    const peopleResponse = await swapiService.get({ route: 'people', query: '?page=1' });
    const { query } = req;
    if (peopleResponse.data) {
      const { count, results } = peopleResponse.data;
      const pagesLeft = calculateRemainingPages(count, results.length);
      const remainingResponses = await Promise.all(
        pagesLeft.map(currentPage => swapiService.get({ route: 'people', query: currentPage }))
      );
      let peopleList = mapResponseData([peopleResponse, ...remainingResponses]);
      if (isValidSort(query.sortBy)) {
        // Sort is working kinda weird
        peopleList = sortBy(peopleList, query.sortBy);
      }
      return res.json({ data: peopleList, count: peopleList.length });
    }
    return res.json({ message: 'No data found ' });
  } catch (error) {
    logger.error(`[PEOPLE]: Error within getAll controller: ${error}`);
    return res.status(404).send(error);
  }
};
