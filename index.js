const logger = require('./middleware/logger');
const express = require('express');
const app = express();


console.log(`NODE_ENV:: ${process.env.NODE_ENV}`); 
app.use(express.json()); //for parsing the req.body into a json object
app.use(express.urlencoded({ extended: true})); //for decoding and understanding key value objects in req payload
// app.use(express.static('public')); //we put in this folder all static assets like images, logos, etc

app.use('/', logger); // adding the usage of a middleware on specified route

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));