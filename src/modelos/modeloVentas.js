const sequelize= require('sequelize'); 
const db= require('../configuraciones/db');
//const UsuarioCliente= require(''); 
//const Sucursal= require('');



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
        },
        imagen: {
            type: sequelize.STRING,
            allowNull:true
        }
    },
    {
        tableName: "ventas", 
        timestamps: false
    }
);

/*UsuarioCliente.hasOne(Venta, {foreignKey: 'IdUsuarioCliente'});
Sucursal.hasOne(Venta, {foreignKey: 'Sucursales_IdSucursal' })*/

module.exports= Venta;