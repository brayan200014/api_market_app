const sequelize= require('sequelize');
const db= new sequelize (
    'basemovil',
    'root',
    'unicah123',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
);
module.exports= db;
