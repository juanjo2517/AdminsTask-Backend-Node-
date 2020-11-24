const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.authenticatedUser = async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    //Extraer datos del Request
    const { email, password } = req.body;  
    
    try {
        //Revisar que sea usuario registrado
        let user = await User.findOne({email});
        if(!user){
            return res.status(400)
            .json({msg: 'No existe un usuario con este correo'});
        }

        const correctPassword = await bcryptjs.compare(password, user.password);
        if(!correctPassword){
            return res.status(400).json({msg: 'Contraseña Incorrecta'});
        } 

        //Si es correcto se crea el JWT
        const payload = {
            user: {
                id: user.id,

            }
        };
        
        //Firmar JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            res.status(200).json({token});
        });


    } catch (error) {
        console.log(error);
    }
}

//Usuario autenticado 
exports.userAuthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}