const create = require('./singUp')
const Login = require('./singIn')

const usuarioController = {
    ...create,
    ...Login

}

module.exports = usuarioController