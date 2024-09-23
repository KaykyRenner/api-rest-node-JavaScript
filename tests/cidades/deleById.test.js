const {StatusCodes} = require('http-status-codes')
const {testServer} = require('../jest.setup');
describe('cidades - delete',()=>{
    it('deleta-ID',async()=>{
        const  id = 1
        const res1 = (await testServer
            .delete(`/cidades/${id}`))

            console.log(res1.body)

            expect(res1.statusCode).toEqual(StatusCodes.NO_CONTENT);
    })    
})