// Rutas para crear autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Crea un usuario
// api/auth
router.post('/',
    authController.authDriver
);

//Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.authenticatedDriver
);

module.exports = router;