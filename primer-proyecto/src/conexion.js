let mysql=require("mysql");
let conexion=mysql.createConnection({
    host:"localhost",
    database: "e-learning",
    port:"3307",
    user: "root",
    password: ""
});
conexion.connect(function(err){
    if(err){
        throw(err);
    }
    else{
        console.log("Conexion establecida");
    }
});
