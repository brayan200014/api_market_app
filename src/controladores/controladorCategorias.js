const { query } = require('express');
const ModeloCategoria = require('../modelos/modeloCategorias');
const db = require('../configuraciones/db');
const msj= require('../componentes/mensaje');
const {QueryTypes} = require('sequelize');
const {validationResult} = require('express-validator');
/*
exports.inicio = (req, res) =>{
    res.send("Usted se encuentra en Modulo Categorias");
};*/

//listar Categorias
exports.listar = async (req,res) => {
    const listarCategorias= await ModeloCategoria.findAll();

    if(listarCategorias.length==0) {
        msj("No hay categorias!!", 200, [], res); 
    }
    else 
    {
        msj("Categorias", 200, listarCategorias, res); 
    }
};


//guardar Categorias
exports.guardarCategorias= async (req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else
    {
        const {NombreCategoria} = req.body;
        if(!NombreCategoria){
            res.send("Debe enviar los datos completos");
        }
        else{
            await ModeloCategoria.create({
                NombreCategoria
            })
            .then((data) => {
                console.log(data);
                res.send("Categoria Almacenado");
                
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al guardar el categoria");    
            });
    }   }
};


//ELIMINAR  Categorias
exports.eliminarCategoria = async (req, res) => {
    const {NombreCategoria} = req.query;
    if(!NombreCategoria){
        res.send("Envie el nombre correcto!!");
    }
    else{
            await ModeloCategoria.destroy({
                where:{

                    NombreCategoria: NombreCategoria,
                }
            })
            .then((data) => {
                if (data==0) {
                    res.send("La categoria no existe");
                } else {
                    console.log(data);
                    res.send("Categoria eliminada con exito");
                }
            })   
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar Categoria!!");

            });
    }
};


//Modificar ategorias
exports.modificarCategorias = async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    const { IdCategoria} = req.query;
    const {NombreCategoria} = req.body;
    if(!NombreCategoria){
        res.send("Por favor envie los datos completos");
    }
    else{
        var busquedaCategoria = await ModeloCategoria.findOne({
            where:{

                IdCategoria: IdCategoria  
            }
        });
        if(!busquedaCategoria){
            res.send("La categoria no existe!!");
        }
        else{
            busquedaCategoria.NombreCategoria=NombreCategoria;
            await busquedaCategoria.save()
            .then((data) => {
                console.log(data);
                res.send("Categoria modificada");
                
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al modificar los datos");

            });
        }
    }
};
