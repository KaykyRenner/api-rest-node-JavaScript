const yup = require('yup');
const { StatusCodes } = require('http-status-codes');

const TValidation = (getSchemas) => {
    return async (req, res, next) => {
        const errosResultados = {};
        //const schemas = getSchemas(req); // Chame getSchemas com req
        for (const [key, schema] of Object.entries(getSchemas(req))) {
            try {
                await schema.validate(req[key], { abortEarly: false });
            } catch (err) {
                if (err instanceof yup.ValidationError) {
                    const erros = err.inner.reduce((acc, error) => {
                        if (error.path) {
                            acc[error.path] = error.message;
                        }
                        return acc;
                    }, {});
                    errosResultados[key] = erros;
                }
            }
        }
        if (Object.keys(errosResultados).length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ erros: errosResultados });
        }
        return next();
    };
};
module.exports = { TValidation };
