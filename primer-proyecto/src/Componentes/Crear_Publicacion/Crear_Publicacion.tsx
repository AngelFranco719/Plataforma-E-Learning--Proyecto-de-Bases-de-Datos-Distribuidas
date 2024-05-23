import { useEffect, useRef, useState } from "react"
import "./Crear_Publicacion.css"
import { Perfil_BD, Perfil_Curso, Publicacion} from "../../ConexionBD/Definiciones";
import axios from "axios";

interface prop{
    usuario: Perfil_Curso | undefined
}

export default function CrearPublicacion({usuario}:prop){
    const[perfilUsuario, setPerfilUsuario]=useState<Perfil_BD[]>(); 
    const texto_summary_ref=useRef<HTMLElement>(null);
    const TituloPublicacionRef=useRef<HTMLInputElement>(null);
    const ContenidoPublicacionRef=useRef<HTMLTextAreaElement>(null);

    const primerUsuario=Array.isArray(usuario)? usuario[0] : usuario; 
    const ActualizarSummary=(opcion:string)=>{
        if(texto_summary_ref.current){
            texto_summary_ref.current.textContent=opcion;; 
        }   
    }

    useEffect(()=>{
        axios.get(`/api/Perfiles?id_perfil=${primerUsuario.ID_Perfil}`).then((resultado)=>{
            setPerfilUsuario(resultado.data);
        })
    },[])

    useEffect(()=>{
        if(perfilUsuario) console.log(perfilUsuario[0].Tipo_Perfil);
    },[perfilUsuario])

    const CrearPublicacion=()=>{
        
        if(TituloPublicacionRef.current && ContenidoPublicacionRef.current &&texto_summary_ref.current){
            const Titulo=TituloPublicacionRef.current.value; 
            const Contenido=ContenidoPublicacionRef.current.value;
            const Categoria:string=texto_summary_ref.current.textContent? texto_summary_ref.current.textContent : "";
            const nuevaPublicacion:Publicacion={
                ID_Publicacion: undefined,
                Titulo:Titulo,
                Contenido:Contenido,
                Categoria:Categoria,
                ID_PerfilCurso: primerUsuario.ID_PerfilCurso
            }
            console.log(nuevaPublicacion);
            axios.post('/api/Publicacion',nuevaPublicacion).then((respuesta)=>{
                alert("Comentario Creado"+respuesta.data)
            }).catch((respuesta)=>{
                alert("Error"+respuesta)
            });
        }
        
    }

    if(perfilUsuario && perfilUsuario[0].Tipo_Perfil=="Profesor"){
        return(
            <>
                <div id="Div_CrearPublicacion">
                    <h2 id="NuevaPublicacion_Titulo">Nueva Publicación:</h2>
                    <div className="Div_ContenedorInfo">
                        <h2 className="Titulo_Info">Título: </h2>
                        <input className="Input_Info" ref={TituloPublicacionRef} type="text" placeholder="Ingresa el Título de la Publicación"></input>
                    </div>
                    <div className="Div_ContenedorInfo">
                        <h2 className="Titulo_Info">Contenido: </h2>
                        <textarea ref={ContenidoPublicacionRef} id="Textarea_ContenidoPub" className="Input_Info" placeholder="Ingresa el Contenido de la Publicación"></textarea>
                    </div>
                    <div id="Expander_TipoPublicacion">
                        <details>
                            <summary id="Titulo_Summary" ref={texto_summary_ref}>Tipo de Publicación</summary>
                            <div className="div_opcion" onClick={()=>ActualizarSummary("Aviso")}>Aviso</div>
                            <div className="div_opcion" onClick={()=>ActualizarSummary("Información")}>Información</div>
                            <div className="div_opcion" onClick={()=>ActualizarSummary("Pregunta")}>Pregunta</div>
                        </details>
                    </div>
                    <div id="Boton_AgregarPublicacion" onClick={()=>CrearPublicacion()}>Agregar</div>
                </div>
    
            </>
        )
    }
    else{
        return(
            <>
            </>
        )
    }

    
}