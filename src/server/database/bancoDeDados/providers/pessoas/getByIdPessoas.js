const { StatusCodes } = require('http-status-codes')
const knex = require('../../knexConfig')

const getByIdPessoa = async (id) =>{
    try{
        const resultado = await knex('pessoa').where('id',id).first()

        if(resultado){
            return { 
                status: StatusCodes.OK, 
                pessoa: resultado 
            };
        }
        else{
            return{status:StatusCodes.NOT_FOUND, message:'id não encontrado'}
        }
        //const resultado = await knex('cidade').select('id').where('id', id).first()
    }
    catch(err){
        console.log('erro ao buscar')
        return {status:StatusCodes.INTERNAL_SERVER_ERROR, message:'erro ao encontrar pessoa'}
        
    }
    
}
module.exports = {getByIdPessoa}