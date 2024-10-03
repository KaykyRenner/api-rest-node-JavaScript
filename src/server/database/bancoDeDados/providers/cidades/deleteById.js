const { StatusCodes } = require('http-status-codes')
const knex = require('../../knexConfig')

const deleteCidade = async (id) =>{
    try{
        const resultado = await knex('cidade').where('id',id).del()

        if(resultado){
            return {status:StatusCodes.OK, message:'cidade deletada com sucesso'}
        }
        else{
            return{status:StatusCodes.NOT_FOUND, message:'id não encontrado'}
        }
        //const resultado = await knex('cidade').select('id').where('id', id).first()
    }
    catch(err){
        console.log('erro ao deletar')
        return {status:StatusCodes.INTERNAL_SERVER_ERROR, message:'erro ao deletar cidade'}
        
    }
    
}
module.exports = {deleteCidade}