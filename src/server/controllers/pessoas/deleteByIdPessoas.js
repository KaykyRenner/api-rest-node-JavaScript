const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')
const {deletePessoaById} = require('../../database/bancoDeDados/providers/pessoas/index');
const esquemaValidation = yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
})
const deleteById = (req) =>{
    return{
    params: esquemaValidation
    }
}
const deleteByIdResultado = async (req ,res)=>{
    console.log(req.params)
    const {id} = req.params
    
    try{
    const deletandoId = await deletePessoaById(id)
    
    if(deletandoId.status === StatusCodes.NOT_FOUND){
        res.status(StatusCodes.NOT_FOUND).json({message:deletandoId.message})
    }
    return res.status(deletandoId.status).send();
    } catch(err){
        if(!res.headersSent){
        return res.status(StatusCodes.BAD_REQUEST).json({message:'erro ao deletar'})}
    }

}
const deleteByIdValidation = TVvalidate(deleteById)
module.exports = {deleteByIdValidation,deleteByIdResultado}
