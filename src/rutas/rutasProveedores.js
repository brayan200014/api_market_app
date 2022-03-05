const { Router } = require('express');
const router = Router();
const controladorProveedores = require('../controladores/controladorProveedores');
const {body, query}= require('express-validator');

router.get('/', controladorProveedores.Inicio);
router.get('/listar', controladorProveedores.proveedorListar);

router.post('/guardar', body('NombreProveedor').isString().withMessage("El formato de Nombre es invalido"),
body('Contacto').isString().withMessage("El formato de Contacto es invalido."),
body('Email').isEmail().withMessage("El formato de Correo es invalido."),
controladorProveedores.proveedorGuardar);

router.put('/actualizar', query('IdProveedor').isInt().withMessage("Debe de enviar un numero entero."),
body('NombreProveedor').isString().withMessage("El formato de Nombre es invalido"),
body('Contacto').isString().withMessage("El formato de Contacto es invalido."),
body('Email').isEmail().withMessage("El formato de Correo es invalido."),
controladorProveedores.proveedorActualizar);

router.delete('/eliminar', query('IdProveedor').isInt().withMessage("El ID a eliminar debe ser un numero entero."),
controladorProveedores.proveedorEliminar);

router.get('/listarUno', controladorProveedores.listarUnProveedor);

module.exports = router;