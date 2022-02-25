const sequelize= require('sequelize');
const db= new sequelize (
    'pruebamovil',
    'root',
    'Semeolvido14',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
);

module.exports= db;