const fs= require('fs');
const path= require('path');
const internal= require('stream');
const msj=require('../componentes/mensaje');
const modeloProducto= require('../modelos/modeloProductos');
const modeloVentas= require('../modelos/modeloVentas');

exports.RecibirImagenProducto= async (req,res) => {
    const {filename}= req.file;

    const {id}= req.query; 

    var buscarProducto= await modeloProducto.findOne({
        where: {
            IdProducto: id
        }
    });

    if(!buscarProducto) {
        msj("El producto no existe", 200, [], res);
    }
    else {

        const buscarImagen= fs.existsSync(path.join(__dirname,'../public/img/'+buscarProducto.imagen));

        if(!buscarImagen) {
            console.log("La imagen no existe en el fichero");
        }
        else 
        {
            try{
                fs.unlinkSync(path.join(__dirname, '../public/img/'+buscarProducto.imagen));
                console.log("Imagen Actualizada");
            }
            catch(error) {
                console.log(error);
                console.log("No se elimino");
            }
        }

        buscarProducto.Imagen= filename;
        await buscarProducto.save().then((data) => {
            msj("Imagen Actualizada", 200, [], res);
            console.log("Imagen Actualizada");
        }).catch((error) => {
            console.log(error);
            msj("Error al guardar la imagen", 200, [], res);
        });
    }
}


exports.consultarImagenProducto= async (req,res) =>{
    const {id}= req.query;


    var buscarImagen= await modeloProducto.findOne({
        where: {
            IdProducto: id
        }
    });

    if(!buscarImagen) {
        msj("El producto no existe", 200, [], res);
    }
    else 
    {
        const imagen= fs.existsSync(path.join(__dirname, '../public/img/'+ buscarImagen.imagen));

        if(!imagen) {
            msj("Imagen no existe", 200, [], res);
        }
        else 
        {
                 res.sendFile(path.join(__dirname, '../public/img/'+ buscarImagen.imagen))
        }
    }
}



