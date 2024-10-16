const { StatusCodes } = require("http-status-codes");
const { testServer } = require("../jest.setup");

describe("login de Usuário", () => {
    it("should log in a user successfully", async () => { 
        const res1 = await testServer
            .post("/cadastrar")
            .send({
                nome: "KaykyTesteLogin",  // Ensure the same name as in your expectations
                senha: "KaykyTesteLogin123",
                email: "KaykyTesteLogin@gmail.com",
            });
        
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(res1.body).toHaveProperty("nome", "KaykyTesteLogin");  // Match the name you sent
        const res2 = await testServer
            .post("/entrar") // Assuming POST is the correct method for login
            .send({
                senha: "KaykyTesteLogin123",
                email: "KaykyTesteLogin@gmail.com",
            });
        expect(res2.statusCode).toEqual(StatusCodes.OK);
        expect(res2.body).toHaveProperty("accessToken"); // Check for the presence of accessToken
    });
});
