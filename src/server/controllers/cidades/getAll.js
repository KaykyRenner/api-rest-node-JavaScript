const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')
const { getAllCidades } = require('../../database/bancoDeDados/providers/cidades/index');

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
const getAllResultados = async (req,res)=>{
    res.setHeader('access-control-expose-headers', 'x-total-count');
    

    const page = Number(req.query.page) ||0
    const limit = Number(req.query.limit)||10
    const filter = req.query.filter || ''
    try {
        const cidade = await getAllCidades(page,limit,filter)
        res.setHeader('x-total-count', cidade.length);
        return res.status(StatusCodes.OK).json(cidade)
    }catch(err){
        console.error('erro ao buscar cidade')
        if(!res.headersSent){
        res.status(StatusCodes.BAD_REQUEST).json({message:'erro ao buscar cidades'})}
    }
    
    
}
const getAllValidation = TVvalidate(getAllSchemas)
module.exports = {getAllValidation,getAllResultados}
