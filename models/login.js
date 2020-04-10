const Joi = require('@hapi/joi');

module.exports = function (req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    const validation = schema.validate(req);    
    return validation;
}