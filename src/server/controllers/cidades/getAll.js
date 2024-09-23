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
    console.log(req.query)
    return res.status(StatusCodes.OK).send('não implementado')
}
const getAllValidation = TVvalidate(getAllSchemas)
module.exports = {getAllValidation,getAllResultados}
