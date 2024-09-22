const create = require('./create')
const getAll = require('./getAll')
const cidadeController = {
    ...create,
    ...getAll
}
module.exports = cidadeController