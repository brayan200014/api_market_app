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

 exports.guardar = async (req,res) => {
        const {IdProducto, NombreProducto, Categorias_IdCategoria} = req.body;
        if(!IdProducto || !NombreProducto || !Categorias_IdCategoria)
        {
            res.send("Debe enviar los datos completos");
        }
        else
        {
            await ModeloProductos.create({
                IdProducto,
                NombreProducto,
                Categorias_IdCategoria
            })
            .then((data) => 
            {
                console.log(data);
                res.send("Registro Listo");     
            })
            .catch((error) =>
            {
                console.log(error);
                res.send("Error al guardar");    
            });
    }    
 };

 exports.modificarProductos = async (req,res) => {
    const {IdProducto} = req.query; 
    const {NombreProducto} = req.body;
    if(!IdProducto)
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
                await buscarproducto 
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
        res.send("Debe enviar el id del producto");
    }
    else
    {
        await ModeloProductos.destroy({
            where:
            {
                IdProducto: IdProducto,
            }
        })
        .then((data) => {
            if (data==0) {
                res.send("El producto no existe");
            } else {
                console.log(data);
                res.send("Registro eliminado con exito");
            }
        })   
        .catch((error) => {
            console.log(error);
            res.send("Error al eliminar los datos del producto");

        });
    }
 };
