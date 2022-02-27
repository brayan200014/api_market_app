const { validationResult } = require('express-validator');
const enviarCorreo = require('../configuraciones/correo');
const ModeloUsuario = require('../modelos/modeloClientes');
const passport = require('../configuraciones/passport');
const msj = require('../componentes/mensaje');

exports.recuperarContrasena = async (req, res) =>{
    const validacion = validationResult(req);
    if(validacion.isEmpty()){
        res.json(validacion.array());
    }
    else{
        const {correo} = req.body;
        var buscarUsuario = await ModeloUsuario.finOne({
            correo
        });
        const pin = Math.floor(Math.random() * (9999-1000)) + 1000;
        console.log(pin);
        if(buscarUsuario){
            const data = {
                correo: correo,
                pin: pin,
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

exports.ValidarAutenticado = passport.ValidarAutenticado;

exports.InicioSesion = async (req, res) => {
    const validacion =  validationResult(req);
    if(validacion.isEmpty()){
        msj("Los datos son invalidos", 200, validacion.array(), res);
    }
    else{
       const { usuario, contrasena } = req.body;
       const buscarUsuario = await ModeloUsuario.finOne({
           where:{

               correo: usuario,

           }
       });
       if(!buscarUsuario){
           msj("Los datos son incorrectos", 200, [], res);
       }
       else
       {
           if(buscarUsuario.VerificarContraseña(contrasena, buscarUsuario, contrasena)){
            msj("El usuario y/o contraseña son incorrectos", 200, [], res);
           }
           else{
               const Token = passport.generarToken({id: buscarUsuario.id});
               const data = {
                   token: Token,
                   data: buscarUsuario
               };
               msj("Bienvenido a Supermercados", 200, data, res);
            }
        }
    }
};
exports.Error = (req, res) =>{
    msj("Debe estar autenticado", 200, [], res);

};
