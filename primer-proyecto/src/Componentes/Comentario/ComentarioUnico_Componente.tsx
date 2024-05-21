import { useEffect, useState } from "react"
import { Comentario, Perfil_Alumno, Perfil_BD, Perfil_Profesor } from "../../ConexionBD/Definiciones"
import axios from "axios";

interface prop{
    comentario: Comentario | undefined
}

export default function ComentarioUnico_Compontente({comentario}:prop){
    const [autor, setAutor]=useState<Perfil_BD[]>();
    const [informacionAutor, setInformacionAutor]=useState<Perfil_Alumno[] | Perfil_Profesor[]>(); 
    const primerComentario=Array.isArray(comentario)? comentario[0] : comentario;
    useEffect(()=>{
        axios.get(`/api/Perfil-Curso?id_perfilcurso=${primerComentario.ID_PerfilCurso}`).then((respuesta)=>{
            setAutor(respuesta.data);
        })
    },[])

    useEffect(()=>{
        if(autor)
        axios.get(`/api/Perfil_Alumno?id_perfil=${autor[0].ID_Perfil}`).then((respuesta)=>{
            if(respuesta.data[0]==undefined){
                axios.get(`/api/Perfil_Profesor?id_perfil=${autor[0].ID_Perfil}`).then((respuesta)=>{
                    setInformacionAutor(respuesta.data);
                })
            } else
            setInformacionAutor(respuesta.data);
        })
    },[autor])

    return(
        <>
            <div id="ComentarioUnico">
                        <div id="Autor_Comentario">
                            <div id="Foto_Autor" style={{backgroundImage: `url(${informacionAutor? informacionAutor[0].Foto_Perfil: ""})`}}></div>
                        </div>
                        <div id="Contenido_Comentario">
                            <label id="NombreAutor">{informacionAutor? informacionAutor[0].Nombre : "Not Found"}</label>
                             <div id="Texto_Comentario">{primerComentario.Contenido}</div>
                        </div>
            </div>
        </>
    )
}