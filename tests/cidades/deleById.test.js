const { StatusCodes } = require('http-status-codes');
const { testServer } = require('../jest.setup');

describe('cidades - delete', () => {

    it('deleta-ID', async () => {
        const res = await testServer
            .post('/cidades')
            .send({ nomeCidade: "jaboatão" }); // Ajuste conforme sua API
            
    const cidadeId = res.body.id; // Substitua por um ID que você sabe que existe
        const resApagaDado = await testServer
            .delete(`/cidades/${cidadeId}`)
            .send(); // Usa o ID existente
        expect(resApagaDado.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('ID não pode ser menos que 0', async () => {
        const id = 0;
        const res1 = await testServer
            .delete(`/cidades/${id}`);
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('erros.params.id');
    });

    it('ID não pode ser letras', async () => {
        const id = 'a';
        const res1 = await testServer
            .delete(`/cidades/${id}`);
        
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('erros.params.id');
    });

    it('id não encontrado', async () => {
        const id = 999999;
        const res1 = await testServer
            .delete(`/cidades/${id}`);
        
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(res1.body).toHaveProperty('message', 'id não encontrado');
    });
});
