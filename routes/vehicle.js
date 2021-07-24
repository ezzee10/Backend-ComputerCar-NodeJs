const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/',
    auth,
    [
        check('kilometresTotal', 'The kmsTotal is required').not().isEmpty(),
    ],
    vehicleController.createVehicle
);

router.get('/',
    auth,
    vehicleController.getVehicle
)

router.put('/',
    auth,
    vehicleController.updateVehicle
);


module.exports = router;