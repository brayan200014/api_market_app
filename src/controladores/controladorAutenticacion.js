const { validationResult } = require('express-validator');
const enviarCorreo = require('../configuraciones/correo');
const ModeloUsuario = require('../modelos/modeloClientes');
const passport = require('../configuraciones/passport');
const msj = require('../componentes/mensaje');

//RECUPERAR CONTRASEÑA
exports.recuperarContrasena = async (req, res) =>{
    const validacion = validationResult(req);
    if(validacion.isEmpty()){
        res.json(validacion.array());
    }
    else{
        const {correo} = req.body;
        var buscarUsuario = await ModeloUsuario.finOne({
            where:{
                correo: correo
            }
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

//Validacion de Autenticado
exports.ValidarAutenticado = passport.ValidarAutenticado;

//INICIO DE SESION - USUARIO
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

//Mensaje de Error
exports.Error = (req, res) =>{
    msj("Debe estar autenticado", 200, [], res);

};

//LOGIN
exports.homeLogin = async (req, res) => {
    res.send("LOGIN - PRINCIPAL");
};

//CAMBIAR CONTRASEÑA
exports.cambiarContra = async (req, res) => {
    const validacion = validationResult(req);
    const {nombreUsuario, contraseniaActual, contraseniaNueva} = req.body;

    if(!validacion.isEmpty()){
        console.log("\n" + validacion.array());
        res.json("\n La contraseña no se ha posido modificar ya que el campo proporcionados no son del tipo requerido.\n\n" + validacion.array());
    }else{
        if(!nombreUsuario || !contraseniaActual || !contraseniaNueva){
            res.send("La contraseña no se ha posido modificar ya que el campo proporcionados no son del tipo requerido.")
        }else{
            let findByID = await UsuarioModel.findOne({
                where:{
                    nombreUsuario: nombreUsuario
                }
            });
            if(!findByID){
                res.send("No se encontraron resultados con el identificador {"+ nombreUsuario +"} en {usuarioscliente}.");
            }else{
                const validPassword = await bcrypt.compare(contraseniaActual, findByID.contrasenia);
                if (validPassword) {

                    findByID.contrasenia = contraseniaNueva;

                    await findByID.save().then((data) => {
                        console.log(data);
                        res.send("ACTUALIZACION DE PASSWORD COMPLETADA CON ÉXITO!");          
                        
                    }).catch((error)=>{
                        console.log(error);
                        res.send("NO fue posible actualizar la información");     
                    });
                
                }else{
                    res.send("CAMBIO DE CONTRASEÑA CANCELADO: La contraseña actual no coincide con el dato proporcionado.");
                }
            }
        }
    }
};

//RECUPERAR CONTRASEÑA
exports.recuperarPassword = async (req, res) =>{
    const {correo} = req.body;
    const buscarUsuario = await UsuarioModel.findOne({
        where:{
            correo: correo
        }
    });
    const pin2 = '1234';
    const data = {
        correo: correo,
        pin: '1234'
    }
    SendMail.passwordRecovery(data);
    res.send("Correo Enviado");
};

//SALIR
exports.logout = async (req, res) => {
};


