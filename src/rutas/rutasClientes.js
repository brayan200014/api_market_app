const{Router}=require('express');
const controladorClientes = require('../controladores/controladorClientes');
//const controladorAutenticacion = require('../controladores/controladorAutentificacion');
const{body,query}=require('express-validator');
const router = Router();

router.get('/', controladorClientes.inicio);
router.get('/listar', controladorClientes.listar);
router.get('/buscar', controladorClientes.buscar);

router.post('/guardar',
body('IdUsuarioCliente').isInt().withMessage('Debe enviar valores enteros'), 
body('NombreUsuario').isLength({min: 3}).withMessage('Debe tener 3 o mas caracteres'),  
body('correo').isEmail().withMessage('Debe ingresar un correo electronico valido'),
controladorClientes.guardar);

router.put('/modificarCorreo', controladorClientes.modificarCorreo);
router.put('/modificarEstado', controladorClientes.modificarEstado);
router.delete('/eliminar', controladorClientes.eliminar);

module.exports=router;