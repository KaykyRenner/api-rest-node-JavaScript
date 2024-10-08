const { StatusCodes } = require('http-status-codes');
const knex = require('../../knexConfig');

const deletePessoaById = async (id) => {
    try {
        const resultado = await knex('pessoa').where('id', id).del();

        if (resultado) {
            return { status: StatusCodes.NO_CONTENT, message: 'Pessoa deletada com sucesso' };
        } else {
            return { status: StatusCodes.NOT_FOUND, message: 'ID não encontrado' };
        }
    } catch (err) {
        console.log('Erro ao deletar pessoa', err);
        return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Erro ao deletar pessoa' };
    }
};

module.exports = { deletePessoaById };
