const modeloProveedor = require('../modelos/modeloProveedores');
const msj = require('../componentes/mensaje');
const { validationResult } = require('express-validator');

exports.Inicio = (req, res)=>{
    res.send("<h1>Se encuentra en el inicio del modulo de Proveedores</h1>");
};
exports.proveedorListar = async(req, res)=>{
    const listaProveedores = await modeloProveedor.findAll();
    if(listaProveedores.length == 0){
        msj("No hay proveedores",200,[], res);
    }
    else{
        msj("Proveedores",200, listaProveedores, res);
    }
};
exports.proveedorGuardar = async (req, res)=>{
    const validar = validationResult(req);

    if(!validar.isEmpty()){
        res.json(validar.array());
    }
    else{
        const { NombreProveedor, Contacto, Email } = req.body;
        if(!NombreProveedor){
            msj("Debe de Ingresar el Nombre del Proveedor.", 200, [], res);
        }
        else if(!Contacto){
            msj("Debe de Ingresar el Contacto del Proveedor.", 200 , [], res);
        }
        else{
            await modeloProveedor.create({
                NombreProveedor: NombreProveedor,
                Contacto: Contacto,
                Email: Email
            })
            .then((data)=>{
                console.log(data);
                res.send("Proveedor Almacenado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al guardar el Proveedor.");
            });
        }
    }
    
};
exports.proveedorActualizar = async (req, res)=>{

    const { IdProveedor } = req.query;
    const { NombreProveedor, Contacto, Email } = req.body;

        if(!NombreProveedor || !Contacto || !Email) {
            msj("Verifique y Complete los datos.",200,[],res);
        }
        else{
            var buscarProveedor = await modeloProveedor.findOne({
                where:{
                    IdProveedor: IdProveedor,
                }   
            });
            if(!buscarProveedor){
                msj("El Id del Proveedor que desea actualizar NO existe.",200,[], res);
            }
            else{
                buscarProveedor.NombreProveedor = NombreProveedor;
                buscarProveedor.Contacto = Contacto;
                buscarProveedor.Email = Email;
                await buscarProveedor.save()
                .then((data)=>{
                    console.log(data);
                    msj("Registro del Proveedor Actualizado.", 200, data, res);
                })
                .catch((error)=>{
                    console.log(error);
                    msj("Error al Actualizar el proveedor", 200, error, res);
                });
            }
        }
};
exports.proveedorEliminar = async (req, res)=>{

    const validar = validationResult(req);

    if(!validar.isEmpty()){
        res.json(validar.array());
    }
    else{
        const { IdProveedor } = req.query;
        if(!IdProveedor){
            msj("Envie el ID del Proveedor a Eliminar.", 200, [], res);
        }
        else{
            var buscarProveedor = await modeloProveedor.findOne({
                where:{
                    IdProveedor: IdProveedor,
                }
            });
            if(!buscarProveedor){
                msj("El ID que envio NO existe.", 200, [], res);
            }
            else{
                await modeloProveedor.destroy({
                    where:{
                        IdProveedor: IdProveedor,
                    }
                })
                .then((data)=>{
                    console.log(data);
                    msj("Registro eliminado.", 200, data, res);
                })
                .catch((error)=>{
                    console.log(error);
                    msj("Error al Eliminar el Proveedor.", 200, error, res);
                });
            }
        }
    }
};
exports.listarUnProveedor = async(req, res) =>{
    const validar = validationResult(req);

    if(!validar.isEmpty()){
        res.json(validar.array());
    }
    else{
        const { IdProveedor } = req.query;

        if(!IdProveedor){
            msj("El ID no contiene ningun dato.", 200, [], res);
        }
        else{
            const buscarProveedor = await modeloProveedor.findOne({
                where: {
                    IdProveedor: IdProveedor
                }
            });

            if(!buscarProveedor){
                msj("El ID de proveedor ingresado NO existe.", 200, [], res);
            }
            else{
                msj("Datos", 200, buscarProveedor, res);
            }
        }
    }
};