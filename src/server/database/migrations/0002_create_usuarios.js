const knex = require('knex')
async function up(knex) {
    return knex.schema.createTable('usuario', table =>{
        table.bigIncrements('id').primary().index(); 
        table.string('nome').notNullable().checkLength('>',3)
        table.string('senha').notNullable().checkLength('>',6)
        table.string('email').index().unique().notNullable().checkLength('>',6);


        //table.comment('Table usada para armazenar cidades')
    }).then(()=>{
        console.log('tabela usuario criada')
    }).catch(err=>{
        console.log('erro ao criar tabela usuario', err)
    })
}
async function down(knex) {
    return knex.schema.dropTable('usuario').then(()=>{
        console.log('tabela usuario excluida')
    }).catch(err=>{
        console.log('erro ao excluir tabela usuario', err)
    })
}
module.exports = {up,down}