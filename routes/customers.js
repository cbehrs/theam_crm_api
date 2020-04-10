const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Customer, validateCustomer } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', [auth, validate(validateCustomer)], async (req, res) => {

    let customer = new Customer({
        name: req.body.name,
        surname: req.body.surname,
        photo: req.body.photo,
        updatedBy: process.env.loggedUserId
    });
    customer = await customer.save();

    res.send(customer);
});

router.put('/:id', [auth, validate(validateCustomer), validateObjectId], async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        surname: req.body.surname,
        photo: req.body.photo,
        updatedBy: process.env.loggedUserId
    }, {
        new: true // set to true for returning the updated object, false for returning the original
    });

    if (!customer) return res.status(404).send('There is no registered customer with the given ID!');

    res.send(customer);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('There is no registered customer with the given ID!');

    res.send(customer);
});

router.get('/:id', [auth, validateObjectId], async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).send('There is no registered customer with the given ID!');

    res.send(customer);
});

module.exports = router;