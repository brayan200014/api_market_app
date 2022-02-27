const { Router } = require('express');
const controladorSucursales = require('../controladores/controladorSucursales');
const { body, query } = require('express-validator'); 
const router = Router();
router.get('/', controladorSucursales.inicio);
router.get('/listar/', controladorSucursales.listarSucursales);
router.post('/guardar/', controladorSucursales.guardarSucursales);
router.delete('/eliminar/', controladorSucursales.eliminarSucursal);
router.put('/modificar/', controladorSucursales.modificarSucursales);

module.exports=router;
