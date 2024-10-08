const { StatusCodes } = require('http-status-codes');
const knex = require('../../knexConfig');

const createPessoa = async (pessoa) => {
    try {
        // Inserir a pessoa no banco de dados
        await knex('pessoa').insert({
            nomeCompleto: pessoa.nomeCompleto,
            cidadeId: pessoa.cidadeId
        });

        // Buscar a pessoa recém-criada para retornar seu ID
        const resultado = await knex('pessoa')
            .select('id', 'nomeCompleto')
            .where('nomeCompleto', pessoa.nomeCompleto)
            .first();

        return resultado;
    } catch (err) {
        console.log('Erro ao cadastrar pessoa:', err.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        // Retornar o erro como objeto, sem usar `res.status`
        return {
            erro: 'Erro ao cadastrar pessoa',
            detalhes: err.message,
        };
    }
};

module.exports = { createPessoa };
