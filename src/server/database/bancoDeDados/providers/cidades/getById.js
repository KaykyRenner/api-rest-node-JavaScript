const { StatusCodes } = require('http-status-codes')
const knex = require('../../knexConfig')

const getByIdBS = async (id) =>{
    try{
        const resultado = await knex('cidade').where('id',id).first()

        if(resultado){
            return {status:StatusCodes.OK, message:'cidade encontrada com sucesso',cidade:resultado}
        }
        else{
            return{status:StatusCodes.NOT_FOUND, message:'id não encontrado'}
        }
        //const resultado = await knex('cidade').select('id').where('id', id).first()
    }
    catch(err){
        console.log('erro ao deletar')
        return {status:StatusCodes.INTERNAL_SERVER_ERROR, message:'erro ao encontrar cidade'}
        
    }
    
}
module.exports = {getByIdBS}