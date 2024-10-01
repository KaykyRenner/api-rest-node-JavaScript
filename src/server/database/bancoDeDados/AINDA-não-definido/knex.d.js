const {cidade} = require('../../models/index')
const dataToValidate = {
    id: 1,
    nomeCidade: 'São Paulo'
};
Id_Nome.validate(dataToValidate).then(validar=>{
    console.log('validação bem sucedidada', validar)
}).catch(err=>{
    console.log('erro ao validar', err)
})