const sequelize= require('sequelize'); 
const db= require('../configuraciones/db');
const Usuario= require('../modelos/modeloClientes');
const Sucursal= require('../modelos/modeloSucursales');




const Venta= db.define(
    "venta", 
    {
        IdVenta: {
            type: sequelize.INTEGER, 
            primaryKey: true, 
            allowNull: false,
            autoIncrement: true
        },

        FechaVenta: {
            type: sequelize.DATE,
            allowNull: false
        },

        Subtotal: {
            type: sequelize.DOUBLE,
            allowNull: false
        },
        ISV: {
            type: sequelize.DOUBLE,
            allowNull: false
        }
    },
    {
        tableName: "ventas", 
        timestamps: false
    }
);

Usuario.hasOne(Venta, {foreignKey: 'IdUsuarioCliente'});
Sucursal.hasOne(Venta, {foreignKey: 'Sucursales_IdSucursal' })

module.exports= Venta;