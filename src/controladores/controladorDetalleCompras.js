const modeloDetalleCompra = require('../modelos/modeloDetalleCompra');
const mensaje = require('../componentes/mensaje');
const { QueryTypes } = require('@sequelize/core');
const db = require('../configuraciones/db');
const {validationResult} = require('express-validator');

exports.guardarDetalleCompra = async(req, res)=>{
    const validacion = validationResult(req);

    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const { Productos_IdProducto, Cantidad, PrecioCompra} = req.body;

        if(!Productos_IdProducto){
            mensaje("El Id de Producto esta Vacio.", 200, [], res);
        }
        else if(!Cantidad){
            mensaje("La cantidad esta vacia.", 200, [], res);
        }
        else if(!PrecioCompra){
            mensaje("El precio de Compra esta vacio.", 200, [], res);
        }
        else{
            const IdCompra = await db.query('Select IdCompra from compras order by IdCompra desc limit 1;', {type: QueryTypes.SELECT});
            console.log(IdCompra);

            if(!IdCompra){
                mensaje("El numero de Compra no existe.");
            }
            else{
                await modeloDetalleCompra.create({
                    Compras_IdCompra: IdCompra[0].IdCompra,
                    Productos_IdProducto: Productos_IdProducto,
                    Cantidad: Cantidad,
                    PrecioCompra: PrecioCompra
                })
                .then((data)=>{
                    mensaje("Registro Almacenado con Exito", 200, data, res);
                })
                .catch((error)=>{
                    mensaje("Error al insertar el registro", 200, error, res);
                });
            }
        }
    }
};
exports.actualizarDetalleCompra = async (req, res)=>{
    const validacion = validationResult(req);

    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else{
        const { Compras_IdCompra, Productos_IdProducto } = req.query;
        const { Cantidad, PrecioCompra } = req.body;

        var buscarDetalleCompra = await modeloDetalleCompra.findOne({
            where:{
                Compras_IdCompra: Compras_IdCompra,
                Productos_IdProducto: Productos_IdProducto
            }
        });

        if(!buscarDetalleCompra){
            mensaje("Ingrese los datos del registro a actualizar Correctamente", 200, [], res);
        }
        else{
            buscarDetalleCompra.Cantidad = Cantidad;
            buscarDetalleCompra.PrecioCompra = PrecioCompra;
            await buscarDetalleCompra.save()
            .then((data)=>{
                mensaje("El detalle de Compra fue actualizado exitosamente", 200, [], res);
            })
            .catch((error)=>{
                mensaje("Error al actualizar el Detalle de Compra", 200, [], res);
            });
        }
    }

};

/*
exports.EliminarDetalleCompra = async (req, res)=>{
    const { Compras_IdCompra, Productos_IdProducto } = req.query;
    if(!Compras_IdCompra){
        mensaje("Ingrese un Numero de Compra a eliminar", 200, [], res);
    }
    else if(!Productos_IdProducto){
        mensaje("Ingrese un numero de producto a eliminar", 200, [], res);
    }
    else{
        await modeloDetalleCompra.destroy({
            where:{
                Compras_IdCompra: Compras_IdCompra,
                Productos_IdProducto: Productos_IdProducto,    
            }
        })
        .then((data)=>{
            mensaje("Detalle de Compra Eliminado Correctamente", 200, data, res);
        })
        .catch((error)=>{
            mensaje("ERROR al tratar de eliminar el detalle de Compra", 200, error, res);
        })
    }
};*/