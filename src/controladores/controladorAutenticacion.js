const { validationResult } = require('express-validator');
const enviarCorreo = require('../configuraciones/correo');
const ModeloCliente = require('../modelos/modeloClientes');

exports.recuperarContrasena = async (req, res) =>{
    const validacion = validationResult(req);
    if(validacion.isEmpty()){
        res.json(validacion.array());
    }
    else{
        const {correo} = req.body;
        var buscarCliente = await ModeloCliente.finOne({
            correo
        });
        const pin = '1234';
        if(buscarCliente){
            const data = {
                correo = correo,
                pin = pin,
            };
            if(enviarCorreo.recuperarContrasena(data)){
                res.send("Correo Enviado");
            }
            else{
                res.send("Error al enviar el correo");
            }
            
        }
    }
};
