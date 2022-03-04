const modeloCliente = require("../modelos/modeloClientes");
const { validationResult } = require('express-validator');

exports.inicio = (req,res) => {
    res.send("Esto es inicio en modulo Cliente");
 };

 exports.listar= async (req,res) => {

    const listaCliente = await modeloCliente.findAll();

    if(!listaCliente || !listaCliente.length)
    {
        res.send("No existen datos");
    }
    else{
        res.json(listaCliente);
    }
 };

 exports.buscar= async (req,res) => {

    const { id } =req.query;
    if(!id){
        res.send("No enviar Id vacio");
    }
    else{
        const buscarCliente = await modeloCliente.findOne({
            where:{
                IdUsuarioCliente:id
            }
        });
    
        //validacion
        if(!buscarCliente)
        {
            res.send("No se encontraron registros");
        }
        else{
            res.json(buscarCliente);
        }
    }
 };

 exports.guardar = async (req,res) => {
        const{IdUsuarioCliente, NombreUsuario, Correo, Contrasena} = req.body;
        if(!IdUsuarioCliente || !NombreUsuario || !Correo || !Contrasena){
            res.send("Debe enviar los datos completos");
        }
        else{
            await modeloCliente.create({
                IdUsuarioCliente,
                NombreUsuario,
                Correo,
                Contrasena,
            })
            .then((data)=>{
                console.log(data);
                res.send("Registro Almacenado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al guardar los datos")
            })
        }

 };
 
 exports.modificarCorreo = async(req, res) =>{
    const{id}=req.query;
    const{Correo}=req.body;
    if(!id || !Correo){
        res.send("Envie los datos completos");
    }else{
        var buscarCliente = await modeloCliente.findOne({
            where:{
                IdUsuarioCliente:id
            }
        });
        if(!buscarCliente){
            res.send("El Id no existe");
        }else{
            buscarCliente.Correo=Correo;
            await buscarCliente.save()
            .then((data) => {
                console.log(data);
                res.send("Registro modificado");
                
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al querer modificar los datos");

            });
        }
    }
 };

 exports.modificarEstado = async(req, res) =>{
    const{id}=req.query;
    const{Estado}=req.body;
    if(!id || !Estado){
        res.send("Envie los datos completos");
    }else{
        var buscarCliente = await modeloCliente.findOne({
            where:{
                IdUsuarioCliente:id
            }
        });
        if(!buscarCliente){
            res.send("El Id no existe");
        }else{
            buscarCliente.Estado=Estado;
            await buscarCliente.save()
            .then((data) => {
                console.log(data);
                res.send("Registro modificado");
                
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al querer modificar los datos");
            });
        }
    }
 };

 exports.eliminar = async (req,res) => {
  
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
                    IdUsuarioCliente: id,
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