const { StatusCodes } = require('http-status-codes');
const knex = require('../../knexConfig');
const {hashPassowrd,verifyPassowrd} = require('../../../../shared/services//passowrdCrypsto');

const createUsuario = async (usuario) => {
    try {
        const hashedPassowrd = await hashPassowrd(usuario.senha)

        // Insere o novo usuário no banco de dados
        await knex('usuario').insert({
            email: usuario.email,
            nome: usuario.nome,
            senha: hashedPassowrd,
        });

        // Busca o usuário recém-criado para retornar seu ID e nome
        const resultado = await knex('usuario')
            .select('id', 'nome')
            .where('nome', usuario.nome)
            .first();

        // Retorna o resultado com o ID e nome do usuário criado
        return {
            status: StatusCodes.CREATED,
            usuario: resultado,
        };
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err.message);

        // Retorna o erro sem usar `res.status`, pois `res` não está disponível
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            erro: 'Erro ao cadastrar usuário',
            detalhes: err.message,
        };
    }
};

module.exports = { createUsuario };
