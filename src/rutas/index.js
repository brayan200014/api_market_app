const { Router } = require('express');
const controladorInicio = require('../controladores/controladorInicio');
const router = Router();
router.get('/categorias',controladorInicio.categorias);
router.get('/inventario',controladorInicio.inventario);
module.exports=router;

