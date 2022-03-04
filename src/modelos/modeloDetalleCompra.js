const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const DetalleCompra = db.define(
    "detallecompra",
    {
        Compras_IdCompra:{
            type: sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Productos_IdProducto:{
            type: sequelize.INTEGER,
            allowNull: false
        },
        Cantidad:{
            type: sequelize.INTEGER,
            allowNull: false
        },
        PrecioCompra:{
            type: sequelize.DOUBLE,
            allowNull: false
        }
    },
    {
        tableName: "detallecompra",
        timestamps: false
    }
);

module.exports = DetalleCompra;