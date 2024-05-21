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
    }else if(req.query.id_perfil){
        const id_perfil=req.query.id_perfil;
        connection.query("SELECT *FROM Perfil WHERE ID_Perfil=?",[id_perfil],(err, resultado)=>{
            if(err){
                res.status(500).json({err});
                return;
            }
            res.json(resultado);
        })
    }
})

app.get('/api/Perfil-Curso',(req,res)=>{
    if(req.query.id_curso && req.query.id_perfil){
        const id_curso=req.query.id_curso;
        const id_perfil=req.query.id_perfil;
        connection.query("SELECT *FROM Perfil_Curso WHERE ID_Perfil=? AND  ID_Curso=?",[id_perfil, id_curso], (error, resultados)=>{
            if(error){
                res.json(500).json({error});
                return;
            }
            res.json(resultados);
        })
    }
    else if(req.query.id_perfil){
        const ID_Perfil=req.query.id_perfil; 
        connection.query("SELECT *FROM Perfil_Curso WHERE ID_Perfil=?",[ID_Perfil],(error, results)=>{
            if(error){
                res.json(500).json({error});
                return;
            }
            res.json(results);
        })
    }
    else if(req.query.id_perfilcurso){
        const ID_PerfilCurso=req.query.id_perfilcurso;
        connection.query("SELECT *FROM Perfil_Curso WHERE ID_PerfilCurso=?",[ID_PerfilCurso],(error,results)=>{
            if(error){
                res.json(500).json({error});
                return;
            }
            res.json(results);
        });
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

app.get('/api/Actividad',(req,res)=>{
    if(req.query.id_curso){
        const id_curso=req.query.id_curso;
        connection.query("SELECT *FROM Actividad WHERE ID_Curso=?",[id_curso], (err,results)=>{
            if(err){
                res.status(500).json({err});
                return;
            }
            res.json(results);
        })
    }
})

app.get('/api/Publicacion_Autor',(req, res)=>{
    if(req.query.id_curso){
        const id_curso=req.query.id_curso;
        connection.query("SELECT *FROM Publicacion_autor WHERE ID_Curso=? order by ID_Publicacion DESC",[id_curso],(err,results)=>{
            if(err){
                res.status(500).json({err});
                return;
            }
            res.json(results);
        })
    }
})

app.post('/api/Comentario',(req, res)=>{
    const {Contenido, Fecha_Publicacion, ID_PerfilCurso, ID_Publicacion}=req.body;
    connection.query("INSERT INTO Comentario (Contenido, Fecha_Publicacion, ID_PerfilCurso, ID_Publicacion) VALUES (?,?,?,?)",[Contenido, Fecha_Publicacion, ID_PerfilCurso, ID_Publicacion], (error, resultados)=>{
        if(error){
            return res.status(500).json({error});
        }
        else{
            console.log("Insert creado con exito.")
        }
        res.json(resultados);
    });
})

app.post('/api/Publicacion',(req, res)=>{
    const {Titulo, Contenido, Categoria, ID_PerfilCurso}=req.body;
    connection.query("INSERT INTO Publicación (Titulo, Contenido, Categoria, ID_PerfilCurso) VALUES (?,?,?,?)",[Titulo, Contenido, Categoria, ID_PerfilCurso], (error,resultado)=>{
        if(error){
            console.log(error);
            return res.status(500).json({error});
        }
        else{
            console.log("Insert creado con exito.")
        }
        res.json(resultado);
    });
})

app.get('/api/Comentario', (req,res)=>{
    if(req.query.id_publicacion){
        const id_publicacion=req.query.id_publicacion; 
        connection.query("SELECT * FROM Comentario WHERE ID_Publicacion=?",[id_publicacion],(err,resultados)=>{
            if(err){
                res.status(500).json({err});
                return;
            }
            res.json(resultados);
        })
    }
})

app.get('/api/Crucigrama',(req,res)=>{
    if(req.query.titulo){
        const titulo=req.query.titulo; 
        connection.query("SELECT ID_Crucigrama from Crucigrama WHERE Titulo=?",[titulo], (err, results)=>{
            if(err){
                res.status(500).json({err}); 
                return;
            }
            res.json(results); 
        })
    }
    if(req.query.id_crucigrama){
        const id_crucigrama=req.query.id_crucigrama; 
        connection.query("SELECT *FROM Crucigrama WHERE ID_Crucigrama=?",[id_crucigrama],(error, resultados)=>{
            if(error){
                res.status(500).json({error});
                return;
            }
            res.json(resultados);
        })
    }
})

app.post('/api/Crucigrama',(req, res)=>{
    const {Titulo, Descripcion}=req.body;
    connection.query("INSERT INTO Crucigrama (Titulo, Descripcion) VALUES (?,?)",[Titulo,Descripcion],(err,results)=>{
        if(err){
            return res.status(500).json({err});
        }
        else{
            console.log("Insert creado con exito")
        }
        res.json(results);
    })
})

app.get('/api/Palabra', (req, res)=>{
    if(req.query.id_crucigrama){
        const ID_Crucigrama=req.query.id_crucigrama; 
        connection.query("SELECT *FROM Palabra WHERE ID_Crucigrama=?",[ID_Crucigrama],(error, resultado)=>{
            if(error){
                res.status(500).json({error}); 
                return; 
            }
            res.json(resultado);
        });
    }
})

app.post('/api/Palabra',(req,res)=>{
    const {Palabra, Descripcion, Orientacion, Fila, Columna, Numero, ID_Crucigrama}=req.body;
    connection.query("INSERT INTO Palabra (Palabra, Descripcion, Orientacion, Fila, Columna, Numero, ID_Crucigrama) VALUES (?,?,?,?,?,?,?)"
,[Palabra, Descripcion, Orientacion,Fila,Columna,Numero,ID_Crucigrama],(err,resultado)=>{
    if(err){
        return res.status(500).json({err});
    }else{
        console.log("Insert creado con exito")
    }
    res.json(resultado);
})
})

app.listen(PUERTO, ()=>{
    console.log(`SERVIDOR CORRIENDO EN EL PUERTO: ${PUERTO}` );
});