const {Router} = require('express');
const controladorAutenticacion= require('../controladores/controladorAutenticacion');
const { body, query } = require('express-validator');
const router = Router();
router.post('/recuperarcontrasena', 
body('correo').isEmail().withMessage('Debe enviar un correo valido'),
controladorAutenticacion.recuperarContrasena);
router.put('/cambiarContra', 
body('Correo').isEmail().withMessage('Debe enviar un correo valido'),
body('pin').isLength({min:4}).withMessage('Debe enviar un pin valido'),
body('contraseniaNueva').isLength({min:6, max:15}).withMessage('La longitud mínima de la contraseña es de 6 caracteres')
.isStrongPassword().withMessage('La contraseña debe incluir al menos un caracter en minúscula, mayúscula, un número y un caracter especial'),
controladorAutenticacion.cambiarContra);
router.post('/iniciosesion', 
body('Correo').isEmail().withMessage('Debe enviar un correo valido'),
body('Contrasena').isLength({min:6}).withMessage('La contraseña debe tener 3 o mas caracteres') 
,controladorAutenticacion.InicioSesion);
router.get('/error', controladorAutenticacion.Error); 
module.exports=router;

