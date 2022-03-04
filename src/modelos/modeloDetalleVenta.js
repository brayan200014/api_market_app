const sequelize= require ('sequelize');
const db= require('../configuraciones/db');
const Venta= require('../modelos/modeloVentas');
const Producto= require('../modelos/modeloProductos');


const DetalleVenta= db.define(
  "detalleventa", 
  {
        Cantidad: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        PrecioVenta: {
            type: sequelize.FLOAT, 
            allowNull:false
        }
  }, 
  {
        tableName: "detalleventa",
        timestamps: false
  }
);

Venta.belongsToMany(Producto, {through:DetalleVenta, foreignKey: 'Ventas_IdVenta'});
Producto.belongsToMany(Venta,{through:DetalleVenta, foreignKey: 'Productos_IdProducto'});

module.exports= DetalleVenta; 