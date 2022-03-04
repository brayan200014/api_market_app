const { Router } = require('express');
const controladorCiudades = require('../controladores/controladorCiudades');
const { body, query } = require('express-validator'); 
const router = Router();
router.get('/', controladorCiudades.inicio);
router.get('/listar/', controladorCiudades.listarCiudades);
router.post('/guardar/', 
body('NombreCiudad').isLength({min: 4}).withMessage('El nombre de la ciudad debe tener 3 o mas caracteres'),  
controladorCiudades.guardarCiudades);
router.delete('/eliminar/', controladorCiudades.eliminarCiudad);
router.put('/modificar/', controladorCiudades.modificarCiudades);

module.exports=router;