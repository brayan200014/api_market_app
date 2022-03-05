const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Empleado = require('../modelos/modeloEmpleados');
const Sucursal= require('../modelos/modeloSucursales');
const Proveedor = require('../modelos/modeloProveedores');

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

Empleado.hasOne(Compra, {foreignKey: 'Empleados_IdEmpleado'});
Sucursal.hasOne(Compra, {foreignKey: 'Sucursales_IdSucursal' });
Proveedor.hasOne(Compra, {foreignKey: 'Proveedores_IdProveedor'});

module.exports = Compra;