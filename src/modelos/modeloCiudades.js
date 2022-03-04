const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Ciudad = db.define(
    "ciudad",
    {
        IdCiudad:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        NombreCiudad:{
            type:sequelize.STRING(45),
            allowNull:false,   
        }
    },
    {
        tableName: "ciudades",
        timestamps: false,

    }
);
module.exports= Ciudad;
