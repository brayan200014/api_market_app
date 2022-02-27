const { query } = require('express');
const ModeloSucursales = require('../modelos/modeloSucursales');
const ModeloCiudad = require('../modelos/modeloCiudades');
const db = require('../configuraciones/db');
const {QueryTypes} = require('sequelize');
const {validationResult} = require('express-validator');

exports.inicio = (req, res) =>{
    res.send("Usted se encuentra en Modulo Sucursales...Bienvenido");
};

//LISTAR REGISTRO SUCURSALES
exports.listarSucursales = async (req, res) => {
    const listarSucursales = await db.query("select * from vistasucursales",{type:QueryTypes.SELECT}); //Aqui estoy llamando a la vista...consulta lit
    if(listarSucursales.length==0){
        res.send("Lo sentimos mucho pero...No existen datos");

    }
    else{
        res.json(listarSucursales);
    }
};

//GUARDAR REGISTROS SUCURSALES Y VALIDACIÓN
exports.guardarSucursales = async (req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else{
        const {NombreSucursal, Direccion , Ciudades_IdCiudad} = req.body;

    if(!NombreSucursal ||!Ciudades_IdCiudad){
        res.send("Debe enviar los datos completos");
    }
    else{
            const buscarsucursal = await ModeloSucursales.findOne({
                where:{
                    NombreSucursal : NombreSucursal,
                }
            });
            if(!buscarsucursal){
                const buscarCiudad = await ModeloCiudad.findOne({
                    where:{
                        IdCiudad: Ciudades_IdCiudad,
                    }
                });
                if (!buscarCiudad) {
                    res.send("La ciudad no existe");
                } else 
                {
                    await ModeloSucursales.create({
                        NombreSucursal,
                        Direccion,
                        Ciudades_IdCiudad,
                        
                    })
                    .then((data) => {
                        console.log(data);
                        res.send("Registro de Sucursal Guardado Exitosamente");
                        
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al guardar el registro de la sucursal");    
                    });
                }    
            }
            else{
                res.send("El ID de la sucursal no existe o esta inactivo");
            }
        }
    }
};


//ELIMINAR REGISTROS SUCURSALES
exports.eliminarSucursal = async (req, res) => {
    const {IdSucursal} = req.query;
    if(!IdSucursal){
        res.send("Envie el ID de la sucursal");
    }
    else{
            await ModeloSucursales.destroy({
                where:{

                    IdSucursal: IdSucursal,
                }
            })
            .then((data) => {
                if (data==0) {
                    res.send("El registro de la sucursal no existe");
                } else {
                    console.log(data);
                    res.send("Registro eliminado con exito");
                }
            })   
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar los datos de la sucursal");

            });
    }
};

//MODIFICAR REGISTRO SUCURSALES
exports.modificarSucursales = async (req, res) => {
    const { IdSucursal} = req.query;
    const {NombreSucursal, Direccion ,Ciudades_IdCiudad} = req.body;
    if(!NombreSucursal || !Ciudades_IdCiudad){
        res.send("Por favor envie los datos completos");
    }
    else{
        var busquedaSucursal = await ModeloSucursales.findOne({
            where:{

                IdSucursal:IdSucursal,  
            }
        });
        if(!busquedaSucursal){
            res.send("Lo sentimos...La sucursal no existe");
        }
        else{
            const buscarCiudad = await ModeloCiudad.findOne({
                where:{
                    idCiudad: Ciudades_IdCiudad,
                }
            });
            if (!buscarCiudad) {
                res.send("La ciudad no existe");
            } else 
            {
            busquedaSucursal.NombreSucursal=NombreSucursal;
            busquedaSucursal.Ciudades_IdCiudad=Ciudades_IdCiudad;
            busquedaSucursal.Direccion=Direccion;
            
            await busquedaSucursal.save()
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
    }
};

