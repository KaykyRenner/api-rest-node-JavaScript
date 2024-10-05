const { StatusCodes } = require('http-status-codes')
const knex = require('../../knexConfig')
const count = async (filter = '')=>{
    try{
        const [{count:total}] = await knex('cidade').where('nome','like',`%${filter}%`).count('* as count')
        return Number.isInteger(Number(total))? Number(total):0;
    }catch(err){
        console.log('erro ao contar cidade',err)
        return 0;
    }
}
module.exports={count}