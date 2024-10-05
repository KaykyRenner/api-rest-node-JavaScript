const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')
const {deleteCidade} = require('../../database/bancoDeDados/providers/cidades/index');
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
    const deletandoId = await deleteCidade(id)
    
    if(deletandoId.status === StatusCodes.NOT_FOUND){
        res.status(StatusCodes.NOT_FOUND).json({message:deletandoId.message})
    }
    return res.status(deletandoId.status).json(deletandoId.message);
    } catch(err){
        if(!res.headersSent){
        return res.status(StatusCodes.BAD_REQUEST).json({message:'erro ao deletar'})}
    }

}
const deleteByIdValidation = TVvalidate(deleteById)
module.exports = {deleteByIdValidation,deleteByIdResultado}
