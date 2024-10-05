const {StatusCodes} = require('http-status-codes');
const {testServer} = require('../jest.setup');
describe('atualizar pelo id',()=>{
    it('buscar pelo id', async()=>{
        const res1 = await testServer
        .post('/cidades')
        .send({nomeCidade:"Arcoverde"})
        const id = res1.body.id
        const res2 = await testServer
        .put(`/cidades/${id}`)
        .send({nomeCidade:"são paulo"})
        console.log(res2.body)
        expect(res2.statusCode).toEqual(StatusCodes.OK)

    })
    it('nome é obrigatório e id tem que ser um número', async()=>{
        const id = 'a'
        const res1 = await testServer
        .put(`/cidades/${id}`)
        .send({})
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.params.id')
        expect(res1.body).toHaveProperty('erros.body.nomeCidade')
    })
    it('id precisa ser maior que 0 e nome precisa conter pelo menos 3 caracter',async()=>{
        const id = 0
        const res1 = await testServer
        .put(`/cidades/${id}`)
        .send({nomeCidade:"aa"})

        console.log(res1.body)

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.params.id')
        expect(res1.body).toHaveProperty('erros.body.nomeCidade')
    })
    it('id precisa ser um número inteiro e nome não pode ser número',async()=>{
        const id = 1.5
        const res1 = await testServer
        .put(`/cidades/${id}`)
        .send({nomeCidade:"12"})

        console.log(res1.body)

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.params.id')
        expect(res1.body).toHaveProperty('erros.body.nomeCidade')
    })
    it('id não encontrado',async()=>{
        const id = 99999
        const res1 = await testServer
        .delete(`/cidades/${id}`)
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res1.body).toHaveProperty('message','id não encontrado')
    })
})