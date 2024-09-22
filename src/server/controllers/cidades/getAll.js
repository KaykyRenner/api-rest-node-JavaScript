const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')

const esquemaValidation = yup.object().shape({
    page:yup.number().notRequired().moreThan(0),
    limit:yup.number().notRequired().moreThan(0),
    filter:yup.string().notRequired()
})
const getAllSchemas = (req) =>{
    return{
    query: esquemaValidation
    }
}
const getAllResultados = (req = esquemaValidation,res)=>{
    console.log(req.query)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('não implementado')
}
const getAllValidation = TVvalidate(getAllSchemas)
module.exports = {getAllValidation,getAllResultados}
