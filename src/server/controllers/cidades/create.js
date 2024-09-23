const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')

const esquemaValidation = yup.object().shape({
    nomeCidade:yup.string().required().min(3)
})
const getSchemas = (req) =>{
    return{
    body: esquemaValidation,
    query: esquemaValidation,
    }

}
const getSchemasResultados = async (req, res) =>{
    res.status(StatusCodes.CREATED).send('cidade enviada')
}
const getSchemasValidation = TVvalidate(getSchemas)
module.exports = {getSchemasValidation,getSchemasResultados}
