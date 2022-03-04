const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const proveedores = db.define(
    "proveedor",
    {
        IdProveedor:{
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        NombreProveedor:{
            type: sequelize.STRING(45),
            allowNull: false,
        },
        Contacto:{
            type: sequelize.STRING(15),
            allowNull: false,
        },
        Email:{
            type: sequelize.STRING(60)
        }
    },
    {
        tableName: "proveedores",
        timestamps: false,
    }
);
module.exports=proveedores;