const {Router} = require('express');
const controladorProductos= require('../controladores/controladorProductos');
const router = Router(); 

router.get('/', controladorProductos.inicio);
router.get('/listarproductos', controladorProductos.listarproductos);
router.post('/guardarproductos', controladorProductos.guardar);
router.put('/modificarproductos', controladorProductos.modificarProductos);
router.delete('/eliminarproductos', controladorProductos.eliminarproducto);

module.exports=router;