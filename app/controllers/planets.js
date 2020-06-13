const Util = require('util');
const axios = require('axios');
const logger = require('../logger');
const planetsService = require('../services/planets');
const peopleService = require('../services/people');
const { calculateRemainingPages, buildPageQueriesArray } = require('../utils');

const extractResidentID = str =>
  str
    .split('/')
    .slice(-2)
    .shift();

const getResidentData = resident =>
  axios
    .get(resident)
    .then(response => response.data)
    .catch(err => {});
const getResidentsData = residents => Promise.all(residents.map(resident => getResidentData(resident)));

exports.getAll = async (req, res) => {
  try {
    logger.info(`[PLANETS] Request to: ${req.route.path} `);
    const response = await planetsService.get(`?page=1`);
    if (response.data) {
      const { count, results } = response.data;
      const pagesAmount = calculateRemainingPages(count, results.length);
      const pagesLeft = buildPageQueriesArray(pagesAmount);
      const remainingResponses = await Promise.all(
        pagesLeft.map(currentPage => planetsService.get(currentPage))
      );
      const planetsData = [response, ...remainingResponses]
        .map(each => (each.data ? each.data.results : []))
        .filter(each => !!each)
        .flat();
      const planetsWithResidents = await Promise.all(
        planetsData.map(async planet => ({
          ...planet,
          residents: await getResidentsData(planet.residents)
        })
        )
      );
      return res.json({ planetsWithResidents });
    }
    return res.json({ message: 'No resources found ' });
  } catch (error) {
    logger.error(`[PLANETS]: Error within get controller: ${error}`);
    return res.status(404).send(error);
  }
};
