const mensaje = (msj, estado, data, res) => {
    let mensajes= {
        msj: msj,
        data: data
    }
    
    res.setHeader("Content-Type", "application/json");
    res.statusCode= estado; 
    res.json(mensajes);
}

module.exports= mensaje;
