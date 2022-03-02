const sequelize= require('sequelize');
const db= new sequelize (
    'basemovil',
    'root',
    'password',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
);
module.exports= db;
