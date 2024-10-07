const { app } = require('./server/server'); 
const PORT = process.env.PORT || 3000;
const knex = require('./server/database/bancoDeDados/knexConfig');

const StartServe = () => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
}

if (process.env.IS_LOCALHOST !== 'true') {
    knex.migrate.latest()
        .then(() => {
            return knex.seed.run(); // Retorne a Promise da função de seed
        })
        .then(() => {
            StartServe(); // Aqui você deve chamar a função
        })
        .catch((error) => {
            console.error('Erro durante migrações ou seeds:', error); // Tratamento de erro adequado
        });
} else {
    StartServe();
}
