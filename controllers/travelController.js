const Travel = require('../models/Travel');
const { validationResult } = require('express-validator');

exports.createTravel = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        //Crear un nuevo recorrido
        const travel = new Travel(req.body);

        //Guardar el conductor via JWT
        travel.driver = req.driver.id;

        //guardamos la agenda
        travel.save();
        res.json(travel);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups, an error occurred...');
    }
}

//Obtener los recorridos del usuario

exports.getTravels = async (req, res) => {
    try {
        const travel = await Travel.find({ driver: req.driver.id });
        res.json({ travel });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups, an error occurred...');
    }
}

