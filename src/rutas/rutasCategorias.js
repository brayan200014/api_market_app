const { Router } = require('express');
const controladorCiudades = require('../controladores/controladorCategorias');
const { body, query } = require('express-validator'); 
const router = Router();
router.get('/listar/', controladorCategorias.listar);
router.post('/guardar/', 
body('NombreCategoria').isLength({min: 4}).withMessage('El categoria de la categoria debe tener 3 o mas caracteres'),  
controladorCategorias.guardarCategorias);
router.delete('/eliminar/', controladorCategorias.eliminarCategoria);
router.put('/modificar/', controladorCategorias.modificarCategorias);

module.exports=router;