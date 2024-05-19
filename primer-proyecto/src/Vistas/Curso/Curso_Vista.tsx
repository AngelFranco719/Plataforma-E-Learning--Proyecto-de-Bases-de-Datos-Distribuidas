import "./Curso.css"
import CursoAlumno from "../../Componentes/Curso_Alumno/cursoAlumno"
import { Actividad, Curso } from "../../ConexionBD/Definiciones"

interface prop{
    cursoActual: Curso,
    setActividad: React.Dispatch<React.SetStateAction<Actividad | undefined>>
}

export default function Curso_Vista({cursoActual, setActividad}:prop){
    return(
        <div id="Div_Curso">
            <CursoAlumno curso={cursoActual} setActividad={setActividad}></CursoAlumno>
        </div>
    )
}