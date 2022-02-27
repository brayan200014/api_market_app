const { Router } = require('express');
const controladorCiudades = require('../controladores/controladorCiudades');
const { body, query } = require('express-validator'); 
const router = Router();
router.get('/', controladorCiudades.inicio);
router.get('/listar/', controladorCiudades.listarCiudades);
router.post('/guardar/', controladorCiudades.guardarCiudades);
router.delete('/eliminar/', controladorCiudades.eliminarCiudad);
router.put('/modificar/', controladorCiudades.modificarCiudades);

module.exports=router;