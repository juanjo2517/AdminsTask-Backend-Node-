//Rutas para la creacion de projectos
const express = require('express');
const router = express.Router();
const { check } = require('express-validator'); 
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.post('/',
    auth,
    [   
        check('name', 'Agrega un nombre para la tarea').not().isEmpty(),
        check('project', 'El proyecto es obligatorio').not().isEmpty()
    ],
    taskController.createTask
 ); 

router.get('/', 
    auth,
    taskController.getTaskProject  
);

router.put('/:id',
    auth,
    taskController.updateTask    
    );

router.delete('/:id',
    auth,
    taskController.deleteTask
    );


module.exports = router;