const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')

const esquemaValidation = yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
})
const getById = (req) =>{
    return{
    params: esquemaValidation
    }
}
const getByIdResultado = (req ,res)=>{
    console.log(req.params)
    return res.status(StatusCodes.OK).send(`Cidade com id ${req.params.id}`);
}
const getByIdValidation = TVvalidate(getById)
module.exports = {getByIdValidation,getByIdResultado}
