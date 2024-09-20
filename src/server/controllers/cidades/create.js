const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TValidation} = require('../../shared/middlewares/middleware')

const bodyValidation = yup.object().shape({
    nomeCidade:yup.string().required().min(3),
    nomeEstado:yup.string().required().min(3)
})
const queryValidation = yup.object().shape({
    nomeCidade:yup.string().required().min(3),
    nomeEstado:yup.string().required().min(3)
})

const validationQuery = TValidation(queryValidation,'query')
const validationCreate = TValidation(bodyValidation,'body')
const create = async (req, res) =>{
    res.status(StatusCodes.CREATED).send('cidade enviada')
}

module.exports = {create,validationCreate,validationQuery}
