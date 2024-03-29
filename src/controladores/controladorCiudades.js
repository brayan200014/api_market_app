const { query } = require('express');
const ModeloCiudad = require('../modelos/modeloCiudades');
const db = require('../configuraciones/db');
const {QueryTypes} = require('sequelize');
const {validationResult} = require('express-validator');

exports.inicio = (req, res) =>{
    res.send("Usted se encuentra en Modulo Ciudades...Bienvenido");
};

//LISTAR REGISTRO CIUDADES
exports.listarCiudades = async (req, res) => {
    const listarCiudades = await db.query("Select * from vistaciudades",{type:QueryTypes.SELECT}); //Aqui estoy llamando a la vista...consulta lit
    if(listarCiudades.length==0){
        res.send("Lo sentimos mucho pero...No existen datos");

    }
    else{
        res.json(listarCiudades);
    }
};

//GUARDAR CIUDADES
exports.guardarCiudades = async (req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else
    {
        const {NombreCiudad} = req.body;
        if(!NombreCiudad){
            res.send("Debe enviar los datos completos");
        }
        else{
            await ModeloCiudad.create({
                NombreCiudad
            })
            .then((data) => {
                console.log(data);
                res.send("Registro Almacenado");
                
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al guardar el registro");    
            });
    }   }
};


//ELIMINAR REGISTROS CIUDADES
exports.eliminarCiudad = async (req, res) => {
    const {NombreCiudad} = req.query;
    if(!NombreCiudad){
        res.send("Envie el Nombre de la Ciudad");
    }
    else{
            await ModeloCiudad.destroy({
                where:{

                    NombreCiudad: NombreCiudad,
                }
            })
            .then((data) => {
                if (data==0) {
                    res.send("El registro de la ciudad no existe");
                } else {
                    console.log(data);
                    res.send("Registro eliminado con exito");
                }
            })   
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar los datos de la ciudad");

            });
    }
};


//MODIFICAR REGISTRO CIUDADES
exports.modificarCiudades = async (req, res) => {
    console.log(req.query);
    console.log(req.body);
    const { IdCiudad } = req.query;
    const {NombreCiudad} = req.body;
    if(!NombreCiudad){
        res.send("Por favor envie los datos completos");
    }
    else{
        var busquedaCiudad = await ModeloCiudad.findOne({
            where:{

                IdCiudad: IdCiudad  
            }
        });
        if(!busquedaCiudad){
            res.send("Lo siento...El id de la ciudad no existe");
        }
        else{
            busquedaCiudad.NombreCiudad=NombreCiudad;
            await busquedaCiudad.save()
            .then((data) => {
                console.log(data);
                res.send("Registro modificado");
                
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al querer modificar los datos");

            });
        }
    }
};


