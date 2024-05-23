import { useEffect, useRef, useState } from "react";
import { Comentario, Perfil_Curso, Publicacion_Autor } from "../../ConexionBD/Definiciones"
import "./Comentario.css"
import ComentarioUnico_Compontente from "./ComentarioUnico_Componente"
import axios from "axios";

interface prop{
    publicacionActual: Publicacion_Autor  | undefined,
    perfilActual: Perfil_Curso | undefined
}

export default function ComentarioComponente({publicacionActual, perfilActual}: prop){
    const [NuevoComentario, setNuevoComentario]=useState<Comentario>(); 
    const [comentarios, setComentarios]=useState<Comentario[]>(); 
    const contenidoTextArea=useRef<HTMLTextAreaElement>(null);
    const primerPerfil=Array.isArray(perfilActual)? perfilActual[0] : perfilActual;

    const guardarComentario=()=>{
        const fechaDeHoy: Date = new Date();
        const fechaSoloHoy: Date = new Date(fechaDeHoy.getFullYear(), fechaDeHoy.getMonth(), fechaDeHoy.getDate());
        let informacion:Comentario={
            Contenido: contenidoTextArea.current? contenidoTextArea.current.value : "",
            Fecha_Publicacion: fechaSoloHoy,
            ID_Publicacion: publicacionActual? publicacionActual.ID_Publicacion : 0,
            ID_PerfilCurso : perfilActual? primerPerfil.ID_PerfilCurso : 0
        };
        axios.post('/api/Comentario',informacion)
        .then(respuesta =>{
            alert("Comentario creado: "+respuesta.data)
        }).catch(respuesta=>{
            alert("No se pudo crear el comentario: "+respuesta.data);
        })
        setNuevoComentario(informacion);
    }

    useEffect(()=>{
        axios.get(`/api/Comentario?id_publicacion=${publicacionActual?.ID_Publicacion}`).then((respuesta)=>{
            setComentarios(respuesta.data);
        })
    },[])

    return(
        <>
            <div id="Div_Comentario">
                <div id="Agregar_Comentario">
                    <textarea placeholder="Agrega un Comentario..." id="NuevoComentario" ref={contenidoTextArea}></textarea>
                    <div id="Button_Enviar" onClick={guardarComentario}>Enviar</div>
                </div>
                <details>
                    <summary id="Summary_Comentario">Comentarios</summary>
                    {comentarios? comentarios.map((comentario,index)=>{
                        return(
                            <ComentarioUnico_Compontente key={index} comentario={comentarios[index]}></ComentarioUnico_Compontente>
                        )
                    }) : undefined}
                </details>
            </div>
        </>
    )
}