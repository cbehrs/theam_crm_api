const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) { // middleware function, note the next function for passing control to the next middleware in our app
    const token = req.header('x-auth-token');
    if (!token ) return res.status(401).send('Access  denied! No token provided!');
    try{
        const tokenDecoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = tokenDecoded;
        next();
    }catch(ex){
        res.status(400).send('Invalid token!');
    }
}