const { validationResult } = require('express-validator');
const mensaje = require('../componentes/mensaje');
const modeloCompra = require('../modelos/modeloCompras');

exports.listarCompras = async(req, res)=>{
    const listarCompras = await modeloCompra.findAll();
    if(listarCompras.length == 0){
        mensaje("No hay ninguna Compra Registrada", 200, [], res);
    }
    else{
        mensaje("Lista Compras", 200, listarCompras, res);
    }
};
exports.guardarCompra = async (req, res)=>{
    const validar = validationResult(req);

    if(!validar.isEmpty()){
        res.json(validar());
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
            });
        }
    }
};
exports.modificarCompra= async (req, res)=>{
    const validar = validationResult(req);

    if(!validar.isEmpty()){
        res.json(validar());
    }
    else{
        const { IdCompra } = req.query;
        const {FechaCompra, Subtotal, ISV} = req.body;

        if(!idCompra){
            mensaje("Debe de ingresar un numero de Compra VALIDO.");
        }
        else if(!FechaCompra){
            mensaje("No debe dejar la fecha vacia.", 200, [], res);
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
            if(!buscarCompra){
                mensaje("El numero de Compra que desea Actualizar NO existe.", 200, [], res);
            }
            else{
                buscarCompra.FechaCompra = FechaCompra;
                buscarCompra.Subtotal = Subtotal;
                buscarCompra.ISV = ISV;
                await buscarCompra.save()
                .then((data)=>{
                    mensaje("Compra Actualizada Exitosamente", 200, [], res);
                })
                .catch((error) =>{
                    mensaje("ERROR al actualizar la Compra", 200, error, res);
                });
            }
        }
        
    }  
};
exports.eliminarCompra = async (req, res) =>{
    const { IdCompra } = req.query;

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
};