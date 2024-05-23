import { NavLink } from "react-router-dom"
import "./CrearActividad.css"
import { useEffect, useRef, useState } from "react"
import {Curso} from "../../ConexionBD/Definiciones";
import axios from "axios";

interface prop{
    curso: Curso
}

export default function CrearActividad({curso}: prop){
    const [tipoActividad, setTipoActividad]=useState<string>();
    const [id, setID]=useState<number>();
    const DetailsTipoActividadRef=useRef<HTMLDetailsElement>(null); 
    const InputTituloRef=useRef<HTMLInputElement>(null); 
    const TextAreaDescripcion=useRef<HTMLTextAreaElement>(null);
    const InputFechaInicio=useRef<HTMLInputElement>(null); 
    const InputFechaFinal=useRef<HTMLInputElement>(null);
    const InputDificultad=useRef<HTMLInputElement>(null); 

    const ElegirTipo=(tipo:string)=>{
        console.log(tipo);
        setTipoActividad(tipo);
        if(DetailsTipoActividadRef.current){
            DetailsTipoActividadRef.current.textContent=tipo;
        }
    }
    const CrearActividad=()=>{
        if(tipoActividad=="Crucigrama"){
            axios.get('/api/Crucigrama').then(respuesta=>{
                setID(respuesta.data[0].ID_Crucigrama)
            })
        }
        if(tipoActividad=="Examen"){
            axios.get('/api/Examen').then(respuesta=>{
                setID(respuesta.data[0].ID_Examen)
            })
        }
        if(tipoActividad=="Ahogado"){
            axios.get('/api/Ahogado').then(respuesta=>{
                setID(respuesta.data[0].ID_Ahogado)
            })
        }
    }

    useEffect(()=>{
        console.log(id); 
        if(DetailsTipoActividadRef.current && InputTituloRef.current && TextAreaDescripcion.current && InputFechaInicio.current && InputFechaFinal.current && InputDificultad.current){
            if(tipoActividad=="Crucigrama"){
                const NuevaActividad={
                    ID_Curso: curso.ID_Curso,
                    Titulo: InputTituloRef.current.value,
                    Fecha_Publicacion: InputFechaInicio.current.value,
                    Fecha_limite: InputFechaFinal.current.value,
                    Descripcion: TextAreaDescripcion.current.value,
                    Dificultad: InputDificultad.current.value,
                    Tipo: DetailsTipoActividadRef.current.textContent,
                    ID_Crucigrama: id
                }
                axios.post('/api/Actividad/Crucigrama',NuevaActividad).then(respuesta=>{
                    alert("Se creo la actividad."+respuesta)
                }).catch(respuesta=>{
                    alert("No se pudo crear la actividad"+respuesta);
                })
            }
            if(tipoActividad=="Examen"){
                const NuevaActividad={
                    ID_Curso: curso.ID_Curso,
                    Titulo: InputTituloRef.current.value,
                    Fecha_Publicacion: InputFechaInicio.current.value,
                    Fecha_limite: InputFechaFinal.current.value,
                    Descripcion: TextAreaDescripcion.current.value,
                    Dificultad: InputDificultad.current.value,
                    Tipo: DetailsTipoActividadRef.current.textContent,
                    ID_Examen: id
                }
                axios.post('/api/Actividad/Examen',NuevaActividad).then(respuesta=>{
                    alert("Se creo la actividad."+respuesta)
                }).catch(respuesta=>{
                    alert("No se pudo crear la actividad"+respuesta);
                })
            }
            if(tipoActividad=="Ahogado"){
                const NuevaActividad={
                    ID_Curso: curso.ID_Curso,
                    Titulo: InputTituloRef.current.value,
                    Fecha_Publicacion: InputFechaInicio.current.value,
                    Fecha_limite: InputFechaFinal.current.value,
                    Descripcion: TextAreaDescripcion.current.value,
                    Dificultad: InputDificultad.current.value,
                    Tipo: DetailsTipoActividadRef.current.textContent,
                    ID_Ahogado: id
                }
                axios.post('/api/Actividad/Ahogado',NuevaActividad).then(respuesta=>{
                    alert("Se creo la actividad."+respuesta)
                }).catch(respuesta=>{
                    alert("No se pudo crear la actividad"+respuesta);
                })
            }
        }
    },[id])

    return(
        <>
            <div id="CrearActividad_Div">
                <h1 id="Titulo_NuevaActividad">Nueva Actividad</h1>
                <div style={{display: "flex", justifyContent:"center", alignContent: "center"}}>
                    <h2 className="Titulo_Inf_NA">Titulo: </h2>
                    <input ref={InputTituloRef} className="Input_Inf_NA" placeholder="Titulo de la Actividad"></input>
                </div>
                <div style={{display: "flex", justifyContent:"center", alignContent: "center"}}>
                    <h2 className="Titulo_Inf_NA">Descripción: </h2>
                    <textarea ref={TextAreaDescripcion} className="Textarea_Inf_NA" placeholder="Descripción de la Actividad"></textarea>
                </div>
                <div style={{display: "flex", justifyContent:"center", alignContent: "center"}}>
                    <h2 className="Titulo_Inf_NA" style={{fontSize: "20px"}}>Fecha: </h2>
                    <input ref={InputFechaInicio} className="Input_Inf_NA" style={{fontSize:"15px" , width: "100px"}} placeholder="YYYY-MM-DD"></input>
                    <h2 className="Titulo_Inf_NA" style={{fontSize: "20px", marginLeft:"20px"}}>Fecha Límite: </h2>
                    <input ref={InputFechaFinal} className="Input_Inf_NA" style={{fontSize:"15px" , width: "100px"}} placeholder="YYYY-MM-DD"></input>
                </div>
                <div style={{display: "flex", justifyContent:"center", alignContent: "center"}}>
                    <h2 className="Titulo_Inf_NA" style={{fontSize: "20px"}}>Dificultad: </h2>
                    <input ref={InputDificultad} className="Input_Inf_NA" style={{fontSize:"15px" , width: "100px"}}></input>
                </div>
                <div style={{display:"flex", justifyContent:"center", marginTop:"20px"}}>
                    <details id="Details_Inf_NA">
                        <summary ref={DetailsTipoActividadRef}>Tipo de Actividad</summary>
                        <div style={{textAlign:"center"}}>
                            <label onClick={()=>ElegirTipo("Crucigrama")} className="label_tipoA">Crucigrama</label>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <label onClick={()=>ElegirTipo("Examen")} className="label_tipoA">Examen</label>
                        </div>
                        <div style={{textAlign:"center"}}>
                            <label onClick={()=>ElegirTipo("Ahogado")} className="label_tipoA">Ahogado</label>
                        </div>
                    </details>
                </div>
                <div style={{display:"flex", justifyContent:"center", marginTop: "40px"}}>
                    <NavLink to={tipoActividad && tipoActividad=="Crucigrama"? "/Crucigrama" : (tipoActividad=="Examen"? "/CrearExamen" : "/CrearAhogado")} target="_blank">
                        <button>Crear Material</button>
                    </NavLink>
                        <button onClick={()=>CrearActividad()} style={{marginLeft:"20px"}}>Crear Actividad</button>
                </div>
            </div>
        </>
    )
}