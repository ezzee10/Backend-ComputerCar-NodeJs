const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const { check } = require('express-validator');


router.post('/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('surname', 'El surname is required').not().isEmpty(),
        check('email', 'Email is required and must be valid').isEmail(),
        check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6}),
    ],
    driverController.createDriver
)

router.get('/',
    driverController.getDriver
)

module.exports = router;