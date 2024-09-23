const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')

const esquemaValidation = yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
})
const deleteById = (req) =>{
    return{
    params: esquemaValidation
    }
}
const deleteByIdResultado = (req ,res)=>{
    console.log(req.params)
    return res.status(StatusCodes.NO_CONTENT).json({CidadeComId:req.params.id });
}
const deleteByIdValidation = TVvalidate(deleteById)
module.exports = {deleteByIdValidation,deleteByIdResultado}
