const { StatusCodes } = require("http-status-codes");
const yup = require("yup");
const { TVvalidate } = require("../../shared/middlewares/middleware");
const {createUsuario} = require("../../database/bancoDeDados/providers/usuarios/indexUsu");
const esquemaValidation =  yup.object().shape(
    {
        nome: yup
        .string()
        .required()
        .min(3)
        ,
        senha: yup
        .string()
        .required()
        .min(7)
        ,
        email: yup
        .string()
        .email()
        .required()
        .min(6)

    }
)
const singUpResultados = async(req,res)=>{
    try{
        const {nome,senha,email} = req.body
        const UsuarioCriado = await createUsuario({
            email: email,
            nome:nome,
            senha:senha
        })
        res.status(UsuarioCriado.status).json(UsuarioCriado.usuario)
    }catch(err){
        console.log('erro ao criar', err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error:'erro ao criar usuario',
            message: err.message
        })
    }
}
const getSchemas = () =>{
    return{
        body:esquemaValidation
    }
}
const singUpsValidation = TVvalidate(getSchemas)
module.exports = {singUpsValidation, singUpResultados}