const Vehicle = require('../models/Vehicle');
const { validationResult } = require('express-validator');

exports.createVehicle = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        //Crear un nuevo vehiculo
        const vehicle = new Vehicle(req.body);

        //Guardar el conductor via JWT
        vehicle.driver = req.driver.id;

        //guardamos el vehiculo
        vehicle.save();
        res.json(vehicle);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups, an error occurred...');
    }
}

//Obtiene los datos del vehiculo
exports.getVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.find({ driver: req.driver.id });
        res.json({ vehicle });
    } catch (error) {
        console.log(error);
        res.status(500).send('Ups, an error occurred...');
    }
}

//Actualiza los datos del vehiculo
exports.updateVehicle = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {

        //revisar si existe el vehiculo
        let vehicle = await Vehicle.find({ driver: req.driver.id });

        //si el vehiculo no existe
        if (!vehicle) {
            return res.status(404).json({ msg: 'vehicle not found' });
        }

        //actualizar
        vehicle = await Vehicle.findOneAndUpdate({ driver: req.driver.id }, { $set: req.body }, { new: false });

        res.json({ vehicle });

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups, an error occurred...');
    }
}