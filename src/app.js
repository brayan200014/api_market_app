const express = require('express');
const morgan = require('morgan');
require('dotenv').config(); //Cargando las variables propias de .env
const path= require('path');
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('json spaces', 2);
app.use('/api/', require('./rutas/Index'));
app.use('/api/empleados/', require('./rutas/rutasEmpleados'));
app.use('/api/sucursales/', require('./rutas/rutasSucursales'));
app.use('/api/ciudades/', require('./rutas/rutasCiudades'));
app.use('/api/autenticacion/', require('./rutas/rutasAutenticacion'));
app.use('/', require('./rutas/rutasProveedores'));
app.use('/api/ventas', require('./rutas/rutasVentas'));
app.use('/api/archivos', require('./rutas/rutasArchivos')); 
app.use('/api/cliente',require('./rutas/rutasClientes'));
app.use('/api/productos', require('./rutas/rutasProductos')); 
app.use('/api/inventario/', require('./rutas/rutasInventario'));
app.use('/api/categorias/', require('./rutas/rutasCategorias'));
app.listen(6001, ()=> {
    console.log("el servidor escucha el puerto 6001");
});

