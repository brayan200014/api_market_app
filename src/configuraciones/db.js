const sequelize= require('sequelize');
const db= new sequelize (
    'BaseMovil',
    'root',
    'Moises1998',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3307'
    }
);