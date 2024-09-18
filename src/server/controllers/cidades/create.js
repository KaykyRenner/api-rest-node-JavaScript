const { StatusCodes } = require("http-status-codes")
const yup = require('yup')

const bodyValidation = yup.object().shape({
    nomeCidade:yup.string().required().min(3)
})

const create = async (req, res) =>{
    try{
    const {nomeCidade} = req.body
    await bodyValidation.validate({nomeCidade})
    return res.status(StatusCodes.CREATED).send('cidade adicionada com sucess')

} catch(err){
    return res.status(StatusCodes.BAD_REQUEST).json({err:err.errors})
}
    
}

module.exports = {create}
