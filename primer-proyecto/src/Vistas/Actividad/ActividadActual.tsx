import Actividad_Alumno from "../../Componentes/Actividad_Alumno/Actividad_Alumno"
import { Actividad } from "../../ConexionBD/Definiciones"
import "./Actividad.css"

interface prop{
    actividad: Actividad
}

export default function ActividadActual({actividad}:prop){
    return(
        <>
            <div id="Div_Actividad">
                <Actividad_Alumno actividad={actividad}></Actividad_Alumno>
            </div>
        </>
    )
}