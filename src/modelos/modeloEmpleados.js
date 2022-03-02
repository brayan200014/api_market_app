const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Empleado = db.define(
    "empleado",
    {
        IdEmpleado:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Nombre:{
            type:sequelize.STRING(45),
            allowNull:false,   
        },
        Apellido:{
            type:sequelize.STRING(45),
            allowNull:false,
        },
        Telefono:{
            type:sequelize.STRING(15),
            allowNull:false,
        },
        Direccion:{
            type:sequelize.STRING(150),
            allowNull:true,
        },
        Email:{
            type:sequelize.STRING(60),
            allowNull:false,   
        },
        FechaContratacion:{
            type:sequelize.DATE,
            allowNull:true,  
        },
        Estado:{
            type:sequelize.TINYINT('1','2'),
            allowNull: true,
            defaultValue: '1',
        },
        Sucursales_IdSucursal:{
            type:sequelize.INTEGER,
            allowNull: false,
    
        },
        Puestos_IdPuesto:{
            type: sequelize.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName: "empleados",
        timestamps: false,

    }
);
module.exports= Empleado;