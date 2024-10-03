const { StatusCodes } = require('http-status-codes')
const knex = require('../../knexConfig')

const getAllCidades = async (page,limit,filter) =>{
    try{
        const offset = (page - 1) * limit;
        const resultado = await knex('cidade')
        .where('nome','like',`%${filter}%`)
        .limit(limit)
        .offset(offset)

        return resultado
    }
    catch(err){
        console.log('erro ao buscar cidade')
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        return {erro:'erro ao buscar cidade', err:err.message}
        
    }
    
}
module.exports = {getAllCidades}