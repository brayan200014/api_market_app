const { Router } = require('express');
const controladorEmpleados = require('../controladores/controladorEmpleados');
const controladorAuth = require('../controladores/controladorAutenticacion');
const { body, query } = require('express-validator'); 
const router = Router();
router.get('/', controladorEmpleados.inicio);
router.get('/listar/', controladorAuth.ValidarAutenticado, controladorEmpleados.listarEmpleados);
router.post('/guardar/',
body('IdEmpleado').isInt().withMessage('Debe enviar valores enteros, para el id del empleado'), 
body('Nombre').isLength({min: 3}).withMessage('El nombre del empleado debe tener 3 o mas caracteres'),  
body('Apellido').isLength({min: 5}).withMessage('El apellido del empleado debe tener 5 o mas caracteres'), 
body('Telefono').isInt({min: 8}).withMessage('El telefono del empleado debe tener 8 o mas caracteres'), 
body('correo').isEmail().withMessage('Debe ingresar un correo electronico valido'), 
controladorEmpleados.guardarEmpleados);
router.delete('/eliminar/', controladorEmpleados.eliminarEmpleados);
router.put('/modificar/', controladorEmpleados.modificarEmpleados);



module.exports=router;