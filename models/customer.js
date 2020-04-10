const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    surname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    photo: {
        type: Buffer
    },
    updatedBy: {
        type: mongoose.Types.ObjectId
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        surname: Joi.string().min(3).max(50).required(),
        photo: Joi.string().base64()
    });

    const validation = schema.validate(customer);
    return validation;
}

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;