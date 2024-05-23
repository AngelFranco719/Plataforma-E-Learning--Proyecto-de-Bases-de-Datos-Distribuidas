import { CSSProperties, useEffect, useState } from "react"
import { Actividad, Calificacion, Perfil_BD, Perfil_Curso } from "../../ConexionBD/Definiciones"
import "./Calificaciones.css"
import axios from "axios";

interface prop{
    actividad:Actividad,
    perfil:Perfil_BD
}

export default function Calificaciones({actividad, perfil}: prop){
    const [pc, setPC]=useState<Perfil_Curso>();
    const [calificacion, setCalificacion]=useState<Calificacion>();
    const [evaluado, setEvaluado]=useState<boolean>(false); 
    const [nuevafecha, setNuevaFecha]=useState<string>(""); 
    const primerActividad=Array.isArray(actividad)? actividad[0] : actividad;
    const primerPerfil=Array.isArray(perfil)? perfil[0] : perfil; 

    useEffect(()=>{
        axios.get(`/api/Perfil-Curso?id_perfil=${primerPerfil.ID_Perfil}&&id_curso=${primerActividad.ID_Curso}`).then(respuesta=>{
            setPC(respuesta.data[0]);
        })
    },[])

    useEffect(()=>{
        axios.get(`/api/Calificacion?id_actividad=${primerActividad.ID_Actividad}&&id_perfilcurso=${pc?.ID_PerfilCurso}`).then(respuesta=>{
            if(respuesta.data.length>0){
                setEvaluado(true);
                setCalificacion(respuesta.data[0]);
            }
        })
    },[pc])

    useEffect(()=>{
        if(calificacion){
            console.log(calificacion);
            const fecha:Date=new Date(calificacion.Fecha_Asignacion);
            const year: number = fecha.getFullYear();
            const month: number = fecha.getMonth() + 1; 
            const day: number = fecha.getDate();
            setNuevaFecha(`${year}-${month}-${day}`)
        }
    },[calificacion])

    useEffect(()=>{
        if(primerActividad){
            console.log(primerActividad);
            const fecha:Date=new Date(primerActividad.Fecha_limite);
            const year: number = fecha.getFullYear();
            const month: number = fecha.getMonth() + 1; 
            const day: number = fecha.getDate();
            setNuevaFecha(`${year}-${month}-${day}`)
        }
    },[primerActividad])

    return(
        <>
        <div id="Columna2">
            <div id="Div_Calificacion_Principal">
                    <h1 id="Titulo_Calificacion">Calificación:</h1>
                    <h2 id="Status">{evaluado? "Entregado" : "No Entregado"}</h2>
                    <div className="Div_horizontal">
                        <h2 className="Asignacion">{evaluado? `Se calificó en ${nuevafecha}` : `Fecha Límite: ${nuevafecha}`}</h2>
                    </div>
                    <div id="Calificacion" style={{backgroundColor: calificacion? (calificacion.Resultado>7? "#A1FF4D" :  "#FF584D") : "#4B4B4B" } as CSSProperties}>
                        {calificacion? `${calificacion.Resultado}` : `?`}
                    </div>
                    <h2 id="Retroalimentacion_Titulo">Retroalimentacion:</h2>
                    <p id="Retroalimentacion">{calificacion? calificacion.Retroalimentación : "Aún no hay retroalimentación"}</p>
            </div>
        </div>
            
        </>
    )
}