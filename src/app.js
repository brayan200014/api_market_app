const express = require('express');
const morgan = require('morgan');
require('dotenv').config(); //Cargando las variables propias de .env
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('json spaces', 2);
app.use('/api/', require('./rutas/Index'));
app.use('/api/empleados/', require('./rutas/rutasEmpleados'));
app.listen(6001, ()=> {
    console.log("el servidor escucha el puerto 6001");
});