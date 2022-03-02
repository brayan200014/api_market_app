const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Sucursal = db.define(
    "sucursal",
    {
        IdSucursal:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        NombreSucursal:{
            type:sequelize.STRING(45),
            allowNull:false,   
        },
        Direccion:{
            type:sequelize.STRING(45),
            allowNull:true,
        }, 
        Ciudades_IdCiudad:{
            type:sequelize.INTEGER,
            allowNull: false,
    
        }
    },
    {
        tableName: "sucursales",
        timestamps: false,

    }
);
module.exports= Sucursal;