const{Router}=require('express');
const controladorClientes = require('../controladores/controladorClientes');
const controladorAutenticacion = require('../controladores/controladorAutenticacion');
const{body,query}=require('express-validator');
const router = Router();

router.get('/', controladorClientes.inicio);
router.get('/listar', controladorClientes.listar);
router.post('/buscar', controladorClientes.buscar);

router.post('/guardar',
body('NombreUsuario').isLength({min: 3}).withMessage('Debe tener 3 o mas caracteres'),  
body('Correo').isEmail().withMessage('Debe ingresar un correo electronico valido'),
body('Contrasena').isLength({min:6, max:15}).withMessage('La longitud mínima de la contraseña es de 6 caracteres')
.isStrongPassword().withMessage('La contraseña debe incluir al menos un caracter en mayúscula, minusculas, números y un caracter especial'), 
controladorClientes.guardar);
router.put('/modificarCorreo', controladorClientes.modificarCorreo);
router.put('/modificarEstado', controladorClientes.modificarEstado);
router.delete('/eliminar', controladorClientes.eliminar);

module.exports=router;