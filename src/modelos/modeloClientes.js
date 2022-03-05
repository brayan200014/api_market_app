
const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');

const Cliente = db.define("cliente",
{
    IdUsuarioCliente:{
        type: sequelize.INTEGER,
        primaryKey: true ,
        autoIncrement: true,
        allowNull: false,
    },
    NombreUsuario:{
        type: sequelize.STRING(45),
        allowNull: false,
    },
    Correo:{
        type: sequelize.STRING(60),
        allowNull: false,
    },
    Contrasena:{
        type: sequelize.STRING(1000),
        allowNull: false,
    },
    FechaCreacion:{
        type: sequelize.DATE,
        allowNull: true,
    },
    Estado:{
        type: sequelize.TINYINT,
        allowNull: true,
        defaultValue: true,
    },
    pin:{
        type: sequelize.STRING(4),
        allowNull: true,
    }
},
{
    tableName: "usuarioscliente",
    timestamps: false,
    hooks:{
        beforeCreate(cliente){
            const hast = bcrypt.hashSync(cliente.Contrasena, 10);
            cliente.Contrasena=hast;
        },
        beforeUpdate(cliente){
            const hast = bcrypt.hashSync(cliente.Contrasena, 10);
            cliente.Contrasena=hast;
        }
    }
}
);
Cliente.prototype.VerificarContraseña=(con, com) => {
    return bcrypt.compareSync(con, com);
}
module.exports=Cliente;