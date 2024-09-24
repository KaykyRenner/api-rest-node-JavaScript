const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')

const esquemaValidation = yup.object().shape({
    nomeCidade: yup.string()
        .required('nomeCidade é obrigatório')
        .min(3, 'nomeCidade deve ter pelo menos 3 caracteres')
        .strict() // Adiciona a validação estrita
        .test('not-a-number','nomeCidade não pode ser um número', value => isNaN(value)) // Teste adicional para verificar se não é um número
});

const getSchemas = (req) =>{
    return{
    body: esquemaValidation
    }

}
function geraNumero(min,max){
    return Math.floor(Math.random() *(max-min) + min)
}
const numeroAleatorio = geraNumero(1,100)
const getSchemasResultados = async (req, res) =>{
    
    const criarCidade ={ id:numeroAleatorio , nomeCidade:req.body.nomeCidade}
    console.log(req.body)
    res.status(StatusCodes.CREATED).json(criarCidade)
}
const getSchemasValidation = TVvalidate(getSchemas)
module.exports = {getSchemasValidation,getSchemasResultados}
