const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');

const Cliente = db.define(
    "cliente",
{
    id:{
        type: sequelize.INTEGER,
        primaryKey: true ,
        autoIncrement: true,
        allowNull: false,
    },
    Nombre:{
        type: sequelize.STRING(45),
        allowNull: false,
    },
    correo:{
        type: sequelize.STRING(250),
        allowNull: false,
    },
    contraseña:{
        type: sequelize.STRING(250),
        allowNull: false,
    },
    creacion:{
        type: sequelize.DATE,
        allowNull: true,
    },
    estado:{
        type: sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    },
},
{
    tableName: "clientes",
    timestamps: false,
    hooks:{
        beforeCreate(cliente){
            const hast = bcrypt.hashSync(cliente.contraseña, 10);
            cliente.contraseña=hast;
        },
        beforeUpdate(cliente){
            const hast = bcrypt.hashSync(cliente.contraseña, 10);
            cliente.contraseña=hast;
        }
    }
}
);
Cliente.prototype.VerificarContraseña=(con, com) => {
    return bcrypt.compareSync(con, com);
}
module.exports=Cliente;