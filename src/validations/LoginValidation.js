const Joi = require("joi");

const LoginValidation = (data) => {
    const schemaValidation = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),    
    });

    return schemaValidation.validate(data);
}

module.exports.LoginValidation = LoginValidation;