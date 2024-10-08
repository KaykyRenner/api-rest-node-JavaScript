const knex = require('knex')
async function up(knex) {
    return knex.schema.createTable('pessoa', table =>{
        table.bigIncrements('id').primary().index(); 
        table.string('nomeCompleto').index().notNullable()

        table.bigInteger('cidadeId')
        .index()
        .notNullable()
        .references('id')
        .inTable('cidade')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')

        //table.comment('Table usada para armazenar cidades')
    }).then(()=>{
        console.log('tabela pessoa criada')
    }).catch(err=>{
        console.log('erro ao criar tabela pessoa', err)
    })
}
async function down(knex) {
    return knex.schema.dropTable('pessoa').then(()=>{
        console.log('tabela pessoa excluida')
    }).catch(err=>{
        console.log('erro ao excluir tabela pessoa', err)
    })
}
module.exports = {up,down}