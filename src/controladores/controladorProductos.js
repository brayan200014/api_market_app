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
    const {categoriaid, nombre} = req.body;

        if(!categoriaid || !nombre )
        {
            res.send("Debe enviar los datos completos");
        }
        else{

            const buscarCategoria = await ModeloCategoria.findOne({
                where:{
                    id : categoriaid,
                }
            });
            if(!buscarCategoria){
                res.send("El id de la persona no existe/inactivo");
            }
            else{
                    await ModeloProductos.create({
                    categoriaid: categoriaid,
                    nombre: nombre,        
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
    const {id} = req.query; 
    const {nombre} = req.body;
    if(!id)
    {
        res.send("Debe enviar el id del Producto");
    }
    else
    var buscarproducto = await ModeloProductos.findOne(
        {
            where: {
                id: id,
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
                buscarproducto.nombre = nombre;
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
  
    const {id} = req.query; 

    if(!id)
    {
        res.send("Debe enviar el id de la persona");
    }
    else
    {
        var buscarproducto = await ModeloProductos.findOne(
            {
                where: {
                    id: id,
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
                            id: id,
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
