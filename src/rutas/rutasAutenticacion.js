const {Router} = require('express');
const controladorAutenticacion= require('../controladores/controladorAutenticacion');
const { body, query } = require('express-validator');


const router = Router();


router.post('/recuperarcontrasena', 
body('correo').isEmail().withMessage('Debe enviar un correo valido')
,controladorAutenticacion.recuperarContrasena);

module.exports=router;