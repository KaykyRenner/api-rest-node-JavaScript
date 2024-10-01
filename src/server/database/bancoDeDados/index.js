const knexLib = require('knex')
const {development,production,test} = require('./envios')
const getEnvios = ()=>{
    switch(process.env.NODE_ENV){
        case 'production': return production
        case 'test': return test
        default: return development
}
}
const knex = knexLib(getEnvios)
module.exports = {knex}