const { StatusCodes } = require("http-status-codes");
const { testServer } = require("../jest.setup");

describe("cidades - create", () => {
    it("criar registro", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ nomeCidade: "Arcoverde" });

        console.log(res1.body);
        expect(res1.statusCode).toEqual(StatusCodes.CREATED); // Verifique se você espera um status 201
        expect(typeof res1.body).toEqual("object");
    });

    it("não pode criar registro com menos de 3 caracteres", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ nomeCidade: "Ar" });

        console.log(res1.body);
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("erros.body.nomeCidade");
    });

    it("não pode ser um número", async () => {
        const res1 = await testServer
            .post("/cidades")
            .send({ nomeCidade: 123 });

        console.log(res1.body);
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("erros.body.nomeCidade");
    });
});
