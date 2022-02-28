const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Compra = db.define(
    "compra",
    {
        IdCompra:{
            type: sequelize.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
        },
        FechaCompra:{
            type: sequelize.DATE,
            allowNull: false
        },
        Subtotal:{
            type: sequelize.DOUBLE,
            allowNull: false
        },
        ISV:{
            type: sequelize.DOUBLE,
            allowNull: false
        }
    },
    {
        tableName: "compras",
        timestamps: false
    }
);
module.exports = Compra;