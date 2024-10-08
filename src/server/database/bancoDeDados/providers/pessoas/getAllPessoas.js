const { StatusCodes } = require('http-status-codes')
const knex = require('../../knexConfig')

const getAllPessoas = async (page,limit,filter) =>{
    try{
        const offset = (page - 1) * limit;
        const resultado = await knex('pessoa')
        .where('nomeCompleto','like',`%${filter}%`)
        .limit(limit)
        .offset(offset)

        return resultado
    }
    catch(err){
        console.log('erro ao buscar pessoas')
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        return {erro:'erro ao buscar pessoas', err:err.message}
        
    }
    
}
module.exports = {getAllPessoas}