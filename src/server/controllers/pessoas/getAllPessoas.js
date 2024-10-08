const { StatusCodes } = require('http-status-codes');
const yup = require('yup');
const { TVvalidate } = require('../../shared/middlewares/middleware');
const { getAllPessoas, countPessoas } = require('../../database/bancoDeDados/providers/pessoas/index');

const esquemaValidation = yup.object().shape({
    page: yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    filter: yup.string()
        .notRequired()
        .strict(true) // Garante que o tipo seja estritamente uma string
        .test('is-not-number', 'filter não pode ser número', (value) => {
            if (value === undefined || value === null) return true; // permite valores não definidos
            return isNaN(value); // Verifica se NÃO é um número
        })
});

const getAllSchemas = (req) => {
    return {
        query: esquemaValidation
    };
};

const getAllResultados = async (req, res) => {
    res.setHeader('access-control-expose-headers', 'x-total-count');
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const filter = req.query.filter || '';

    try {
        const pessoas = await getAllPessoas(page, limit, filter);
        const totalCount = await countPessoas(filter);

        // Verifica se houve erro ao buscar as pessoas
        if (pessoas instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                erros: { default: pessoas.message }
            });
        }

        // Verifica se houve erro ao contar as pessoas
        if (totalCount instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                erros: { default: totalCount.message }
            });
        }

        // Define o cabeçalho com o total de registros
        res.setHeader('x-total-count', totalCount);

        // Responde com os dados das pessoas
        return res.status(StatusCodes.OK).json(pessoas);

    } catch (err) {
        console.error('Erro ao buscar pessoas', err);
        if (!res.headersSent) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro ao buscar pessoas' });
        }
    }
};

const getAllValidation = TVvalidate(getAllSchemas);
module.exports = { getAllValidation, getAllResultados };
