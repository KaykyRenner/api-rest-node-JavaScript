const { StatusCodes } = require("http-status-codes")



const autheticade = async (req,res,next) =>{
    const {authorization} = req.headers

    if(!authorization){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            erros:'não autenticado'
        })
    }
    const [type,token] = authorization.split(' ')
    if(type !== 'Bearer'){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            erros:'não autenticado'
        })
    }
    if(token !== 'teste.teste.teste'){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            erros:'não autenticado'
        })
    }
    return next()
}
module.exports = {autheticade}