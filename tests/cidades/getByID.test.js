const {StatusCodes} = require('http-status-codes');
const {testServer} = require('../jest.setup');
describe('procura cidade pelo id',()=>{
    it('procura pelo id', async () => {
        //const res1 = await testServer
            //.post('/cidades')
            //.send({ nomeCidade: "Arcoverde" });
        //expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const criaID = 1; // Verifique se o campo id está correto no body da resposta
        const buscaRegistro = await testServer
            .get(`/cidades/${criaID}`)
            .set('authorization','Bearer teste.teste.teste')
        
        console.log(buscaRegistro.body); // Verifica a resposta do get
        expect(buscaRegistro.statusCode).toEqual(StatusCodes.OK);
        expect(buscaRegistro.body).toHaveProperty('nome');
    });
    it('não existe cidade com id menor que 0',async()=>{
        const id = 0
        const res1 = await testServer
        .get(`/cidades/${id}`)
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.params.id')
    })
    it('ID não pode ser letras',async()=>{
        const id = 'a'
        const res1 = await testServer
        .get(`/cidades/${id}`)
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.params.id')
    })
    it('id não encontrado',async()=>{
        const id = 99999
        const res1 = await testServer
        .delete(`/cidades/${id}`)
        
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res1.body).toHaveProperty('message','id não encontrado')
    })
});