import { Curso, Perfil_Curso, Profesor } from "../../ConexionBD/Definiciones"
import Tarjeta from "../../Componentes/Tarjetas/Tarjetas"
import "./Home.css"
import { Alumno, Perfil_BD } from "../../ConexionBD/Definiciones"
import axios from "axios"
import { useEffect, useState } from "react"

interface prop{
    perfilActual: Perfil_BD,
    setCurso: React.Dispatch<React.SetStateAction<Curso | undefined>>
}

export default function Home({perfilActual, setCurso}:prop){
    const [sesionAlumno, setAlumno]=useState<Alumno[] | undefined>();
    const [sesionProfesor, setProfesor]=useState<Profesor[] | undefined>();
    const [sesionPerfilCurso, setPerfilCurso]=useState<Perfil_Curso[]>(); 
    const [sesionCursos, setCursos]=useState<Curso[][]>(); 
    const colores:string[]=["#FFB9B9","#A4FFC3","#A4F5FF","#EAA4FF","#FFDBA4"];
    const primerPerfil=Array.isArray(perfilActual)? perfilActual[0] : perfilActual;
    useEffect(()=>{
        if(primerPerfil.Tipo_Perfil=="Alumno"){
            axios.get(`/api/Alumno?id_alumno=${primerPerfil.ID_Alumno}`).then((resultado)=>{
                setAlumno(resultado.data);
            })
        }
        else{
            axios.get(`/api/Profesor?id_profesor=${primerPerfil.ID_Profesor}`).then((resultado)=>{
                setProfesor(resultado.data);
            })
        }
    },[])

    useEffect(()=>{
        if(sesionAlumno || sesionProfesor){
            axios.get(`/api/Perfil-Curso?id_perfil=${
                primerPerfil.ID_Perfil
            }`).then((resultado)=>{
                setPerfilCurso(resultado.data);
            })
        }
    },[sesionAlumno,sesionProfesor])

    useEffect(()=>{
        if(sesionPerfilCurso){
            const PromesasCursos=sesionPerfilCurso.map((curso)=>{
                return axios.get(`/api/Cursos?id_curso=${curso.ID_Curso}`).then(respuesta => respuesta.data);
            })
            Promise.all(PromesasCursos).then((DatosCursos)=>{
                const nuevosCursos= sesionCursos? [...sesionCursos, ...DatosCursos] : DatosCursos;
                setCursos(nuevosCursos);
            }).catch(error =>{
                console.error("Error con las promesas"+error);
            })
        }
        
    },[sesionPerfilCurso])
    return(
        <>
        <div className="div_global">
        <div className="div_titulo">
            <h1 className="h1_bienvenida">Bienvenid@ {sesionAlumno? sesionAlumno[0].Nombre : (sesionProfesor? sesionProfesor[0].Nombre : "")}:</h1>
        </div>
        
        <div id="div_tarjetas">
            {
               sesionPerfilCurso?.map((curso,index)=>{
                return(
                    <Tarjeta key={index} setCurso={setCurso} curso={sesionCursos && sesionCursos[index][0]} color={colores[Math.floor(Math.random()*colores.length)]} perfil={primerPerfil} />
                );
               })
            }
        </div>
        </div>
        </> 
    )  
}