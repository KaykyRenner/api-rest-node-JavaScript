const path = require('path')

const development = {
    client:'sqlite3',
    useNullAsDefault: true,
    pool:{
        afterCreate:(conn,done)=>{
            conn.run('PRAGMA busy_timeout = 30000;');
            done()
        }
    },
    connection:{
        filename: path.resolve(__dirname,'..','..','..','..', 'baseDeDados.sqlite')
    },
    migrations:{
        directory: path.resolve(__dirname,'..','migrations')
    },
    seeds:{
        directory: path.resolve(__dirname,'..','seeds')
    },
    pool:{
        afterCreate: (connection, callback)=>{
            connection.run('PRAGMA foreign_keys = ON', callback)
        }
    }
}
const test = {
    ...development,
    connection: ':memory'
}
const production={
    ...development
}

module.exports = {development,test,production}