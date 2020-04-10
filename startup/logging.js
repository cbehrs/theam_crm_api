const winston = require('winston');
require('express-async-errors');

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.Console({ level:'info', colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  winston.add(new winston.transports.File({ filename: 'logs.log' }));
  winston.add(new winston.transports.Console);
}