//Rutas para la creacion de projectos
const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

router.post('/',
    [   
        check('name', 'Agrega un nombre para el proyecto').not().isEmpty()
    ],
    auth,
    projectController.createProject
 ); 

 router.get('/',
    auth,
    projectController.getProjects
)

router.put('/:id', 
    auth,
    [   
        check('name', 'Agrega un nombre para el proyecto').not().isEmpty()
    ],
    projectController.updateProject
)

router.delete('/:id', 
    auth,
    projectController.deleteProject
)

module.exports = router;