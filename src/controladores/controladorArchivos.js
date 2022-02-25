const fs= require('fs');
const path= require('path');
const internal= require('stream');
const msj=require('../componentes/mensaje');
//const modeloProducto= require('../modelos/modeloProducto');
const modeloVentas= require('../modelos/modeloVentas');

exports.RecibirImagenProducto= async (req,res) => {
    const {filename}= req.file;

    const {id}= req.query; 

    var buscarProducto= await modeloVentas.findOne({
        where: {
            IdVenta: id
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

        buscarProducto.imagen= filename;
        await buscarProducto.save().then((data) => {
            msj("Imagen Actualizada", 200, [], res);
            console.log("Imagen Actualizada");
        }).catch((error) => {
            console.log(error);
            msj("Error al guardar la imagen", 200, [], res);
        });
    }
}