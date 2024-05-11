const mysql=require("mysql"); 

const connection=mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "e-learning"
});

connection.connect((error)=>{
    if(error){
        console.log("Error al conectar la Base de Datos");
        return;
    }
    else{
        console.log("Conexión exitosa a la Base de Datos");
    }
})
 
module.exports=connection;