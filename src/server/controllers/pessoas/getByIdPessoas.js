const { StatusCodes } = require('http-status-codes');
const yup = require('yup');
const { TVvalidate } = require('../../shared/middlewares/middleware');
const {getByIdPessoa} = require('../../database/bancoDeDados/providers/pessoas/index');
// Esquema de validação para o ID
const esquemaValidation = yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
});

// Função que valida os parâmetros de requisição
const getById = () => {
    return {
        params: esquemaValidation // Valida o campo 'params.id'
    };
};

// Função que retorna o resultado baseado no ID
const getByIdResultado = async (req, res) => {
    
    const id = req.params.id
    // Validação para ID muito grande
    if (Number(req.params.id) >= 99999) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: { default: "Registro não encontrado" }
        });
    }
    try{
    const resultado = await getByIdPessoa(id)
    if(!resultado){
        res.status(StatusCodes.NOT_FOUND).json({message:'id não encontrado'})
    }
    // Retorno de sucesso
    return res.status(resultado.status  ).json(resultado.pessoa||{message:resultado.message});
}catch(err){
    if(!res.headersSent){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: { default: 'Erro ao buscar pessoa' }
        });
    }
}
};

// Função de validação conectada ao middleware
const getByIdValidation = TVvalidate(getById);

module.exports = { getByIdValidation, getByIdResultado };
