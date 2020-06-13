const Util = require('util');
const logger = require('../logger');
const peopleService = require('../services/people');
const { calculateRemainingPages, buildPageQueriesArray } = require('../utils');

const parsePeopleResponse = rawData =>
  rawData
    .map(eachResponse => (eachResponse.data ? eachResponse.data.results : []))
    .filter(each => each.length)
    .flat();

exports.getList = async (req, res) => {
  try {
    logger.info(`[PEOPLE] Request to: ${req.route.path} `);
    const peopleResponse = await peopleService.getOnePage(`?page=1`);
    if (peopleResponse.data) {
      const { count, results } = peopleResponse.data;
      const pagesAmount = calculateRemainingPages(count, results.length);
      const pagesLeft = buildPageQueriesArray(pagesAmount);
      // ** See comment above controller regarding the use of Promise.all
      const remainingResponses = await Promise.all(
        pagesLeft.map(currentPage => peopleService.getOnePage(currentPage))
      );
      const peopleList = parsePeopleResponse([peopleResponse, ...remainingResponses]);
      return res.json({ data: peopleList, count: peopleList.length });
    }
    return res.json({ message: 'No data found ' });
  } catch (error) {
    logger.error(`[PEOPLE]: Error within getList controller: ${error}`);
    return res.status(404).send(error);
  }
};

// 20. As Promise.all fails as soon as one promise is rejected, using it a real world project could be
// really dangerous because you're risking to lose data that was already fetched.
// But for the scope for the project i decided it was good enough to asume the
// external API was stable enough, and keep it simple to do what the task for `/people` requested.
