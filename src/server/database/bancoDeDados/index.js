const sqlite3 = require('sqlite3').verbose
const {development,production,test} = require('./envios')
const getEnvios = ()=>{
    switch(process.env.NODE_ENV){
        case 'production': return production
        case 'test': return test
        default: return development
}
}
const db = new sqlite3.Database(getEnvios().connection.filename,(err)=>{
    if(err) console.error('erro ao conectar',err.message)
    else console.log('conectado')
})
module.exports = {db}