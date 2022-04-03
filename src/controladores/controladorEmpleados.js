const { query } = require('express');
const ModeloEmpleados = require('../modelos/modeloEmpleados');
const ModeloSucursales = require('../modelos/modeloSucursales');
const db = require('../configuraciones/db');
const {QueryTypes} = require('sequelize');
const {validationResult} = require('express-validator');

exports.inicio = (req, res) =>{
    res.send("Usted se encuentra en Modulo Empleados...Bienvenido");
};


//LISTAR REGISTRO EMPLEADOS
exports.listarEmpleados = async (req, res) => {
    //const listarEmpleados = await ModeloEmpleados.findAll();
    const listarEmpleados = await db.query("select * from vistaempleados",{type:QueryTypes.SELECT}); //Aqui estoy llamando a la vista...consulta lit
    if(listarEmpleados.length==0){
        res.send("Lo sentimos mucho pero...No existen datos");

    }
    else{
        res.json(listarEmpleados);
    }
};


//GUARDAR REGISTROS EMPLEADOS Y VALIDACIÓN
exports.guardarEmpleados = async (req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else{
        const {Nombre, Apellido, Telefono, Direccion, Email, FechaContratacion, Estado, Sucursales_IdSucursal, Puestos_IdPuesto} = req.body;
    if(!Nombre || !Apellido ||!Telefono ||!Email ||!Sucursales_IdSucursal ||!Puestos_IdPuesto){
        res.send("Debe enviar los datos completos");
    }
    else{
            const buscarempleados = await ModeloEmpleados.findOne({
                where:{
                    Email: Email,
                }
            });
            if(!buscarempleados){
                const buscarsucursal = await ModeloSucursales.findOne({
                    where:{
                        idSucursal: Sucursales_IdSucursal,
                    }
                });
                if (!buscarsucursal) {
                    res.send("La sucursal no existe");
                } else {
                    await ModeloEmpleados.create({
                        Nombre,
                        Apellido,
                        Telefono,
                        Direccion,
                        Email, 
                        FechaContratacion:Date.now(), 
                        Estado,
                        Sucursales_IdSucursal,
                        Puestos_IdPuesto, 
                    })
                    .then((data) => {
                        console.log(data);
                        res.send("Registro de Empleado Guardado Exitosamente");
                        
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al guardar el registro de empleado");    
                    });
                }    
            }
            else{
                res.send("El email del empleado no existe o esta inactivo");
            }
        }
    }
};



//ELIMINAR REGISTROS CLIENTES
exports.eliminarEmpleados = async (req, res) => {
    const {IdEmpleado} = req.query;
    if(!IdEmpleado){
        res.send("Envie el ID del empleado");
    }
    else{
            await ModeloEmpleados.destroy({
                where:{

                    IdEmpleado: IdEmpleado,
                }
            })
            .then((data) => {
                if (data==0) {
                    res.send("El registro del empleado no existe");
                } else {
                    console.log(data);
                    res.send("Registro eliminado con exito");
                }
            })   
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar los datos del cliente");

            });
    }
};


//MODIFICAR REGISTRO EMPLEADOS
exports.modificarEmpleados = async (req, res) => {
    const { Email} = req.query;
    const {Telefono, Sucursales_IdSucursal, Puestos_IdPuesto} = req.body;
    if(!Telefono || !Sucursales_IdSucursal || !Puestos_IdPuesto){
        res.send("Por favor envie los datos completos");
    }
    else{
        var busquedaEmpleados = await ModeloEmpleados.findOne({
            where:{

                Email:Email,  
            }
        });
        if(!busquedaEmpleados){
            res.send("Lo sentimos...El empleado no existe");
        }
        else{
            const buscarsucursal = await ModeloSucursales.findOne({
                where:{
                    idSucursal: Sucursales_IdSucursal,
                }
            });
            if (!buscarsucursal) {
                res.send("La sucursal no existe");
            } else 
            {
            busquedaEmpleados.Telefono=Telefono;
            busquedaEmpleados.Sucursales_IdSucursal = Sucursales_IdSucursal;
            busquedaEmpleados.Puestos_IdPuesto= Puestos_IdPuesto;
            await busquedaEmpleados.save()
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
