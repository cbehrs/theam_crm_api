const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/jwtPrivateKey')();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/database')();
require('./startup/firstDeploy')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;