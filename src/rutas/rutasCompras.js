const {Router}= require('express'); 
const router= Router();
const {body, query}= require('express-validator');
const controladorCompras = require('../controladores/controladorCompras');
const controladorDetalleCompra = require('../controladores/controladorDetalleCompras');

router.get('/listar', controladorCompras.listarCompras);
router.get('/listarCompra', controladorCompras.listarUnaCompra);
router.get('/listarComprasJoin', controladorCompras.ListarComprasJoin);
router.get('/listarDetalle',query('id').isInt().withMessage('El ID a buscar debe de ser entero') ,controladorDetalleCompra.listarDetalle);

router.post('/guardar', body('FechaCompra').isDate().withMessage("El formato de fecha es invalido"),
body('Subtotal').isFloat().withMessage("El valor debe ser un numero"),
body('ISV').isFloat().withMessage("El valor debe ser un numero"),
body('Empleados_IdEmpleado').isInt().withMessage("El ID del Empleado debe ser un entero"),
body('Sucursales_IdSucursal').isInt().withMessage("El ID de la Sucursal debe ser un entero"),
body('Proveedores_IdProveedor').isInt().withMessage("El ID del Proveedor debe ser un entero"),
controladorCompras.guardarCompra);

router.post('/guardarDetalle', body('Cantidad').isInt().withMessage("El valor debe ser un numero"),
body('PrecioCompra').isFloat().withMessage("El valor debe ser un numero"),
body('Productos_IdProducto').isInt().withMessage("El ID del Producto debe de ser un numero entero"),
controladorDetalleCompra.guardarDetalleCompra);

router.put('/modificar',query('IdCompra').isInt().withMessage("Debe Enviar un numero Entero"),
body('Subtotal').isFloat().withMessage("El valor debe ser un numero"),
body('ISV').isFloat().withMessage("El valor debe ser un numero"),
body('Empleados_IdEmpleado').isInt().withMessage("El ID del Empleado debe ser un entero"),
body('Sucursales_IdSucursal').isInt().withMessage("El ID de la Sucursal debe ser un entero"),
body('Proveedores_IdProveedor').isInt().withMessage("El ID del Proveedor debe ser un entero"),
controladorCompras.modificarCompra);

router.put('/modificarDetalle', body('Cantidad').isInt().withMessage("El valor debe ser un numero"),
body('PrecioCompra').isFloat().withMessage("El valor debe ser un numero"),
query('Productos_IdProducto').isInt().withMessage("El ID del Producto debe de ser un numero entero"),
query('Compras_IdCompra').isInt().withMessage("El ID de la Compra debe de ser un numero entero"),
controladorDetalleCompra.actualizarDetalleCompra
);

router.delete('/eliminar', query('IdCompra').isInt().withMessage("El ID a eliminar debe de ser un numero entero"), 
controladorCompras.eliminarCompra);

module.exports = router;