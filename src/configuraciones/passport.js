const passport = require('passport');
const ModeloUsuario = require('../modelos/modeloClientes');
const estrategiaJWT = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const duracion = moment.duration(50,"m").asSeconds(); //50 son los minutos que tendra valido
const clave = 'MiContrasenaSegura';

//GENERANDO EL TOKEN
exports.generarToken = (data) => {
    return JWT.sign(data, clave, { expiresIn: duracion});
    
};
const opciones = {};
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = clave;

passport.use(new estrategiaJWT(opciones, async (payload, done)=>{
    return await ModeloUsuario.findOne({
        where:{
            IdUsuarioCliente: payload.IdUsuarioCliente,
            Estado: 1
        }
    })
    .then((data) => {
        return done(null, data.IdUsuarioCliente);

    })
    .catch((error)=>{
        return done(null, false);

    });

}));

exports.ValidarAutenticado = passport.authenticate('jwt', {session: false, failureRedirect: '/api/autenticacion/error/'});