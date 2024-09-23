const { StatusCodes } = require('http-status-codes');
const {testServer} = require('../jest.setup');
const { number } = require('yup');

 ('cidades - create', ()=>{
    it('criar registro',async ()=>{
        const res1 = await testServer
        .post('/cidades')
        .send({nomeCidade:'Arcoverde'});
        console.log(res1.body)
        
        expect(typeof res1.body).toEqual('object');
    });
    it('não pode criar registro c menos de 3 caracter', async ()=>{
        const res1 = await testServer
        .post('/cidades')
        .send({nomeCidade:'Ar'})
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.body.nomeCidade')
    })
    it('não pode ser um number', async ()=>{
        const res1 = await testServer
        .post('/cidades')
        .send({nomeCidade:123})
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.body.nomeCidade')
    })
})