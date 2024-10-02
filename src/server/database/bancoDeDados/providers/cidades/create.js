const { StatusCodes } = require('http-status-codes')
const knex = require('../../knexConfig')

const createCidade = async (nomeCidade) =>{
    try{
        await knex('cidade').insert({nome:nomeCidade})

        const resultado = await knex('cidade').select('id').where('nome', nomeCidade).first()

        return resultado
    }
    catch(err){
        console.log('erro ao cadastrar')
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        return {erro:'erro ao cadastrar', err:err.message}
        
    }
    
}
module.exports = {createCidade}