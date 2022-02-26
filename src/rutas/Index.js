const { Router } = require('express');
const controladorInicio = require('../controladores/controladorInicio');
const router = Router();
router.get('/', controladorInicio.inicio);
router.get('/empleados',controladorInicio.empleados);
module.exports=router;