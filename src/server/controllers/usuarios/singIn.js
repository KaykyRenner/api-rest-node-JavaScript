const { StatusCodes } = require("http-status-codes");
const yup = require("yup");
const { TVvalidate } = require("../../shared/middlewares/middleware");
const {getByEmail} = require("../../database/bancoDeDados/providers/usuarios/indexUsu");
const { singUpResultados } = require("./singUp");
const esquemaValidation = yup.object().shape({
    senha: yup
        .string()
        .required()
        .min(7),
        email: yup
        .string()
        .email()
        .required()
        .min(6)
})
const SingInResultados = async (req,res) =>{
    try{
        const {senha,email} = req.body
        const result = await getByEmail(email)
        if(!result.usuario){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                default:'email ou senha está incorreto'
            })
        }
        if(senha !== result.usuario.senha){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                default:'email ou senha está incorreto'
            })
        } else {
            return res.status(StatusCodes.OK).json({
                accessToken:'teste.teste.teste'
            })
        }
    }
    catch(err){
        console.log('erro ao fazer login', err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:'erro ao logar',
            message:err.message
        })
    }
}
const SingInSchemas = ()=>{
    return {
        body:esquemaValidation
    }
}
const singInValidation = TVvalidate(SingInSchemas)
module.exports = {singInValidation,SingInResultados}