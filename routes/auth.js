//Rutas para autenticacion de usuario 
const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//Crea un usuario 
//api/auth
router.post('/',
    authController.authenticatedUser
 ); 

router.get('/',
    auth,
    authController.userAuthenticated
);

module.exports = router;