const {Router}= require('express'); 
const router= Router();
const {body,query }= require('express-validator');
const controladorVentas= require('../controladores/controladorVentas');
const controladorDetalleVenta= require('../controladores/controladorDetalleVenta');

router.get('/listar', controladorVentas.listar); 
router.get('/listarVenta', controladorVentas.listarVenta); 
router.get('/listarVentasJoin', controladorVentas.listarJoinVentas); 
router.post('/guardar', body('FechaVenta').isDate().withMessage("El formato de fecha es invalido"),
body('Subtotal').isFloat().withMessage("El valor debe ser un numero"),
body('ISV').isFloat().withMessage("El valor debe ser un numero"),
body('IdUsuarioCliente').isInt().withMessage("El id del cliente debe ser un entero"),
body('IdSucursal').isInt().withMessage("El id de la sucurdal debe ser un entero"),
controladorVentas.guardar);

router.get('/listarDetalle', query('id').isInt().withMessage('Formato incorrecto'), controladorDetalleVenta.listarDetalle);

router.post('/guardarDetalle',body('Cantidad').isInt().withMessage("El valor debe ser un numero"),
body('Precio').isFloat().withMessage("El valor debe ser un numero"),
body('IdProducto').isInt().withMessage("Debe ser un numero entero el IdProducto"),
controladorDetalleVenta.guardarDetalle);

router.put('/modificar',query('id').isInt().withMessage("Envie un numero entero"), body('FechaVenta').isDate().withMessage("El formato de fecha es invalido"),
body('Subtotal').isFloat().withMessage("El valor debe ser un numero"),
body('ISV').isFloat().withMessage("El valor debe ser un numero"),
body('IdUsuarioCliente').isInt().withMessage("El id del cliente debe ser un entero"),
body('IdSucursal').isInt().withMessage("El id de la sucurdal debe ser un entero"),
controladorVentas.modificar);

router.put('/modificarDetalle', body('Cantidad').isInt().withMessage("El valor debe ser un numero"),
body('Precio').isFloat().withMessage("El valor debe ser un numero"),
query('IdProducto').isInt().withMessage("Debe ser un numero entero "),
query('IdVenta').isInt().withMessage("Debe enviar un numero entero"), controladorDetalleVenta.modificarDetalle);

router.delete('/eliminar', query('id').isInt().withMessage("Envie un numero entero"), controladorVentas.eliminar);

module.exports = router;