const { query } = require('express');
const ModeloEmpleados = require('../modelos/modeloEmpleados');
const ModeloSucursales = require('../modelos/modeloSucursales');
const db = require('../configuraciones/db');
const {QueryTypes} = require('sequelize');
const {validationResult} = require('express-validator');
const mensaje = require('../componentes/mensaje');

exports.inicio = (req, res) =>{
    res.send("Usted se encuentra en Modulo Empleados...Bienvenido");
};


//LISTAR REGISTRO EMPLEADOS
exports.listarEmpleados = async (req, res) => {
    //const listarEmpleados = await ModeloEmpleados.findAll();
    const listarEmpleados = await db.query("select * from vistaempleados",{type:QueryTypes.SELECT}); //Aqui estoy llamando a la vista...consulta lit
    if(listarEmpleados.length==0){
        mensaje("Lo sentimos mucho pero...No existen datos", 200, [], res);

    }
    else{
        mensaje("Datos Empleados", 200,listarEmpleados, res);
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
        mensaje("Debe enviar los datos completos", 500, [], res);
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
                    mensaje("La sucursal no existe", 500, [], res);
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
                        mensaje("Registro de Empleado Guardado Exitosamente", 200, [], res);
                        
                    })
                    .catch((error) => {
                        console.log(error);
                        mensaje("Error al guardar el registro de empleado", 500, [], res);   
                    });
                }    
            }
            else{
                mensaje("El email del empleado no existe o esta inactivo", 500, [], res);
            }
        }
    }
};



//ELIMINAR REGISTROS CLIENTES
exports.eliminarEmpleados = async (req, res) => {
    const {IdEmpleado} = req.query;
    if(!IdEmpleado){
        mensaje("El ID del Empleado no existe", 500, [], res);
    }
    else{
            await ModeloEmpleados.destroy({
                where:{

                    IdEmpleado: IdEmpleado,
                }
            })
            .then((data) => {
                if (data==0) {
                    mensaje("El registro del empleado no existe", 500, [], res);
                } else {
                    console.log(data);
                    mensaje("Registro eliminado con exito", 200, [], res);
                }
            })   
            .catch((error) => {
                console.log(error);
                mensaje("Error al eliminar los datos del cliente", 500, [], res);

            });
    }
};


//MODIFICAR REGISTRO EMPLEADOS
exports.modificarEmpleados = async (req, res) => {
    const { IdEmpleado} = req.query;
    const {Telefono, Direccion, Estado, Sucursales_IdSucursal} = req.body;
    if(!Telefono ||!Estado ||!Sucursales_IdSucursal ){
        mensaje("Debe enviar los datos completos", 500, [], res);
    }
    else{
        var busquedaEmpleados = await ModeloEmpleados.findOne({
            where:{

                IdEmpleado:IdEmpleado,  
            }
        });
        if(!busquedaEmpleados){
            mensaje("Lo sentimos mucho pero...No existe el empleado", 500, [], res);
        }
        else{
            const buscarsucursal = await ModeloSucursales.findOne({
                where:{
                    idSucursal: Sucursales_IdSucursal,
                }
            });
            if (!buscarsucursal) {
                mensaje("La sucursal no existe", 500, [], res);
            } else 
            {
            busquedaEmpleados.Telefono=Telefono;
            busquedaEmpleados.Direccion=Direccion;
            busquedaEmpleados.Estado=Estado;
            busquedaEmpleados.Sucursales_IdSucursal = Sucursales_IdSucursal;
            await busquedaEmpleados.save()
            .then((data) => {
                console.log(data);
                mensaje("Registro de Empleado Modificado Exitosamente", 200, [], res);
                
            })
            .catch((error) => {
                console.log(error);
                mensaje("Error al modificar el registro de empleado", 500, [], res); 

            });
        }
    }
    }
};
