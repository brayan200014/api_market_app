const { Router } = require('express');
const controladorInicio = require('../controladores/controladorInicio');
const router = Router();
router.get('/', controladorInicio.inicio);
router.get('/empleados',controladorInicio.empleados);
router.get('/sucursales',controladorInicio.sucursales);
router.get('/ciudades',controladorInicio.ciudades);
router.get('/categorias',controladorInicio.categorias);
router.get('/inventario',controladorInicio.inventario);
module.exports=router;