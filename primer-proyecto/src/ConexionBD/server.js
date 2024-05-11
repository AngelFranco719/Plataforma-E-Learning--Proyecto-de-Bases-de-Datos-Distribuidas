const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const connection=require("./bd");

const app=express(); 
const PUERTO=process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/Perfiles',(req,res)=>{
    connection.query("SELECT *FROM Perfil",(error,results)=>{
        if(error){
            res.status(500).json({error});
            return;
        }
        res.json(results);
    });
})

app.listen(PUERTO, ()=>{
    console.log(`SERVIDOR CORRIENDO EN EL PUERTO: ${PUERTO}` );
});