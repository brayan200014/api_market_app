const{Router}=require('express');
const controladorClientes = require('../controladores/controladorClientes');
const controladorAutenticacion = require('../controladores/controladorAutenticacion');
const{body,query}=require('express-validator');
const router = Router();

router.get('/', controladorClientes.inicio);
router.get('/listarcliente',controladorAutenticacion.ValidarAutenticado, controladorClientes.listarCliente);
router.get('/buscarcliente', controladorClientes.buscarCliente);

router.post('/guardar',
body('IdUsuarioCliente').isInt().withMessage('Debe enviar valores enteros'), 
body('NombreUsuario').isLength({min: 3}).withMessage('Debe tener 3 o mas caracteres'),  
body('Correo').isEmail().withMessage('Debe ingresar un correo electronico valido'),
controladorClientes.guardar);

router.delete('/eliminarcliente', controladorClientes.eliminarCliente);

module.exports=router;