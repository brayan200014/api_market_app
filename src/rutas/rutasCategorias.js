const { Router } = require('express');
const controladorCategoria = require('../controladores/controladorCategorias');
const { body, query } = require('express-validator'); 
const router = Router();
router.get('/listar/', controladorCategoria.listar);
router.post('/guardar/', 
body('NombreCategoria').isLength({min: 4}).withMessage('El categoria de la categoria debe tener 3 o mas caracteres'),  
controladorCategoria.guardarCategorias);
router.delete('/eliminar/', controladorCategoria.eliminarCategoria);
router.put('/modificar/', controladorCategoria.modificarCategorias);

module.exports=router;