const {StatusCodes} = require('http-status-codes');
const {testServer} = require('../jest.setup');
describe('procurar todas as cidades',()=>{
    it('buscar todos os registros',async()=>{
        const res1 = await testServer
        .post('/pessoas')
        .set('authorization','Bearer teste.teste.teste')
        .send({cidadeId: 1, pessoa: "testAll", email: "testAll@gmail.com" });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    const reBuscada = await testServer
    .get('/pessoas')
    .set('authorization','Bearer teste.teste.teste');
    console.log(reBuscada.body)

    const totalCount = reBuscada.headers['x-total-count']
    expect(totalCount).toBeDefined()
    expect(Number(totalCount)).not.toBeNaN();
    expect(Number(totalCount)).toBeGreaterThan(0);

        // Verifica se o status da resposta é OK
        expect(reBuscada.statusCode).toEqual(StatusCodes.OK);

        // Verifica se a lista de cidades contém mais de 0 itens
        expect(reBuscada.body.length).toBeGreaterThan(0);  
    })
    it('procura pelo query', async ()=>{
        const res1 = await testServer
        .get('/pessoas?page=1&limit=10&filter=algumFiltro')
        .set('authorization','Bearer teste.teste.teste');
        expect(res1.statusCode).toEqual(StatusCodes.OK)
    })
    it('page e limit não pode ser string', async()=>{
        const res1 = await testServer
        .get('/pessoas?page=a&limit=a&filter=algumFiltro')
        .set('authorization','Bearer teste.teste.teste');
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.query.page')
        expect(res1.body).toHaveProperty('erros.query.limit')
    })
    it('page e limit não pode ser 0 ou menor', async()=>{
        const res1 = await testServer
        .get('/pessoas?page=0&limit=0&filter=algumFiltro')
        .set('authorization','Bearer teste.teste.teste');
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.query.page')
        expect(res1.body).toHaveProperty('erros.query.limit')
    })
    it('filter não pode ser número', async()=>{
        const res1 = await testServer
        .get('/pessoas?page=1&limit=10&filter=1')
        .set('authorization','Bearer teste.teste.teste');
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.query.filter')
        
    })
    it('page e limit devem ser numeros inteiro', async () => {
        const res1 = await testServer.get('/pessoas?page=1.5&limit=2.5&filter=algumFiltro')
        .set('authorization','Bearer teste.teste.teste');
        console.log(res1.body)
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('erros.query.page');
        expect(res1.body).toHaveProperty('erros.query.limit');
    });
    
})