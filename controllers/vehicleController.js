const Vehicle = require('../models/Vehicle');
const { validationResult } = require('express-validator');
const { sendEmail } = require('../config/sendEmail');

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
        let vehicle = await Vehicle.findOneAndUpdate({ driver: req.driver.id }, { $set: req.body }, { new: false }).populate('driver');
        
        // await Vehicle.find({ driver: req.driver.id }).populate("driver");

        //si el vehiculo no existe
        if (!vehicle) {
            return res.status(404).json({ msg: 'vehicle not found' });
        }

        res.json({ vehicle });

        let updateRotationWheels = vehicle.kmsMissingUpdateRotationWheels - vehicle.kilometresTotal === 500  || vehicle.kmsMissingUpdateRotationWheels - vehicle.kilometresTotal === 0;

        let updateTransmission = vehicle.kmsMissingUpdateTransmission - vehicle.kilometresTotal ===  500 || vehicle.kmsMissingUpdateTransmission - vehicle.kilometresTotal === 0;

        if (updateRotationWheels) {
            sendEmail(
                vehicle.driver.email,
                "Informaci??n sobre rotaci??n de cubiertas",
                `<div>
                    <p>${vehicle.kmsMissingUpdateRotationWheels - vehicle.kilometresTotal === 0 ? 'Le comunicamos que la cantidad de kil??metros establecida para la rotaci??n de cubiertas se ha cumplido.' 
                    : 'Le comunicamos que quedan 500 kil??metros para realizar la rotaci??n de cubiertas'}</p>
                </div>`
            );
        }

        if (updateTransmission) {
            sendEmail(
                vehicle.driver.email,
                "Informaci??n sobre rotaci??n de cubiertas",
                `<div>
                <p>${vehicle.kmsMissingUpdateTransmission - vehicle.kilometresTotal === 0 ? 'Le comunicamos que la cantidad de kil??metros establecida para el chequeo de transmisi??n se ha cumplido.' 
                : 'Le comunicamos que quedan 500 kil??metros para realizar el chequeo de transmisi??n'}</p>
                </div>`
            );
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Ups, an error occurred...');
    }
}