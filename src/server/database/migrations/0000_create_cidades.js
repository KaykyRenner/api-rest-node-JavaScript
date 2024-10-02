const knex = require('knex')
async function up(knex) {
    return knex.schema.createTable('cidade', table =>{
        table.bigIncrements('id').primary().index(); 
        table.string('nome', 150).checkLength('<=',150).index().notNullable()
        //table.comment('Table usada para armazenar cidades')
    }).then(()=>{
        console.log('tabela CIDADE criada')
    }).catch(err=>{
        console.log('erro ao criar tabela', err)
    })
}
async function down(knex) {
    return knex.schema.dropTable('cidade').then(()=>{
        console.log('tabela CIDADE excluida')
    }).catch(err=>{
        console.log('erro ao excluir tabela', err)
    })
}
module.exports = {up,down}