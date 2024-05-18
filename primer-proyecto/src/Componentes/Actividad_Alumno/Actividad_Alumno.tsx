import { useState } from "react";
import "./Actividad_Alumno.css"
import Calificaciones from "../Calificaciones/Calificaciones";
export default function Actividad_Alumno(){
    const [tipo, setTipo]=useState<string>("Crucigrama");
    const evaluar_color=()=>{
        if(tipo=="Crucigrama") return("#6114AE");
    }
    
    return(
        <>
            <div id="Div_Actividad_Componente">
                <div id="Div_Columna1">
                    <h1 id="Actividad_Titulo">Actividad:</h1> 
                    <h1 id="Nombre_Actividad"> Crucigrama de Conceptos Básicos de Bases de Datos.</h1>
                    <div className="Div_Etiquetas">
                        <div className="Etiqueta_Categoria_Actividad" style={{backgroundColor: evaluar_color()}}>Crucigrama</div>
                        <div className="Etiqueta_Categoria_Actividad">Muy Difícil</div>
                    </div>
                    <div id="Div_Actividad_Informacion">
                    <h1 className="Titulos_Actividad">Descripción:</h1>
                    <p id="Actividad_Informacion">Actividad didáctica enfocada en resolver un crucigrama para repasar los conceptos básicos de Bases de Datos.</p>
                    <div className="Div_Etiquetas">
                        <div className="Etiqueta_Categoria_Actividad" id="Fecha" >De: 21/02/2024</div>
                        <div className="Etiqueta_Categoria_Actividad" id="Fecha">Hasta: 11/03/2024</div>
                    </div>
                    <div id="Boton_Iniciar">
                        Iniciar la Actividad
                    </div>
                    </div>  
                </div>
                
                <div id="Div_Calificacion">
                    <Calificaciones></Calificaciones>
                </div>
            </div>
        </>
    )
}