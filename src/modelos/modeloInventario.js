const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Producto= require('../modelos/modeloProductos');
const Sucursal= require('../modelos/modeloSucursales');
const Inventario = db.define(
    "invetario",
    {
        CantidadExistencia:{
            type:sequelize.INTEGER,
            allowNull:false,
        }, 
        PrecioVenta:{
            type:sequelize.DOUBLE,
            allowNull: false,
    
        }
    },
    {
        tableName: "inventario",
        timestamps: false,

    }
);

Sucursal.belongsToMany(Producto, {through:Inventario, foreignKey: 'Productos_IdProducto'});
Producto.belongsToMany(Sucursal,{through:Inventario, foreignKey: 'Sucursales_IdSucursal'});

module.exports= Inventario;