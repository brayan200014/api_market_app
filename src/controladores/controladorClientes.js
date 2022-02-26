const modeloCliente = require("../modelos/modeloClientes");
const { validationResult } = require('express-validator');

exports.inicio = (req,res) => {
    res.send("Esto es inicio en modulo Cliente");
 };

 exports.listarCliente= async (req,res) => {

    const listaCliente = await modeloCliente.findAll();

    if(!listaCliente || !listaCliente.length)
    {
        res.send("No existen datos");
    }
    else{
        res.json(listaCliente);
    }
 };

 exports.buscarCliente= async (req,res) => {

    const { estado } =req.query;
    const buscarCliente = await modeloCliente.findAll({
        where:{
            estado : estado
        }
    });

    //validacion
    if(!buscarCliente || !buscarCliente.length)
    {
        res.send("No se encontraron registros");
    }
    else{
        res.json(buscarCliente);
    }
 };

 exports.guardarClientes = async (req,res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }
    else{
        const {id, nombre, correo, contraseña} = req.body;

        if(!id || !nombre || !correo || !contraseña)
        {
            res.send("Debe enviar los datos completos");
        }
        else{

            const buscarCliente = await modeloCliente.findOne({
                where:{
                    id : id,
                    estado : true
                }
            });
            if(!buscarCliente){
                res.send("El id de la persona no existe/inactivo");
            }
            else{
                    await modeloCliente.create({
                    id: id,
                    login: login,
                    correo: correo,
                    contraseña : contraseña,
        
                }).then((data) => {
                    console.log(data);
                    res.send("Registro almacenado correctamente");
                }).catch((error) => {
                    console.log(error);
                    res.send("Error al guardar datos");
                });
            }
        }
    }
 };

 exports.eliminarCliente = async (req,res) => {
  
    const {id} = req.query; 

    if(!id)
    {
        res.send("Debe enviar el id de la persona");
    }
    else
    {
        var buscarCliente = await modeloCliente.findOne(
            {
                where: {
                    id: id,
                }
            }
        );

        if(!buscarCliente)
        {
            res.send("El Usuario no existe");
        }
        else
        {
                    await modeloCliente.destroy({
                        where:
                        {
                            id: id,
                        }
                    }).then((data) => {
                    console.log(data);
                    res.send("Registro eliminado correctamente");}).catch((error) => 
                    {
                    console.log(error);
                    res.send("Error borrar datos");
                });
        }
    }
 };