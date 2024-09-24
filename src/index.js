const {app} = require('./server/server')

app.listen(process.env.PORT||3000, ()=>{
    console.log('app rodando em', `http://localhost:${process.env.PORT || 3000}`);
})
