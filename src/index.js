const {app} = require('./server/server') 
const PORT = process.env.PORT || 3000;
const knex = require('./server/database/bancoDeDados/knexConfig')
const StartServe = ()=>{app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});}
if(process.env.IS_LOCALHOST !== 'true'){
knex.migrate.latest().then(
    ()=>{
        knex.seed.run().then(()=>{StartServe}).catch(console.log('err'))
    }
).catch(console.log('erro'))}
else{
    StartServe()
}
