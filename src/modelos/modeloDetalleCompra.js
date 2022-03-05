const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Compra = require('../modelos/modeloCompras');
const Producto = require('../modelos/modeloProductos');

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

Compra.belongsToMany(Producto, {through: DetalleCompra, foreignKey: 'Compras_IdCompra'});
Producto.belongsToMany(Compra,{through:DetalleCompra, foreignKey: 'Productos_IdProducto'});

module.exports = DetalleCompra;