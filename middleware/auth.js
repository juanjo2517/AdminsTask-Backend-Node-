const jwt = require('jsonwebtoken');


module.exports = function(req, res, next) {
    //Leer Token del Header
    const token = req.header('x-auth-token');
    //Revisar si no hay token
    if(!token){
        return res.status(401).json({msg: 'No hay Token, Permiso no valido'});
    }

    //Validar Token
    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: 'Permiso invalido'});
    }
}

