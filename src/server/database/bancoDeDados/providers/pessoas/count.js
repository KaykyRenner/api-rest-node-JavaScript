const { StatusCodes } = require('http-status-codes')
const knex = require('../../knexConfig')
const countPessoas = async (filter = '')=>{
    try{
        const [{count:total}] = await knex('pessoa').where('nomeCompleto','like',`%${filter}%`).count('* as count')
        return Number.isInteger(Number(total))? Number(total):0;
    }catch(err){
        console.log('erro ao contar pessoas',err)
        return 0;
    }
}
module.exports={countPessoas}