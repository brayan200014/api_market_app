const {Router} = require('express');
const controladorProductos= require('../controladores/controladorProductos');
const router = Router(); 

router.get('/', controladorProductos.inicio);
router.get('/listarproductos', controladorProductos.listarproductos);

module.exports=router;