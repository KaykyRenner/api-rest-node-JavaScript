const create = require('./create')
const getAll = require('./getAll')
const getById = require('./GetById')
const updateById = require('./updateById')
const deleteById = require('./deleteById')
const cidadeController = {
    ...create,
    ...getAll,
    ...getById,
    ...updateById,
    ...deleteById

}
module.exports = cidadeController