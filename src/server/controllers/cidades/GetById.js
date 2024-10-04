const { StatusCodes } = require('http-status-codes');
const yup = require('yup');
const { TVvalidate } = require('../../shared/middlewares/middleware');
const {getByIdBS} = require('../../database/bancoDeDados/providers/cidades/index');
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
    const resultado = await getByIdBS(id)
    if(!resultado){
        res.status(StatusCodes.NOT_FOUND).json({message:'id não encontrado'})
    }
    // Retorno de sucesso
    return res.status(StatusCodes.OK).json(resultado.cidade);
}catch(err){
    if(!res.headersSent){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: { default: 'Erro ao buscar cidade' }
        });
    }
}
};

// Função de validação conectada ao middleware
const getByIdValidation = TVvalidate(getById);

module.exports = { getByIdValidation, getByIdResultado };
