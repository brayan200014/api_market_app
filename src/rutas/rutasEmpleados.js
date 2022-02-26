const { Router } = require('express');
const controladorEmpleados = require('../controladores/controladorEmpleados');
const { body, query } = require('express-validator'); 
const router = Router();
router.get('/', controladorEmpleados.inicio);
router.get('/listar/', controladorEmpleados.listarEmpleados);
router.post('/guardar/', controladorEmpleados.guardarEmpleados);
router.delete('/eliminar/', controladorEmpleados.eliminarEmpleados);
router.put('/modificar/', controladorEmpleados.modificarEmpleados);



module.exports=router;