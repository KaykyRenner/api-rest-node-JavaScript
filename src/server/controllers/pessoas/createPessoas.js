const { StatusCodes } = require("http-status-codes");
const yup = require("yup");
const { TVvalidate } = require("../../shared/middlewares/middleware");
const {createPessoa,} = require("../../database/bancoDeDados/providers/pessoas/index");
// Esquema de validação com Yup
const esquemaValidation = yup.object().shape({
    cidadeId:yup
    .number()
    .required()
    .min(1)
    .strict()
    ,
    pessoa: yup
    .string()
    .required()
    .min(3)
     .strict() // Garante que não converte valores automaticamente
    .test("not-a-number", "Nome da pessoa não pode ser um número", (value) => {
         return value ? isNaN(value) : true; // Verifica se não é um número
    }),

});

// Função para criar a pessoa
const getSchemasResultados = async (req, res) => {
    try {
        // Extrai o nome da pessoa do corpo da requisição
        const {pessoa,cidadeId} = req.body;
        if(!cidadeId){
            return res.status(StatusCodes.BAD_REQUEST).json({erro:'cidadeID é obrigatório'})
        }
        // Cria a pessoa no banco de dados
        const pessoaCriada = await createPessoa({
            nomeCompleto:pessoa,
            cidadeId: cidadeId
        });

        // Resposta de sucesso
        return res.status(StatusCodes.CREATED).json({
            id: pessoaCriada.id,
            pessoa: pessoaCriada.nomeCompleto,
            cidadeId: pessoaCriada.cidadeId
        });
    } catch (err) {
        
        // Em caso de erro, retorna uma resposta com o erro
        if (!res.headersSent) {
            console.error('Erro ao criar a pessoa:', err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                
                error: "Erro ao criar a pessoa",
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
