import "./Curso.css"
import CursoAlumno from "../../Componentes/Curso_Alumno/cursoAlumno"
import { Actividad, Curso,  Perfil_BD, Perfil_Curso } from "../../ConexionBD/Definiciones"
import { useEffect, useState } from "react"
import axios from "axios"

interface prop{
    cursoActual: Curso,
    setActividad: React.Dispatch<React.SetStateAction<Actividad | undefined>>,
    perfilActual: Perfil_BD
}

export default function Curso_Vista({cursoActual, setActividad, perfilActual}:prop){
    const [perfil_cursoActual, setPerfil_CursoActual]=useState<Perfil_Curso[]>();
    const primerPerfil= Array.isArray(perfilActual)? perfilActual[0] : perfilActual;
    useEffect(()=>{
        axios.get(`/api/Perfil-Curso?id_perfil=${primerPerfil.ID_Perfil}&&id_curso=${cursoActual.ID_Curso}`).then((resultado)=>{
            setPerfil_CursoActual(resultado.data);
        })
    },[])
    
    return(
        <div id="Div_Curso">
            <CursoAlumno curso={cursoActual} setActividad={setActividad} perfilActual={perfil_cursoActual? perfil_cursoActual[0] : undefined}></CursoAlumno>
        </div>
    )
}