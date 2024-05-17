import "./Curso.css"
import CursoAlumno from "../../Componentes/Curso_Alumno/cursoAlumno"
import { Curso } from "../../ConexionBD/Definiciones"

interface prop{
    cursoActual: Curso
}

export default function Curso_Vista({cursoActual}:prop){
    return(
        <div id="Div_Curso">
            <CursoAlumno curso={cursoActual}></CursoAlumno>
        </div>
    )
}