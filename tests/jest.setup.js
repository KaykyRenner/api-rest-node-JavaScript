const supertest = require('supertest')
const {app} = require('../src/server/server')
const testServer = supertest(app)

module.exports = {testServer}