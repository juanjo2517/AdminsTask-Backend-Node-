const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()});
    }

    try {
        let project = new Project(req.body); 
        
        //Guaradr creador via JWT
        project.creatorUser = req.user.id;
        
        //Guardar proyecto
        await project.save();
        
        return res.status(200).json({project});      
    
    } catch (error) {
        console.log(error)
    }
}

//Obtener proyectos del usuario logueado

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creatorUser: req.user.id }).sort({dateRegister: -1});
        res.json({projects});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualizar proyecto
exports.updateProject = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errores: errors.array()});
    }

    const { name } = req.body;
    const newProject = {

    };
    if(name){
        newProject.name = name;
    }
    try {
        //Revisar ID 
        let project = await Project.findById(req.params.id);
        //Si el proyecto existe
        if(!project){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Verificar creador del proyecto
        if(project.creatorUser.toString() != req.user.id){
            return res.status(401).send('No tienes permiso.');
        }

        //Actualizar
        project = await Project.findByIdAndUpdate(
            { _id: req.params.id}, 
            {$set: newProject}, 
            {new: true}
        );

        return res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Eliminar Proyecto
exports.deleteProject = async (req, res) => {
    try {
        //Revisar ID 
        let project = await Project.findById(req.params.id);
        //Si el proyecto existe
        if(!project){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //Verificar creador del proyecto
        if(project.creatorUser.toString() != req.user.id){
            return res.status(401).send('No tienes permiso.');
        }

        //Actualizar
        project = await Project.findByIdAndDelete({_id: req.params.id});
        return res.json({msg: 'Proyecto eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}