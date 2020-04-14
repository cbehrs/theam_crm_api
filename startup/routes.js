const express = require('express');
const helmet = require('helmet');
const customers = require('../routes/customers');
const users = require('../routes/users');
const login = require('../routes/logins');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json({limit: '10mb'}));
  app.use(express.urlencoded({limit: '10mb'}));
  app.use(helmet());
  app.use('/api/customers', customers);
  app.use('/api/users', users);
  app.use('/api/login', login);
  app.use(error);
}