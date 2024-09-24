const { StatusCodes } = require('http-status-codes')
const yup = require('yup')
const {TVvalidate} = require('../../shared/middlewares/middleware')

const Id_Nome = yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
    nome: yup.string().required().min(3)
    .test('is-not-number', 'filter não pode ser número',(value) => {
        return isNaN(value); // Verifica se NÃO é um número
    })
})
const updateById = (req) =>{
    return{
    params: Id_Nome.pick(['id']),
    body: Id_Nome.pick(['nome'])
    }
}
const updateByIdResultado = (req ,res)=>{
    console.log(req.params)
    console.log(req.body)
    if(Number(req.params.id) >= 99999){return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({erros:{
        default:"registro não encontrado" 
    }}) }
    return res.status(StatusCodes.NO_CONTENT).send(`Cidade com id ${req.params.id} ${req.body.nome}`);
}
const updateByIdValidation = TVvalidate(updateById)
module.exports = {updateByIdValidation,updateByIdResultado}
