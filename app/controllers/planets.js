const Util = require('util');
const axios = require('axios');
const logger = require('../logger');
const swapiService = require('../services/swapi');
const { calculateRemainingPages, mapResponseData } = require('../utils');

const getResident = resident =>
  axios
    .get(resident)
    .then(response => response.data)
    .catch(err => {});

const getResidentsData = residents =>
  Promise.all(residents.map(resident => getResident(resident)));

exports.getAll = async (req, res) => {
  try {
    logger.info(`[PLANETS] Request to: ${req.route.path} `);
    const response = await swapiService.get({ route: 'planets', query: '?page=1' });
    if (response.data) {
      const { count, results } = response.data;
      const pagesLeft = calculateRemainingPages(count, results.length);
      const remainingResponses = await Promise.all(
        pagesLeft.map(currentPage => swapiService.get({ route: 'planets', query: currentPage }))
      );
      const planetsData = mapResponseData([response, ...remainingResponses])
      const planetsWithResidentsData = await Promise.all(
        planetsData.map(async planet => ({
          ...planet,
          residents: await getResidentsData(planet.residents)
        })
        )
      );
      return res.json({ data: planetsWithResidentsData, count: planetsWithResidentsData.length });
    }
    return res.json({ message: 'No resources found ' });
  } catch (error) {
    logger.error(`[PLANETS]: Error within get controller: ${error}`);
    return res.status(404).send(error);
  }
};
