const ModeloProductos= require('../modelos/modeloProductos');
const ModeloCategoria= require('../modelos/modeloCategorias');
const msj= require('../componentes/mensaje');

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
        msj("Productos",200,listarproductos, res);
    }
 };

 exports.listarProducto= async (req,res) => {
     const {id}= req.query; 

     if(!id) {
         msj("Envie un id de producto", 200, [], res);
     }
     else 
     {
        const buscarId=await ModeloProductos.findOne({
            where: {
                IdProducto:id
            }
        });

        if(!buscarId) {
            msj("El id del producto enviado no existe", 200, [], res);
        }
        else 
        {
            msj("Consulta exitosa", 200, buscarId, res);
        }
     }
 }

 exports.guardar = async (req,res) => {
        const {NombreProducto, DescripcionProducto, ISV,Estado,Categorias_IdCategoria} = req.body;
        if(!NombreProducto || !DescripcionProducto || !ISV || !Estado || !Categorias_IdCategoria)
        {
            res.send("Debe enviar los datos completos");
        }
        else
        {
            await ModeloProductos.create({
                NombreProducto: NombreProducto,
                DescripcionProducto: DescripcionProducto,
                ISV: ISV,
                Estado: Estado,
                Categorias_IdCategoria: Categorias_IdCategoria,
            })
            .then((data) => 
            {
                console.log(data);
                msj("Producto almacenado",200, data, res)     
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
    const {NombreProducto, DescripcionProducto, ISV,Imagen,Estado,Categorias_IdCategoria} = req.body;
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
                buscarproducto.DescripcionProducto= DescripcionProducto;
                buscarproducto.ISV= ISV;
                buscarproducto.Imagen= Imagen;
                buscarproducto.Estado= Estado;
                buscarproducto.Categorias_IdCategoria= Categorias_IdCategoria;
                await buscarproducto.save()
                .then((data) => {
                console.log(data);
                msj("Producto Actualizado",200, data, res);
            }).catch((error) => {
                console.log(error);
                msj("Error al actualizar producto",200,error,res);
            });
    }
 };

 exports.eliminarproducto = async (req,res) => {
    const {IdProducto} = req.query; 
    if(!IdProducto)
    {
        msj("El id no contiene ningun dato",200, [], res);
    }
    else
    {
        const buscarproducto=await ModeloProductos.destroy({
            where:
            {
                IdProducto: IdProducto,
            }
        })
        
        if(!buscarproducto){
            msj("El ID del producto no existe", 200, [], res);
        }else{
            msj("Producto eliminado", 200, [], res);
        }
    }
 };
