const modeloProveedor = require('../modelos/modeloProveedores');

exports.Inicio = (req, res)=>{
    res.send("<h1>Se encuentra en el inicio del modulo de Proveedores</h1>");
};
exports.proveedorListar = async(req, res)=>{
    const listaProveedores = await modeloProveedor.findAll();
    if(listaProveedores.length == 0){
        res.send("No existe ningun proveedor.");
    }
    else{
        res.json(listaProveedores);
    }
};
exports.proveedorGuardar = async (req, res)=>{
    const { NombreProveedor, Contacto, Email } = req.body;
    if(!NombreProveedor){
        res.send("Debe de Ingresar el Nombre del Proveedor.");
    }
    else if(!Contacto){
        res.send("Debe de Ingresar el Contacto del Proveedor.");
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
};
exports.proveedorActualizar = async (req, res)=>{
    const { IdProveedor } = req.query;
    const { NombreProveedor, Contacto, Email } = req.body;

    if(!IdProveedor || !NombreProveedor || !Contacto){
        res.send("Verifique y Complete los datos.");
    }
    else{
         var buscarProveedor = await modeloProveedor.findOne({
            where:{
                IdProveedor: IdProveedor,
            }   
         });
         if(!buscarProveedor){
             res.send("El Id del Proveedor que desea actualizar NO existe.");
         }
         else{
             buscarProveedor.NombreProveedor = NombreProveedor;
             buscarProveedor.Contacto = Contacto;
             buscarProveedor.Email = Email;
             await buscarProveedor.save()
             .then((data)=>{
                 console.log(data);
                 res.send("Registro del Proveedor Actualizado.");
             })
             .catch((error)=>{
                 console.log(error);
                 res.send("Error al Actualizar el proveedor");
             });
         }
    }
};
exports.proveedorEliminar = async (req, res)=>{
    const { IdProveedor } = req.query;
    if(!IdProveedor){
        res.send("Envie el ID del Proveedor a Eliminar.");
    }
    else{
        var buscarProveedor = await modeloProveedor.findOne({
            where:{
                IdProveedor: IdProveedor,
            }
        });
        if(!buscarProveedor){
            res.send("El ID que envio NO existe.");
        }
        else{
            await modeloProveedor.destroy({
                where:{
                    IdProveedor: IdProveedor,
                }
            })
            .then((data)=>{
                console.log(data);
                res.send("Registro eliminado.");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al Eliminar el Proveedor.");
            });
        }
    }
};
