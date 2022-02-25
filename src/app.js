const express = require("express");
const morgan = require("morgan");
require('dotenv').config(); 

const app= express(); 

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json()); 
app.use('/api/ventas', require('./rutas/rutasVentas'));
app.listen(6001, ()=> {
    console.log("el servidor escucha el puerto 6001");
});

