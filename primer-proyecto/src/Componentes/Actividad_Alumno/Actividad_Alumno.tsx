import "./Actividad_Alumno.css"
import Calificaciones from "../Calificaciones/Calificaciones";
import { Actividad } from "../../ConexionBD/Definiciones";
import { NavLink } from "react-router-dom";

interface prop{
    actividad: Actividad
}

let Crucigrama=false; 

export default function Actividad_Alumno({actividad}:prop){
    const evaluar_color=()=>{
        if(actividad.Tipo=="Crucigrama"){
            Crucigrama=true; 
            return("#6114AE");
        } 
    }
    
    const FormatoFecha=(Fecha_s:string)=>{
        const Fecha=new Date(Fecha_s)
        const año=String(Fecha.getFullYear());
        const mes=String(Fecha.getMonth()+1).padStart(2,'0');
        const dia=String(Fecha.getDate()).padStart(2,'0');
        const fechaFinal=`${dia}/${mes}/${año}`;
        return fechaFinal;
    }

    return(
        <>
            <div id="Div_Actividad_Componente">
                <div id="Div_Columna1">
                    <h1 id="Actividad_Titulo">Actividad:</h1> 
                    <h1 id="Nombre_Actividad"> {actividad.Titulo}.</h1>
                    <div className="Div_Etiquetas">
                        <div className="Etiqueta_Categoria_Actividad" style={{backgroundColor: evaluar_color()}}>{actividad.Tipo}</div>
                        <div className="Etiqueta_Categoria_Actividad">{actividad.Dificultad}</div>
                        <div className="Etiqueta_Categoria_Actividad">
                            <NavLink to={"/Crucigrama"}>Crucigrama</NavLink>
                        </div>
                    </div>
                    <div id="Div_Actividad_Informacion">
                    <h1 className="Titulos_Actividad">Descripción:</h1>
                    <p id="Actividad_Informacion">{actividad.Descripcion}</p>
                    <div className="Div_Etiquetas">
                        <div className="Etiqueta_Categoria_Actividad" id="Fecha" >De: {FormatoFecha(actividad.Fecha_Publicacion)}</div>
                        <div className="Etiqueta_Categoria_Actividad" id="Fecha">Hasta: {FormatoFecha(actividad.Fecha_limite)}</div>
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