const {Router}= require('express'); 
const router= Router();
const {body,query }= require('express-validator');
const controladorVentas= require('../controladores/controladorVentas');

router.get('/listar', controladorVentas.listar); 

router.post('/guardar', body('FechaVenta').isDate().withMessage("El formato de fecha es invalido"),
body('Subtotal').isFloat().withMessage("El valor debe ser un numero"),
body('ISV').isFloat().withMessage("El valor debe ser un numero")/*,
body('IdUsuarioCliente').isInt().withMessage("El id del cliente debe ser un entero"),
body('Sucursales_IdSucursal').isInt().withMessage("El id de la sucurdal debe ser un entero")*/,
controladorVentas.guardar);

router.put('/modificar', body('FechaVenta').isDate().withMessage("El formato de fecha es invalido"),
body('Subtotal').isFloat().withMessage("El valor debe ser un numero"),
body('ISV').isFloat().withMessage("El valor debe ser un numero")/*,
body('IdUsuarioCliente').isInt().withMessage("El id del cliente debe ser un entero"),
body('Sucursales_IdSucursal').isInt().withMessage("El id de la sucurdal debe ser un entero")*/,
controladorVentas.modificar);

router.delete('/eliminar', query('id').isInt().withMessage("Envie un numero entero"), controladorVentas.eliminar);

module.exports = router;