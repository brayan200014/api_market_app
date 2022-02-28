const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Categoria = db.define(
    "categoria",
    {
        IdCategoria:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        NombreCategoria:{
            type:sequelize.STRING(45),
            allowNull:false,   
        }
    },
    {
        tableName: "categorias",
        timestamps: false,

    }
);
module.exports= Categoria;