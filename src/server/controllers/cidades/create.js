const { StatusCodes } = require("http-status-codes");
const yup = require("yup");
const { TVvalidate } = require("../../shared/middlewares/middleware");
const {createCidade,} = require("../../database/bancoDeDados/providers/cidades/index");

// Esquema de validação com Yup
const esquemaValidation = yup.object().shape({
    nomeCidade: yup
        .string()
        .required("nomeCidade é obrigatório")
        .min(3, "nomeCidade deve ter pelo menos 3 caracteres")
        .max(150)
        .strict() // Adiciona a validação estrita
        .test("not-a-number", "nomeCidade não pode ser um número", (value) => {
            return value ? isNaN(value) : true; // Garante que o valor é verificado apenas se não for nulo
        }),
});

// Função para criar a cidade
const getSchemasResultados = async (req, res) => {
    try {
        // Extrai o nome da cidade do corpo da requisição
        const { nomeCidade } = req.body;

        // Cria a cidade no banco de dados
        const cidadeCriada = await createCidade(nomeCidade);

        // Resposta de sucesso
        return res.status(StatusCodes.CREATED).json({
            id: cidadeCriada.id,
            nomeCidade: cidadeCriada.nome,
        });
    } catch (err) {
        // Em caso de erro, retorna uma resposta com o erro
        if (!res.headersSent) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: "Erro ao criar a cidade",
                details: err.message,
            });
        }
    }
};

// Função para obter o esquema de validação
const getSchemas = () => {
    return {
        body: esquemaValidation,
    };
};

// Middleware de validação
const getSchemasValidation = TVvalidate(getSchemas);

// Exporta as funções
module.exports = { getSchemasValidation, getSchemasResultados };
