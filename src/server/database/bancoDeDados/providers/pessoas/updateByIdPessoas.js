const { StatusCodes } = require('http-status-codes');
const knex = require('../../knexConfig');

const updateByIPessoas = async (id, nomeCompleto) => { // Agora é 'nomeCompleto'
    try {
        // Verifica se o id existe no banco de dados
        const pessoaExistente = await knex('pessoa')
            .select('id')
            .where({ id })
            .first(); // Retorna apenas o primeiro resultado encontrado

        if (!pessoaExistente) {
            // Retorna um objeto indicando que o ID não foi encontrado
            return { status: StatusCodes.NOT_FOUND, message: 'ID não encontrado' };
        }

        // Se o id existir, faz a atualização
        const resultado = await knex('pessoa')
            .where({ id })
            .update({ nomeCompleto }); // Atualizando com 'nomeCompleto'

        if (resultado) {
            return { status: StatusCodes.OK, message: 'Pessoa atualizada com sucesso', pessoa: nomeCompleto }; // Retornando 'nomeCompleto'
        } else {
            return { status: StatusCodes.NOT_FOUND, message: 'Erro ao atualizar, pessoa não encontrada' };
        }
    } catch (err) {
        console.error('Erro ao atualizar pessoa:', err);
        return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Erro ao atualizar pessoa' };
    }
};

module.exports = { updateByIPessoas };
