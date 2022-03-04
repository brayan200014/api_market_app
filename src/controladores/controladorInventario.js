const { query } = require('express');
const ModeloSucursales = require('../modelos/modeloSucursales');
const ModeloProducto = require('../modelos/modeloProductos');
const ModeloInventario = require('../modelos/modeloInventario');
const db = require('../configuraciones/db');
const {QueryTypes} = require('sequelize');
const {validationResult} = require('express-validator');


exports.inicio = (req, res) =>{
    res.send("Usted se encuentra en Modulo Inventario");
};

//listar Inventario
exports.listarInventario = async (req, res) => {
    const listarInventario = await db.query("select * from vista_inventario",{type:QueryTypes.SELECT}); 
    if(listarInventario.length==0){
        res.send("No existen datos!!!");

    }
    else{
        res.json(listarInventario);
    }
};

//Modificar inventario
exports.modificarInventaro = async (req, res) => {
   
    const {Productos_IdProducto, Sucursales_IdSucursal ,CantidadExistencia,PrecioVenta} = req.body;
    if(!Productos_IdProducto || !Sucursales_IdSucursal){
        res.send("Por favor envie los datos completos");
    }
    else{
        var busquedaInventario = await ModeloProducto.findOne({
            where:{

                IdProducto: Productos_IdProducto,  
            }
        });
        if(!busquedaInventario){
            res.send("Lo sentimos. No esta en el inventario");
        }
        else{
            const busquedaSucursal = await ModeloSucursales.findOne({
                where:{
                    IdSucursal: Sucursales_IdSucursal,
                }
            });
            if (!busquedaSucursal) {
                res.send("La sucursal no existe");
            } else 
            {
            busquedaInventario.Productos_IdProducto=Productos_IdProducto;
            busquedaInventario.Sucursales_IdSucursal=Sucursales_IdSucursal;
            busquedaInventario.CantidadExistencia=CantidadExistencia;
            busquedaInventario.PrecioVenta=PrecioVenta;
            
            
            await busquedaInventario.save()
            .then((data) => {
                console.log(data);
                res.send("inventario modificado");
                
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al querer modificar inventario");

             });
           }
        }
    }
 };

 //Guardar en inventario
exports.guardarInventario = async (req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else{
        const {Productos_IdProducto, Sucursales_IdSucursal ,CantidadExistencia,PrecioVenta} = req.body;

    if(!Productos_IdProducto ||!Sucursales_IdSucursal){
        res.send("Debe enviar los datos completos");
    }
    else{
            const buscarSucursal = await ModeloSucursales.findOne({
                where:{
                    IdSucursal : Sucursales_IdSucursal,
                }
            });
            if(!buscarSucursal){
                const buscarProducto = await ModeloProducto.findOne({
                    where:{
                        IdProducto: Productos_IdProducto,
                    }
                });
                if (!buscarProducto) {
                    res.send("El producto no existe");
                } else 
                {
                    await ModeloInventario.create({
                        Productos_IdProducto,
                        Sucursales_IdSucursal,
                        CantidadExistencia,
                        PrecioVenta,
                        
                    })
                    .then((data) => {
                        console.log(data);
                        res.send(" Guardado Exitosamente en inventario");
                        
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al guardar en inventario");    
                    });
                }    
            }
            else{
                res.send("El ID de la sucursal no existe o esta inactivo");
            }
        }
    }
};

//eliminar en inventario
exports.eliminarInventario = async (req, res) => {
    const { Sucursales_IdSucursal,Productos_IdProducto} = req.body;
    if(!Sucursales_IdSucursal || !Productos_IdProducto ){
        res.send("Envie todos los datos");
    }
    else{
            await ModeloInventario.destroy({
                where:{

                    Sucursales_IdSucursal: Sucursales_IdSucursal,
                    Productos_IdProducto: Productos_IdProducto,
                }
            })
            .then((data) => {
                if (data==0) {
                    res.send("El registro no existe");
                } else {
                    console.log(data);
                    res.send("Registro eliminado con exito");
                }
            })   
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar los datos");

            });
    }
};


