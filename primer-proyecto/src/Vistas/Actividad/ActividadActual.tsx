import Actividad_Alumno from "../../Componentes/Actividad_Alumno/Actividad_Alumno"
import { Actividad, Perfil_BD } from "../../ConexionBD/Definiciones"
import "./Actividad.css"

interface prop{
    actividad: Actividad,
    perfil: Perfil_BD
}

export default function ActividadActual({actividad, perfil}:prop){
    return(
        <>
            <div id="Div_Actividad">
                <Actividad_Alumno perfil={perfil} actividad={actividad}></Actividad_Alumno>
            </div>
        </>
    )
}