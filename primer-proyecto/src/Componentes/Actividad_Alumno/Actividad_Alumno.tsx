import "./Actividad_Alumno.css"
import Calificaciones from "../Calificaciones/Calificaciones";
import { Actividad, Perfil_BD } from "../../ConexionBD/Definiciones";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

interface prop{
    actividad: Actividad,
    perfil: Perfil_BD
}

export default function Actividad_Alumno({actividad, perfil}:prop){
    const [crucigrama, setCrucigrama]=useState<boolean>(false);
    const [examen, setExamen]=useState<boolean>(false);
    const [ahogado, setAhogado]=useState<boolean>(false);


    useEffect(()=>{
        if(actividad.Tipo=="Crucigrama"){
            setCrucigrama(true);
        }
        if(actividad.Tipo=="Cuestionario"){
            setExamen(true);
        }
        if(actividad.Tipo=="Ahogado"){
            setAhogado(true);
        }
    },[]);

    const evaluar_color=()=>{
        if(actividad.Tipo=="Crucigrama"){ 
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
                    </div>
                    <div id="Div_Actividad_Informacion">
                    <h1 className="Titulos_Actividad">Descripción:</h1>
                    <p id="Actividad_Informacion">{actividad.Descripcion}</p>
                    <div className="Div_Etiquetas">
                        <div className="Etiqueta_Categoria_Actividad" id="Fecha" >De: {FormatoFecha(actividad.Fecha_Publicacion)}</div>
                        <div className="Etiqueta_Categoria_Actividad" id="Fecha">Hasta: {FormatoFecha(actividad.Fecha_limite)}</div>
                    </div>
                    <div id="Boton_Iniciar">
                        <NavLink to={crucigrama? "/ResolverCrucigrama" : (examen? "/Examen" : "/Ahogado")}>Iniciar Actividad</NavLink>
                    </div>
                    </div>  
                </div>
                
                <div id="Div_Calificacion">
                    <Calificaciones actividad={actividad} perfil={perfil}></Calificaciones>
                </div>
            </div>
        </>
    )
}