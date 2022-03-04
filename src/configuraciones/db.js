const sequelize= require('sequelize');
const db= new sequelize (
    'basemovil',
    'root',
    'Moises1998',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
);