const ModeloProductos= require('../modelos/modeloProductos');

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