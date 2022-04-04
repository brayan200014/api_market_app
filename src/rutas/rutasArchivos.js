const {Router}= require('express');
const multer= require('multer');
const path= require('path'); 
const controladorArchivos= require('../controladores/controladorArchivos');
const storage= multer.diskStorage({
    destination: function (req,res,cb) {
        cb(null, path.join(__dirname, '../public/img'));
    },
    filename: function (req,file,cb) {
        const distinc= Date.now()+"-"+Math.round(Math.random() *1E9);
        cb(null, file.filename +"-"+distinc+file.mimetype.replace("/","."));
    }
})

const upload= multer({
    storage: storage
});

const router= Router();
router.post('/',upload.single('img'), controladorArchivos.RecibirImagenProducto);
router.get('/recibirImagen',upload.single('img'), controladorArchivos.recibirImagen);
router.get('/consultar',controladorArchivos.consultarImagenProducto);
router.get('/consultarPublic',controladorArchivos.consultarImagenPublic);
router.get('/ultimoId', controladorArchivos.consultarUltimoIdProductoImagen); 



module.exports= router;