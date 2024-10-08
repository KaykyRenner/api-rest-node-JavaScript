const { StatusCodes } = require('http-status-codes');
const yup = require('yup');
const { TVvalidate } = require('../../shared/middlewares/middleware');
const { updateByIPessoas } = require('../../database/bancoDeDados/providers/pessoas/index');

// Definindo o schema de validação para `id` e `nomeCompleto`
const Id_Nome = yup.object().shape({
    id: yup.number().integer().required().moreThan(0), // ID deve ser um número inteiro positivo
    nomeCompleto: yup.string().required().min(3)
        .test('is-not-number', 'Nome da pessoa não pode ser um número', (value) => {
            return isNaN(value); // Verifica se NÃO é um número
        })
});

// Função de validação para parâmetros e corpo da requisição
const updateById = () => {
    return {
        params: Id_Nome.pick(['id']),
        body: Id_Nome.pick(['nomeCompleto']),
    };
};

// Função de atualização da pessoa e resposta da API
const updateByIdResultado = async (req, res) => {
    const { id } = req.params;
    const { nomeCompleto } = req.body;

    try {
        const resultado = await updateByIPessoas(id, nomeCompleto); // Chamando a função de atualização
        // Retorno de sucesso
        return res.status(resultado.status).json({
            message: resultado.message,
            pessoa: resultado.pessoa || null
        });
    } catch (err) {
        console.error(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro inesperado ao atualizar a pessoa' });
    }
};

// Middleware de validação para a rota
const updateByIdValidation = TVvalidate(updateById);

module.exports = { updateByIdValidation, updateByIdResultado };
