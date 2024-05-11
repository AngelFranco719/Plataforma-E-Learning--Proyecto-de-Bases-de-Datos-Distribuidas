const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const connection=require("./bd");

const app=express(); 
const PUERTO=process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/Perfiles',(req,res)=>{
    if(req.query.email && req.query.contraseña){
        const email=req.query.email;
        const contraseña=req.query.contraseña;
        connection.query("Select * from Perfil where Email=? and Contraseña=?",[email, contraseña], (err, results)=>{
            if(err){
                res.status(500).json({ err });
                return;
            }
            res.json(results); 
        })
    }
})

app.listen(PUERTO, ()=>{
    console.log(`SERVIDOR CORRIENDO EN EL PUERTO: ${PUERTO}` );
});