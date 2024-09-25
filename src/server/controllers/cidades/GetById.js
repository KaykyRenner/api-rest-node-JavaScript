const { StatusCodes } = require('http-status-codes');
const yup = require('yup');
const { TVvalidate } = require('../../shared/middlewares/middleware');

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
const getByIdResultado = (req, res) => {
    console.log(req.params); // Mostra o valor de params no console para verificação
    const idCidade = req.params.id
    const cidade = {id:idCidade, nomeCidade:"Arcoverde"}
    // Validação para ID muito grande
    if (Number(req.params.id) >= 99999) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            erros: { default: "Registro não encontrado" }
        });
    }
    // Retorno de sucesso
    return res.status(StatusCodes.OK).json(cidade);
};

// Função de validação conectada ao middleware
const getByIdValidation = TVvalidate(getById);

module.exports = { getByIdValidation, getByIdResultado };
