const { StatusCodes } = require("http-status-codes");
const { testServer } = require("../jest.setup");

describe("cidades - create", () => {
    beforeAll(async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({ cidadeId: 1, pessoa: "testCreate", email: "testeCreate@gmail.com" });

        console.log(res1.body);
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("object");
    });

    it("não pode criar registro com menos de 3 caracteres", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({ cidadeId: 1, pessoa: "Ar" });

        console.log(res1.body);
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("erros.body.pessoa");
    });

    it("não pode ser um número", async () => {
        const res1 = await testServer
            .post("/pessoas")
            .send({ cidadeId: 1, pessoa: "123" });

        console.log(res1.body);
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("erros.body.pessoa");
    });
});
