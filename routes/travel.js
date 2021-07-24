const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crear recorridos
//api/notes
router.post('/',
    auth,
    [
        check('kilometresTravel', 'The kilometetres travel is required').not().isEmpty(),
        check('originPlace', 'The origin place is required').not().isEmpty(),
        check('destinationPlace', 'The destination place is required').not().isEmpty(),
        check('dateOriginPlace', 'The date origin place is required').not().isEmpty(),
        check('dateDestinationPlace', 'The date destination place is required').not().isEmpty(),
    ],
    travelController.createTravel
)

//obtener todos los recorridos del usuario
router.get('/',
    auth,
    travelController.getTravels
)


module.exports = router;