const express = require('express');
const router = express.Router();
const notesController = require('../controllers/noteController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crear notas
//api/notes
router.post('/',
    auth,
    [
        check('vtv', 'The vtv field is required').not().isEmpty(),
        check('fireExtinguisher', 'The fireExtinguisher is required').not().isEmpty(),
        check('battery', 'The battery field is required').not().isEmpty(),
    ],
    notesController.createNote
)

//obtener la agenda del usuario
router.get('/',
    auth,
    notesController.getNote
)

//actualizar la agenda del usuario
router.put('/',
    auth,
    notesController.updateNote
)

module.exports = router;