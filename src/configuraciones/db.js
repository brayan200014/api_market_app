const sequelize= require('sequelize');
const db= new sequelize (
    'BaseMovil',
    'root',
    'fa.quinto5',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
);
module.exports=db;
