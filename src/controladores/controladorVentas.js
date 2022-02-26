const {validationResult}= require('express-validator');
const modeloVentas= require('../modelos/modeloVentas');
const msj= require('../componentes/mensaje');
const modeloDetalleVenta= require('../modelos/modeloDetalleVenta');
//const modeloProducto= require('')
const controladorDetalleVenta= require('../controladores/controladorDetalleVenta');
var Venta_IdVenta=0;

//const modeloUsuarioCliente= require(''); 
//const modeloSucursal= require('');

exports.listar= async (req,res) => {
    const listarVentas= await modeloVentas.findAll();

    if(listarVentas.length==0) {
        msj("No hay usuarios registrados", 200, [], res); 
    }
    else 
    {
        msj("Datos Ventas", 200, listarVentas, res); 
    }
}

exports.listarVenta= async (req,res) => {
    const validacion= validationResult(req); 

    if(!validacion.isEmpty()) {
        res.json(validacion.array()); 
    }
    else 
    {
        const {id}= req.query;

        if(!id) {
            msj("El id no contiene ningun dato", 200, [], res); 
        }
        else 
        {
            const buscarVenta= await modeloVentas.findOne({
                where: {
                    IdVenta: id
                }
            });

            if(!buscarVenta) {
                msj("El numero de factura proporcionado no existe en la base de datos", 200, [], res);
            }
            else 
            {
                msj("Datos", 200, buscarVenta, res);
            }
        }
    }

}


exports.guardar= async (req,res) => {
    const validacion= validationResult(req); 

    if(!validacion.isEmpty()) {
        res.json(validacion.array()); 
    }
    else 
    {
        const {FechaVenta, Subtotal, ISV}= req.body;

        if(!FechaVenta || !Subtotal || !ISV) {
            msj("Hay datos vacios al enviar los datos", 200, [], res); 
        }
        else 
        {


           /* var buscarIdCliente; 
            var buscarIdSucursal;*/
           /* var buscarIdCliente= await modeloUsuarioCliente.findOne({
               where: {
                   IdUsuarioCliente: IdUsuarioCliente,
                   Estado: 1
               }
           })

           var buscarIdSucursal= await modeloSucursal.findOne({
               where: {
                  IdSucursal : Sucursales_IdSucursal
               }
           })

           if(!buscarIdCliente) {
               msj("El Id de Usuario Cliente no existe o esta inactivo", 200,[], res);
           }
           else if(!buscarIdSucursal) {
               msj("El id de la sucursal no existe", 200, [], res);
           }
           else 
           {*/
               await modeloVentas.create({
                   FechaVenta: FechaVenta, 
                   Subtotal: Subtotal,
                   ISV: ISV 
                 /*  IdUsuarioCliente: buscarIdCliente,
                   Sucursales_IdSucursal: buscarIdSucursal*/
                
               }).then((data) => {
                   Venta_IdVenta= data.IdVenta;
                   msj("Registro Almacenado", 200, [], res);
                 
               }).catch((error) => {
                   msj("Ocurrio un error al almacenar los datos", 200,[], res);
                   console.log(error);
               })
         //  }

    


        }
    }
}



exports.modificar= async (req,res)=>{
    const validacion= validationResult(req); 

    if(!validacion.isEmpty()) {
        res.json(validacion.array()); 
    }
    else {
        const {id}= req.query;
        const {FechaVenta, Subtotal, ISV, IdUsuarioCliente, Sucursales_IdSucursal}= req.body;

        if(!FechaVenta || !Subtotal || !ISV /*|| !IdUsuarioCliente || !Sucursales_IdSucursal*/) {
            msj("Hay datos vacios al enviar los datos", 200, [], res); 
        }
        else 
        {
        
            if(!id) {
                msj("Envio un numero de factura invalido", 200, [], res);
            } 
            else {
                var buscarVenta= await modeloVentas.findOne({
                    where: {
                        IdVenta: id
                    }
                });


                /* var buscarIdCliente= await modeloUsuarioCliente.findOne({
               where: {
                   IdUsuarioCliente: IdUsuarioCliente,
                   Estado: 1
               }
                })

                var buscarIdSucursal= await modeloSucursal.findOne({
                    where: {
                        IdSucursal : Sucursales_IdSucursal
                    }
                })*/


           if(!id) {
               msj("El numero de factura no existe en la base de datos", 200, [], res);
           }
         /*  else  if(!buscarIdCliente) {
            msj("El Id de Usuario Cliente no existe o esta inactivo", 200,[], res);
            }
            else if(!buscarIdSucursal) {
                msj("El id de la sucursal no existe", 200, [], res);
            }*/
            else 
            {
                buscarVenta.FechaVenta= FechaVenta; 
                buscarVenta.Subtotal= Subtotal; 
                buscarVenta.ISV= ISV;
               /* buscarVenta.IdUsuarioCliente= buscarIdCliente; 
                buscarVenta.Sucursales_IdSucursal= buscarIdSucursal;*/

                await buscarVenta.save().then((data)=> {
                    msj("Registro Actualizado Exitosamente", 200, [], res);
                }).catch((error) => {
                    msj("Ocurrio un error", 200, [], res);
                    console.log(error);
                })

                
               
            }

            }
        } 

    }
}


exports.eliminar= async (req,res) => {
    const validacion= validationResult(req); 

    if(!validacion.isEmpty()) {
        res.json(validacion.array()); 
    }
    else 
    {
        const {id}= req.query;
        console.log(id)
        if(!id) {
            msj("Envio un numero de factura invalido", 200, [], res);
        } 
        else {
           

            await modeloVentas.destroy({
                where: {
                    IdVenta: id
                }
            }).then((result) => {{
                if(result==0) {
                    msj("El numero de factura no existe", 200,[], res);
                }
                else 
                {
                    msj("Factura Eliminada", 200,[], res);
                }
            }}).catch((error) => {
                msj("Error al eliminar la factura", 200,[], res);
                console.log(error);
            })
        }
    }
}
 