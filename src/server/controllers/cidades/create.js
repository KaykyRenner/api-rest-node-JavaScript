const { StatusCodes } = require("http-status-codes")
const yup = require('yup')

const bodyValidation = yup.object().shape({
    nomeCidade:yup.string().required().min(3),
    nomeEstado:yup.string().required().min(3)
})
const validationCreate = async(req,res,next) =>{
    try{
        const {nomeCidade} = req.body
        const {nomeEstado} = req.body
        await bodyValidation.validate({nomeCidade,nomeEstado},{abortEarly:false})
        return next();
    
    } catch(err){
        if(err instanceof yup.ValidationError){
        err.inner.forEach(error => {
            console.log(error.message)
        });
        return res.status(StatusCodes.BAD_REQUEST).json({errors: err.errors})
        } else{
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err:'erro interno do servidor'})
        }
    }
}
const create = async (req, res) =>{
    res.status(StatusCodes.CREATED).send('cidade enviada')
}

module.exports = {create,validationCreate}
