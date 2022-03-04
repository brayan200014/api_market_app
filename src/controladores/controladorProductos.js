const ModeloProductos= require('../modelos/modeloProductos');
const ModeloCategoria= require('../modelos/modeloCategorias');

exports.inicio = (req,res) => {
    res.send("Esto es inicio en modulo Productos");
 };

 exports.listarproductos= async (req,res) => {
    
    const listarproductos = await ModeloProductos.findAll();

    if(listarproductos.lenght==0)
    {
        res.send("No existen datos");
    }
    else{
        res.json(listarproductos);
    }
 };

 exports.guardarproductos = async (req, res) => {
    const {IdCategoria, NombreProducto} = req.body;

        if(!IdCategoria || !NombreProducto )
        {
            res.send("Debe enviar los datos completos");
        }
        else{

            const buscarCategoria = await ModeloCategoria.findOne({
                where:{
                    id : IdCategoria,
                }
            });
            if(!buscarCategoria){
                res.send("El id de la persona no existe/inactivo");
            }
            else{
                    await ModeloProductos.create({
                    IdCategoria: IdCategoria,
                    NombreProducto: NombreProducto,        
                }).then((data) => {
                    console.log(data);
                    res.send("Registro almacenado correctamente");
                }).catch((error) => {
                    console.log(error);
                    res.send("Error al guardar datos");
                });
            }
        }
 };

 exports.modificarProductos = async (req,res) => {
    const {IdProducto} = req.query; 
    const {NombreProducto} = req.body;
    if(!id)
    {
        res.send("Debe enviar el id del Producto");
    }
    else
    var buscarproducto = await ModeloProductos.findOne(
        {
            where: {
                IdProducto: IdProducto,
            }
        }
    );
    if(!buscarproducto)
    {
        res.send("El id no existe");
    }
    else
    {
            //va a guardar los datos
                buscarproducto.NombreProducto = NombreProducto;
                await buscarUsuario 
                .save().then((data) => {
                console.log(data);
                res.send("Registro actualizado correctamente");
            }).catch((error) => {
                console.log(error);
                res.send("Error al actualizar datos");
            });
    }
 };

 exports.eliminarproducto = async (req,res) => {
  
    const {IdProducto} = req.query; 

    if(!IdProducto)
    {
        res.send("Debe enviar el id de la persona");
    }
    else
    {
        var buscarproducto = await ModeloProductos.findOne(
            {
                where: {
                    IdProducto: IdProducto,
                }
            }
        );

        if(!buscarproducto)
        {
            res.send("El Usuario no existe");
        }
        else
        {
                    await ModeloProductos.destroy({
                        where:
                        {
                            IdProducto: IdProducto,
                        }
                    }).then((data) => {
                    console.log(data);
                    res.send("Registro eliminado correctamente");}).catch((error) => 
                    {
                    console.log(error);
                    res.send("Error borrar datos");
                });
        }
    }
 };
