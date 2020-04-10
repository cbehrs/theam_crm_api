const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validate = require('../middleware/validate');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', [auth, admin], async (req, res) => {
    const users = await User.find().sort('name').select('-password');
    res.send(users);
});

router.post('/', [auth, validate(validateUser), admin], async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin'])); // with this sentence we prevent malicious users to send multiple parameters in request
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id']));
});

router.put('/:id', [auth, admin, validate(validateUser), validateObjectId], async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    }, {
        new: true // set to true for returning the updated object, false for returning the original
    });

    if (!user) return res.status(404).send('There is no registered user with the given ID!');

    res.send(user);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) return res.status(404).send('There is no registered user with the given ID!');

    res.send(user);
});

router.get('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send('There is no registered user with the given ID!');

    res.send(user);
});

module.exports = router;