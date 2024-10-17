const { StatusCodes } = require("http-status-codes");
const yup = require("yup");
const { TVvalidate } = require("../../shared/middlewares/middleware");
const { getByEmail } = require("../../database/bancoDeDados/providers/usuarios/indexUsu");
const { hashPassowrd, verifyPassowrd } = require('../../shared/services/passowrdCrypsto'); // Using your original names
const { singUpResultados } = require("./singUp");

const esquemaValidation = yup.object().shape({
    senha: yup
        .string()
        .required()
        .min(7),
    email: yup
        .string()
        .email()
        .required()
        .min(6) // Keeping your original email min length
});

const SingInResultados = async (req, res) => {
    try {
        const { senha, email } = req.body;
        const result = await getByEmail(email);

        if (!result) {  // Assuming result returns null if no user is found
            return res.status(StatusCodes.UNAUTHORIZED).json({
                default: 'email ou senha está incorreto'
            });
        }

         // Log the result from the database
        console.log('Database result:', result);
        
        const passowrdMatch = await verifyPassowrd(senha, result.usuario.senha); // Your original variable names

        console.log('Password match:', passowrdMatch);

        if (!passowrdMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                default: 'email ou senha está incorreto'
            });
        } else {
            return res.status(StatusCodes.OK).json({
                accessToken: 'teste.teste.teste' // Mocked access token for now
            });
        }
    } catch (err) {
        console.log('erro ao fazer login', err.message);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'erro ao logar',
            message: err.message
        });
    }
};

const SingInSchemas = () => {
    return {
        body: esquemaValidation
    };
};

const singInValidation = TVvalidate(SingInSchemas);

module.exports = { singInValidation, SingInResultados };
