const {Router} = require('express');
const controladorAutenticacion= require('../controladores/controladorAutenticacion');
const { body, query } = require('express-validator');
const router = Router();
router.post('/recuperarcontrasena', 
body('correo').isEmail().withMessage('Debe enviar un correo valido'),
controladorAutenticacion.recuperarContrasena);
router.post('/iniciosesion', 
body('nombre').isLength({min:3}).withMessage('El nombre de usuario debe tener 3 o mas caracteres'),
body('contraseña').isLength({min:6}).withMessage('La contrasena debe tener 3 o mas caracteres') 
,controladorAutenticacion.InicioSesion);
router.get('/error', controladorAutenticacion.Error); 
module.exports=router;

