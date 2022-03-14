const sequelize= require('sequelize');
const db= new sequelize (
    'BaseMovil',
    'proyectoportales2',
    'proyectoportales2',
    {
        host: 'ec2-34-224-30-50.compute-1.amazonaws.com',
        dialect: 'mysql',
        port: '3306'
    }
);
module.exports= db;
