import "./Ahogado.css"
import CrearAhogado from "./CrearAhogado"
import ResolverAhogado from "./ResolverAhogado"
import { Actividad, Perfil_BD } from "../../ConexionBD/Definiciones"

interface prop{
    actividad:Actividad | undefined,
    perfil: Perfil_BD | undefined
}

export default function Ahogado({actividad, perfil}:prop){
    return(
        <>
           <div id="Div_Ahogado">
                {actividad? <ResolverAhogado perfil={perfil} actividad={actividad} ID_Ahogado={actividad.ID_Ahogado? actividad.ID_Ahogado : 0}></ResolverAhogado>:
                <CrearAhogado></CrearAhogado>}
            </div> 
        </>
    )
}