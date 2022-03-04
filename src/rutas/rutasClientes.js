const{Router}=require('express');
const controladorClientes = require('../controladores/controladorClientes');
//const controladorAutenticacion = require('../controladores/controladorAutentificacion');
const{body,query}=require('express-validator');
const router = Router();

router.get('/', controladorClientes.inicio);
router.get('/listar', controladorClientes.listar);
router.get('/buscar', controladorClientes.buscar);
router.post('/guardar',controladorClientes.guardar);
router.put('/modificarCorreo', controladorClientes.modificarCorreo);
router.put('/modificarEstado', controladorClientes.modificarEstado);
router.delete('/eliminar', controladorClientes.eliminar);

module.exports=router;