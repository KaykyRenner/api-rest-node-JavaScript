const { StatusCodes } = require('http-status-codes');
const yup = require('yup');
const { TVvalidate } = require('../../shared/middlewares/middleware');
const { updateByIdBS } = require('../../database/bancoDeDados/providers/cidades/index');

const Id_Nome = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
    nomeCidade: yup.string().required().min(3)
    .test('is-not-number', 'Nome da cidade não pode ser um número', (value) => {
        return isNaN(value); // Verifica se NÃO é um número
    })
});

const updateById = () => {
    return {
        params: Id_Nome.pick(['id']),
        body: Id_Nome.pick(['nomeCidade']),
    };
};

const updateByIdResultado = async (req, res) => {
    const { id } = req.params;
    const { nomeCidade } = req.body;

    // Validação para IDs muito grandes
    
    try {
        const resultado = await updateByIdBS(id, nomeCidade); // Adicionado await
        // Retorno de sucesso
        return res.status(resultado.status).json({
            message: resultado.message,
            cidade: resultado.cidade || null

        });
    } catch (err) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro inesperado ao atualizar a cidade' });
    }
};

const updateByIdValidation = TVvalidate(updateById);
module.exports = { updateByIdValidation, updateByIdResultado };
