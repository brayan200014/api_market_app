const { Router } = require('express');
const router = Router();
const controladorProveedores = require('../controladores/controladorProveedores');

router.get('/proveedor', controladorProveedores.Inicio);
router.get('/proveedor/listar', controladorProveedores.proveedorListar);
router.post('/proveedor/guardar', controladorProveedores.proveedorGuardar);
router.put('/proveedor/actualizar', controladorProveedores.proveedorActualizar);
router.delete('/proveedor/eliminar', controladorProveedores.proveedorEliminar);

module.exports = router;