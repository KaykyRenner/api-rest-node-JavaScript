const supertest = require('supertest')
const {app} = require('../src/server/server')
const knex = require('../src/server/database/bancoDeDados/knexConfig')
const testServer = supertest(app)

beforeAll(async () =>{
    await knex.migrate.latest()
    await knex.seed.run()
})

afterAll(async ()=>{
    await knex.destroy()
})

module.exports = {testServer}