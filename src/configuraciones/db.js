const sequelize= require('sequelize');
const db= new sequelize (
    'BaseMovil',
    'root',
    'contrasena',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
);
module.exports= db;