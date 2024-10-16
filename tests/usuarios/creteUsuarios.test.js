const { StatusCodes } = require("http-status-codes");
const { testServer } = require("../jest.setup");

describe("usuario create", () => {
    it('should create a user successfully', async () => {
        const res1 = await testServer
            .post("/cadastrar")
            .send({
                nome: "KaykyTeste",
                senha: "KaykyTeste123",
                email: "KaykyTeste@gmail.com",
            });
        
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(res1.body).toHaveProperty("nome", "KaykyTeste"); // Check for the property directly
    });
});
