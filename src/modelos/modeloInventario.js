const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Inventario = db.define(
    "invetario",
    {
        Productos_IdProducto:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
        },
        Sucursales_IdSucursal:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: false,
            allowNull: false, 
        },
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
module.exports= Inventario;