const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')

const esquemaValidation = yup.object().shape({
    nomeCidade:yup.string().required().min(3),
    nomeEstado:yup.string().required().min(3),
})

const create = async (req, res) =>{
    res.status(StatusCodes.CREATED).send('cidade enviada')
}
const getSchemas = (req) =>{
    return{
    body: esquemaValidation,
    query: esquemaValidation,
    }

}
const GetVaiDaCerto = TVvalidate(getSchemas)
module.exports = {create,GetVaiDaCerto}
