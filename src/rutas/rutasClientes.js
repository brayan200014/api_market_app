const{Router}=require('express');
const controladorClientes = require('../controladores/controladorClientes');
const controladorAutenticacion = require('../controladores/controladorAutenticacion');
const{body,query}=require('express-validator');
const router = Router();

router.get('/', controladorClientes.inicio);
router.get('/listarcliente', controladorClientes.listarCliente);
router.get('/buscarcliente', controladorClientes.buscarCliente);

router.post('/guardarusuarios', 
body('id').isInt().withMessage('Debe enviar numeros enteros para el id'), 
body('id').isEmpty().withMessage('Debe enviar/ingresar el id de la persona'), 
body('nombre').isLength({min:3}).withMessage('El nombre de usuario debe tener 3 o mas caracteres'), 
body('correo').isEmail({min:3}).withMessage('Ingrese un formato de correo correcto'), 
body('contraseña').isLength({min:6}).withMessage('La contrasena debe tener 3 o mas caracteres') 
,controladorClientes.guardarClientes);
router.delete('/eliminarcliente', controladorClientes.eliminarCliente);

module.exports=router;