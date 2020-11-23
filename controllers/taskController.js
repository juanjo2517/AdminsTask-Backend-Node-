const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');
const { translateAliases } = require('../models/Task');

exports.createTask = async (req, res) => {
    
    //Revisar errores
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({error: errors.array()});
    }


    //Extraer el proyecto
    const { project } = req.body;

    try {
        const existProject = await Project.findById(project);
        if(!existProject){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Revisar si proyecto actual pertenece al usuario Auth
        if(existProject.creatorUser.toString() != req.user.id){
            return res.status(401).send('No tienes permiso.');
        }

        //Crear tarea
        const task = new Task(req.body);  
        await task.save();
        return res.json({task});      
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Obtener tareas por proyecto 

exports.getTaskProject = async (req, res) => {

    //Extraer proyecto
    try {

        const { project } = req.body;

        const existProject = await Project.findById(project);
        if(!existProject){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
    
        //Revisar si proyecto actual pertenece al usuario Auth
        if(existProject.creatorUser.toString() != req.user.id){
            return res.status(401).send('No tienes permiso.');
        }

        //Obtener tareas por proyecto
        const tasks = await Task.find({project});
        res.json({tasks});


    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

// Actualizar tarea 

exports.updateTask = async (req, res) => {
    try {
        
        const { name, status, project } = req.body;

        //Si existe proyeto
        const existProject = await Project.findById(project);
        if(!existProject){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Si existe tarea
        const existTask = await Task.findById(req.params.id);
        if(!existTask){
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }

        //Revisar si proyecto actual pertenece al usuario Auth
        if(existProject.creatorUser.toString() != req.user.id){
            return res.status(401).send('No tienes permiso.');
        }

        const newTask = { };

        if(name){
            newTask.name = name;
        }

        if(status){
            newTask.status = status; 
        }

        task = await Task.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: newTask},
            {new: true}
        );

        return res.json({task});


    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { project } = req.body;

        //Si existe proyeto
        const existProject = await Project.findById(project);
        if(!existProject){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Si existe tarea
        const existTask = await Task.findById(req.params.id);
        if(!existTask){
            return res.status(404).json({msg: 'Tarea no encontrada'});
        }

        //Revisar si proyecto actual pertenece al usuario Auth
        if(existProject.creatorUser.toString() != req.user.id){
            return res.status(401).send('No tienes permiso.');
        }

        task = await Task.findByIdAndDelete({_id: req.params.id});

        return res.json({msg: 'Tarea Elimanda'});

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
}