const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //Leer el token del header
    const token = req.header('x-auth-token');

    //Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'The token does not exist, invalid permission' });
    }

    //Validar el token
    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.driver = encryption.driver;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
}