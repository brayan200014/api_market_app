const modeloDetalleVenta= require('../modelos/modeloDetalleVenta');
const modeloVentas= require('../modelos/modeloVentas');
const msj= require('../componentes/mensaje');
const {validationResult}= require('express-validator');
const sequelize= require('sequelize');
const { QueryTypes }= require('@sequelize/core')
const db= require('../configuraciones/db');

const modeloProducto= require('../modelos/modeloProductos');
//let IdVentaRecibido=0;


exports.guardarDetalle= async(req,res) => {
    const validacion= validationResult(req);

    if(!validacion.isEmpty()) {
        res.json(validacion.array()); 
    }
    else 
    {
        const {IdProducto, Cantidad,Precio}= req.body; 

        if(!IdProducto || !Cantidad || !Precio) {
            msj("Algunos datos estan vacios", 200, [], res);
        }
        else 
        {
   

            const idVenta= await db.query('SELECT max(IdVenta) as idVenta from ventas', { type: QueryTypes.SELECT});
              var buscarIdVenta= await modeloVentas.findOne({
                where: {
                    IdVenta: idVenta[0].idVenta
                }
            }); 

           var buscarIdProducto= await modeloProducto.findOne({
                where: {
                    IdProducto: IdProducto
                }
            });

            if(!buscarIdVenta) {
                msj("El numero de factura no existe", 200, idVenta, res);
            }
            else if(!buscarIdProducto)
            {
                msj("El id de producto no existe", 200, idVenta, res);
            }
            else 
            {   
                await modeloDetalleVenta.create({
                    Ventas_IdVenta: idVenta[0].idVenta,
                    Productos_IdProducto: IdProducto,
                    Cantidad: Cantidad,
                    PrecioVenta: Precio
                }).then((data) => {
                    msj("Registro Almacenado", 200, [], res);
                }).catch((error)=>{
                    msj("Ocurrio un error al alamcenar el registro", 200, error, res);
                });
            }

        }
    }
}


exports.modificarDetalle= async (req, res) => {
    const validacion= validationResult(req);

    if(!validacion.isEmpty()) {
        res.json(validacion.array()); 
    }
    else 
    {
        const {IdProducto, IdVenta}= req.query; 
        const {Cantidad,Precio, IdProductoModificar}= req.body;
        var buscarIdDetalle= await modeloDetalleVenta.findOne({
            where: {
                Ventas_IdVenta: IdVenta,
                Productos_IdProducto: IdProducto
            }
        });


        if(!buscarIdDetalle) {
            msj("Los datos del producto y/o de la venta son incorrectos", 200, [], res);
        }
        else  if(!IdProductoModificar) {
            buscarIdDetalle.Cantidad= Cantidad; 
            buscarIdDetalle.PrecioVenta= Precio;
            await buscarIdDetalle.save().then((data)=>{
                msj("Registro Actualizado Correctamente", 200, [], res);
            }).catch((error)=>{
                console.log(error)
                msj("Ocurrio un error", 200, [], res);
            });
        }
        else {
            buscarIdDetalle.Productos_IdProducto= IdProductoModificar;
            buscarIdDetalle.Cantidad= Cantidad; 
            buscarIdDetalle.PrecioVenta= Precio;
            await buscarIdDetalle.save().then((data)=>{
                msj("Registro Actualizado Correctamente", 200, [], res);
            }).catch((error)=>{
                msj("Ocurrio un error", 200, [], res);
            });
        }
    }
}