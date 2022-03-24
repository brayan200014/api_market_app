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

    const { Correo } =req.body;
    if(!Correo){
        res.send("No enviar Id vacio");
    }
    else{
        const buscarCliente = await modeloCliente.findOne({
            where:{
                Correo:Correo
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
    const validacion = validationResult(req);
    if(!validacion.isEmpty())
    {
        res.json(validacion.array());
    }
    else
    {
        const {IdUsuarioCliente, NombreUsuario, Correo, Contrasena, Estado} = req.body;
        if(!IdUsuarioCliente || !NombreUsuario || !Correo || !Contrasena || !Estado)
        {
            res.send("Debe enviar los datos completos");
        }
        else
        {
            await modeloCliente.create({
                IdUsuarioCliente,
                NombreUsuario,
                Correo,
                Contrasena, 
                Estado,
            })
            .then((data) => 
            {
                console.log(data);
                res.send("Registro Listo");     
            })
            .catch((error) =>
            {
                console.log(error);
                res.send("Error al guardar");    
            });
        }    
    }
 };
 
 exports.modificarCorreo = async(req, res) =>{
    const{Correo}=req.body;
    const{NombreUsuario}=req.body;
    const{Estado}=req.body;
    if(!Correo){
        res.send("Envie los datos completos");
    }else{
        var buscarCliente = await modeloCliente.findOne({
            where:{
                Correo:Correo
            }
        });
        if(!buscarCliente){
            res.send("El correo no existe");
        }else{
            buscarCliente.Correo=Correo;
            buscarCliente.NombreUsuario=NombreUsuario;
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
    const {IdUsuarioCliente} = req.query;
    if(!IdUsuarioCliente){
        res.send("Envie el ID del cliente");
    }
    else{
            await modeloCliente.destroy({
                where:{

                    IdUsuarioCliente: IdUsuarioCliente,
                }
            })
            .then((data) => {
                if (data==0) {
                    res.send("El registro del Cliente no existe");
                } else {
                    console.log(data);
                    res.send("Cliente eliminado con exito");
                }
            })   
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar los datos del cliente");

            });
    }
 };