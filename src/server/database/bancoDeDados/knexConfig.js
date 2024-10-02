const knexConfig = require('./envios')
const knex = require('knex')(knexConfig.development);

module.exports = knex