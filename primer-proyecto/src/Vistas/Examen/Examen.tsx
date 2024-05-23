import { Actividad, Perfil_BD } from "../../ConexionBD/Definiciones"
import CrearExamen from "./CrearExamen"
import "./Examen.css"
import ResolverExamen from "./ResolverExamen"

interface prop{
    actividad:Actividad | undefined,
    perfil: Perfil_BD | undefined
}

export default function Examen({actividad, perfil}: prop){
    return(
        <>
        <div id="Div_Examen">
            {actividad? <ResolverExamen actividad={actividad} perfil={perfil} id_examen={actividad.ID_Examen? actividad.ID_Examen : 0}></ResolverExamen>:
            <CrearExamen></CrearExamen>}
        </div>
        </>
    )
}