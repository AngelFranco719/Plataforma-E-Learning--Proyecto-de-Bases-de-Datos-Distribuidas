import { useEffect, useState } from "react"
import "./Examen.css"
import { Actividad, Calificacion, Examen, Opcion, Perfil_BD, Perfil_Curso, Pregunta } from "../../ConexionBD/Definiciones"
import axios from "axios";

interface props{
    id_examen:number; 
    actividad:Actividad | undefined,
    perfil:Perfil_BD | undefined
}

export default function ResolverExamen({id_examen, actividad, perfil}:props){
    const [examen, setExamen]=useState<Examen[]>(); 
    const [preguntas, setPreguntas]=useState<Pregunta[]>();
    const [opciones, setOpciones]=useState<Opcion[]>(); 
    const [index, setIndex]=useState<number>(0);
    const [correctas, setCorrectas]=useState<number>(0);
    const [terminado, setTerminado]=useState<boolean>(false); 
    const [calificación, setCalificacion]=useState<number>(0); 
    const [pc, setPC]=useState<Perfil_Curso>();
    const primer_perfil=Array.isArray(perfil)? perfil[0] : perfil;
    const primer_actividad=Array.isArray(actividad)? actividad[0] : actividad;
    useEffect(()=>{
        axios.get(`/api/Examen?id_examen=${id_examen}`).then(respuesta=>{
            setExamen(respuesta.data);
        })
    },[])

    useEffect(()=>{
        if(examen){
            axios.get(`/api/Pregunta?id_examen=${id_examen}`).then(respuesta=>{
                setPreguntas(respuesta.data); 
            })
        }
    },[examen])

    useEffect(()=>{
        if(preguntas){
            axios.get(`/api/Opcion?id_pregunta=${preguntas[index].ID_Pregunta}`).then(respuesta=>{
                setOpciones(respuesta.data);
            })
        }
    },[preguntas])
    useEffect(()=>{
        if(preguntas && index>0)
        axios.get(`/api/Opcion?id_pregunta=${preguntas[index].ID_Pregunta}`).then(respuesta=>{
            setOpciones(respuesta.data);
        })
    },[index])

    const ContestarPregunta=(evaluacion:string)=>{
        console.log(evaluacion);
        const nuevo_index=index; 
        const nuevo_Correctos=correctas; 
        if(evaluacion=="Correcta"){
            alert("Elegiste la Opción Correcta");
            setCorrectas(nuevo_Correctos+1);
        }else{
            alert("Te equivocaste :(");
        }
        if(preguntas && index+1<preguntas.length) setIndex(nuevo_index+1);
        else setTerminado(true); 
    }

    useEffect(()=>{
        if(terminado && preguntas){
            const nueva_calificacion= Math.round((10/preguntas.length)*correctas);
            setCalificacion(nueva_calificacion); 
        }
    },[terminado])

    useEffect(()=>{
        if(calificación){
            axios.get(`/api/Perfil-Curso?id_curso=${primer_actividad.ID_Curso}&&id_perfil=${primer_perfil.ID_Perfil}`).then(respuesta=>{
                setPC(respuesta.data[0]);
            })
        }
    },[calificación])

    useEffect(()=>{
        if(pc){
            const fechaDeHoy=new Date(); 
            const año: number = fechaDeHoy.getFullYear();
            const mes: number = fechaDeHoy.getMonth() + 1;
            const día: number = fechaDeHoy.getDate();
            let retroalimentacion; 
            if(calificación<7){
                retroalimentacion="Debes estudiar un poco más";
            }
            else{
                retroalimentacion="Muy Bien! Sigue así."
            }

            const nueva_calificacion:Calificacion={
                Fecha_Asignacion: `${año}-${mes}-${día}`,
                Resultado: calificación,
                Retroalimentación: retroalimentacion,
                ID_Actividad:primer_actividad.ID_Actividad,
                ID_PerfilCurso: primer_perfil.ID_Perfil
            }
            axios.post('/api/Calificacion',nueva_calificacion).then(respuesta=>{
                alert("Se registró la calificación"+respuesta);
            }).catch(resultado=>{
                alert("No se pudo registrar la calificación"+resultado);
            })
        }
    },[pc])

    return(
        <>
            <div id="ResolverExamen_DIV">
                <div id="Encabezado_Examen">
                    <div id="NombreExamen">
                        {examen? examen[0].Titulo : "Not Found"}
                    </div>
                    <div className="Div_Resolver_Info">
                        {examen? examen[0].Descripcion : "Not Found"}
                    </div>
                    <div id="Calificacion_Resolver" className="Div_Resolver_Info">
                        {`${correctas}/${preguntas? preguntas.length : 0}`}
                    </div>
                </div>
                <div id="Pregunta_Resolver">
                    <div id="Pregunta_Contenido">
                        <h2 id="Pregunta_h2">{terminado? `Tu calificación es de ${calificación}`  : (preguntas? `${index+1}.- ${preguntas[index].Pregunta}` : "Not Found")}</h2>
                    </div>
                    <div id="Opciones_Div">
                        {opciones? opciones.map((opcion, index)=>{
                            if(!terminado){
                                return(
                                    <div onClick={()=>ContestarPregunta(opcion.Evaluacion)} key={index} className="Div_Opcion">
                                        <h2 className="H2_Opcion">{`${opcion.Inciso} ${opcion.Contenido}`}</h2>
                                    </div>
                                )
                            }                          
                        }) : undefined}
                    </div>
                </div>
            </div>
            
        </>
    )
}