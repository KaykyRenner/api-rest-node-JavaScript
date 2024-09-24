const {StatusCodes} = require('http-status-codes');
const {testServer} = require('../jest.setup');
describe('procura cidade pelo id',()=>{
    it('procura pelo id', async () => {
        const res1 = await testServer
            .post('/cidades')
            .send({ nomeCidade: "Arcoverde" });
    
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        const criaID = res1.body.id; // Verifique se o campo id está correto no body da resposta
        console.log('ID criado:', criaID); // Log do ID para verificação
        
        const buscaRegistro = await testServer
            .get(`/cidades/${criaID}`);
        
        console.log(buscaRegistro.body); // Verifica a resposta do get
        expect(buscaRegistro.statusCode).toEqual(StatusCodes.OK);
        expect(buscaRegistro.body).toHaveProperty('nomeCidade');
    });
    it('não existe cidade com id menor que 0',async()=>{
        const id = 0
        const res1 = await testServer
        .get(`/cidades/${id}`)
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.params.id')
    })
    it('ID não pode ser letras',async()=>{
        const id = 'a'
        const res1 = await testServer
        .get(`/cidades/${id}`)
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.params.id')
    })
    it('id não encontrado',async()=>{
        const id = 99999
        const res1 = await testServer
        .delete(`/cidades/${id}`)
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(res1.body).toHaveProperty('erros.default')
    })
});