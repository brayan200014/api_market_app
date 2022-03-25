const modeloCliente = require("../modelos/modeloClientes");
const { validationResult } = require('express-validator');
const msj = require('../componentes/mensaje');

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

    const { Correo } =req.query;
    if(!Correo){
        res.send("No enviar Correo vacio");
    }
    else{
        const buscarCliente = await modeloCliente.findOne({
            where:{
                Correo: Correo
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

 exports.buscarCorreo= async (req,res) => {

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
        msj("Los Datos Proporcionados no son validos", 500, validacion.array(), res);
    }
    else
    {
        const {NombreUsuario, Correo, Contrasena} = req.body;
        if(!NombreUsuario || !Correo || !Contrasena)
        {
            res.send("Debe enviar los datos completos");
        }
        else
        {
            const buscarCliente = await modeloCliente.findOne({
            where:{
                NombreUsuario: NombreUsuario,
            }
        });
        if(!buscarCliente){

            await modeloCliente.create({
                NombreUsuario,
                Correo,
                Contrasena,
                FechaCreacion:Date.now() 
            })
            .then((data) => 
            {
                console.log(data);
                msj("Usuario Registrado", 200, [], res);     
            })
            .catch((error) =>
            {
                console.log(error);
                msj("Error al crear el Usuario", 500, [], res);    
            });
        }
        else{
            msj("Lo sentimos, ese usuario ya existe", 500, [], res);
        }
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
            //buscarCliente.Correo=Correo;
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