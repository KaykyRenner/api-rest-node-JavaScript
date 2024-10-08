const { createPessoa } = require('./createPessoas');
const { deletePessoaById } = require('./deleteByIdPessoas');
const {getAllPessoas} = require('./getAllPessoas')
const {countPessoas} = require('./count')
const {getByIdPessoa} = require('./getByIdPessoas')
const {updateByIPessoas} = require('./updateByIdPessoas')
module.exports = {
    createPessoa,
    deletePessoaById,
    getAllPessoas,
    countPessoas,
    getByIdPessoa,
    updateByIPessoas
};
