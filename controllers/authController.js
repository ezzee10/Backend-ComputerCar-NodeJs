const Driver = require('../models/Driver');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.authDriver = async (req, res) => {

    //revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //extraer el email y password
    const { email, password } = req.body;

    try {
        //Revisar que sea un usuario registrado
        let driver = await Driver.findOne({ email });
        console.log(driver);
        if (!driver) {
            return res.status(400).json({ msg: 'Driver does not exist' });
        }

        //Revisar el password
        const correctPass = await bcryptjs.compare(password, driver.password);
        if (!correctPass) {
            return res.status(400).json({ msg: 'Wrong password' });
        }

        //Si todo es correcto Crear y firmar el JWT 
        const payload = {
            driver: {
                id: driver.id
            }
        }
        jwt.sign(payload, process.env.SECRET, (error, token) => {
            if (error) throw error;
            //Mensaje de confirmación
            res.json({ token });
        })
    } catch (error) {
        console.log(error);
    }
}

//Obtiene que usuario está autenticado
exports.authenticatedDriver = async (req, res) => {

    try {
        const driver = await Driver.findById(req.driver.id).select('-password');
        res.json({ driver });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Ups, an error occurred...' });
    }

}