const passport = require('passport');
const ModeloUsuario = require('../modelos/modeloClientes');
const estrategiaJWT = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const duracion = moment.duration(5,"m").asSeconds(); //5 son los minutos que tendra valido
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
            id: payload.id
        }
    })
    .then((data) => {
        return done(null, data.id);

    })
    .catch((error)=>{
        return done(null, false);

    });

}));

exports.ValidarAutenticado = passport.authenticate('jwt', {session: false, failureRedirect: '/api/autenticacion/error/'});