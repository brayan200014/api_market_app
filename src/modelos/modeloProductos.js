const sequelize  =  require('sequelize');
const db = require('../configuraciones/db');

const Producto = db.define("producto",
{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true ,
        autoIncrement: true,
        allowNull: false,      
    },
    nombre:{
        type: sequelize.STRING(45),
        allowNull: false,
    },
    descripcion:{
        type: sequelize.STRING(250),
        allowNull: true,
    },
   impuesto:{
        type: sequelize.DOUBLE,
        allowNull: true,
    },
    precio:{
        type: sequelize.DOUBLE,
        allowNull: true,
     
    },
    estado:{
        type: sequelize.TINYINT(1),
        allowNull: true,
       
    },
    imagen:{
        type: sequelize.STRING(250),
        allowNull: true,
    },
    categoriaid:{
        type: sequelize.INTEGER,
        allowNull: false,
        //agregando la foranea
    },
},
{
    tableName: "productos",
    timestamps : false,
}

);
module.exports=Producto;