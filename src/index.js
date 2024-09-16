const server = require('./server/server')

server.listen(process.env.PORT||3000, ()=>{
    console.log('app rodando','http://localhost:3333/',process.env.PORT||3000)
})
