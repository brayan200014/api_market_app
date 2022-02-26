const sequelize= require('sequelize');
const db= new sequelize (
    'BaseMovil',
    'root',
    'Semeolvido14',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
);

module.exports= db;