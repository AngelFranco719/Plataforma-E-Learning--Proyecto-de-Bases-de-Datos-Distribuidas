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

app.get('/api/Perfil-Curso',(req,res)=>{
    if(req.query.id_perfil){
        const ID_Perfil=req.query.id_perfil; 
        connection.query("SELECT *FROM Perfil_Curso WHERE ID_Perfil=?",[ID_Perfil],(error, results)=>{
            if(error){
                res.json(500).json({error});
                return;
            }
            res.json(results);
        })
    }
})

app.get('/api/Cursos',(req,res)=>{
    if(req.query.id_curso){
        const ID_Curso=req.query.id_curso;
        connection.query("SELECT *FROM Curso WHERE ID_Curso=?",[ID_Curso],(error, results)=>{
            if(error){
                res.json(500).json({error});
                return;
            }
            res.json(results);
        })
    }
})

app.get('/api/Alumno',(req,res)=>{
    if(req.query.id_alumno){
        const id_alumno=req.query.id_alumno;
        connection.query("SELECT *FROM alumno WHERE ID_Alumno=?",[id_alumno],(err, results)=>{
            if(err){
                res.status(500).json({err});
                return;
            }
            res.json(results);
        });
    }
})

app.get('/api/Profesor',(req,res)=>{
    if(req.query.id_profesor){
        const id_profesor=req.query.id_profesor;
        connection.query("SELECT *FROM Profesor WHERE ID_Profesor=?",[id_profesor],(err, results)=>{
            if(err){
                res.status(500).json({err});
                return;
            }
            res.json(results);
        });
    }
})

app.get('/api/Perfil_Alumno',(req,res)=>{
    if(req.query.id_perfil){
        const id_perfil=req.query.id_perfil;
        connection.query("SELECT *FROM Perfil_Alumno WHERE id_perfil=?",[id_perfil],(err, results)=>{
            if(err){
                res.status(500).json({err});
                return;
            }
            res.json(results);
        })
    }
})

app.get('/api/Perfil_Profesor',(req,res)=>{
    if(req.query.id_perfil){
        const id_perfil=req.query.id_perfil;
        connection.query("SELECT *FROM Perfil_Profesor WHERE id_perfil=?",[id_perfil],(err,results)=>{
            if(err){
                res.status(500).json({err});
                return;
            }
            res.json(results);
        });
    }
})

app.listen(PUERTO, ()=>{
    console.log(`SERVIDOR CORRIENDO EN EL PUERTO: ${PUERTO}` );
});