import CrearExamen from "./CrearExamen"
import "./Examen.css"
import ResolverExamen from "./ResolverExamen"

export default function Examen(){
    return(
        <>
        <div id="Div_Examen">
            <ResolverExamen id_examen={4}></ResolverExamen>
        </div>
        </>
    )
}