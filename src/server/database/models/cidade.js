const Id_Nome = yup.object().shape({
    id: yup.number(),
    nomeCidade: yup.string()
    .test('is-not-number', 'filter não pode ser número',(value) => {
        return isNaN(value); // Verifica se NÃO é um número
    })
})
const cidade = () =>{
    return{
    id: Id_Nome.pick(['id']),
    nomeCidade: Id_Nome.pick(['nomeCidade'])
    }
}
module.exports = {cidade}