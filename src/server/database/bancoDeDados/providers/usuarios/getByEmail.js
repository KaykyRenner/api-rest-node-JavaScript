const { StatusCodes } = require('http-status-codes');
const knex = require('../../knexConfig');

const getByEmail = async (email) => {
    try {
        // Busca o usuário pelo ID
        const resultado = await knex('usuario').where('email', email).first();
        
        if (resultado) {
            // Se encontrar o usuário, retorna o status e o usuário
            return {
                status: StatusCodes.OK,
                usuario: resultado
            };
        } else {
            // Se não encontrar, retorna um erro de ID não encontrado
            return {
                status: StatusCodes.BAD_REQUEST,
                message: 'ID não encontrado'
            };
        }
    } catch (err) {
        // Captura o erro e retorna uma mensagem de erro
        console.error('Erro ao encontrar usuário:', err.message);
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Erro ao encontrar pessoa',
            erro: err.message
        };
    }
};

module.exports = { getByEmail };
