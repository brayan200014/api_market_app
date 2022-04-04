const { validationResult } = require('express-validator');
const mensaje = require('../componentes/mensaje');
const modeloCompra = require('../modelos/modeloCompras');

const modeloEmpleado = require('../modelos/modeloEmpleados');
const modeloSucursal= require('../modelos/modeloSucursales');
const modeloProveedor = require('../modelos/modeloProveedores');

const { QueryTypes }= require('@sequelize/core')
const db = require('../configuraciones/db');

exports.listarCompras = async(req, res)=>{
    const listarCompras = await modeloCompra.findAll();
    if(listarCompras.length == 0){
        mensaje("No hay ninguna Compra Registrada", 200, [], res);
    }
    else{
        mensaje("Lista Compras", 200, listarCompras, res);
    }
};
exports.ListarComprasJoin = async (req,res)=> {
    const compras = await db.query('SELECT * FROM ListaComprasJoin;', { type: QueryTypes.SELECT});
    
    if(!compras){
        mensaje("No hay Compras en los registros",200,[], res);
    }
    else{
        mensaje("Datos Compras", 200, compras, res); 
    }
};
exports.guardarCompra = async (req, res)=>{
    const validar = validationResult(req);

    if(!validar.isEmpty()){
        res.json(validar.array());
    }
    else{
        const {FechaCompra, Subtotal, ISV, Empleados_IdEmpleado, Sucursales_IdSucursal, Proveedores_IdProveedor} = req.body;

        if(!FechaCompra){
            mensaje("No debe dejar la fecha vacia.", 200, [], res);
        }
        else if(!Subtotal){
            mensaje("No debe dejar el subtotal vacio.", 200, [], res);
        }
        else if(!ISV){
            mensaje("No debe dejar el impuesto vacio.", 200, [], res);
        }
        else if(!Empleados_IdEmpleado){
            mensaje("No debe dejar el ID del Empleado vacio.", 200, [], res);
        }
        else if(!Sucursales_IdSucursal){
            mensaje("No debe dejar el ID de la Sucursal vacio.", 200, [], res);
        }
        else if(!Proveedores_IdProveedor){
            mensaje("No debe dejar el ID del Proveedor vacio.", 200, [], res);
        }
        else{
            await modeloCompra.create({
                FechaCompra: FechaCompra,
                Subtotal: Subtotal,
                ISV: ISV,
                Empleados_IdEmpleado: Empleados_IdEmpleado,
                Sucursales_IdSucursal: Sucursales_IdSucursal,
                Proveedores_IdProveedor: Proveedores_IdProveedor
            })
            .then((data)=>{
                mensaje("Compra Almacenada", 200, data, res);
            })
            .catch((error)=>{
                mensaje("ERROR! No se pudo almacenar la Compra.", 200, error, res);
                console.log(error);
            });
        }
    }
};
exports.modificarCompra= async (req, res)=>{
    const validar = validationResult(req);

    if(!validar.isEmpty()){
        res.json(validar.array());
    }
    else{
        const { IdCompra } = req.query;
        const {Subtotal, ISV, Empleados_IdEmpleado, Sucursales_IdSucursal, Proveedores_IdProveedor} = req.body;

        if(!IdCompra){
            mensaje("Debe de ingresar un numero de Compra VALIDO.");
        }
        else if(!Subtotal){
            mensaje("No debe dejar el subtotal vacio.", 200, [], res);
        }
        else if(!ISV){
            mensaje("No debe dejar el impuesto vacio.", 200, [], res);
        }
        else{

            var buscarCompra = await modeloCompra.findOne({
                where:{
                    IdCompra: IdCompra,
                }
            });

            var buscarIdEmpleado = await modeloEmpleado.findOne({
                where:{
                    IdEmpleado: Empleados_IdEmpleado
                }
            });

            var buscarIdSucursal = await modeloSucursal.findOne({
                where:{
                    IdSucursal: Sucursales_IdSucursal
                }
            });
            
            var buscarIdProveedor = await modeloProveedor.findOne({
                where:{
                    IdProveedor: Proveedores_IdProveedor
                } 
            });

            if(!buscarCompra){
                mensaje("El numero de Compra que desea Actualizar NO existe.", 200, [], res);
            }
            else if(!buscarIdEmpleado){
                mensaje("El Id del empleado NO existe.", 200, [], res);
            }
            else if(!buscarIdSucursal){
                mensaje("El Id de la sucursal NO existe.", 200, [], res);
            }
            else if(!buscarIdProveedor){
                mensaje("El Id del Proveedor NO existe.", 200, [], res);
            }
            else{
                buscarCompra.FechaCompra = buscarCompra.FechaCompra;
                buscarCompra.Subtotal = Subtotal;
                buscarCompra.ISV = ISV;
                buscarCompra.Empleados_IdEmpleado = buscarIdEmpleado.IdEmpleado;
                buscarCompra.Sucursales_IdSucursal = buscarIdSucursal.IdSucursal;
                buscarCompra.Proveedores_IdProveedor = buscarIdProveedor.IdProveedor;
                await buscarCompra.save()
                .then((data)=>{
                    mensaje("Compra Actualizada Exitosamente", 200, data, res);
                })
                .catch((error) =>{
                    mensaje("ERROR al actualizar la Compra", 200, error, res);
                });
            }
        }
        
    }  
};
exports.eliminarCompra = async (req, res) =>{

    const validar = validationResult(req);

    if(!validar.isEmpty()){
        res.json(validar.array());
    }
    else{
        const { IdCompra } = req.query;
        console.log(IdCompra);
    
        if(!IdCompra){
            mensaje("Ingrese un numero de Compra a Eliminar");
        }
        else{
            var buscarCompra = await modeloCompra.findOne({
                where:{
                    IdCompra: IdCompra,
                }
            }); 
            if(!buscarCompra){
                mensaje("El ID de compra Ingresado NO existe.");
            }
            else{
                await modeloCompra.destroy({
                    where:{
                        IdCompra: IdCompra,
                    }
                })
                .then((data)=>{
                    console.log(data);
                    mensaje("Registro Eliminado Exitosamente", 200, [], res);
                })
                .catch((error)=>{
                    mensaje("Error al Eliminar la Compra", 200, error, res);
                });
            }
        }
    }
};
exports.listarUnaCompra = async(req, res) =>{
    const validar = validationResult(req);

    if(!validar.isEmpty()){
        res.json(validar.array());
    }
    else{
        const {id} = req.query;

        if(!id){
            mensaje("El ID no contiene ningun dato.", 200, [], res);
        }
        else{
            const buscarCompra = await modeloCompra.findOne({
                where: {
                    IdCompra: id
                }
            });

            if(!buscarCompra){
                mensaje("El numero de compra ingreso no existe, ingrese un numero de compra valido.", 200, [], res);
            }
            else{
                mensaje("Datos", 200, buscarCompra, res);
            }
        }
    }
};