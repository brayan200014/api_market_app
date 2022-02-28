const { Router } = require('express');
const controladorInventario = require('../controladores/controladorInventario');
const { body, query } = require('express-validator'); 
const router = Router();
router.get('/listar/', controladorInventario.listarInventario);
router.post('/guardar/',
body('Productos_IdProducto').isLength({min: 3}).withMessage('El producto debe tener 3 o mas caracteres'),  
body('Sucursales_IdSucursal').isLength({min: 3}).withMessage('El nombre de la sucursal debe tener 3 o mas caracteres'),  
body('CantidadExistencia').isInt().withMessage('Debe enviar valores enteros'), 
controladorInventario.guardarInventario);
router.delete('/eliminar/', controladorInventario.eliminarInventario);
router.put('/modificar/', controladorInventario.modificarInventaro);

module.exports=router;