const { get } = require('lodash');

// Invalid token
exports.badRequest = res => res.status(400).send({ message: 'bad request' });
