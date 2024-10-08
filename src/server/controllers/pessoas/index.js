const create = require('./createPessoas')
const deleteByID = require('./deleteByIdPessoas')
const getAll = require('./getAllPessoas')
const getByIdPessoa = require('./getByIdPessoas')
const updateByIdPessoa = require('./updateByIdPessoas')
const pessoaController = {
    ...create,
    ...deleteByID,
    ...getAll,
    ...getByIdPessoa,
    ...updateByIdPessoa

}

module.exports = pessoaController