//Rutas para crear usuarios 
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator'); 

//Crea un usuario 
//api/users
router.post('/',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'La contraseña debe ser de mínimo 8 caracteres').isLength({min: 8}),
    ],
    userController.createUser
 ); 

module.exports = router;