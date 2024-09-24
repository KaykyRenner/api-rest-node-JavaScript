const {StatusCodes} = require('http-status-codes');
const {testServer} = require('../jest.setup');
describe('buscar cidade pelo ID',()=>{
    it('buscar pelo id', async()=>{
        const id = 1
        const res1 = await testServer
        .put(`/cidades/${id}`)
        .send({nome:"são paulo"})
        expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT)
    })
    it('nome é obrigatório e id tem que ser um número', async()=>{
        const id = 'a'
        const res1 = await testServer
        .put(`/cidades/${id}`)
        .send({})
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.params.id')
        expect(res1.body).toHaveProperty('erros.body.nome')
    })
    it('id precisa ser maior que 0 e nome precisa conter pelo menos 3 caracter',async()=>{
        const id = 0
        const res1 = await testServer
        .put(`/cidades/${id}`)
        .send({nome:"aa"})

        console.log(res1.body)

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.params.id')
        expect(res1.body).toHaveProperty('erros.body.nome')
    })
    it('id precisa ser um número inteiro e nome não pode ser número',async()=>{
        const id = 1.5
        const res1 = await testServer
        .put(`/cidades/${id}`)
        .send({nome:"12"})

        console.log(res1.body)

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.params.id')
        expect(res1.body).toHaveProperty('erros.body.nome')
    })
    it('id não encontrado',async()=>{
        const id = 99999
        const res1 = await testServer
        .delete(`/cidades/${id}`)
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('erros.default')
    })
})