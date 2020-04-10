const express = require('express');
const customers = require('../routes/customers');
const users = require('../routes/users');
const login = require('../routes/logins');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/customers', customers);
  app.use('/api/users', users);
  app.use('/api/login', login);
  app.use(error);
}