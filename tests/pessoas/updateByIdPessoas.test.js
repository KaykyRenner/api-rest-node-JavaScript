const { StatusCodes } = require('http-status-codes');
const { testServer } = require('../jest.setup');

describe('atualizar pelo id', () => {
    it('atualizar pelo id', async () => {
        // Criando uma nova pessoa
        const res = await testServer
            .post('/pessoas')
            .set('authorization','Bearer teste.teste.teste')
            .send({ cidadeId: 1, pessoa: "testUpdate", email: "testUpdate@gmail.com"});
        
        // Verificando se a pessoa foi criada e se o ID foi retornado
        expect(res.statusCode).toEqual(StatusCodes.CREATED);
        const pessoaId = res.body.id; // Assume que o ID da pessoa criada é retornado na resposta
        
        console.log(`Atualizando pessoa com ID: ${pessoaId}`);
        
        // Atualizando a pessoa
        const res2 = await testServer
            .put(`/pessoas/${pessoaId}`)
            .set('authorization','Bearer teste.teste.teste')
            .send({ nomeCompleto: "Jubileu", cidadeId: 2 });

        // Verificando a resposta da atualização
        expect(res2.statusCode).toEqual(StatusCodes.OK);
        expect(res2.body).toHaveProperty('message', 'Pessoa atualizada com sucesso');
        expect(res2.body.pessoa).toEqual("Jubileu"); // Verificando se o nome foi atualizado
    });

    it('nome é obrigatório e id tem que ser um número', async () => {
        const id = 'a';
        const res1 = await testServer
            .put(`/pessoas/${id}`)
            .set('authorization','Bearer teste.teste.teste')
            .send({});
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('erros.params.id'); 
        expect(res1.body).toHaveProperty('erros.body.nomeCompleto');
    });

    it('id precisa ser maior que 0 e nome precisa conter pelo menos 3 caracteres', async () => {
        const id = 0;
        const res1 = await testServer
            .put(`/pessoas/${id}`)
            .set('authorization','Bearer teste.teste.teste')
            .send({ nomeCompleto: "aa" });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('erros.params.id');
        expect(res1.body).toHaveProperty('erros.body.nomeCompleto');
    });

    it('id precisa ser um número inteiro e nome não pode ser número', async () => {
        const id = 1.5;
        const res1 = await testServer
            .put(`/pessoas/${id}`)
            .set('authorization','Bearer teste.teste.teste')
            .send({ nomeCompleto: "12" });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('erros.params.id');
        expect(res1.body).toHaveProperty('erros.body.nomeCompleto');
    });

    it('id não encontrado', async () => {
        const id = 99999;
        const res1 = await testServer
            .put(`/pessoas/${id}`)
            .set('authorization','Bearer teste.teste.teste')
            .send({ nomeCompleto: "Novo Nome" });
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND);
        expect(res1.body).toHaveProperty('message', 'ID não encontrado');
    });
});
