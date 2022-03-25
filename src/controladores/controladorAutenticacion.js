const { validationResult } = require('express-validator');
const enviarCorreo = require('../configuraciones/correo');
const ModeloUsuario = require('../modelos/modeloClientes');
const passport = require('../configuraciones/passport');
const msj = require('../componentes/mensaje');
//const bcrypt = require('bcrypt');

//RECUPERAR CONTRASEÑA
exports.recuperarContrasena = async (req, res) =>{
    const validacion = validationResult(req);

    
    if(!validacion.isEmpty()){
        console.log("Hola");
        msj("Los Datos Proporcionados no son validos", 500, validacion.array(), res);

    }
    else{
        const { correo } = req.body;
        var buscarUsuario = await ModeloUsuario.findOne({
            where:{
                Correo: correo
            }
        });
        const pin = Math.floor(Math.random() * (9999-1000)) + 1000;
        
        if(buscarUsuario){
            const dataRecuperacion = {
                correo: correo, //Este correo es el que esta en cnfiguraciones data.correo
                pin: pin,
            };

            buscarUsuario.pin = pin;
            await buscarUsuario.save().then((data)=>{
                if(enviarCorreo.recuperarContrasena(dataRecuperacion)){
                console.log(data);
                msj("Correo Enviado", 200, [], res);
            }
            else{ 
                msj("Error al enviar el Correo", 500, [], res);
            }  

            });
        }
        else{
            msj("No existe el correo especificado", 500, [], res);
        }
    }
};

//CAMBIAR CONTRASEÑA
exports.cambiarContra = async (req, res) => {
    const validacion = validationResult(req);
    const {Correo, pin ,contraseniaNueva, confirmarContrasena} = req.body;

    if(!validacion.isEmpty()){
        console.log(validacion.array());
        msj("Los Datos Proporcionados no son validos", 500, validacion.array(), res);
    }else{
            let findByID = await ModeloUsuario.findOne({
                where:{
                    Correo: Correo,
                    pin: pin
                }
            });
            if(!findByID){
               msj("No se encontro ningun usuario con correo = ["+ Correo +"] y pin de verificación ["+ pin +"] en [usuarioscliente].", 500, [], res);
            }else{

                    findByID.Contrasena = contraseniaNueva;
                    //findByID.Contrasena = bcrypt.hashSync(contraseniaNueva, 10); //Con esto encripto manualmente la contraseña sin el trigger, para esto hay queeliminar el triger Update del ModeloCliente

                    findByID.pin = "";

                    await findByID.save().then((data) => {
                        console.log(data);
                        msj("ACTUALIZACION DE PASSWORD COMPLETADA CON ÉXITO!", 200, [], res);          
                        
                    }).catch((error)=>{
                        console.log(error);
                        msj("NO fue posible actualizar la información", 200, [], res);     
                    });
                
                }
        }
};
    
//Validacion de Autenticado
exports.ValidarAutenticado = passport.ValidarAutenticado;


//INICIO DE SESION - USUARIO
exports.InicioSesion = async (req, res) => {
    const validacion =  validationResult(req);
    if(!validacion.isEmpty()){
        msj("Los datos son invalidos", 200, validacion.array(), res);
    }
    else{
       const { Correo , Contrasena} = req.body;
       const buscarUsuario = await ModeloUsuario.findOne({
           where:{

               Correo: Correo,

           }
       });
       if(!buscarUsuario){
           msj("Los datos son incorrectos", 200, [], res);
       }
       else
       {
           if(!buscarUsuario.VerificarContraseña(Contrasena, buscarUsuario.Contrasena)){
            msj("El usuario y/o contraseña son incorrectos", 200, [], res);
           }
           else{
               const Token = passport.generarToken({IdUsuarioCliente: buscarUsuario.IdUsuarioCliente});
               const data = {
                   token: Token,
                   data: buscarUsuario
               };
               msj("Bienvenido a Supermercados Móvil", 200, data, res);
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


