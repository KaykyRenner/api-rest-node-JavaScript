const {StatusCodes} = require('http-status-codes');
const {testServer} = require('../jest.setup');
describe('procurar todas as cidades',()=>{
    it('buscar todos os registros',async()=>{
        //const res1 = await testServer
        //.post('/cidades')
        //.send({nomeCidade: "Arcoverde"})
    //expect(res1.statusCode).toEqual(StatusCodes.CREATED)
    const reBuscada = await testServer
    .get('/cidades')
    .set('authorization','Bearer teste.teste.teste');
    

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
        .get('/cidades?page=1&limit=10&filter=algumFiltro')
        .set('authorization','Bearer teste.teste.teste');
        expect(res1.statusCode).toEqual(StatusCodes.OK)
    })
    it('page e limit não pode ser string', async()=>{
        const res1 = await testServer
        .get('/cidades?page=a&limit=a&filter=algumFiltro')
        .set('authorization','Bearer teste.teste.teste');
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.query.page')
        expect(res1.body).toHaveProperty('erros.query.limit')
    })
    it('page e limit não pode ser 0 ou menor', async()=>{
        const res1 = await testServer
        .get('/cidades?page=0&limit=0&filter=algumFiltro')
        .set('authorization','Bearer teste.teste.teste');
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.query.page')
        expect(res1.body).toHaveProperty('erros.query.limit')
    })
    it('filter não pode ser número', async()=>{
        const res1 = await testServer
        .get('/cidades?page=1&limit=10&filter=1')
        .set('authorization','Bearer teste.teste.teste');
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
        expect(res1.body).toHaveProperty('erros.query.filter')
        
    })
    it('page e limit devem ser numeros inteiro', async () => {
        const res1 = await testServer.get('/cidades?page=1.5&limit=2.5&filter=algumFiltro')
        .set('authorization','Bearer teste.teste.teste');
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('erros.query.page');
        expect(res1.body).toHaveProperty('erros.query.limit');
    });
    
})