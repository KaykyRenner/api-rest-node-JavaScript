const yup = require('yup')
const {StatusCodes} = require('http-status-codes')
const TValidation = (esquema,TipoDerequisição = 'body') =>{
    return async (req,res,next) =>{
        try{
            await esquema.validate(req[TipoDerequisição],{abortEarly:false})
            return next();
        
        } catch(err){
            if(err instanceof yup.ValidationError){
            const erros = err.inner.reduce((acc,error)=>{
                if(error.path){
                    acc[error.path] = error.message
                }
                console.log(acc)
                return acc
            },{})
            return res.status(StatusCodes.BAD_REQUEST).json({erros})
            } else{
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err:'erro interno do servidor'})
            }
        }
    }
}




module.exports = {TValidation}