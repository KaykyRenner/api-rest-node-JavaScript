const { StatusCodes } = require('http-status-codes');
const knex = require('../../knexConfig');

const updateByIdBS = async (id, nome) => {
    try {
        // Verifica se o id existe no banco de dados
        const cidadeExistente = await knex('cidade')
            .select('id')
            .where({ id })
            .first(); // Retorna apenas o primeiro resultado encontrado

            if (!cidadeExistente) {
                // Retorna um objeto indicando que o ID não foi encontrado
                return { status: StatusCodes.NOT_FOUND, message: 'ID não encontrado' };
            }

        // Se o id existir, faz a atualização
        const resultado = await knex('cidade')
            .where({ id })
            .update({ nome });

        if (resultado) {
            return {status:StatusCodes.OK,message: 'Cidade atualizada com sucesso', cidade: nome };
        } else {
            return { status: StatusCodes.NOT_FOUND, message: 'Erro ao atualizar, cidade não encontrada' };
        }
    } catch (err) {
        console.error('Erro ao atualizar cidade:', err);
        return { status: StatusCodes.INTERNAL_SERVER_ERROR, message: 'Erro ao atualizar cidade' };
    }
};

module.exports = { updateByIdBS };
