const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')

const esquemaValidation = yup.object().shape({
    page: yup.number().notRequired().moreThan(0).integer(),
    limit: yup.number().notRequired().moreThan(0).integer(),
    filter: yup.string()
        .notRequired()
        .strict(true) // Garanir que o tipo seja estritamente uma string
        .test('is-not-number', 'filter não pode ser número',(value) => {
            if (value === undefined || value === null) return true; // permite valores não definidos
            return isNaN(value); // Verifica se NÃO é um número
        })
});
const getAllSchemas = (req) =>{
    return{
    query: esquemaValidation
    }
}
const getAllResultados = (req,res)=>{
    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', 1);
    return res.status(StatusCodes.OK).json([{}])
}
const getAllValidation = TVvalidate(getAllSchemas)
module.exports = {getAllValidation,getAllResultados}
