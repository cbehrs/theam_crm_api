const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
  let db = '';
  if (process.env.NODE_ENV == 'test') {
    db = process.env.MONGO_URI + process.env.MONGO_DB_TEST;
  } else {
    db = process.env.MONGO_URI + process.env.MONGO_DB;
  }
  mongoose.connect(db, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => winston.info(`Connected to ${db}`));
}