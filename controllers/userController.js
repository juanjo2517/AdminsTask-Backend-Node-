const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    
    //Revisar si hay errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }

    const { email, password } = req.body; 
    
    try {

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: `El usuario con correo ${email} ya existe`});
        }

        user = new User(req.body);
        
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        
        await user.save();

        //Creat JWT
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
            
            res.json({ token });

        });


    
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
