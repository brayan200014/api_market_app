exports.inicio = (req, res) => {
    console.log("Hola esta es la parte de index");
    res.send("Hola este es el INDEX");
};
exports.empleados = (req, res) =>{
    console.log("Estoy en");
    res.send("Estoy en la pagina Empleados");
};
