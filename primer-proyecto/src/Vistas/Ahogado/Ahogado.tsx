import { useState } from "react"
import "./Ahogado.css"
import CrearAhogado from "./CrearAhogado"
import ResolverAhogado from "./ResolverAhogado"

export default function Ahogado(){
    return(
        <>
           <div id="Div_Ahogado">
                <ResolverAhogado ID_Ahogado={4}></ResolverAhogado>
            </div> 
        </>
    )
}